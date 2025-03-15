import React, { useState } from "react";
import { Box, Stack, TabNav, Button } from "@primer/react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DroppableBox from "./DroppableBox";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SectionDialogBox from "./SectionDialogBox";
import { Section } from "../types/section";
import { IssueReopenedIcon } from "@primer/octicons-react";

const DocumentationConfiguration: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  const handleSelect = (section: Section, index: number) => {
    setSections((prevSections) => {
      const existingIndex = prevSections.findIndex((s) => s.id === section.id);
      const updatedSections = [...prevSections];

      if (existingIndex !== -1) {
        updatedSections.splice(existingIndex, 1);
      }

      if (index !== -1) {
        updatedSections[index] = section;
        return updatedSections;
      }

      return [...prevSections, section];
    });
  };

  const handleRemove = (name: string) => {
    setSections((prevSections) => prevSections.filter((s) => s.name !== name));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((prevSections) => {
        const activeIndex = prevSections.findIndex((s) => s.name === active.id);
        const overIndex = prevSections.findIndex((s) => s.name === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          return arrayMove(prevSections, activeIndex, overIndex);
        }
        return prevSections;
      });
    }
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
      <TabNav aria-label="Main">
        <TabNav.Link selected>Documentation Configuration</TabNav.Link>
      </TabNav>
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
              >
                Reset Sections
              </Button>
            </Box>
          </Stack>
        </Box>

        {/* <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <Stack sx={{ mt: 4, gap: 2 }}>
              {sections.map((section) => (
                <SortableItem
                  key={section.name}
                  id={section.id}
                  name={section}
                  onRemove={handleRemove}
                />
              ))}
            </Stack>
          </SortableContext>
        </DndContext> */}
      </Box>
    </Box>
  );
};

export default DocumentationConfiguration;
