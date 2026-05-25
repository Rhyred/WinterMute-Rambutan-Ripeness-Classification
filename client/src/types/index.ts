/**
 * TypeScript types for Rambutan Ripeness Classification API
 * Team Wintermute
 */

export interface PipelineImages {
  '1_resize': string;
  '2_threshold': string;
  '3_morphology': string;
  '4_crop': string;
  '5_hsv': string;
  '6_features': string;
}

export interface PredictionResponse {
  class_name: string;
  features: {
    hue: number;
    saturation: number;
    value: number;
  };
  processed_image_base64: string;
  pipeline_images: PipelineImages;
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
  pipelineImages: PipelineImages;
}
