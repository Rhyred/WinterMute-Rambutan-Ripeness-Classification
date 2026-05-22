/**
 * Main App Component - Rambutan Ripeness Classification
 * Team Wintermute - University Final Project
 */

import { useState } from 'react';
import { HeroSection, UploadZone, ImagePreview, ResultCard } from './components';
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
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Upload Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Rambutan Image</h2>
          <UploadZone onFileSelected={handleFileSelected} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rambutan-600"></div>
            </div>
            <p className="text-gray-600 font-semibold mt-4">Processing image...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-8 text-center">
            <p className="text-red-800 font-semibold">❌ Error: {error}</p>
            <p className="text-red-600 text-sm mt-2">
              Make sure the FastAPI server is running on http://localhost:8000
            </p>
          </div>
        )}

        {/* Results Section */}
        {result && originalImage && (
          <>
            <ImagePreview originalImage={originalImage} processedImage={result.processedImageBase64} />
            <ResultCard result={result} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p className="font-semibold">Team Wintermute</p>
          <p className="mt-2">
            Classification of Rambutan Fruit Ripeness using HSV Color Feature Extraction and K-Nearest Neighbor
            (K-NN)
          </p>
          <p className="mt-4 text-xs opacity-75">
            University Final Project • Built with React + TypeScript + Vite + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
