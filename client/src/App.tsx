/**
 * Main App Component - Rambutan Ripeness Classification
 * Team Wintermute - University Final Project
 */

import { useState } from 'react';
import { HeroSection, UploadZone, ImagePreview, ResultCard, PipelineSteps, LoadingState, ErrorState, Footer } from './components';
import { AboutPage } from './pages/AboutPage';
import { ThemeProvider } from './context/ThemeContext';
import { predictRipeness } from './api/client';
import type { PredictionResult } from './types';
import './App.css';

function AppContent() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

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
      const errorMsg = err instanceof Error ? err.message : 'Gagal memproses gambar. Pastikan server API berjalan.';
      setError(errorMsg);
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setResult(null);
    setOriginalImage(null);
  };

  return (
    <div className="app-shell flex flex-col min-h-screen text-slate-100">
      <HeroSection onAboutClick={() => setShowAbout(true)} />

      <main className="flex-grow mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 lg:py-12 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <section className="glass-panel animate-fade-in p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl">
          <div className="mb-4 sm:mb-6 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Digital Image Input</p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Unggah citra untuk dianalisis</h2>
            </div>
            <p className="max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-slate-300">
              Sistem membaca citra rambutan, mengekstraksi kanal warna HSV, lalu mengklasifikasikan tingkat
              kematangan menggunakan model K-NN.
            </p>
          </div>
          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {error && <ErrorState message={error} onRetry={handleRetry} />}

        {/* Results Section */}
        {result && originalImage && !isLoading && (
          <section className="animate-fade-in space-y-6 sm:space-y-8">
            <ImagePreview originalImage={originalImage} />
            <PipelineSteps images={result.pipelineImages} />
            <ResultCard result={result} />
          </section>
        )}

        {/* Empty State */}
        {!isLoading && !error && !result && originalImage && (
          <div className="my-8 sm:my-12 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-600 p-8 sm:p-12 text-center">
            <p className="text-base sm:text-lg font-semibold text-slate-300">Memproses...</p>
          </div>
        )}
      </main>

      <Footer />

      {/* About Modal */}
      {showAbout && <AboutPage onClose={() => setShowAbout(false)} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
