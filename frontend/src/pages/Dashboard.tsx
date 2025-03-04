import { useUser } from "../context/UserContext";
import { Button, Text, Box, Heading, Grid, CircleBadge } from "@primer/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Repository } from "../types/repository";
import {
  RepoForkedIcon,
  StarIcon,
  UnlockIcon,
  LockIcon,
} from "@primer/octicons-react";
import { languageColors } from "../utils/languageColors";
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";

const getLanguageColor = (language: string) => {
  if (!language) return "transparent";

  return languageColors[language] || "transparent";
};

const Dashboard = () => {
  const { user, signOut } = useUser();
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await axiosInstance.get("api/github/repo");

        setRepos(data as Repository[]);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Text>{user?.user_name}</Text>
      <Button onClick={signOut}>Sign Out</Button>
      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"],
          gap: 3,
          p: 5,
        }}
      >
        {repos.map((repo: Repository) => (
          <Link
            key={repo.name}
            to={`/repo/${repo.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "border.default",
                borderRadius: "6px",
                p: 3,
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                },
                height: "220px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Heading as="h3" sx={{ fontSize: 3 }}>
                  {repo.name}
                </Heading>
                {repo.visibility === "public" ? (
                  <UnlockIcon size={16} />
                ) : (
                  <LockIcon size={16} />
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CircleBadge
                  size={10}
                  sx={{
                    backgroundColor: getLanguageColor(repo.main_language),
                  }}
                />
                <Text sx={{ fontSize: 1, ml: 1 }}>{repo.main_language}</Text>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StarIcon size={16} sx={{ mr: 1 }} />
                <Text sx={{ fontSize: 1 }}>{repo.stargazers_count}</Text>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <RepoForkedIcon size={16} sx={{ mr: 1 }} />
                <Text sx={{ fontSize: 1 }}>{repo.fork_count}</Text>
              </Box>

              <Text
                sx={{
                  fontSize: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  mt: "10px",
                }}
              >
                {repo.description}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
