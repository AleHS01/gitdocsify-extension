import { motion } from "framer-motion";
import React from "react";

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

const CursorBlinker: React.FC = () => {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      style={{
        display: "inline-block",
        width: "2px",
        height: "1em",
        marginLeft: "0.25rem",
        backgroundColor: "currentColor",
        verticalAlign: "middle",
      }}
    />
  );
};

export default CursorBlinker;
