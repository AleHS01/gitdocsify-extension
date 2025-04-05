import { animate, stagger } from "animejs";
import React, { useEffect, useRef, useState } from "react";
import "../../assets/CSS/dot_grid.css";

const DotGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);

  const dotSize = 26;

  const calculateGridSize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const calculatedWidth = Math.floor(containerWidth / dotSize);
      const calculatedHeight = Math.floor(containerHeight / dotSize);

      setGridWidth(calculatedWidth);
      setGridHeight(calculatedHeight);
    }
  };

  useEffect(() => {
    calculateGridSize();

    const resizeObserver = new ResizeObserver(() => {
      calculateGridSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleDotClick = (e) => {
    animate(".dot-point", {
      scale: [
        { to: 1.35, ease: "outSine", duration: 250 },
        { to: 1, ease: "inOutQuad", duration: 500 },
      ],
      translateY: [
        { to: -15, ease: "outSine", duration: 250 },
        { to: 0, ease: "inOutQuad", duration: 500 },
      ],
      opacity: [
        { to: 1, ease: "outSine", duration: 250 },
        { to: 0.5, ease: "inOutQuad", duration: 500 },
      ],
      delay: stagger(100, {
        grid: [gridWidth, gridHeight],
        from: Number(e.target.dataset.index),
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      dots.push(
        <div className="dot-wrapper" data-index={index} key={`${i}-${j}`}>
          <div className="dot-point" data-index={index} />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={handleDotClick}
      className="dot-grid-container"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
        gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
      }}
    >
      {dots}
    </div>
  );
};

export default DotGrid;
