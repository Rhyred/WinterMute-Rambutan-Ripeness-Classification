/**
 * Result card showing prediction and HSV feature values
 * Team Wintermute
 */

import React from 'react';
import type { PredictionResult } from '../types';

interface ResultCardProps {
  result: PredictionResult;
}

const classNameToDisplay: Record<string, { label: string; tone: string; dot: string; emoji: string }> = {
  mentah: { label: 'Mentah (Unripe)', tone: 'from-emerald-500 to-lime-500', dot: 'bg-emerald-400', emoji: '🟢' },
  menuju_matang: { label: 'Menuju Matang', tone: 'from-yellow-400 to-amber-500', dot: 'bg-yellow-400', emoji: '🟡' },
  matang: { label: 'Matang (Ripe)', tone: 'from-red-500 to-rose-600', dot: 'bg-red-400', emoji: '🔴' },
  menuju_busuk: { label: 'Menuju Busuk', tone: 'from-orange-500 to-red-500', dot: 'bg-orange-400', emoji: '🟠' },
  busuk: { label: 'Busuk (Rotten)', tone: 'from-stone-600 to-amber-900', dot: 'bg-stone-500', emoji: '🟤' },
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const classInfo = classNameToDisplay[result.className] || {
    label: result.className,
    tone: 'from-slate-500 to-slate-700',
    dot: 'bg-slate-500',
    emoji: '⚪',
  };

  const features = [
    { name: 'Hue', value: result.hue, max: 180, color: 'from-red-500 via-yellow-500 to-green-500', icon: '🎯' },
    { name: 'Saturation', value: result.saturation, max: 255, color: 'from-slate-400 to-emerald-500', icon: '💧' },
    { name: 'Value', value: result.value, max: 255, color: 'from-slate-900 to-white', icon: '☀️' },
  ];

  return (
    <div className="result-card my-6 sm:my-8 overflow-hidden animate-slide-up">
      {/* Header with classification result */}
      <div className={`result-header bg-gradient-to-br ${classInfo.tone} p-4 sm:p-6 text-white lg:p-8`}>
        <p className="section-kicker !text-white/80">Output</p>
        <div className="mt-3 sm:mt-4 flex flex-col gap-3 sm:gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center flex-shrink-0 rounded-2xl bg-white/20 text-2xl sm:text-3xl backdrop-blur-sm ring-1 ring-white/30 animate-pulse-glow">
              {classInfo.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-white/70">Hasil Klasifikasi</p>
              <h2 className="text-lg sm:text-2xl font-black break-words">{classInfo.label}</h2>
            </div>
          </div>
          <div className="rounded-xl sm:rounded-2xl bg-white/15 px-3 py-2 sm:px-5 sm:py-3 backdrop-blur-sm ring-1 ring-white/20 flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Model</p>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-white">K-NN (K=3)</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 lg:p-8 space-y-6 sm:space-y-8">
        {/* Processed Image */}
        <div>
          <p className="section-kicker">Processed Image</p>
          <h3 className="text-lg sm:text-xl font-bold text-white">Citra Terproses</h3>
          <div className="mt-3 sm:mt-4 flex justify-center overflow-x-auto">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-950 p-1 sm:p-2 ring-1 ring-white/10 flex-shrink-0">
              <img
                src={result.processedImageBase64}
                alt="Processed Rambutan"
                className="max-h-48 sm:max-h-56 rounded-lg sm:rounded-xl object-contain image-hover-zoom"
              />
            </div>
          </div>
        </div>

        {/* HSV Features */}
        <div>
          <p className="section-kicker">Feature Vector</p>
          <h3 className="text-lg sm:text-xl font-bold text-white">HSV Color Features</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 stagger-children">
          {features.map((feature) => (
            <div className="feature-card animate-fade-in" key={feature.name}>
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl flex-shrink-0">{feature.icon}</span>
                <div className="min-w-0 flex-grow">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">{feature.name}</p>
                  <p className="text-2xl sm:text-3xl font-black text-white break-words">{feature.value.toFixed(2)}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 sm:h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${feature.color} transition-all duration-1000`}
                  style={{ width: `${(feature.value / feature.max) * 100}%` }}
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs text-slate-500 text-right">max: {feature.max}</p>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto rounded-lg sm:rounded-2xl border border-white/10 bg-slate-900/50">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-slate-800/50 text-slate-300">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Feature</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold">Value</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold whitespace-nowrap">Normal %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((feature) => (
                <tr className="transition hover:bg-white/5" key={feature.name}>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium text-slate-200">{feature.name}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-center font-mono font-semibold text-cyan-300">
                    {feature.value.toFixed(1)}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-center font-mono text-slate-400">
                    {((feature.value / feature.max) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
