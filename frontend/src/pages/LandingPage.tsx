import { Box } from "@primer/react";
import React from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import HeroSection from "../components/landing/HeroSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import ClosingSection from "../components/landing/ClosingSection";

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100wh",
        minHeight: "100vh",
        maxWidth: "1500px",
        mx: "auto",
      }}
      id="landing-page"
    >
      <HeroSection />
      <HowItWorksSection />
      <ClosingSection />
      <AnimatedBackground />
    </Box>
  );
};

export default LandingPage;
