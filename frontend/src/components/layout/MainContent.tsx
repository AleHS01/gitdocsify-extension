import { Box, UnderlineNav } from "@primer/react";
import React, { useState } from "react";
import { Section } from "../../types/section";
import {
  SlidersIcon,
  CodeIcon,
  EyeIcon,
  FileDirectoryOpenFillIcon,
} from "@primer/octicons-react";
import DocumentationConfiguration from "../DocumentationConfiguration";
import LiveEditor from "../markdown/LiveEditor";
import LivePreviewer from "../markdown/LivePreviewer";
import FileStructureTab from "../FileStructureTab";

type TabName = "config" | "editor" | "preview" | "file";

const MainContent: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [tabName, setTabName] = useState<TabName>("config");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateDoc = () => {
    if (sections.length > 0) {
      setIsGenerating(true);
      setTimeout(() => {
        setMarkdown(
          `# AI Generated Content\n\nThis is an example **Markdown** text.\n\n- Item 1\n- Item 2\n\n> Blockquote Example`
        );
        setIsGenerating(false);
      }, 2000);
    } else {
      alert("Add Sections");
    }
  };

  return (
    <Box>
      <UnderlineNav aria-label="editor-previewer" sx={{ mb: 2 }}>
        <UnderlineNav.Item
          icon={SlidersIcon}
          aria-current={tabName === "config" ? "page" : undefined}
          onClick={() => setTabName("config")}
        >
          Doc. Config
        </UnderlineNav.Item>
        <UnderlineNav.Item
          icon={FileDirectoryOpenFillIcon}
          aria-current={tabName === "file" ? "page" : undefined}
          onClick={() => setTabName("file")}
        >
          File Structure
        </UnderlineNav.Item>
        <UnderlineNav.Item
          icon={CodeIcon}
          aria-current={tabName === "editor" ? "page" : undefined}
          onClick={() => setTabName("editor")}
        >
          Doc. Editor
        </UnderlineNav.Item>
        <UnderlineNav.Item
          icon={EyeIcon}
          aria-current={tabName === "preview" ? "page" : undefined}
          onClick={() => setTabName("preview")}
        >
          Preview
        </UnderlineNav.Item>
      </UnderlineNav>
      <Box sx={{ p: 2 }}>
        {tabName === "config" && (
          <DocumentationConfiguration
            sections={sections}
            setSections={setSections}
          />
        )}
        {tabName === "file" && <FileStructureTab />}
        {tabName === "editor" && (
          <LiveEditor
            markdown={markdown}
            isGenerating={isGenerating}
            handleMarkdownChange={setMarkdown}
            handleGenerateMarkdown={handleGenerateDoc}
            isSections={sections.length > 0}
          />
        )}
        {tabName === "preview" && (
          <LivePreviewer markdown={markdown} changeTab={setTabName} />
        )}
      </Box>
    </Box>
  );
};

export default MainContent;
