import { Box, Text } from "@primer/react";
import React, { ReactNode } from "react";

type StepCardProps = {
  children: ReactNode;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({ children, description }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: 350,
          height: 250,
          position: "relative",
          borderStyle: "solid",
          borderColor: "success.emphasis",
          backgroundColor: "success.subtle",
          borderRadius: 4,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        {children}
      </Box>
      <Text sx={{ mt: 3 }}>{description}</Text>
    </Box>
  );
};

export default StepCard;
