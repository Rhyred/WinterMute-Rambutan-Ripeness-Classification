/**
 * TypeScript types for Rambutan Ripeness Classification API
 * Team Wintermute
 */

export interface PredictionResponse {
  class_name: string;
  features: {
    hue: number;
    saturation: number;
    value: number;
  };
  processed_image_base64: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
}

export interface PredictionResult {
  className: string;
  hue: number;
  saturation: number;
  value: number;
  processedImageBase64: string;
}
