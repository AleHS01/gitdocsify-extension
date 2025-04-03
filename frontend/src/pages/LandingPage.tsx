import { Box } from "@primer/react";
import React from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: "red",
      }}
    >
      <AnimatedBackground />
    </Box>
  );
};

export default LandingPage;
