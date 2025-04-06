import React from "react";
import { Box, CircleBadge, ProgressBar, Stack, Text } from "@primer/react";
import { getLanguageColor } from "../utils/languageColors";

type LanguageProgressBarProp = {
  languages: { [key: string]: number };
  totalSize: number;
};

const LanguageProgressBar: React.FC<LanguageProgressBarProp> = ({
  languages,
  totalSize,
}) => {
  const threshold = 1.9;

  const getCombinedLanguages = () => {
    const combined = { ...languages };
    let otherPercentage = 0;

    Object.keys(languages).forEach((language) => {
      const percentage = (languages[language] / totalSize) * 100;
      if (percentage < threshold) {
        otherPercentage += languages[language];
        delete combined[language];
      }
    });

    if (otherPercentage > 0) {
      combined["Other"] = otherPercentage;
    }

    return combined;
  };

  const processedLanguages = getCombinedLanguages();

  return (
    <Box>
      <ProgressBar animated aria-valuetext="language">
        {languages &&
          Object.keys(processedLanguages).map((language: string, index) => {
            const size = processedLanguages[language];
            const percentage = (size / totalSize) * 100;

            return (
              <ProgressBar.Item
                key={language}
                progress={percentage}
                aria-valuenow={percentage}
                aria-valuetext={language}
                sx={{
                  bg:
                    language === "Other" ? "white" : getLanguageColor(language),
                  marginRight:
                    index < Object.keys(processedLanguages).length - 1
                      ? "3px"
                      : "0",
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
          Object.keys(processedLanguages).map((language) => {
            const size = processedLanguages[language];
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
                    backgroundColor:
                      language === "Other"
                        ? "white"
                        : getLanguageColor(language),
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
