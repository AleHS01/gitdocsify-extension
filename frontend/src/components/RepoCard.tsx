import {
  UnlockIcon,
  LockIcon,
  StarIcon,
  RepoForkedIcon,
} from "@primer/octicons-react";
import { Link } from "react-router-dom";
import { Box, Text, CircleBadge, Heading } from "@primer/react";
import { Repository } from "../types/repository";
import { languageColors } from "../utils/languageColors";

type RepoCardProps = {
  repo: Repository;
};

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const getLanguageColor = (language: string) => {
    if (!language) return "transparent";

    return languageColors[language] || "transparent";
  };

  return (
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
              backgroundColor: getLanguageColor(repo.language),
            }}
          />
          <Text sx={{ fontSize: 1, ml: 1 }}>{repo.language}</Text>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <StarIcon size={16} />
          <Text sx={{ fontSize: 1, ml: 1 }}>{repo.stargazers_count}</Text>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <RepoForkedIcon size={16} />
          <Text sx={{ fontSize: 1, ml: 1 }}>{repo.forks_count}</Text>
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
  );
};

export default RepoCard;
