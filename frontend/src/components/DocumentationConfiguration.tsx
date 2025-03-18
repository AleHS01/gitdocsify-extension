import React from "react";
import { Box, Stack, Button } from "@primer/react";
import DroppableBox from "./DroppableBox";

import SectionDialogBox from "./SectionDialogBox";
import { Section } from "../types/section";
import { IssueReopenedIcon } from "@primer/octicons-react";

type DocConfigProps = {
  sections: Section[];
  setSections: (prev) => void;
};

const DocumentationConfiguration: React.FC<DocConfigProps> = ({
  sections,
  setSections,
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
      <Box sx={{ pt: 4, px: 2 }}>
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
            {Array.from({ length: 4 }).map((_, i) => (
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
            {Array.from({ length: 4 }).map((_, i) => (
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
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentationConfiguration;
