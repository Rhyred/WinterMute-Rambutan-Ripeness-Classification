"""
Training script for Rambutan Ripeness K-NN classifier.

Assumptions:
- CSV file contains columns: mean_h, mean_s, mean_v, label
- Exports trained model and scaler to Api/models/
"""

import os
import pickle
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler


def train_model(csv_path: str, output_dir: str = 'models') -> None:
    """
    Train K-NN classifier on Rambutan ripeness dataset.

    Parameters
    ----------
    csv_path : str
        Path to CSV file with columns [mean_h, mean_s, mean_v, label]
    output_dir : str
        Directory to save .pkl files (default: 'models')

    Returns
    -------
    None
        Saves knn_model.pkl and scaler.pkl to output_dir
    """

    # --- Load dataset ---
    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} samples from {csv_path}")

    # Extract features and labels
    X = df[['mean_h', 'mean_s', 'mean_v']].values
    y = df['label'].values

    print(f"Features shape: {X.shape}")
    print(f"Classes: {np.unique(y)}")

    # --- Train-Test Split (80-20, random_state=42) ---
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"Train set: {X_train.shape[0]}, Test set: {X_test.shape[0]}")

    # --- StandardScaler ---
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("StandardScaler fitted and applied")

    # --- Train K-NN (exact hyperparameters from research paper) ---
    knn = KNeighborsClassifier(
        n_neighbors=3,
        weights='distance',
        metric='euclidean'
    )
    knn.fit(X_train_scaled, y_train)
    print("K-NN model trained (n_neighbors=3, weights='distance', metric='euclidean')")

    # --- Evaluate ---
    train_score = knn.score(X_train_scaled, y_train)
    test_score = knn.score(X_test_scaled, y_test)
    print(f"Train accuracy: {train_score:.4f}")
    print(f"Test accuracy: {test_score:.4f}")

    # --- Export models ---
    os.makedirs(output_dir, exist_ok=True)

    model_path = os.path.join(output_dir, 'knn_model.pkl')
    scaler_path = os.path.join(output_dir, 'scaler.pkl')

    joblib.dump(knn, model_path)
    joblib.dump(scaler, scaler_path)

    print(f"\nModel saved to {model_path}")
    print(f"Scaler saved to {scaler_path}")


if __name__ == '__main__':
    import sys

    csv_file = sys.argv[1] if len(sys.argv) > 1 else 'dataset.csv'
    output_directory = sys.argv[2] if len(sys.argv) > 2 else 'models'

    train_model(csv_file, output_directory)
