import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home/Home";
import About from "./components/Aboutme/AboutMe";
import Resume from "./components/Resume/Resume";
import Skills from "./components/Skills/Skills";
import Contact from "./components/contact/contact";
import AllCertifications from "./components/Certification/AllCertifications";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, ThemeContext } from "./components/ParticleBackground/ThemeContext";
import LoadingAnimation from "./LoadingAnimation";  // ✅ import loader
import "./App.css";

const AppContent = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { isDarkTheme } = useContext(ThemeContext);

  const themeVariants = {
    initial: { opacity: 0, scale: 0.98, filter: "brightness(1.2)" },
    animate: { opacity: 1, scale: 1, filter: "brightness(1)" },
    exit: { opacity: 0, scale: 1.02, filter: "brightness(1.3)" },
  };

  return (
    <LoadingAnimation duration={3000}>  {/* ✅ Wrap whole app */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkTheme ? "dark" : "light"}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={themeVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ minHeight: "100vh" }}
        >
          <div className="App">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="content-section">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/certifications" element={<AllCertifications />} />
                <Route path="/education" element={<Education />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/connect" element={<Contact />} />
              </Routes>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </LoadingAnimation>
  );
};

const App = () => (
  <ThemeProvider>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
