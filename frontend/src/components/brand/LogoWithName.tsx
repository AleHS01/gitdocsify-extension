import { BookIcon } from "@primer/octicons-react";
import { Stack, Heading } from "@primer/react";
import React from "react";

type LogoWithNameProps = {
  iconSize: number;
  textSize: number;
};

const LogoWithName: React.FC<LogoWithNameProps> = ({ iconSize, textSize }) => {
  return (
    <Stack direction="horizontal" align="center" gap="condensed">
      <BookIcon size={iconSize} />
      <Heading
        sx={{
          fontSize: textSize,
        }}
      >
        GitDocsify
      </Heading>
    </Stack>
  );
};

export default LogoWithName;
