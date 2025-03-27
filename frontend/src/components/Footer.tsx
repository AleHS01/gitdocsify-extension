import React from "react";
import { Box, Link } from "@primer/react";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        py: 2,
        fontSize: 1,
        color: "fg.muted",
        backgroundColor: "canvas.subtle",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Link href="https://github.com/AleHS01" target="_blank" muted>
        Made By: Alejandro Hernandez | {new Date().getFullYear()}
      </Link>
    </Box>
  );
};

export default Footer;
