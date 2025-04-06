import React from "react";
import {
  Box,
  Stack,
  Button,
  FormControl,
  Textarea,
  ToggleSwitch,
  Text,
} from "@primer/react";
import DroppableBox from "./DroppableBox";

import SectionDialogBox from "./SectionDialogBox";
import { Section } from "../types/section";
import { CommandPaletteIcon, IssueReopenedIcon } from "@primer/octicons-react";
import { AdditionalData } from "../types/additional_data";
import { TabName } from "./repo_layout/MainContent";

type DocConfigProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  setTabName: React.Dispatch<React.SetStateAction<TabName>>;
  setAdditionalData: React.Dispatch<React.SetStateAction<AdditionalData>>;
  additionalData: AdditionalData;
};

const DocumentationConfiguration: React.FC<DocConfigProps> = ({
  sections,
  setSections,
  setTabName,
  setAdditionalData,
  additionalData,
}) => {
  const handleSelect = (section: Section, index: number) => {
    setSections((prevSections) => {
      const existingIndex = prevSections.findIndex((s) => s.id === section.id);
      const updatedSections = [...prevSections];

      if (existingIndex !== -1) {
        updatedSections.splice(existingIndex, 1);
      }

      if (index !== -1) {
        updatedSections[index] = section;
      } else {
        updatedSections.push(section);
      }

      return updatedSections;
    });
  };

  const handleAddCustomSection = (newSection: Section) => {
    if (!sections.some((section) => section.id === newSection.id)) {
      setSections([...sections, newSection]);
    }
  };

  return (
    <Box
      sx={{
        pb: 2,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "border.default",
      }}
    >
      <Box
        sx={{
          px: 2,
        }}
      >
        <Text as="h3">Documentation Configuration</Text>
        <Text
          sx={{
            color: "fg.muted",
            fontSize: 1,
          }}
        >
          Select up to 10 sections and customize your README with optional
          features like emojis. The system might suggest extra sections that
          could be useful for your project. Add extra details in 'Additional
          Information' to tailor it to your project!
        </Text>
      </Box>

      <Box sx={{ p: 2 }}>
        <Stack
          direction="horizontal"
          gap="normal"
          sx={{ width: "100%", marginTop: 2 }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <DroppableBox
                key={`left-${i}`}
                index={i}
                section={sections[i]}
                selectedSections={sections}
                handleSelect={handleSelect}
              />
            ))}
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <DroppableBox
                key={`right-${i}`}
                index={i + 1}
                section={sections[i + 4]}
                selectedSections={sections}
                handleSelect={handleSelect}
              />
            ))}
          </Box>
        </Stack>

        <Box
          sx={{
            my: 2,
            py: 2,
            borderTopWidth: 1,
            borderTopStyle: "dashed",
            borderTopColor: "border.default",
          }}
        >
          <FormControl sx={{ width: "100%" }}>
            <FormControl.Label>
              Additional Information (Optional)
            </FormControl.Label>
            <Textarea
              sx={{ width: "100%" }}
              resize="none"
              value={additionalData.additional_info}
              placeholder="Provide any extra details, comments, or specific instructions for the generator to consider when generating the documentation."
              onChange={(e) =>
                setAdditionalData((prev) => ({
                  ...prev,
                  additional_info: e.target.value,
                }))
              }
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            my: 2,
            py: 2,
            borderTopWidth: 1,
            borderTopStyle: "dashed",
            borderTopColor: "border.default",
          }}
        >
          <Text as="h5">Extras Features (Optional)</Text>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 4,
            }}
          >
            <Stack direction="horizontal" align="center">
              <div id="size-toggle-label-small">Only Selected Sections</div>
              <ToggleSwitch
                size="small"
                aria-labelledby="size-toggle-label-small"
                onChange={(state) =>
                  setAdditionalData((prev) => ({
                    ...prev,
                    only_selected_sections: state,
                  }))
                }
              />
            </Stack>
            <Stack direction="horizontal" align="center">
              <div id="size-toggle-label-small">Emojis</div>
              <ToggleSwitch
                size="small"
                aria-labelledby="size-toggle-label-small"
                onChange={(state) =>
                  setAdditionalData((prev) => ({
                    ...prev,
                    emojis_enabled: state,
                  }))
                }
              />
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            my: 2,
            py: 2,
            borderTopWidth: 1,
            borderTopStyle: "dashed",
            borderTopColor: "border.default",
          }}
        >
          <Stack direction="horizontal" gap="normal" sx={{ width: "100%" }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <SectionDialogBox onDialogSubmit={handleAddCustomSection} />
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                variant="danger"
                leadingVisual={IssueReopenedIcon}
                onClick={() => setSections([])}
                disabled={sections.length === 0}
              >
                Reset Sections
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                variant="primary"
                onClick={() => setTabName("editor")}
                leadingVisual={CommandPaletteIcon}
                disabled={sections.length === 0}
              >
                Documentation Editor
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentationConfiguration;
