/**
 * Hero section for Rambutan Ripeness Classification app
 * Team Wintermute
 */

import logoUrl from '../../logo.png';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onAboutClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAboutClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="hero-surface overflow-hidden px-4 pb-16 pt-6 text-white sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <nav className="mx-auto mb-12 flex max-w-6xl items-center justify-between gap-2 sm:mb-14">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-cyan-500/20 ring-1 ring-cyan-200/50">
            <img src={logoUrl} alt="Wintermute logo" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold leading-none">Wintermute</p>
            <p className="mt-0.5 sm:mt-1 text-xs text-cyan-100/70 truncate">Digital Image Lab</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition duration-200 text-white"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.464-4.536a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm14-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3 8a1 1 0 100 2H2a1 1 0 100-2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* About Button */}
          <button
            onClick={onAboutClick}
            className="px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition duration-200 text-xs sm:text-sm font-semibold text-white whitespace-nowrap"
          >
            About
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-emerald-100 shadow-sm backdrop-blur">
          Digital Image Processing System
        </p>
        <h1 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Analisis Citra Kematangan Rambutan
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8 text-slate-200">
          Platform modern untuk membaca karakteristik warna pada citra rambutan, menampilkan citra asli,
          hasil pemrosesan, fitur HSV, dan keputusan klasifikasi secara visual.
        </p>
        <div className="mt-6 sm:mt-8 grid max-w-3xl grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-3">
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
