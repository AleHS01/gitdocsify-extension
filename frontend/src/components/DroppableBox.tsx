import { Box, ActionMenu, ActionList, Text } from "@primer/react";
import React from "react";
import { Section } from "../types/section";
import { sectionOptions } from "../utils/sectionOptions";

type DroppableBoxProps = {
  section: Section;
  selectedSections: Section[];
  handleSelect: (section: Section, index: number) => void;
  index: number;
};

const DroppableBox: React.FC<DroppableBoxProps> = ({
  section,
  selectedSections,
  handleSelect,
  index,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {section ? (
        <ActionMenu>
          <ActionMenu.Button
            sx={{
              py: 1,
              width: "100%",
              borderStyle: "dashed",
              borderColor: "success.emphasis",
              textAlign: "center",
              bg: "success.subtle",
            }}
          >
            <Text>{section.name}</Text>
          </ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList selectionVariant="single">
              {sectionOptions.map((option) => (
                <ActionList.Item
                  key={option.name}
                  selected={selectedSections.some((s) => s?.id === option.id)}
                  onSelect={() => handleSelect(option, index)}
                >
                  {option.name}
                  <ActionList.LeadingVisual>
                    <option.icon />
                  </ActionList.LeadingVisual>
                </ActionList.Item>
              ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      ) : (
        <ActionMenu>
          <ActionMenu.Button
            sx={{
              py: 1,
              width: "100%",
              borderStyle: "dashed",
              borderColor: "border.default",
              textAlign: "center",
            }}
          >
            <Text>Add Section</Text>
          </ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList selectionVariant="single">
              {sectionOptions.map((option) => (
                <ActionList.Item
                  key={option.name}
                  selected={selectedSections.some((s) => s?.id === option.id)}
                  onSelect={() => handleSelect(option, -1)}
                >
                  {option.name}
                  <ActionList.LeadingVisual>
                    <option.icon />
                  </ActionList.LeadingVisual>
                </ActionList.Item>
              ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      )}
    </Box>
  );
};

export default DroppableBox;
