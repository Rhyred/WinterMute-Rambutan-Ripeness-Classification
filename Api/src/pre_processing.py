from __future__ import annotations

import base64
from io import BytesIO
from typing import List, Tuple

import cv2
import numpy as np


def process_image_bytes(image_bytes: bytes) -> Tuple[List[float], str]:
    """
    Process uploaded image bytes and extract HSV mean features.

    Pipeline (exact requirements):
    - Decode bytes to BGR image, resize to 256x256
    - Create mask by grayscale thresholding (white background -> black),
      using THRESH_BINARY_INV with threshold ~240
    - Apply morphological CLOSE then OPEN with 5x5 elliptical kernel
    - Crop to largest contour bounding box and isolate fruit with bitwise_and
    - Convert isolated crop from BGR -> HSV
    - Compute channel means (H, S, V) using the cropped mask so background ignored
    - Return ([Mean_H, Mean_S, Mean_V], processed_image_base64)

    Returns
    -------
    features: List[float]
        [mean_h, mean_s, mean_v]
    processed_image_base64: str
        Data-URI JPEG image of the cropped, isolated fruit
    """

    # --- Decode & Resize -------------------------------------------------
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image bytes")

    img_resized = cv2.resize(img, (256, 256), interpolation=cv2.INTER_AREA)

    # --- Masking: make background black, foreground white -----------------
    gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)

    # --- Find largest contour and crop ----------------------------------
    contours, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        # ensure non-empty bbox
        if w == 0 or h == 0:
            x, y, w, h = 0, 0, img_resized.shape[1], img_resized.shape[0]
    else:
        # fallback: use the whole image
        x, y, w, h = 0, 0, img_resized.shape[1], img_resized.shape[0]

    cropped_img = img_resized[y : y + h, x : x + w]
    cropped_mask = mask[y : y + h, x : x + w]

    # Make sure mask is single-channel uint8 (0 or 255)
    if cropped_mask is None or cropped_mask.size == 0:
        cropped_mask = np.ones((cropped_img.shape[0], cropped_img.shape[1]), dtype=np.uint8) * 255
    else:
        cropped_mask = cropped_mask.astype(np.uint8)

    # --- Isolate fruit using mask ---------------------------------------
    isolated = cv2.bitwise_and(cropped_img, cropped_img, mask=cropped_mask)

    # --- HSV Conversion & Feature Extraction ----------------------------
    hsv = cv2.cvtColor(isolated, cv2.COLOR_BGR2HSV)
    h_channel, s_channel, v_channel = cv2.split(hsv)

    # cv2.mean returns a tuple even for single-channel; use index 0
    mean_h = float(cv2.mean(h_channel, mask=cropped_mask)[0])
    mean_s = float(cv2.mean(s_channel, mask=cropped_mask)[0])
    mean_v = float(cv2.mean(v_channel, mask=cropped_mask)[0])

    features = [mean_h, mean_s, mean_v]

    # --- Encode isolated cropped image as Base64 JPEG for frontend preview -
    success, encoded_img = cv2.imencode('.jpg', isolated)
    if not success:
        raise RuntimeError('Failed to encode processed image')

    b64_bytes = base64.b64encode(encoded_img.tobytes())
    b64_str = b64_bytes.decode('utf-8')
    data_uri = f"data:image/jpeg;base64,{b64_str}"

    return features, data_uri


if __name__ == '__main__':
    # Quick local smoke test helper (not run by imports)
    import sys

    if len(sys.argv) > 1:
        path = sys.argv[1]
        with open(path, 'rb') as f:
            b = f.read()
        feats, uri = process_image_bytes(b)
        print('Features:', feats)
        print('Preview URI length:', len(uri))
