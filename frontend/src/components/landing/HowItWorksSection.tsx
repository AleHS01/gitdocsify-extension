import { BookIcon, CodescanIcon, Icon, RepoIcon } from "@primer/octicons-react";
import { Box, Button, Heading, Text } from "@primer/react";
import React from "react";

type Step = {
  icon: Icon;
  description: string;
};

const steps: Step[] = [
  {
    icon: RepoIcon,
    description: "Select a GitHub Repository",
  },
  {
    icon: CodescanIcon,
    description: "AI Scans & Understand Your Code",
  },
  {
    icon: BookIcon,
    description: "Generates a Professional README",
  },
];

const cardStyles = {
  width: 350,
  height: 250,
  borderStyle: "solid",
  borderColor: "success.emphasis",
  backgroundColor: "success.subtle",
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const HowItWorksSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Heading sx={{ fontSize: 65, textAlign: "center" }}>How It Works</Heading>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          px: 10,
          mx: "auto",
        }}
      >
        {steps.map(({ icon: IconComponent, description }, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={cardStyles}>
              <Box sx={{ color: "success.emphasis" }}>
                {/* <IconComponent size={150} /> */}
                <Text fontSize={180}>{i + 1}</Text>
              </Box>
            </Box>
            <Text textAlign="center">{description}</Text>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary" sx={{ borderRadius: 2, px: 10, fontSize: 2 }}>
          Generate README
        </Button>
      </Box>
    </Box>
  );
};

export default HowItWorksSection;
