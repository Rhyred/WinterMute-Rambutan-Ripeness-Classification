from __future__ import annotations

import base64
from typing import Dict, List, Tuple

import cv2
import numpy as np


def _encode_image(img: np.ndarray) -> str:
    """Encode image to base64 data URI."""
    success, encoded = cv2.imencode('.jpg', img)
    if not success:
        raise RuntimeError('Failed to encode image')
    b64 = base64.b64encode(encoded.tobytes()).decode('utf-8')
    return f"data:image/jpeg;base64,{b64}"


def process_image_bytes(image_bytes: bytes) -> Tuple[List[float], str, Dict[str, str]]:
    """
    Process uploaded image bytes and extract HSV mean features.

    Returns
    -------
    features: List[float]
        [mean_h, mean_s, mean_v]
    processed_image_base64: str
        Data-URI JPEG image of the cropped, isolated fruit
    pipeline_images: Dict[str, str]
        Images from each pipeline step as base64 data URIs
    """
    pipeline_images = {}

    # --- 1. Decode & Resize ----------------------------------------------
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image bytes")

    img_resized = cv2.resize(img, (256, 256), interpolation=cv2.INTER_AREA)
    pipeline_images['1_resize'] = _encode_image(img_resized)

    # --- 2. Masking (Thresholding) ---------------------------------------
    # Threshold untuk background putih (konsisten dengan training data)
    gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    pipeline_images['2_threshold'] = _encode_image(mask)

    # --- 3. Morphological Operations -------------------------------------
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    pipeline_images['3_morphology'] = _encode_image(mask)

    # --- 4. Cropping -----------------------------------------------------
    contours, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        if w == 0 or h == 0:
            x, y, w, h = 0, 0, img_resized.shape[1], img_resized.shape[0]
    else:
        x, y, w, h = 0, 0, img_resized.shape[1], img_resized.shape[0]

    cropped_img = img_resized[y : y + h, x : x + w]
    cropped_mask = mask[y : y + h, x : x + w]

    if cropped_mask is None or cropped_mask.size == 0:
        cropped_mask = np.ones((cropped_img.shape[0], cropped_img.shape[1]), dtype=np.uint8) * 255
    else:
        cropped_mask = cropped_mask.astype(np.uint8)

    isolated = cv2.bitwise_and(cropped_img, cropped_img, mask=cropped_mask)
    pipeline_images['4_crop'] = _encode_image(isolated)

    # --- 5. HSV Conversion -----------------------------------------------
    hsv = cv2.cvtColor(isolated, cv2.COLOR_BGR2HSV)
    pipeline_images['5_hsv'] = _encode_image(hsv)

    # --- 6. Feature Extraction -------------------------------------------
    h_channel, s_channel, v_channel = cv2.split(hsv)
    mean_h = float(cv2.mean(h_channel, mask=cropped_mask)[0])
    mean_s = float(cv2.mean(s_channel, mask=cropped_mask)[0])
    mean_v = float(cv2.mean(v_channel, mask=cropped_mask)[0])
    features = [mean_h, mean_s, mean_v]

    # Visualize channels side by side for step 6
    h_vis = cv2.applyColorMap(h_channel, cv2.COLORMAP_HSV)
    s_vis = cv2.cvtColor(s_channel, cv2.COLOR_GRAY2BGR)
    v_vis = cv2.cvtColor(v_channel, cv2.COLOR_GRAY2BGR)
    channels_vis = np.hstack([h_vis, s_vis, v_vis])
    pipeline_images['6_features'] = _encode_image(channels_vis)

    # Final processed image
    processed_image_b64 = _encode_image(isolated)

    return features, processed_image_b64, pipeline_images


if __name__ == '__main__':
    import sys

    if len(sys.argv) > 1:
        path = sys.argv[1]
        with open(path, 'rb') as f:
            b = f.read()
        feats, uri, pipeline = process_image_bytes(b)
        print('Features:', feats)
        print('Pipeline steps:', list(pipeline.keys()))
