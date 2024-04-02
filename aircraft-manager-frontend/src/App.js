import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import MapPage from './pages/MapPage';
import HomePage from './pages/HomePage'; 
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

function App() {
  return (
    <Router>
      <Box className="App"> 
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;

