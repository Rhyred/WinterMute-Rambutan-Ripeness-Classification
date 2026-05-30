/**
 * About page - Tim Pengembang
 * Team Wintermute
 */

import React from 'react';

interface AboutPageProps {
  onClose: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onClose }) => {
  const teamMembers = [
    {
      name: '152024063 Hamizan Ihsan',
      role: 'Frontend Developer',
      description: 'Mengembangkan UI/UX aplikasi dengan React & Tailwind CSS',
      emoji: '💻'
    },
    {
      name: '15202406149 Baihaqi Faturohman ',
      role: 'Backend Developer',
      description: 'Mengembangkan API FastAPI dan image processing pipeline',
      emoji: '⚙️'
    },
    {
      name: '152024068 Ade Rahma Fauzan',
      role: 'Image Processing Specialist',
      description: 'Mengembangkan pipeline image processing dan feature extraction',
      emoji: '🖼️'
    },
    {
      name: '152024061 Muhammad Farel Firdaus',
      role: 'ML Engineer',
      description: 'Mengembangkan model K-NN dan ekstraksi fitur HSV',
      emoji: '🤖'
    },
    {
      name: '152024141 Robi Rizki Permana',
      role: 'Project Lead',
      description: 'Koordinasi proyek dan integrasi sistem keseluruhan',
      emoji: '🎯'
    }
  ];

  const features = [
    { title: 'Image Processing', desc: 'Pipeline 6-tahap dengan OpenCV', icon: '🖼️' },
    { title: 'Color Analysis', desc: 'Ekstraksi fitur HSV untuk analisis warna', icon: '🎨' },
    { title: 'K-NN Classification', desc: 'Algoritma K-Nearest Neighbor untuk klasifikasi', icon: '📊' },
    { title: 'Modern UI', desc: 'Interface responsif dengan React & Tailwind', icon: '✨' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-white/10 shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="relative overflow-hidden p-6 sm:p-8 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">Wintermute Team</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400">Digital Image Processing System | H-Ram HSV Rambutan Rippeness Classifier</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white flex-shrink-0"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-10 sm:space-y-12">
          {/* Project Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Tentang Proyek</h2>
            <p className="text-slate-300 leading-7">
              Platform modern untuk analisis citra kematangan rambutan menggunakan Digital Image Processing dan Machine Learning.
              Sistem ini mengekstraksi fitur warna HSV dari gambar rambutan dan mengklasifikasikan tingkat kematangan menggunakan
              algoritma K-Nearest Neighbor (K-NN) dengan akurasi tinggi.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-4">
                <h3 className="font-semibold text-cyan-100 mb-2">Frontend</h3>
                <ul className="text-xs sm:text-sm text-cyan-100/80 space-y-1">
                  <li>✓ React 19 dengan TypeScript</li>
                  <li>✓ Tailwind CSS 4.3</li>
                  <li>✓ Vite 8 (Build tool)</li>
                  <li>✓ Axios untuk HTTP client</li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4">
                <h3 className="font-semibold text-emerald-100 mb-2">Backend</h3>
                <ul className="text-xs sm:text-sm text-emerald-100/80 space-y-1">
                  <li>✓ FastAPI (Python)</li>
                  <li>✓ OpenCV untuk image processing</li>
                  <li>✓ NumPy & Scikit-learn</li>
                  <li>✓ Uvicorn (ASGI server)</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4">
                <h3 className="font-semibold text-amber-100 mb-2">Machine Learning</h3>
                <ul className="text-xs sm:text-sm text-amber-100/80 space-y-1">
                  <li>✓ K-Nearest Neighbor (K=3)</li>
                  <li>✓ HSV Color Space</li>
                  <li>✓ Feature Extraction</li>
                  <li>✓ Image Classification</li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-400/30 rounded-xl p-4">
                <h3 className="font-semibold text-rose-100 mb-2">Image Processing</h3>
                <ul className="text-xs sm:text-sm text-rose-100/80 space-y-1">
                  <li>✓ Resize & Normalization</li>
                  <li>✓ Thresholding & Segmentation</li>
                  <li>✓ Morphological Operations</li>
                  <li>✓ Cropping & Feature Extraction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Tim Pengembang</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-white/10 transition duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition">{member.emoji}</div>
                    <div className="min-w-0 flex-grow">
                      <h3 className="font-semibold text-white text-base">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">{member.role}</p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-5">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pipeline Info */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6-Tahap Pipeline Processing</h2>
            <div className="space-y-3">
              {[
                { num: 1, title: 'Resize', desc: 'Normalisasi ukuran gambar ke 256×256 pixel' },
                { num: 2, title: 'Threshold', desc: 'Segmentasi background dari foreground' },
                { num: 3, title: 'Morphology', desc: 'Operasi morfologi untuk membersihkan noise' },
                { num: 4, title: 'Crop', desc: 'Pemotongan area buah rambutan' },
                { num: 5, title: 'HSV Convert', desc: 'Konversi dari RGB ke HSV color space' },
                { num: 6, title: 'Features', desc: 'Ekstraksi nilai Hue, Saturation, Value' }
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white">
                    {step.num}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Project Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Status</p>
                <p className="text-white font-semibold">ON LISTING</p>
              </div>
              <div>
                <p className="text-slate-400">Purpose</p>
                <p className="text-white font-semibold">ITENAS IFB-208 Pengolahan Citra Digital Final Project</p>
              </div>
              <div>
                <p className="text-slate-400">Version</p>
                <p className="text-white font-semibold">1.0.0</p>
              </div>
              <div>
                <p className="text-slate-400">Year</p>
                <p className="text-white font-semibold">Copyright 2026</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-slate-400">Source Code</p>
                <a 
                  href="https://github.com/Rhyred/WinterMute-Rambutan-Ripeness-Classification" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition flex items-center gap-2 mt-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/Rhyred/WinterMute-Rambutan-Ripeness-Classification
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 sm:p-8 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
