import React, { useState } from "react";
import { Collaborators } from "../types/repository";
import { Stack, Box, Avatar, Popover, Heading } from "@primer/react";

type CollaboratorsStackProps = {
  collaborators: Collaborators[];
};

const CollaboratorsStack: React.FC<CollaboratorsStackProps> = ({
  collaborators,
}) => {
  const [hoveredCollab, setHoveredCollab] = useState<string | null>(null);

  return (
    <Stack direction="horizontal" wrap="wrap">
      {collaborators.map((c: Collaborators) => (
        <Box key={c.login}>
          <Avatar
            sx={{ cursor: "pointer" }}
            alt={c.login}
            src={c.avatar_url}
            size={{ narrow: 10, regular: 30, wide: 40 }}
            onMouseEnter={() => setHoveredCollab(c.login)}
            onMouseLeave={() => setHoveredCollab(null)}
            onClick={() => window.open(c.html_url, "_blank")}
          />
          <Popover open={hoveredCollab === c.login} caret="top-left">
            <Popover.Content
              sx={{ marginTop: 2, maxWidth: "fit-content", p: 2 }}
            >
              <Heading sx={{ fontSize: 2 }}>{c.login}</Heading>
            </Popover.Content>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default CollaboratorsStack;
