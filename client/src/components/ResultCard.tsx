/**
 * Result card showing prediction and HSV feature values
 * Team Wintermute
 */

import React from 'react';
import type { PredictionResult } from '../types';

interface ResultCardProps {
  result: PredictionResult;
}

const classNameToDisplay: Record<string, { label: string; color: string; emoji: string }> = {
  mentah: { label: 'Mentah (Unripe)', color: 'bg-green-100 text-green-800 border-green-300', emoji: '🟢' },
  menuju_matang: {
    label: 'Menuju Matang (Approaching Ripe)',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    emoji: '🟡',
  },
  matang: { label: 'Matang (Ripe)', color: 'bg-red-100 text-red-800 border-red-300', emoji: '🔴' },
  menuju_busuk: { label: 'Menuju Busuk (Approaching Rotten)', color: 'bg-orange-100 text-orange-800 border-orange-300', emoji: '🟠' },
  busuk: { label: 'Busuk (Rotten)', color: 'bg-brown-100 text-brown-800 border-brown-300', emoji: '🟤' },
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const classInfo = classNameToDisplay[result.className] || {
    label: result.className,
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    emoji: '❓',
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 my-8">
      {/* Prediction Result */}
      <div className={`border-2 rounded-lg p-6 mb-8 text-center ${classInfo.color}`}>
        <p className="text-sm font-semibold uppercase tracking-wider mb-2">Prediction Result</p>
        <p className="text-5xl font-bold mb-2">{classInfo.emoji}</p>
        <h2 className="text-3xl font-bold">{classInfo.label}</h2>
      </div>

      {/* HSV Features Grid */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">HSV Color Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hue */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
            <div className="text-center">
              <div className="text-3xl mb-2">🌈</div>
              <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">Hue (色相)</p>
              <p className="text-4xl font-bold text-red-600">{result.hue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2">Range: 0-180</p>
            </div>
          </div>

          {/* Saturation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">Saturation (彩度)</p>
              <p className="text-4xl font-bold text-green-600">{result.saturation.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2">Range: 0-255</p>
            </div>
          </div>

          {/* Value */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <div className="text-center">
              <div className="text-3xl mb-2">💡</div>
              <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">Value (明度)</p>
              <p className="text-4xl font-bold text-blue-600">{result.value.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2">Range: 0-255</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 px-4 font-semibold text-gray-700">Feature</th>
              <th className="text-center py-2 px-4 font-semibold text-gray-700">Value</th>
              <th className="text-center py-2 px-4 font-semibold text-gray-700">Range</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">Hue (色相)</td>
              <td className="text-center py-3 px-4 font-mono text-rambutan-600">{result.hue.toFixed(4)}</td>
              <td className="text-center py-3 px-4 text-gray-600">0 - 180</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">Saturation (彩度)</td>
              <td className="text-center py-3 px-4 font-mono text-rambutan-600">{result.saturation.toFixed(4)}</td>
              <td className="text-center py-3 px-4 text-gray-600">0 - 255</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">Value (明度)</td>
              <td className="text-center py-3 px-4 font-mono text-rambutan-600">{result.value.toFixed(4)}</td>
              <td className="text-center py-3 px-4 text-gray-600">0 - 255</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
