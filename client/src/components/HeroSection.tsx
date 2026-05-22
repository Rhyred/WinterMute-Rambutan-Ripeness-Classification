/**
 * Hero section for Rambutan Ripeness Classification app
 * Team Wintermute
 */

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-rambutan-500 to-rambutan-700 text-white py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        🍈 Rambutan Ripeness Classifier
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-2">
        Classification of Rambutan Fruit Ripeness using HSV Color Feature Extraction and K-Nearest Neighbor (K-NN)
      </p>
      <p className="text-sm md:text-base opacity-75">
        Team Wintermute • University Final Project
      </p>
    </section>
  );
};
