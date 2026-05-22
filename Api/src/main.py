"""
FastAPI server for Rambutan Ripeness Classification.

Endpoints:
- POST /predict: Accept image file, return prediction and processed image
"""

import os
from pathlib import Path

import joblib
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Import preprocessing function
from pre_processing import process_image_bytes

# --- Initialize FastAPI ---
app = FastAPI(
    title="Rambutan Ripeness Classifier",
    description="HSV Color Feature Extraction + K-NN Classification",
    version="1.0.0"
)

# --- Configure CORS (allow all origins for local development) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Global model & scaler (loaded at startup) ---
MODEL = None
SCALER = None

# Class name mapping (customize as needed)
CLASS_NAMES = {
    0: "mentah",              # unripe (green)
    1: "menuju_matang",       # approaching ripe (yellow-red)
    2: "matang",              # ripe (red)
    3: "menuju_busuk",        # approaching rotten (brown-red)
    4: "busuk"                # rotten (dark brown)
}


@app.on_event("startup")
async def load_models():
    """Load trained K-NN model and scaler at startup."""
    global MODEL, SCALER

    # Adjust paths as needed (relative to working directory or absolute)
    model_path = Path(__file__).parent.parent / "models" / "knn_model.pkl"
    scaler_path = Path(__file__).parent.parent / "models" / "scaler.pkl"

    if not model_path.exists():
        print(f"WARNING: Model not found at {model_path}")
    else:
        MODEL = joblib.load(model_path)
        print(f"Loaded K-NN model from {model_path}")

    if not scaler_path.exists():
        print(f"WARNING: Scaler not found at {scaler_path}")
    else:
        SCALER = joblib.load(scaler_path)
        print(f"Loaded scaler from {scaler_path}")


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "Rambutan Ripeness Classifier API",
        "team": "Team Wintermute",
        "status": "ready"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict rambutan ripeness from uploaded image.

    Parameters
    ----------
    file : UploadFile
        Image file (JPG, PNG, etc.)

    Returns
    -------
    dict
        {
            "class_name": str,
            "features": {"hue": float, "saturation": float, "value": float},
            "processed_image_base64": str
        }
    """
    global MODEL, SCALER

    if MODEL is None or SCALER is None:
        raise HTTPException(status_code=500, detail="Model or scaler not loaded")

    try:
        # Read uploaded file bytes
        image_bytes = await file.read()

        # Process image and extract HSV features
        features, processed_image_b64 = process_image_bytes(image_bytes)
        mean_h, mean_s, mean_v = features

        # Scale features using the trained scaler
        features_scaled = SCALER.transform([[mean_h, mean_s, mean_v]])

        # Predict using K-NN
        prediction = MODEL.predict(features_scaled)[0]
        class_name = CLASS_NAMES.get(int(prediction), "unknown")

        return {
            "class_name": class_name,
            "features": {
                "hue": float(mean_h),
                "saturation": float(mean_s),
                "value": float(mean_v)
            },
            "processed_image_base64": processed_image_b64
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    # Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
