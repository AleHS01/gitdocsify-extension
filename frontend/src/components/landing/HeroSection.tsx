import { Box, Button, Heading, TextInput } from "@primer/react";
import React from "react";
import LogoWithName from "../brand/LogoWithName";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <LogoWithName iconSize={60} textSize={42} />
      <Heading sx={{ fontSize: 65, textAlign: "center", maxWidth: "1100px" }}>
        Transform Your GitHub README into Pro Documentation - Instantly.
      </Heading>
      <Box
        display="flex"
        sx={{
          width: "50%",
          borderRadius: "6px",
          overflow: "hidden",
          maxWidth: "800px",
        }}
      >
        <TextInput
          placeholder="Enter GitHub repository URL"
          sx={{
            flex: 1,
            borderRadius: "6px 0 0 6px",
            border: "1px solid",
            borderColor: "border.default",
            p: "10px",
            backgroundColor: "neutral.subtle",
            fontSize: 2,
          }}
        />
        <Box sx={{ width: "1px", backgroundColor: "border.default" }} />{" "}
        <Button
          variant="primary"
          sx={{ height: "100%", borderRadius: "0 6px 6px 0", fontSize: 2 }}
        >
          Generate README
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
