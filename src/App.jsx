import { useEffect } from 'react';


import Resume from './pages/resume'
import Index from './pages/Index'
import Chatbot from './components/Chatbot';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';


function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      const homeLink = document.querySelector('.nav-link[href="#home"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }, []);
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/resume" element={<Resume />} />
        <Route path="/" element={<Index />} />
      </Routes>

    </Router>
    <Chatbot />
    </>
  );
}

export default App;