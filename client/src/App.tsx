/**
 * Main App Component - Rambutan Ripeness Classification
 * Team Wintermute - University Final Project
 */

import { useState } from 'react';
import { HeroSection, UploadZone, ImagePreview, ResultCard, PipelineSteps } from './components';
import { predictRipeness } from './api/client';
import type { PredictionResult } from './types';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (file: File) => {
    setError(null);
    setResult(null);

    // Create preview for original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Send to API
    setIsLoading(true);
    try {
      const apiResponse = await predictRipeness(file);

      // Transform API response to our format
      const predictionResult: PredictionResult = {
        className: apiResponse.class_name,
        hue: apiResponse.features.hue,
        saturation: apiResponse.features.saturation,
        value: apiResponse.features.value,
        processedImageBase64: apiResponse.processed_image_base64,
        pipelineImages: apiResponse.pipeline_images,
      };

      setResult(predictionResult);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to predict ripeness';
      setError(errorMsg);
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen text-slate-100">
      <HeroSection />

      <main className="mx-auto -mt-10 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <section className="glass-panel animate-fade-in p-5 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Digital Image Input</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Unggah citra untuk dianalisis</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              Sistem membaca citra rambutan, mengekstraksi kanal warna HSV, lalu mengklasifikasikan tingkat
              kematangan menggunakan model K-NN.
            </p>
          </div>
          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />
        </section>

        {isLoading && (
          <div className="my-8 animate-fade-in">
            {/* Loading skeleton for pipeline */}
            <div className="rounded-3xl bg-slate-900/60 p-5 ring-1 ring-white/10 sm:p-8">
              <div className="mb-6">
                <div className="skeleton h-4 w-20 mb-2"></div>
                <div className="skeleton h-8 w-48"></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-xl bg-slate-800/50 p-4 ring-1 ring-white/5">
                    <div className="skeleton h-32 w-full mb-3"></div>
                    <div className="skeleton h-4 w-24 mb-2"></div>
                    <div className="skeleton h-3 w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing indicator */}
            <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-950/45 px-6 py-8 text-center backdrop-blur animate-pulse-glow">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 shadow-lg ring-1 ring-cyan-300/30">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300"></div>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">Memproses citra...</p>
              <p className="mt-2 text-sm text-cyan-100/75">Menjalankan 6 tahap pipeline image processing</p>
              <div className="mt-4 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="my-8 rounded-2xl border border-red-400/30 bg-red-950/50 px-6 py-5 shadow-sm backdrop-blur">
            <p className="font-semibold text-red-100">Gagal memproses gambar: {error}</p>
            <p className="mt-2 text-sm text-red-200/80">
              Pastikan server FastAPI berjalan di http://localhost:8000 atau atur VITE_API_URL dengan benar.
            </p>
          </div>
        )}

        {result && originalImage && (
          <section className="animate-fade-in">
            <ImagePreview originalImage={originalImage} />
            <PipelineSteps images={result.pipelineImages} />
            <ResultCard result={result} />
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-white">Team Wintermute</p>
          <p className="max-w-2xl md:text-right">
            Classification of Rambutan Fruit Ripeness using HSV Color Feature Extraction and K-Nearest Neighbor.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
