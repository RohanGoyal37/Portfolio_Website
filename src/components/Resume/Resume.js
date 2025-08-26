import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi"; // Import Download Icon
import "./Resume.css"; // Ensure this has the loading styles

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isPDFLoading, setIsPDFLoading] = useState(true); // Loading state

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

  useEffect(() => {
    // Remove the PDF loaded callback from onLoadSuccess
    // Instead, use a timeout to hide the loader after 3.5 seconds
    const timer = setTimeout(() => {
      setIsPDFLoading(false);
    }, 3500);

    // Return a cleanup function to clear the timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeInOut" };


  return (
    <div className="resume-container">
      <h1 className="resume-title">My Resume</h1>
      {isPDFLoading ? (
        <div className="loading-container">
          <div className="bouncing-ball"></div>
        </div>
      ) : (
        <>
          <div className="pdf-container">
            <Document
              file={`${process.env.PUBLIC_URL}/Rohan_Goyal2.pdf`}
              loading={
                <div className="loading-container">
                  <div className="bouncing-ball"></div>
                </div>
              }
              onLoadSuccess={({ numPages }) => {
                // Still set numPages for pagination
                setNumPages(numPages);
              }}
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
        </>
      )}
    </div>
  );
};

export default Resume;
