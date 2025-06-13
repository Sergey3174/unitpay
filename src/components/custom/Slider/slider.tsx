import React, { useEffect, useState } from 'react';
import styles from './Slider.module.css';

const Slider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) return <div>No slides available</div>;

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.prevButton} onClick={prevSlide}>
        {/* ‹ */}
        <img src="/media/blog/arrow-left.svg" alt="" />
      </button>

      <div className={styles.sliderContent}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={styles.slideImage}
            />
            <div className={styles.slideInfo}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={nextSlide}>
        {/* › */}
        <img src="/media/blog/arrow-right.svg" alt="" />
      </button>

      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
