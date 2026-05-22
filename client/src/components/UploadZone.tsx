/**
 * Drag-and-drop file upload zone
 * Team Wintermute
 */

import React, { useState, useRef } from 'react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected, isLoading = false }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelected(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelected(files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragActive
          ? 'border-rambutan-500 bg-rambutan-50'
          : 'border-gray-300 bg-gray-50 hover:border-rambutan-400'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        disabled={isLoading}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="text-rambutan-600 font-semibold hover:text-rambutan-700 disabled:opacity-50"
      >
        <div className="text-4xl mb-2">📸</div>
        <p className="text-lg mb-2">Drag and drop your rambutan image here</p>
        <p className="text-sm text-gray-600">or click to select a file</p>
      </button>
    </div>
  );
};
