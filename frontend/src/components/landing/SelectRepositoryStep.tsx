import { Box } from "@primer/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import StepCard from "./StepCard";

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

type SelectRepositoryStepProps = {
  start: boolean;
};

const SelectRepositoryStep: React.FC<SelectRepositoryStepProps> = ({
  start,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const steps = [0, 1, 2, 3];
    let index = 0;

    const interval = setInterval(() => {
      setFocusedIndex(steps[index]);
      index++;
      if (index >= steps.length) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [start]);

  return (
    <StepCard description="Select a GitHub Repository">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 80px)",
          gridTemplateRows: "repeat(2, 80px)",
          gap: 20,
        }}
      >
        {[0, 1, 2, 3].map((i) => {
          const isFocused = focusedIndex === i;
          const isSelected = focusedIndex === 3 && i === 3;

          return (
            <motion.div
              key={i}
              animate={isSelected ? "animate" : undefined}
              variants={pulseAnimation}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                border: "2px solid",
                borderColor: isFocused ? "#2da44e" : "#d0d7de",
                backgroundColor: isFocused ? "#2da44e33" : "#f6f8fa",
              }}
            />
          );
        })}
      </Box>
    </StepCard>
  );
};

export default SelectRepositoryStep;
