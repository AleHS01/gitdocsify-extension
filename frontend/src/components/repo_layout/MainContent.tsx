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
import DownloadButton from "../markdown/DownloadButton";
import PushButton from "../markdown/PushButton";
import { useNotification } from "../../context/NotificationContext";
import { Repository } from "../../types/repository";
import axiosInstance from "../../utils/axios";
import { AdditionalData } from "../../types/additional_data";

export type TabName = "config" | "editor" | "preview" | "file";

type MainContentProps = {
  repo: Repository | undefined;
};
const MainContent: React.FC<MainContentProps> = ({ repo }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [tabName, setTabName] = useState<TabName>("config");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [additionalData, setAdditionalData] = useState<AdditionalData>({
    additional_info: "",
    emojis_enabled: false,
    only_selected_sections: false,
  });

  const { showNotification } = useNotification();

  const handleGenerateDoc = async () => {
    if (sections.length > 0) {
      setIsGenerating(true);
      try {
        showNotification(
          "Generating Documentation...",
          "Scanning your repository, extracting key files, and generating documentation. Please stay on this page to avoid progress loss.",
          "warning",
          10000
        );

        const {
          data: { markdown },
        } = await axiosInstance.post("api/documentation", {
          sections: sections.map((s) => {
            return {
              name: s.name,
              description: s.description || "",
              id: s.id,
            };
          }),
          project: {
            project_name: repo?.name,
            project_description: repo?.description || "",
            branch_name: repo?.default_branch,
          },
          additional_data: additionalData,
        });
        setMarkdown(markdown);
        setIsGenerating(false);
        showNotification(
          "README Documentation Generated",
          "You can now review and use it for your project.",
          "success"
        );
      } catch (error) {
        console.error(error);
        setIsGenerating(false);
        showNotification(
          "An error occurred",
          "There was an issue generating the documentation.",
          "critical"
        );
      }
    } else {
      showNotification(
        "No Sections Selected",
        "Please select at least one section before proceeding.",
        "critical"
      );
      setIsGenerating(false);
      setTabName("config");
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
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
            setTabName={setTabName}
            setAdditionalData={setAdditionalData}
            additionalData={additionalData}
          />
        )}
        {tabName === "file" && (
          <FileStructureTab branchName={repo?.default_branch} />
        )}
        {tabName === "editor" && (
          <LiveEditor
            markdown={markdown}
            isGenerating={isGenerating}
            handleMarkdownChange={setMarkdown}
            handleGenerateMarkdown={handleGenerateDoc}
            isSections={sections.length > 0}
            repo={repo}
          />
        )}
        {tabName === "preview" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
            }}
          >
            {markdown && (
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  right: 0,
                  gap: 2,
                }}
              >
                <DownloadButton markdown={markdown} />
                <PushButton markdown={markdown} repo={repo} />
              </Box>
            )}

            <LivePreviewer markdown={markdown} changeTab={setTabName} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainContent;
