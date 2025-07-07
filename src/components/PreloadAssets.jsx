import { useEffect } from 'react';

const PreloadAssets = ({ onAssetsLoaded }) => {
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/src/assets/mypic.webp',
        '/src/assets/interactive.webp',
        '/src/assets/foodapp.webp',
        '/src/assets/snake.png',
        '/src/assets/chatapp.png',
        '/src/assets/roombooking.png'
      ];

      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Don't fail if image doesn't exist
          img.src = url;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log('Images preloaded successfully');
      } catch (error) {
        console.log('Some images failed to preload, continuing anyway');
      }

      // Preload fonts
      if ('fonts' in document) {
        try {
          await document.fonts.load('400 16px Inter');
          await document.fonts.load('600 16px Inter');
          await document.fonts.load('700 16px Inter');
          console.log('Fonts preloaded successfully');
        } catch (error) {
          console.log('Font preloading failed, continuing anyway');
        }
      }

      // Simulate minimum loading time for better UX
      setTimeout(() => {
        onAssetsLoaded();
      }, 1000);
    };

    preloadImages();
  }, [onAssetsLoaded]);

  return null; // This component doesn't render anything
};

export default PreloadAssets;