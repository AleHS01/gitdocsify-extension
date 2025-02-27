import React from "react";
import { Heading, Box } from "@primer/react";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Heading>Loading...</Heading>
    </Box>
  );
};

export default LoadingScreen;
