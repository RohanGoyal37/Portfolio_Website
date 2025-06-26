import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutMe.css";
import profileDark from "../../assets/profile.jpg";
import profileLight from "../../assets/profile1.jpg";
import { ThemeContext } from "../ParticleBackground/ThemeContext";

const AboutMe = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const aboutMeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Use the navigate function

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const container = aboutMeRef.current;
      const top = container.getBoundingClientRect().top;
      const bottom = container.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (top < windowHeight && bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Duration: 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle content animations
  useEffect(() => {
    setTimeout(() => {
      if (isVisible && !loading) {
        aboutMeRef.current
          .querySelectorAll(
            ".about-me-title, .about-me-card, .about-me-introduction, .about-me-quote"
          )
          .forEach((element, index) => {
            if (element.classList.contains("about-me-title")) {
              element.style.animation = `slideDown 1s ease forwards`;
            } else if (element.classList.contains("about-me-card")) {
              element.style.animation = `slideUp 1s ease forwards`;
              element.style.animationDelay = `${index * 0.3}s`;
            } else if (
              element.classList.contains("about-me-introduction") ||
              element.classList.contains("about-me-quote")
            ) {
              element.style.animation = `fadeIn 1.3s ease forwards`;
              element.style.animationDelay = `${index * 0.3}s`;
            }
          });
      }
    }, 300);
  }, [isVisible, loading]);

  // Function to handle resume button click
  const handleResumeClick = () => {
    navigate("/resume"); // Navigate to the resume page
  };

  return (
    <section
      className={`about-me-section ${isVisible ? "visible" : ""}`}
      aria-labelledby="about-me-title"
      ref={aboutMeRef}
    >
      {loading ? (
        <div className="loading-container">
          <div className="bouncing-ball"></div>
        </div>
      ) : (
        <div className="about-me-container">
          <h2 id="about-me-title" className="about-me-title">
            👋 About Me
          </h2>
          <div className="about-me-card">
            <div className="about-me-profile-picture">
              <img
                src={isDarkTheme ? profileDark : profileLight}
                alt="Rohan Goyal"
                className="about-me-profile-image"
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
            <div className="about-me-content">
              <p className="about-me-introduction">
                Hey there! I'm Rohan Goyal, a dedicated Python Developer and Data Analyst with over 
                3 years of experience. 🐍📊 I thrive on exploring complex datasets, uncovering patterns,
                and translating data into actionable insights that drive meaningful outcomes. 🚀
              </p>
              <p className="about-me-introduction">
                When I’m not deep in data or writing code, you can find me behind the
                camera, capturing life's moments through my lens. 📸 I'm also a
                big fan of hitting the open road on my bike, feeling the wind in
                my hair, and exploring new places. 🚴‍♂️
              </p>
              <p className="about-me-introduction">
                I believe in blending creativity with technical expertise to
                solve complex problems and create lasting memories. 🎨💡 My
                mission is to keep growing, learning, and making a meaningful
                impact, both in my professional and personal life.
              </p>
              <blockquote className="about-me-quote">
                "The journey of a thousand miles begins with one step." - Lao
                Tzu
              </blockquote>
              <div className="about-me-cta-button">
                <button
                  onClick={handleResumeClick}
                  className="about-me-download-resume"
                  aria-label="View Rohan Goyal's Resume"
                >
                  View Resume 📝
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutMe;