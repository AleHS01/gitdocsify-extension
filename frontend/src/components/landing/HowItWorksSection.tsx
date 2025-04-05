import { motion, useAnimation, useInView } from "framer-motion";
import { Box, Button, Heading } from "@primer/react";
import React, { useEffect, useRef, useState } from "react";
import SelectRepositoryStep from "./SelectRepositoryStep";
import ScanCodeStep from "./ScanCodeStep";
import GenerationStep from "./GenerationStep";

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-40% 0px -40% 0px",
    once: true,
  });
  const controls = useAnimation();

  const [animationStates, setAnimationStates] = useState([false, false, false]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const stepComponents = [
    <SelectRepositoryStep start={animationStates[0]} />,
    <ScanCodeStep start={animationStates[1]} />,
    <GenerationStep start={animationStates[2]} />,
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Heading sx={{ fontSize: 65, textAlign: "center" }}>How It Works</Heading>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          px: 10,
          mx: "auto",
          textAlign: "center",
        }}
      >
        {stepComponents.map((Component, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 2 },
              },
            }}
            initial="hidden"
            animate={controls}
            onAnimationComplete={() =>
              setAnimationStates((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              })
            }
          >
            {Component}
          </motion.div>
        ))}
      </Box>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 8 },
          },
        }}
        initial="hidden"
        animate={controls}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="primary"
            sx={{ borderRadius: 2, px: 10, fontSize: 2 }}
          >
            Generate README
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HowItWorksSection;
