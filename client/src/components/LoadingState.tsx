/**
 * Loading state component with skeleton loaders
 * Team Wintermute
 */

import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="my-8 animate-fade-in space-y-6">
      {/* Pipeline Loading Skeleton */}
      <div className="rounded-3xl bg-slate-900/60 p-5 ring-1 ring-white/10 sm:p-8">
        <div className="mb-6">
          <div className="skeleton h-3 w-20 mb-2"></div>
          <div className="skeleton h-8 w-40"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl bg-slate-800/50 p-4 ring-1 ring-white/5 overflow-hidden">
              <div className="skeleton h-40 w-full mb-4"></div>
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="skeleton h-3 w-32"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Indicator */}
      <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/45 to-cyan-900/20 px-4 py-8 sm:px-8 text-center backdrop-blur animate-pulse-glow">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 shadow-lg ring-1 ring-cyan-300/30">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300"></div>
        </div>
        <p className="mt-5 text-base sm:text-lg font-semibold text-white">Memproses citra...</p>
        <p className="mt-2 text-xs sm:text-sm text-cyan-100/75">Menjalankan 6 tahap pipeline image processing</p>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
