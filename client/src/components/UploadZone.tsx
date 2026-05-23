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
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFileError('File harus berupa gambar.');
      return;
    }

    setFileError(null);
    onFileSelected(file);
  };

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
      selectFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      selectFile(files[0]);
    }
  };

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`upload-zone ${isDragActive ? 'upload-zone-active' : ''} ${
          isLoading ? 'pointer-events-none opacity-60' : ''
        }`}
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
          className="flex w-full flex-col items-center text-center"
          type="button"
        >
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/15 text-3xl text-cyan-100 shadow-inner ring-1 ring-cyan-300/30">
            ◈
          </span>
          <span className="text-xl font-bold text-white">Drop citra rambutan ke area ini</span>
          <span className="mt-2 text-sm leading-6 text-slate-300">
            format gambar umum didukung untuk analisis warna dan klasifikasi
          </span>
          <span className="mt-5 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-emerald-300">
            Pilih Citra
          </span>
        </button>
      </div>
      {fileError && <p className="mt-3 text-sm font-medium text-red-300">{fileError}</p>}
    </div>
  );
};
