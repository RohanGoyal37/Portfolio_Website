import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./components/ParticleBackground/ThemeContext";
import "./LoadingAnimation.css";

const LoadingAnimation = ({ children, duration = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [duration]);

  const ballColor = isDarkTheme ? "#d136ca" : "#d136ca";

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <div
            className="loader-ball"
            style={{ backgroundColor: ballColor }}
          ></div>
        </div>
      )}

      {/* ✅ Render children only when loader is finished */}
      {!isLoading && children}
    </>
  );
};

export default LoadingAnimation;
