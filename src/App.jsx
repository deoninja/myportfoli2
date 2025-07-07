import React, { useState, useEffect } from 'react';
import Resume from './pages/Resume';
import Index from './pages/Index'
import Chatbot from './components/Chatbot';
import LoadingScreen from './components/LoadingScreen';
import PreloadAssets from './components/PreloadAssets';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  console.log('App render - isInitialized:', isInitialized, 'assetsLoaded:', assetsLoaded, 'isLoading:', isLoading);

  useEffect(() => {
    // Initialize app
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleAssetsLoaded = () => {
    console.log('Assets loaded callback triggered');
    setAssetsLoaded(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen until both initialization and assets are complete
  if (!isInitialized || !assetsLoaded || isLoading) {
    return (
      <>
        <PreloadAssets onAssetsLoaded={handleAssetsLoaded} />
        {isInitialized && assetsLoaded && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </>
    );
  }

  return (
    <>
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Router>
          <Routes>
            <Route path="/resume" element={<Resume />} />
            <Route path="/" element={<Index />} />
          </Routes>
        </Router>
        <Chatbot />
      </div>
    </>
  );
}

export default App;