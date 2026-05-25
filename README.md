# Rambutan Fruit Ripeness Classification

**Team Wintermute** — University Final Project

A full-stack web application for classifying rambutan fruit ripeness using HSV color feature extraction and K-Nearest Neighbor (K-NN) machine learning.

## Tech Stack

### Backend (API)
- **Python 3.11** with FastAPI
- **OpenCV** (cv2) for image processing
- **Scikit-Learn** for K-NN classifier
- **Pandas & NumPy** for data manipulation

### Frontend (Client)
- **React 19** with TypeScript
- **Vite** (build tool)
- **TailwindCSS** (styling)
- **Axios** (HTTP client)

## Project Structure

```
project_root/
├── Api/
│   ├── .venv/                          # Python Virtual Environment
│   ├── dataset/                        # Training data folders
│   │   ├── mentah/
│   │   ├── menuju_matang/
│   │   ├── matang/
│   │   ├── menuju_busuk/
│   │   └── busuk/
│   ├── models/                         # Trained models
│   │   ├── knn_model.pkl              # Trained K-NN model
│   │   └── scaler.pkl                 # StandardScaler pickle
│   ├── src/
│   │   ├── pre_processing.py          # OpenCV image processing pipeline
│   │   ├── train.py                   # K-NN training script
│   │   └── main.py                    # FastAPI server
│   └── requirements.txt                # Python dependencies
│
└── client/
    ├── src/
    │   ├── api/
    │   │   └── client.ts              # Axios API client
    │   ├── components/
    │   │   ├── HeroSection.tsx        # Hero banner
    │   │   ├── UploadZone.tsx         # Drag-drop upload
    │   │   ├── ImagePreview.tsx       # Side-by-side images
    │   │   ├── ResultCard.tsx         # Prediction results
    │   │   └── index.ts               # Component exports
    │   ├── types/
    │   │   └── index.ts               # TypeScript interfaces
    │   ├── App.tsx                    # Main app component
    │   ├── main.tsx                   # React entry point
    │   └── index.css                  # Tailwind CSS
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.ts
    ├── tsconfig.json
    └── .env                           # API URL configuration
```

## Quick Start

### Backend Setup

1. **Create and activate virtual environment:**
   ```bash
   cd Api
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Prepare dataset:**
   - Place your rambutan images in `Api/dataset/` with folders: `mentah`, `menuju_matang`, `matang`, `menuju_busuk`, `busuk`

4. **Train the model:**
   ```bash
   python src/train.py dataset.csv models
   ```
   (Ensure `dataset.csv` has columns: `mean_h`, `mean_s`, `mean_v`, `label`)

5. **Run FastAPI server:**
   ```bash
   python src/main.py
   ```
   Server runs on `http://localhost:8000`
   cd /home/rhyred/Wintermute/Api/src
   uvicorn main:app --reload --host 0.0.0.0 --port 8000

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Configure API URL (optional):**
   - Edit `client/.env` if your API is on a different host/port
   - Default: `VITE_API_URL=http://localhost:8000`

3. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`
   npm run dev -- --host

## Features

### Image Processing Pipeline
1. **Decode & Resize**: Convert bytes to BGR, resize to 256×256
2. **Masking**: Threshold grayscale to isolate fruit from white background
3. **Morphological Operations**: CLOSE + OPEN with 5×5 elliptical kernel
4. **Cropping**: Extract bounding box of largest contour
5. **HSV Conversion**: Convert cropped image to HSV color space
6. **Feature Extraction**: Calculate mean Hue, Saturation, Value

### ML Model
- **Algorithm**: K-Nearest Neighbor (K-NN)
- **Hyperparameters**: n_neighbors=3, weights='distance', metric='euclidean'
- **Preprocessing**: StandardScaler normalization
- **Train/Test Split**: 80/20 (random_state=42)

### UI/UX
- **Hero Section**: Project branding and info
- **Drag-and-Drop Upload**: Intuitive file selection
- **Side-by-Side Preview**: Original vs. processed image
- **Result Card**: Prediction class + HSV feature visualization
- **Responsive Design**: Mobile-friendly TailwindCSS layout

## API Endpoints

### GET `/`
Health check endpoint.

**Response:**
```json
{
  "message": "Rambutan Ripeness Classifier API",
  "team": "Team Wintermute",
  "status": "ready"
}
```

### POST `/predict`
Upload an image and get ripeness classification.

**Request:**
- `file`: UploadFile (image)

**Response:**
```json
{
  "class_name": "matang",
  "features": {
    "hue": 145.23,
    "saturation": 189.45,
    "value": 210.67
  },
  "processed_image_base64": "data:image/jpeg;base64,..."
}
```

## Classification Classes

| Class | Label | Meaning |
|-------|-------|---------|
| `mentah` | 🟢 Unripe | Green/early stage |
| `menuju_matang` | 🟡 Approaching Ripe | Yellow-red transition |
| `matang` | 🔴 Ripe | Full red color |
| `menuju_busuk` | 🟠 Approaching Rotten | Brown-red decay |
| `busuk` | 🟤 Rotten | Dark brown/spoiled |

## Development

### Backend Development
```bash
cd Api
source .venv/bin/activate
python src/main.py  # Auto-reloads with uvicorn
```

### Frontend Development
```bash
cd client
npm run dev  # Hot-reload Vite dev server
npm run build  # Production build
npm run lint  # Run ESLint
```

## Dependencies

### Python (Api/requirements.txt)
- fastapi==0.110.0
- uvicorn[standard]==0.27.1
- python-multipart==0.0.9
- opencv-python-headless==4.9.0.80
- scikit-learn==1.4.1.post1
- pandas==2.2.1
- numpy==1.26.4

### JavaScript (client/package.json)
- react@^19.2.6
- react-dom@^19.2.6
- axios@^1.6.5
- tailwindcss@latest (dev)
- typescript@~6.0.2 (dev)
- vite@^8.0.12 (dev)

## Troubleshooting

### FastAPI server won't start
- Check if port 8000 is in use: `lsof -i :8000`
- Verify models exist: `ls Api/models/`

### Frontend can't connect to API
- Ensure FastAPI is running on `http://localhost:8000`
- Check CORS settings in `Api/src/main.py`
- Verify `.env` API URL: `VITE_API_URL=http://localhost:8000`

### Model training fails
- Ensure CSV has correct columns: `mean_h`, `mean_s`, `mean_v`, `label`
- Check dataset folders have training images
- Verify CSV path is correct

## Author

**Team Wintermute** — University Final Project, 2024–2025

---

**Classification of Rambutan Fruit Ripeness using HSV Color Feature Extraction and K-Nearest Neighbor (K-NN)**
