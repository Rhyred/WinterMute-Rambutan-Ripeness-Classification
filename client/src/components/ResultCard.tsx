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
    <div className="result-card my-8 overflow-hidden animate-slide-up">
      {/* Header with classification result */}
      <div className={`result-header bg-gradient-to-br ${classInfo.tone} p-6 text-white sm:p-8`}>
        <p className="section-kicker !text-white/80">Output</p>
        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm ring-1 ring-white/30 animate-pulse-glow">
              {classInfo.emoji}
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">Hasil Klasifikasi</p>
              <h2 className="text-2xl font-black sm:text-3xl">{classInfo.label}</h2>
            </div>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur-sm ring-1 ring-white/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Model</p>
            <p className="mt-1 font-bold">K-Nearest Neighbor (K=3)</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {/* Processed Image */}
        <div className="mb-8">
          <p className="section-kicker">Processed Image</p>
          <h3 className="text-xl font-bold text-white">Citra Terproses</h3>
          <div className="mt-4 flex justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-2 ring-1 ring-white/10">
              <img
                src={result.processedImageBase64}
                alt="Processed Rambutan"
                className="max-h-56 rounded-xl object-contain image-hover-zoom"
              />
            </div>
          </div>
        </div>

        {/* HSV Features */}
        <div className="mb-6">
          <p className="section-kicker">Feature Vector</p>
          <h3 className="text-xl font-bold text-white">HSV Color Features</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 stagger-children">
          {features.map((feature) => (
            <div className="feature-card animate-fade-in" key={feature.name}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{feature.name}</p>
                  <p className="text-3xl font-black text-white">{feature.value.toFixed(2)}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${feature.color} transition-all duration-1000`}
                  style={{ width: `${(feature.value / feature.max) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 text-right">max: {feature.max}</p>
            </div>
          ))}
        </div>

        {/* Summary Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-center font-semibold">Value</th>
                <th className="px-4 py-3 text-center font-semibold">Normalized</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((feature) => (
                <tr className="transition hover:bg-white/5" key={feature.name}>
                  <td className="px-4 py-3 font-medium text-slate-200">{feature.name}</td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-cyan-300">
                    {feature.value.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-slate-400">
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
