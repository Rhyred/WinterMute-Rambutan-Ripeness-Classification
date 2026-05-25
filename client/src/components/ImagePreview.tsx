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
    <div className="my-8 rounded-3xl bg-slate-900/60 p-5 ring-1 ring-white/10 sm:p-8">
      <div className="mb-6">
        <p className="section-kicker">Input</p>
        <h3 className="text-2xl font-bold text-white">Citra Asli</h3>
        <p className="mt-1 text-sm text-slate-400">Gambar yang diunggah untuk dianalisis</p>
      </div>
      <div className="flex justify-center">
        <img
          src={originalImage}
          alt="Original Rambutan"
          className="max-h-80 rounded-xl object-contain shadow-lg ring-1 ring-white/10"
        />
      </div>
    </div>
  );
};
