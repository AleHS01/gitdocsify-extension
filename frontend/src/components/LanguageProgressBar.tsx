import React from "react";
import { Box, CircleBadge, ProgressBar, Stack, Text } from "@primer/react";
import { languageColors } from "../utils/languageColors";

type LanguageProgressBarProp = {
  languages: string[];
  totalSize: number;
};

const LanguageProgressBar: React.FC<LanguageProgressBarProp> = ({
  languages,
  totalSize,
}) => {
  return (
    <Box>
      <ProgressBar animated>
        {languages &&
          Object.keys(languages).map((language: string) => {
            const size = languages[language];
            const percentage = (size / totalSize) * 100;

            return (
              <ProgressBar.Item
                key={language}
                progress={percentage}
                aria-valuenow={percentage}
                aria-valuetext={language}
                sx={{
                  bg: languageColors[language],
                }}
              />
            );
          })}
      </ProgressBar>
      <Stack
        direction="horizontal"
        gap="condensed"
        sx={{
          my: 3,
        }}
        wrap="wrap"
      >
        {languages &&
          Object.keys(languages).map((language) => {
            const size = languages[language];
            const percentage = (size / totalSize) * 100;

            return (
              <Stack
                align="center"
                direction="horizontal"
                gap="none"
                key={language}
              >
                <CircleBadge
                  size={10}
                  sx={{
                    backgroundColor: languageColors[language],
                  }}
                />
                <Text sx={{ fontSize: 1, ml: 1 }}>{language}</Text>
                <Text
                  sx={{
                    fontSize: "12px",
                    ml: 1,
                    color: "neutral.emphasis",
                  }}
                >{`${percentage.toFixed(1)}%`}</Text>
              </Stack>
            );
          })}
      </Stack>
    </Box>
  );
};

export default LanguageProgressBar;
