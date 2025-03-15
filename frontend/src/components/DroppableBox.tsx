import { Box, ActionMenu, ActionList, Text } from "@primer/react";
import React from "react";
import { Section } from "../types/section";

type DroppableBoxProps = {
  section: Section;
  handleSelect: (section: Section) => void;
  filteredSections: Section[];
};

const DroppableBox: React.FC<DroppableBoxProps> = ({
  section,
  handleSelect,
  filteredSections,
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
            <ActionList>
              {filteredSections.map((option) => (
                <ActionList.Item
                  key={option.name}
                  onSelect={() => handleSelect(option)}
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
            <ActionList>
              {filteredSections.map((option) => (
                <ActionList.Item
                  key={option.name}
                  onSelect={() => handleSelect(option)}
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
