"""
Generate dataset.csv from image folders.

Processes all images in dataset/matang and dataset/busuk directories,
extracts HSV features using pre_processing.py, and saves to dataset.csv.
"""

import os
from pathlib import Path

import pandas as pd
from pre_processing import process_image_bytes


def generate_dataset_csv(dataset_dir: str = 'dataset', output_csv: str = 'dataset.csv') -> None:
    """
    Generate CSV dataset from image folders.

    Parameters
    ----------
    dataset_dir : str
        Path to dataset directory containing subdirectories for each class
    output_csv : str
        Output CSV file path

    Returns
    -------
    None
        Saves CSV with columns: mean_h, mean_s, mean_v, label
    """

    data = []
    dataset_path = Path(dataset_dir)

    if not dataset_path.exists():
        raise FileNotFoundError(f"Dataset directory not found: {dataset_dir}")

    # Process each class folder
    for class_folder in dataset_path.iterdir():
        if not class_folder.is_dir():
            continue

        label = class_folder.name
        print(f"\nProcessing class: {label}")

        image_count = 0
        for image_file in class_folder.iterdir():
            if image_file.suffix.lower() not in ['.jpg', '.jpeg', '.png', '.webp']:
                continue

            try:
                with open(image_file, 'rb') as f:
                    image_bytes = f.read()

                features, _ = process_image_bytes(image_bytes)
                mean_h, mean_s, mean_v = features

                data.append({
                    'mean_h': mean_h,
                    'mean_s': mean_s,
                    'mean_v': mean_v,
                    'label': label
                })

                image_count += 1
                print(f"  ✓ {image_file.name}: H={mean_h:.2f}, S={mean_s:.2f}, V={mean_v:.2f}")

            except Exception as e:
                print(f"  ✗ {image_file.name}: {e}")

        print(f"  Processed {image_count} images from {label}")

    # Create DataFrame and save
    df = pd.DataFrame(data)
    df.to_csv(output_csv, index=False)

    print(f"\n✓ Dataset saved to {output_csv}")
    print(f"  Total samples: {len(df)}")
    print(f"  Classes: {df['label'].unique()}")
    print(f"  Class distribution:\n{df['label'].value_counts()}")


if __name__ == '__main__':
    import sys

    dataset_dir = sys.argv[1] if len(sys.argv) > 1 else 'dataset'
    output_csv = sys.argv[2] if len(sys.argv) > 2 else 'dataset.csv'

    generate_dataset_csv(dataset_dir, output_csv)
