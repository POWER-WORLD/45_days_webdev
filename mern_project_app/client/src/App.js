import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/WorkExp";
import Projects from "./pages/Projects";
import "./App.css"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="app-container">
        <button
          className={`mobile-menu-btn ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* overlay for mobile when sidebar is open */}
        <div
          className={`overlay ${isSidebarOpen ? "visible" : ""}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <main className={`content ${isSidebarOpen ? "shifted" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;