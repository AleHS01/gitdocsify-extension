import React, { useEffect } from "react";
import { Box, Button } from "@primer/react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const RepoView: React.FC = () => {
  const { name } = useParams();

  useEffect(() => {
    const getRepository = async () => {
      try {
        const { data } = await axiosInstance.get(
          `http://localhost:8000/api/github/repo/${name}`
        );
        console.log("", data);
      } catch (error) {
        console.error(error);
      }
    };

    getRepository();
  }, []);
  return <Box>{name}</Box>;
};

export default RepoView;
