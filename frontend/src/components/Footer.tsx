import React from "react";
import { Box, Link, Text } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 3,
        fontSize: 1,
        color: "fg.muted",
        backgroundColor: "canvas.subtle",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <Link href="/" muted>
          Landing Page
        </Link>
        <Link href="/dashboard" muted>
          Dashboard
        </Link>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link
          href="https://github.com/AleHS01"
          target="_blank"
          muted
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <MarkGithubIcon size={16} /> AleHS' GitHub
        </Link>
        <Text>© {new Date().getFullYear()}</Text>
      </Box>
    </Box>
  );
};

export default Footer;
