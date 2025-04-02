import { Box } from "@primer/react";
import { useEffect, useState } from "react";
import { Repository } from "../types/repository";
import axiosInstance from "../utils/axios";
import LoadingScreen from "./LoadingScreen";
import DashboardHeader from "../components/DashboardHeader";
import RepoCard from "../components/RepoCard";

const Dashboard = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await axiosInstance.get("api/github/repo");

        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <DashboardHeader />
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: [
            "1fr",
            "1fr 1fr",
            "1fr 1fr 1fr",
            "1fr 1fr 1fr 1fr",
          ],
          gap: 3,
          p: 5,
        }}
      >
        {repos.map((repo: Repository) => (
          <RepoCard repo={repo} />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
