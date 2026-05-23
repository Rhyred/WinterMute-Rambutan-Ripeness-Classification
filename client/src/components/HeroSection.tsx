/**
 * Hero section for Rambutan Ripeness Classification app
 * Team Wintermute
 */

import logoUrl from '../../logo.png';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-surface overflow-hidden px-4 pb-24 pt-8 text-white sm:px-6 lg:px-8">
      <nav className="mx-auto mb-14 flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl shadow-cyan-500/20 ring-1 ring-cyan-200/50">
            <img src={logoUrl} alt="Wintermute logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Wintermute</p>
            <p className="mt-1 text-xs text-cyan-100/70">Digital Image Lab</p>
          </div>
        </div>
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          HSV + K-NN
        </span>
      </nav>

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100 shadow-sm backdrop-blur">
          Digital Image Processing System
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Analisis Citra Kematangan Rambutan
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
          Platform modern untuk membaca karakteristik warna pada citra rambutan, menampilkan citra asli,
          hasil pemrosesan, fitur HSV, dan keputusan klasifikasi secara visual.
        </p>
        <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="metric-pill">
            <span>Color Space</span>
            <strong>HSV</strong>
          </div>
          <div className="metric-pill">
            <span>Classifier</span>
            <strong>K-NN</strong>
          </div>
          <div className="metric-pill">
            <span>Output</span>
            <strong>Ripeness</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
