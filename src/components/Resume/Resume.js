import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import LoadingAnimation from "../../LoadingAnimation"; // Import global loader
import "./Resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  // Flip animation variants
  const flipVariants = {
    enter: (direction) => ({
      opacity: 0,
      rotateY: direction === 1 ? 90 : -90,
    }),
    center: {
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      opacity: 0,
      rotateY: direction === 1 ? -90 : 90,
    }),
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeInOut" };

  return (
    <LoadingAnimation duration={3500}>
      <div className="resume-container">
        <h1 className="resume-title">My Resume</h1>

        <div className="pdf-container">
          <Document
            file={`${process.env.PUBLIC_URL}/Rohan_Goyal2.pdf`}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="pdf-document"
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="flip-page"
              >
                <Page pageNumber={currentPage} scale={1.8} />
              </motion.div>
            </AnimatePresence>
          </Document>

          {/* Download Button */}
          <a
            href={`${process.env.PUBLIC_URL}/Rohan_Goyal.pdf`}
            download="Rohan_Goyal_Resume.pdf"
            className="download-btn"
          >
            <FiDownload />
          </a>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => {
              setDirection(-1);
              setCurrentPage((prev) => prev - 1);
            }}
            disabled={currentPage <= 1}
          >
            Previous Page
          </button>

          <span>
            Page {currentPage} of {numPages}
          </span>

          <button
            onClick={() => {
              setDirection(1);
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage >= numPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </LoadingAnimation>
  );
};

export default Resume;
