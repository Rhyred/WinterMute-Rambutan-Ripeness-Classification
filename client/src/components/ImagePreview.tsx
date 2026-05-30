/**
 * Input image preview component
 * Team Wintermute
 */

import React from 'react';

interface ImagePreviewProps {
  originalImage: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage }) => {
  return (
    <div className="my-6 sm:my-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 p-4 sm:p-5 ring-1 ring-white/10 sm:p-8">
      <div className="mb-4 sm:mb-6">
        <p className="section-kicker">Input</p>
        <h3 className="text-xl sm:text-2xl font-bold text-white">Citra Asli</h3>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-400">Gambar yang diunggah untuk dianalisis</p>
      </div>
      <div className="flex justify-center overflow-x-auto">
        <img
          src={originalImage}
          alt="Original Rambutan"
          className="max-h-64 sm:max-h-80 rounded-lg sm:rounded-xl object-contain shadow-lg ring-1 ring-white/10 flex-shrink-0"
        />
      </div>
    </div>
  );
};
