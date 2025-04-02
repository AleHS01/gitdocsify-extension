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
import { useState } from "react";

type RepoCardProps = {
  repo: Repository;
};

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const [gradient, setGradient] = useState("rgba(255,255,255,0.1)");

  const getLanguageColor = (language: string) => {
    if (!language) return "transparent";
    return languageColors[language] || "transparent";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setGradient(
      `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.04), transparent)`
    );
  };

  const handleMouseLeave = () => {
    setGradient("transparent");
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
          height: "220px",
          position: "relative",
          transition: "box-shadow 0.2s ease-in-out",
          backgroundImage: gradient,
          "&:hover": {
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
          },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
