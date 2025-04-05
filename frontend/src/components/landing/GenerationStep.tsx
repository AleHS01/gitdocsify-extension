import { Box } from "@primer/react";
import React from "react";
import TextAnimation from "../animation/TextAnimation";
import StepCard from "./StepCard";

type GenerationStepProps = {
  start: boolean;
};

const GenerationStep: React.FC<GenerationStepProps> = ({ start }) => {
  const codeSample = `API Endpoint Documentation: Root Route ('/')

Method: GET  
Endpoint: '/'  
Returns: a simple JSON response to confirm that the Flask server is running correctly.  

Response:  
  Body:  
    {
      "message": "Hello from Flask!"
    }`;

  return (
    <StepCard description="Generates a Professional README">
      <Box
        sx={{
          fontSize: "12px",
          whiteSpace: "pre-wrap",
          color: "fg.default",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {start && <TextAnimation baseText={codeSample} durationInSec={3} />}
      </Box>
    </StepCard>
  );
};

export default GenerationStep;
