import React, { useEffect, useState } from "react";
import { Box, PageLayout } from "@primer/react";
import { UnderlinePanels } from "@primer/react/experimental";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { BookIcon } from "@primer/octicons-react";
import axios from "axios";
import SidePane from "../components/layout/SidePane";
import LayoutHeader from "../components/layout/LayoutHeader";
import { Collaborators, Repository } from "../types/repository";

const RepoView: React.FC = () => {
  const { name } = useParams();
  const [repo, setRepo] = useState<Repository>();
  const [loading, setLoading] = useState<boolean>(true);
  const [collaborators, setCollaborators] = useState<Collaborators[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);

  useEffect(() => {
    const getRepository = async () => {
      try {
        const { data } = await axiosInstance.get(`api/github/repo/${name}`);
        console.log(data);
        setRepo(data);
        await getCollaborators();
        await fetchLanguages(data.languages_url);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getRepository();
  }, [name]);

  const getCollaborators = async () => {
    const { data } = await axiosInstance.get(
      `api/github/repo/${name}/collaborators`
    );
    setCollaborators(data);
  };

  const fetchLanguages = async (languagesUrl: string) => {
    try {
      const { data } = await axios.get<Record<string, number>>(languagesUrl);

      const total: number = Object.values(data).reduce(
        (acc, size) => acc + size,
        0
      );

      setTotalSize(total);
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  if (loading) {
    return; // TODO: Create a Skeleton
  }

  return (
    <PageLayout>
      <LayoutHeader repo={repo} loading={loading} />
      <PageLayout.Content>
        <Box
          sx={{
            px: 4,
            pb: 4,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: 2,
          }}
        >
          <UnderlinePanels>
            <UnderlinePanels.Tab icon={BookIcon}>
              Documentation Configuration
            </UnderlinePanels.Tab>
            <UnderlinePanels.Panel></UnderlinePanels.Panel>
          </UnderlinePanels>
        </Box>
      </PageLayout.Content>
      <SidePane
        collaborators={collaborators}
        languages={languages}
        repo={repo}
        totalSize={totalSize}
      />
    </PageLayout>
  );
};

export default RepoView;
