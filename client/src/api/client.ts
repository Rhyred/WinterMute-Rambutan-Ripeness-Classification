/**
 * API client for Rambutan Ripeness Classification backend
 * Team Wintermute
 */

import axios from 'axios';
import type { PredictionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const predictRipeness = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<PredictionResponse>('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default apiClient;
