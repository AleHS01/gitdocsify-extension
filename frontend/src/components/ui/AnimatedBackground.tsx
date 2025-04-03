import "../../assets/CSS/animated_background.css";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="animated-background">
      {/* Gradient Orbs */}
      <motion.div
        className="gradient-orb gradient-blue"
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5,
        }}
      />
      <motion.div
        className="gradient-orb gradient-purple"
        animate={{
          x: mousePosition.x - 70,
          y: mousePosition.y - 70,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1,
        }}
      />

      {/* Grid Pattern */}
      <div className="grid-pattern" />

      {/* Noise Texture */}
      {/* <div className="noise-texture" /> */}
    </div>
  );
};

export default AnimatedBackground;
