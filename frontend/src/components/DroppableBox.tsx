import { Box, ActionMenu, ActionList, Text } from "@primer/react";
import React from "react";
import { sectionOptions } from "../utils/sectionOptions";
import { Icon } from "@primer/octicons-react";

type Section = {
  name: string;
  icon: Icon;
  description?: string;
  id: string;
};

type DroppableBoxProps = {
  section: Section;
  handleSelect: (section: Section) => void;
};

const DroppableBox: React.FC<DroppableBoxProps> = ({
  section,
  handleSelect,
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
              {sectionOptions.map((option) => (
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
              {sectionOptions.map((option) => (
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
