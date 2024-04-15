import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import EditAirportsPage from "./pages/EditAirportsPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
// Authentication Pages
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Box className="App">
        <Header />
        {/* Routes Setup */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/editairports" element={<EditAirportsPage />} />
          {/* Static Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;