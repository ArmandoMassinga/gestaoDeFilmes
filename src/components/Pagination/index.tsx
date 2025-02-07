import { ReactComponent as Arrow } from "assets/img/arrow.svg";
import React, { useState, useEffect } from "react";
import "./style.css";
import filme1 from "assets/img/filme.jpg";
import filme2 from "assets/img/download.jpg";
import filme3 from "assets/img/filme3.jpg";

function Pagination() {
  const images = [filme1, filme2, filme3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pagination-container">
      <div className="pagination-banner">
        <img
          src={images[currentImage]}
          alt="Banner Rotativo"
          className="pagination-banner-image"
        />
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
        >
          <Arrow className="arrow-left" />
        </button>
        <p>{`${currentImage + 1} de ${images.length}`}</p>
        <button
          className="pagination-button"
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
        >
          <Arrow className="arrow-right" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;