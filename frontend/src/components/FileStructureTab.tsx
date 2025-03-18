import React from "react";
import { Box } from "@primer/react";
import { useParams } from "react-router-dom";

const FileStructureTab: React.FC = () => {
  const { name } = useParams();
  return <Box>{name}</Box>;
};

export default FileStructureTab;
