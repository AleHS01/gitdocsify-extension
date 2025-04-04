import { Box } from "@primer/react";
import React from "react";
import LogoWithName from "../brand/LogoWithName";

const ClosingSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "20vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoWithName iconSize={50} textSize={32} />
    </Box>
  );
};

export default ClosingSection;
