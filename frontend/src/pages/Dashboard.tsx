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

const getLanguageColor = (language: string | null) => {
  if (!language) return "transparent";

  return languageColors[language] || "transparent";
};

const Dashboard = () => {
  const { user, signOut } = useUser();
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!user || !user.user_name || !user.access_token) return;

      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${user.user_name}/repos`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        const filteredRepos = data.map((repo: any) => ({
          name: repo.name,
          clone_url: repo.clone_url,
          created_at: new Date(repo.created_at),
          main_language: repo.language,
          visibility: repo.visibility,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          fork_count: repo.forks_count,
        }));

        setRepos(filteredRepos as Repository[]);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, [user]);

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
          <Box
            as="a"
            key={repo.name}
            href={`/repo/${repo.name}`}
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
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
