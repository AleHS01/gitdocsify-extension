import { Box } from "@primer/react";
import React from "react";
import LogoWithName from "../brand/LogoWithName";
import DotGrid from "../animation/DotGrid";

const ClosingSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "canvas.default",
        zIndex: 2,
        mt: 6,
      }}
    >
      <DotGrid />

      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          PointerEvent: "none",
        }}
      >
        <LogoWithName iconSize={64} textSize={40} />
      </Box>
    </Box>
  );
};

export default ClosingSection;
