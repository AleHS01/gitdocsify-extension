import React, { useState } from "react";
import LogoWithName from "../brand/LogoWithName";
import { Box, Button, Heading, TextInput } from "@primer/react";
import { InlineMessage } from "@primer/react/experimental";
import TextAnimation from "../animation/TextAnimation";
import DecryptedTextAnimation from "../animation/DecryptTextAnimation";

const HeroSection: React.FC = () => {
  const [repoURL, setRepoURL] = useState<string>("");

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
      <Heading
        sx={{
          fontSize: 65,
          textAlign: "center",
          maxWidth: "1100px",
          lineHeight: "1.2",
          height: "calc(1.2em * 2)",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        <TextAnimation
          baseText="Transform Your GitHub README into Pro Documentation - Instantly. "
          durationInSec={3}
        />
      </Heading>
      <Box
        display="flex"
        sx={{
          width: "50%",
          borderRadius: "6px",
          // overflow: "hidden",
          maxWidth: "800px",
          position: "relative",
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
          onChange={(e) => setRepoURL(e.target.value)}
        />
        <Box sx={{ width: "1px", backgroundColor: "border.default" }} />{" "}
        <Button
          variant="primary"
          sx={{ height: "100%", borderRadius: "0 6px 6px 0", fontSize: 2 }}
        >
          Generate README
        </Button>
        {repoURL && (
          <Box sx={{ position: "absolute", top: 7 }}>
            <InlineMessage variant="unavailable">
              <DecryptedTextAnimation text="You must be the owner of the repository" />
            </InlineMessage>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeroSection;
