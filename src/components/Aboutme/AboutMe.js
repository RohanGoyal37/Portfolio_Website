import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import "./AboutMe.css";
import profileDark from "../../assets/profile.jpg";
import profileLight from "../../assets/profile1.jpg";
import { ThemeContext } from "../ParticleBackground/ThemeContext";

const AboutMe = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const profileImg = isDarkTheme ? profileDark : profileLight;
  const navigate = useNavigate();

  const handleResume = () => {
    navigate("/resume");
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 70 } },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70 } },
  };

  return (
    <section className="about-me-section">

      {/* About Me Content */}
        <motion.div
          className="about-me-card glassmorphism"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="about-me-split">
            {/* Left Side */}
            <motion.div className="about-me-profile-section" variants={containerVariants}>
              <motion.div className="about-me-profile-outer" variants={leftItemVariants}>
                <div className="about-me-profile-gradient">
                  <img
                    src={profileImg}
                    alt="Rohan Goyal portrait"
                    className="about-me-profile-img"
                    draggable="false"
                  />
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div className="about-me-stats-row" variants={containerVariants}>
                <motion.div className="about-me-stat" variants={leftItemVariants}>
                  <span className="about-me-stat-number">
                    <CountUp end={2} duration={4} />+
                  </span>
                  <span className="about-me-stat-label">Years Experience</span>
                </motion.div>
                <motion.div className="about-me-stat" variants={leftItemVariants}>
                  <span className="about-me-stat-number">
                    <CountUp end={10} duration={4} />+
                  </span>
                  <span className="about-me-stat-label">Projects</span>
                </motion.div>
                <motion.div className="about-me-stat" variants={leftItemVariants}>
                  <span className="about-me-stat-number">
                    <CountUp end={7} duration={4} />+
                  </span>
                  <span className="about-me-stat-label">Certifications</span>
                </motion.div>
              </motion.div>

              {/* Resume Button */}
              <motion.button
                className="about-me-resume-btn"
                variants={leftItemVariants}
                whileHover={{ scale: 1.07, boxShadow: "0 0 16px 4px #ff4ecd" }}
                onClick={handleResume}
                aria-label="View Resume"
              >
                View Resume <span className="about-me-resume-arrow">→</span>
              </motion.button>
            </motion.div>

            {/* Right Side */}
            <motion.div className="about-me-content" variants={containerVariants}>
              <motion.h2 className="about-me-title gradient-text" variants={rightItemVariants}>
                About Me
              </motion.h2>

              <motion.div className="about-me-section-block" variants={rightItemVariants}>
                <h3 className="about-me-emoji-header">👨‍💻 Who I Am</h3>
                <p>
                  Hey there! I’m Rohan Goyal, a dedicated Python Developer and Data Analyst with
                  over 2 years of experience. I thrive on exploring complex datasets, uncovering
                  patterns, and translating data into actionable insights that drive meaningful outcomes.
                </p>
              </motion.div>

              <motion.div className="about-me-section-block" variants={rightItemVariants}>
                <h3 className="about-me-emoji-header">📸 Beyond Tech</h3>
                <p>
                  When I’m not deep in data or writing code, you can find me behind the camera,
                  capturing life’s moments through my lens. I’m also a big fan of hitting the open
                  road on my bike, feeling the wind in my hair, and exploring new places.
                </p>
              </motion.div>

              <motion.div className="about-me-section-block" variants={rightItemVariants}>
                <h3 className="about-me-emoji-header">🚀 My Mission</h3>
                <p>
                  I believe in blending creativity with technical expertise to solve complex problems
                  and create lasting impact.
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                className="about-me-quote-card"
                variants={rightItemVariants}
                initial={{ rotate: -2 }}
                whileHover={{ rotate: 2 }}
              >
                <span className="about-me-quote-mark">“</span>
                <span className="about-me-quote-text">
                  The journey of a thousand miles begins with one step.
                </span>
                <span className="about-me-quote-mark closing-quote">”</span>
                <span className="about-me-quote-author">– Lao Tzu</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
    </section>
  );
};

export default AboutMe;
