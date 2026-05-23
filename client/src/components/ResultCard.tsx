/**
 * Result card showing prediction and HSV feature values
 * Team Wintermute
 */

import React from 'react';
import type { PredictionResult } from '../types';

interface ResultCardProps {
  result: PredictionResult;
}

const classNameToDisplay: Record<string, { label: string; tone: string; dot: string }> = {
  mentah: { label: 'Mentah (Unripe)', tone: 'from-emerald-500 to-lime-500', dot: 'bg-emerald-500' },
  menuju_matang: {
    label: 'Menuju Matang (Approaching Ripe)',
    tone: 'from-yellow-400 to-amber-500',
    dot: 'bg-yellow-500',
  },
  matang: { label: 'Matang (Ripe)', tone: 'from-red-500 to-rose-600', dot: 'bg-red-500' },
  menuju_busuk: { label: 'Menuju Busuk (Approaching Rotten)', tone: 'from-orange-500 to-red-500', dot: 'bg-orange-500' },
  busuk: { label: 'Busuk (Rotten)', tone: 'from-stone-600 to-amber-900', dot: 'bg-stone-700' },
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const classInfo = classNameToDisplay[result.className] || {
    label: result.className,
    tone: 'from-slate-500 to-slate-700',
    dot: 'bg-slate-500',
  };

  const features = [
    { name: 'Hue', native: '色相', value: result.hue, range: '0 - 180', color: 'text-red-600', bar: 'hue-bar' },
    {
      name: 'Saturation',
      native: '彩度',
      value: result.saturation,
      range: '0 - 255',
      color: 'text-emerald-600',
      bar: 'saturation-bar',
    },
    { name: 'Value', native: '明度', value: result.value, range: '0 - 255', color: 'text-sky-600', bar: 'value-bar' },
  ];

  return (
    <div className="result-card my-8 overflow-hidden">
      <div className={`bg-gradient-to-br ${classInfo.tone} p-6 text-white sm:p-8`}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">Classification Output</p>
        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
              <span className={`h-2.5 w-2.5 rounded-full ${classInfo.dot}`}></span>
              Detected Class
            </div>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">{classInfo.label}</h2>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-4 text-left shadow-inner ring-1 ring-white/20 md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Model</p>
            <p className="mt-1 text-lg font-bold">K-Nearest Neighbor</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Feature Vector</p>
            <h3 className="text-2xl font-bold text-white">HSV Color Features</h3>
          </div>
          <p className="text-sm text-slate-400">Nilai numerik yang menjadi input klasifikasi citra.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div className="feature-card" key={feature.name}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {feature.name} ({feature.native})
                  </p>
                  <p className={`mt-3 text-4xl font-black ${feature.color}`}>{feature.value.toFixed(2)}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/10">
                  {feature.range}
                </span>
              </div>
              <div className={`mt-5 h-2 rounded-full ${feature.bar}`}></div>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-center font-semibold">Value</th>
                <th className="px-4 py-3 text-center font-semibold">Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/35">
              {features.map((feature) => (
                <tr className="transition hover:bg-white/5" key={feature.name}>
                  <td className="px-4 py-4 font-medium text-slate-200">
                    {feature.name} ({feature.native})
                  </td>
                  <td className="px-4 py-4 text-center font-mono font-semibold text-cyan-200">
                    {feature.value.toFixed(4)}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-400">{feature.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
