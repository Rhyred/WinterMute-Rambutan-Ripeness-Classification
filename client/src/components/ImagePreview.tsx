/**
 * Side-by-side image preview component
 * Citra Asli (Original) vs Citra Terproses (Processed)
 * Team Wintermute
 */

import React from 'react';

interface ImagePreviewProps {
  originalImage: string;
  processedImage: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, processedImage }) => {
  const processedImageSrc = processedImage.startsWith('data:image')
    ? processedImage
    : `data:image/png;base64,${processedImage}`;

  return (
    <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="image-panel">
        <div className="image-panel-header">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Input Matrix</p>
            <h3 className="text-lg font-bold text-white">Citra Asli</h3>
          </div>
          <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-100">Original</span>
        </div>
        <div className="image-frame">
          <img
            src={originalImage}
            alt="Original Rambutan"
            className="max-h-96 max-w-full rounded-xl object-contain shadow-sm"
          />
        </div>
      </div>

      <div className="image-panel">
        <div className="image-panel-header">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Processed Matrix</p>
            <h3 className="text-lg font-bold text-white">Citra Terproses</h3>
          </div>
          <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">Processed</span>
        </div>
        <div className="image-frame">
          <img
            src={processedImageSrc}
            alt="Processed Rambutan"
            className="max-h-96 max-w-full rounded-xl object-contain shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
