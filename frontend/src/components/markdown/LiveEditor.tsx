import { BookIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { Box, Textarea, Button } from "@primer/react";
import { Blankslate, InlineMessage } from "@primer/react/drafts";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import DownloadButton from "./DownloadButton";
import PushButton from "./PushButton";

type LiveEditorProps = {
  isSections: boolean;
  markdown: string;
  handleMarkdownChange: (md: string) => void;
  isGenerating: boolean;
  handleGenerateMarkdown: () => void;
};

const LiveEditor: React.FC<LiveEditorProps> = ({
  markdown,
  handleMarkdownChange,
  isGenerating,
  handleGenerateMarkdown,
  isSections,
}) => {
  const [lineNumbers, setLineNumbers] = useState<string[]>(["1"]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        const lines = markdown.split("\n").map((_, i) => (i + 1).toString());
        setLineNumbers(lines);
      }
    };

    // Function to auto-resize the textarea, so it grow as markdown / string grows
    adjustHeight();

    window.addEventListener("resize", adjustHeight);

    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, [markdown]);

  const handleTabKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.currentTarget;
      const updatedValue =
        markdown.substring(0, selectionStart) +
        "    " + // 4-Space Tab
        markdown.substring(selectionEnd);
      handleMarkdownChange(updatedValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);
    }
  };

  return (
    <Box
      flex={1}
      sx={{
        minHeight: "100px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {markdown ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box mb={2}>
            <InlineMessage variant="warning">
              Please review the generated documentation for any missing details.
              The system may not have full context, so ensure accuracy.
            </InlineMessage>
          </Box>
          <Box
            display="flex"
            sx={{
              border: "1px solid",
              borderColor: "border.default",
              borderRadius: 2,
              overflow: "hidden",
              fontFamily: "monospace",
              fontSize: 1,
              minHeight: "300px",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                px: 1,
                py: 2,
                backgroundColor: "canvas.subtle",
                color: "fg.muted",
              }}
            >
              {lineNumbers.map((num) => (
                <Box key={num} style={{ fontSize: "14px" }}>
                  {num}
                </Box>
              ))}
            </Box>
            <Textarea
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                lineHeight: "1.5",
                padding: "6px",
              }}
              ref={textareaRef}
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              onKeyDown={handleTabKey}
              disabled={isGenerating}
              resize="none"
              sx={{
                width: "100%",
                p: 0,
                border: "none",
                outline: "none",
                lineHeight: 2,
                fontFamily: "monospace",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <DownloadButton markdown={markdown} />
            <Button
              leadingVisual={IssueReopenedIcon}
              variant="primary"
              onClick={handleGenerateMarkdown}
              loading={isGenerating}
              disabled={!markdown && !isSections}
              sx={{ width: "100%" }}
            >
              Regenerate
            </Button>

            <PushButton markdown={markdown} />
          </Box>
        </Box>
      ) : (
        <Blankslate spacious>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>
            Generate Your Project Documentation
          </Blankslate.Heading>
          <Blankslate.Description>
            <Box sx={{ textAlign: "center" }}>
              Automatically generate a **README** for your repository based on
              its files. This tool analyzes your project and creates
              well-structured documentation, helping others understand and
              contribute more easily.
            </Box>
          </Blankslate.Description>
          <Button
            loading={isGenerating}
            variant="primary"
            onClick={handleGenerateMarkdown}
            // disabled={isSectionsSelected}
          >
            Generate README
          </Button>
        </Blankslate>
      )}
    </Box>
  );
};

export default LiveEditor;
