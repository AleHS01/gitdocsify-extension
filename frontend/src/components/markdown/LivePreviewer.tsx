import { Box, Button } from "@primer/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "../../../node_modules/github-markdown-css/github-markdown.css";
import "../../../node_modules/prism-themes/themes/prism-vsc-dark-plus.css";
import React from "react";
import { EyeClosedIcon } from "@primer/octicons-react";
import { Blankslate, InlineMessage } from "@primer/react/drafts";
import rehypeRaw from "rehype-raw";
import "../../assets/CSS/preview.css";

type TabName = "config" | "editor" | "preview" | "file";

type LivePreviewerProps = {
  markdown: string;
  changeTab: (tab: TabName) => void;
};

const LivePreviewer: React.FC<LivePreviewerProps> = ({
  markdown,
  changeTab,
}) => {
  return (
    <Box
      flex={1}
      p={2}
      className="markdown-body2"
      sx={{
        overflowY: "auto",
        minHeight: "500px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "none important!",
      }}
    >
      {markdown ? (
        <Box>
          <Box mb={2}>
            <InlineMessage variant="warning">
              Please review the generated documentation for any missing details.
              The system may not have full context, so ensure accuracy.
            </InlineMessage>
          </Box>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypePrism]}
          >
            {markdown}
          </ReactMarkdown>
        </Box>
      ) : (
        <Blankslate spacious>
          <Blankslate.Visual>
            <EyeClosedIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>No Preview Available</Blankslate.Heading>
          <Blankslate.Description>
            Once content is generated, you’ll be able to preview the Markdown
            here.
          </Blankslate.Description>
          <Button variant="primary" onClick={() => changeTab("editor")}>
            Go to Editor
          </Button>
        </Blankslate>
      )}
    </Box>
  );
};

export default LivePreviewer;
