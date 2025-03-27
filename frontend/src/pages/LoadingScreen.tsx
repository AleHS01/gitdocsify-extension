import React from "react";
import { Heading, Box } from "@primer/react";
import "../assets/loading.css";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "canvas.default",
      }}
    >
      <Heading sx={{ color: "fg.default" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <rect
              className="spinner_zWVm"
              x="1"
              y="1"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_gfyD"
              x="8.33"
              y="1"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_T5JJ"
              x="1"
              y="8.33"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_E3Wz"
              x="15.66"
              y="1"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_g2vs"
              x="8.33"
              y="8.33"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_ctYB"
              x="1"
              y="15.66"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_BDNj"
              x="15.66"
              y="8.33"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_rCw3"
              x="8.33"
              y="15.66"
              width="7.33"
              height="7.33"
            />
            <rect
              className="spinner_Rszm"
              x="15.66"
              y="15.66"
              width="7.33"
              height="7.33"
            />
          </svg>
        </Box>
      </Heading>
    </Box>
  );
};

export default LoadingScreen;
