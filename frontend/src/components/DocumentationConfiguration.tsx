import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Repository } from "../types/repository";
import { Box, Stack, TabNav, Button } from "@primer/react";
import { UnderlinePanels } from "@primer/react/drafts";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DroppableBox from "./DroppableBox";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SectionDialogBox from "./SectionDialogBox";

// type DocumentationConfigurationProp = {
//   repo: Repository | undefined;
// };
type Section = {
  name: string;
  icon: ReactNode;
  id: string;
  description?: string;
};

const DocumentationConfiguration: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    console.log("Sections updated:", sections);
  }, [sections]);

  const handleSelect = (section: Section) => {
    console.log("Adding:", section);
    setSections((prevSections) => {
      if (
        prevSections.length < 8 &&
        !prevSections.some((s) => s.name === section.name)
      ) {
        return [...prevSections, section];
      }
      return prevSections;
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
        pb: 4,
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
                index={i + 4}
                section={sections[i + 4]}
                handleSelect={handleSelect}
                handleAddCustomSection={handleAddCustomSection}
              />
            ))}
          </Box>
        </Stack>
        <SectionDialogBox onDialogSubmit={handleAddCustomSection} />

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
