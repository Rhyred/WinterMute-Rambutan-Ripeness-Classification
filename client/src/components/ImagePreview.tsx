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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {/* Original Image */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-rambutan-400 to-rambutan-600 text-white py-3 px-4 font-semibold">
          Citra Asli (Original)
        </div>
        <div className="p-4 flex items-center justify-center bg-gray-50 min-h-80">
          <img
            src={originalImage}
            alt="Original Rambutan"
            className="max-w-full max-h-80 rounded"
          />
        </div>
      </div>

      {/* Processed Image */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-rambutan-600 to-rambutan-800 text-white py-3 px-4 font-semibold">
          Citra Terproses (Processed)
        </div>
        <div className="p-4 flex items-center justify-center bg-gray-50 min-h-80">
          <img
            src={processedImage}
            alt="Processed Rambutan"
            className="max-w-full max-h-80 rounded"
          />
        </div>
      </div>
    </div>
  );
};
