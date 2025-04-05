import { Box } from "@primer/react";
import React, { useEffect, useState } from "react";
import TextAnimation from "../animation/TextAnimation";
import "../../assets/CSS/scan_code.css";
import StepCard from "./StepCard";

type ScanCodeStepProps = {
  start: boolean;
};

const ScanCodeStep: React.FC<ScanCodeStepProps> = ({ start }) => {
  const [showScanner, setShowScanner] = useState(false);

  const codeSample = `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(message="Hello from Flask!")

if __name__ == '__main__':
    app.run(debug=True)`;

  useEffect(() => {
    if (start) {
      const timeout = setTimeout(() => {
        setShowScanner(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [start]);

  return (
    <StepCard description="AI Scans & Understand Your Code">
      <Box
        sx={{
          fontFamily: "monospace",
          fontSize: "12px",
          whiteSpace: "pre",
          color: "fg.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {start && <TextAnimation baseText={codeSample} durationInSec={3} />}

        {showScanner && <div className="scanning-bar" />}
      </Box>
    </StepCard>
  );
};

export default ScanCodeStep;
