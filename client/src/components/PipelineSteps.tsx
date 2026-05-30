/**
 * Pipeline steps visualization component
 * Shows the 6 stages of image processing
 */

import React from 'react';
import type { PipelineImages } from '../types';

interface PipelineStepsProps {
  images: PipelineImages;
}

const steps = [
  { key: '1_resize', title: 'Resize', desc: 'Resize ke 256×256 pixel', icon: '📐' },
  { key: '2_threshold', title: 'Threshold', desc: 'Segmentasi background', icon: '🎭' },
  { key: '3_morphology', title: 'Morphology', desc: 'Bersihkan noise', icon: '✨' },
  { key: '4_crop', title: 'Crop', desc: 'Potong area buah', icon: '✂️' },
  { key: '5_hsv', title: 'HSV Convert', desc: 'Konversi color space', icon: '🎨' },
  { key: '6_features', title: 'Features', desc: 'Ekstraksi H, S, V', icon: '📊' },
] as const;

export const PipelineSteps: React.FC<PipelineStepsProps> = ({ images }) => {
  return (
    <div className="my-6 sm:my-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 p-4 sm:p-5 ring-1 ring-white/10 sm:p-8 animate-slide-up">
      <div className="mb-4 sm:mb-6">
        <p className="section-kicker">Proses</p>
        <h3 className="text-xl sm:text-2xl font-bold text-white">Pipeline Steps</h3>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-400">6 tahap pemrosesan gambar sebelum klasifikasi</p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {steps.map((step, idx) => (
          <div key={step.key} className="pipeline-card animate-fade-in overflow-hidden rounded-lg sm:rounded-2xl">
            <div className="relative">
              <img
                src={images[step.key]}
                alt={step.title}
                className="w-full object-contain bg-slate-950/80 p-1 sm:p-2 image-hover-zoom max-h-40 sm:max-h-48"
              />
              <div className="absolute left-2 top-2 sm:left-3 sm:top-3 pipeline-number text-xs sm:text-sm">
                {idx + 1}
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-b from-transparent to-slate-950/30">
              <div className="flex items-center gap-2">
                <span className="text-lg">{step.icon}</span>
                <p className="text-sm sm:text-base font-semibold text-white">{step.title}</p>
              </div>
              <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
