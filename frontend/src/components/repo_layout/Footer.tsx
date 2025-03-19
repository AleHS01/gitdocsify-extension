import { DownloadIcon, RepoPushIcon } from "@primer/octicons-react";
import { Box, Button, PageLayout } from "@primer/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <PageLayout.Footer>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
        }}
      >
        <Button
          variant="primary"
          leadingVisual={DownloadIcon}
          sx={{
            flex: 1,
          }}
        >
          Download README
        </Button>
        <Button
          variant="primary"
          leadingVisual={RepoPushIcon}
          sx={{
            flex: 1,
          }}
        >
          Push to GitHub
        </Button>
      </Box>
    </PageLayout.Footer>
  );
};

export default Footer;
