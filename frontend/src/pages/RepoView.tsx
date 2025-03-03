import React, { useEffect, useState } from "react";
import {
  ActionList,
  ActionMenu,
  Avatar,
  AvatarStack,
  Box,
  BranchName,
  Breadcrumbs,
  Button,
  CounterLabel,
  Heading,
  Label,
  Octicon,
  Stack,
  Text,
  Tooltip,
  PageLayout,
  Popover,
  Link as LinkGitHub,
  CircleBadge,
  ProgressBar,
} from "@primer/react";
import { UnderlinePanels } from "@primer/react/experimental";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {
  BookIcon,
  InfoIcon,
  RepoForkedIcon,
  StarIcon,
  CodeIcon,
  GitBranchIcon,
  LockIcon,
  UnlockIcon,
  CopyIcon,
  MarkGithubIcon,
  ReplyIcon,
} from "@primer/octicons-react";
import axios from "axios";
import { languageColors } from "../utils/languageColors";

const RepoView: React.FC = () => {
  const { name } = useParams();
  const [repo, setRepo] = useState();
  const [loading, setLoading] = useState(true);
  const [collaborators, setCollaborators] = useState([]);
  const [hoveredCollab, setHoveredCollab] = useState<string | null>(null);
  const [languages, setLanguages] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

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
  }, []);

  const getCollaborators = async () => {
    const { data } = await axiosInstance.get(
      `api/github/repo/${name}/collaborators`
    );
    setCollaborators(data);
  };

  const fetchLanguages = async (languagesUrl: string) => {
    try {
      const { data } = await axios.get(languagesUrl);

      const total: number = Object.values(data).reduce(
        (acc: number, size: number) => acc + size,
        0
      );
      setTotalSize(total);
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const formatDate = (dateString: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  if (loading) {
    return; // TODO: Create a Skeleton
  }

  return (
    <PageLayout>
      <PageLayout.Header
        sx={{
          borderBottomWidth: 2,
          borderBottomStyle: "solid",
          borderColor: "border.default",
          p: 3,
        }}
      >
        <Stack gap="condensed">
          <Breadcrumbs sx={{ fontSize: "14px", color: "inherit" }}>
            <Link to="/" style={{ color: "inherit" }}>
              <Breadcrumbs.Item>
                <ReplyIcon /> Dashboard
              </Breadcrumbs.Item>
            </Link>
            <Breadcrumbs.Item
              sx={{
                color: "inherit",
              }}
            >
              {repo?.name}
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <Stack
            direction="horizontal"
            gap="normal"
            justify="space-between"
            wrap="nowrap"
          >
            <Stack direction="horizontal" gap="condensed" align="center">
              <Avatar
                src={repo?.owner.avatar_url}
                size={{ narrow: 10, regular: 30, wide: 40 }}
                sx={{ cursor: "pointer" }}
                onClick={() => window.open(repo?.owner.html_url, "_blank")}
              />
              <LinkGitHub
                muted
                href={repo?.html_url}
                target="_blank"
                sx={{
                  fontSize: 26,
                  color: "inherit",
                }}
              >
                {repo?.name}
              </LinkGitHub>
              {repo?.visibility == "public" ? (
                <Tooltip text={repo?.visibility}>
                  <UnlockIcon size={16} />
                </Tooltip>
              ) : (
                <Tooltip text={repo?.visibility}>
                  <LockIcon size={16} />
                </Tooltip>
              )}
            </Stack>
            <Stack direction="horizontal" gap="normal">
              <Button
                loading={loading}
                leadingVisual={RepoForkedIcon}
                count={repo.forks_count}
              >
                Fork
              </Button>
              <Button
                loading={loading}
                leadingVisual={StarIcon}
                count={repo.stargazers_count}
              >
                Star
              </Button>
              <ActionMenu>
                <ActionMenu.Button variant="primary" leadingVisual={CodeIcon}>
                  Code
                </ActionMenu.Button>
                <ActionMenu.Overlay width="auto">
                  <ActionList>
                    <ActionList.LinkItem href={repo?.html_url} target="_blank">
                      View on GitHub
                      <ActionList.LeadingVisual>
                        <MarkGithubIcon />
                      </ActionList.LeadingVisual>
                    </ActionList.LinkItem>
                    <ActionList.Item
                      onSelect={() =>
                        navigator.clipboard.writeText(repo?.clone_url)
                      }
                    >
                      Copy Clone URL{" "}
                      {/* TODO: Send Toast Notification confirming */}
                      <ActionList.LeadingVisual>
                        <CopyIcon />
                      </ActionList.LeadingVisual>
                    </ActionList.Item>
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Stack>
          </Stack>
        </Stack>
      </PageLayout.Header>
      <PageLayout.Content>
        <Heading
          sx={{
            fontSize: 20,
          }}
        >
          README Settings
        </Heading>
        {/* <UnderlinePanels> */}
        {/* <UnderlinePanels.Tab icon={InfoIcon}>About</UnderlinePanels.Tab> */}

        {/* <UnderlinePanels.Tab icon={BookIcon}>
            README Settings
          </UnderlinePanels.Tab> */}
        {/* <UnderlinePanels.Panel>s23</UnderlinePanels.Panel> */}
        {/* </UnderlinePanels> */}
      </PageLayout.Content>
      <PageLayout.Pane>
        <Box
          sx={{
            borderBottomWidth: 2,
            borderBottomStyle: "solid",
            borderColor: "border.default",
            pb: 2,
            mb: 2,
          }}
        >
          <Text as="h2">About</Text>
          <Text as="p" sx={{ my: 2 }}>
            {repo.description}
          </Text>
        </Box>
        <Box>
          <Box
            sx={{
              borderBottomWidth: 2,
              borderBottomStyle: "solid",
              borderColor: "border.default",
              pb: 2,
              mb: 2,
            }}
          >
            <Stack direction="vertical" gap="condensed">
              <BranchName
                href={`${repo.html_url}/tree/${repo?.default_branch}`}
                target="_blank"
                sx={{ width: "fit-content" }}
              >
                <Stack direction="horizontal" gap="condensed" align="center">
                  <Octicon icon={GitBranchIcon} />
                  {repo?.default_branch}
                </Stack>
              </BranchName>
              {/* <Stack align="center" direction="horizontal" gap="none">
              <CircleBadge
                size={10}
                sx={{
                  backgroundColor: languageColors[repo.language],
                }}
              />
              <Text sx={{ fontSize: 1, ml: 1 }}>{repo.language}</Text>
            </Stack> */}

              <Label
                variant="accent"
                size="small"
                sx={{ width: "fit-content" }}
              >
                Created: {formatDate(repo.created_at)}
              </Label>
              <Label
                variant="success"
                size="small"
                sx={{ width: "fit-content" }}
              >
                Last Push: {formatDate(repo.pushed_at)}
              </Label>
            </Stack>
          </Box>
          <Box
            sx={{
              borderBottomWidth: 2,
              borderBottomStyle: "solid",
              borderColor: "border.default",
              pb: 2,
              mb: 2,
            }}
          >
            <Text as="h3" fontWeight="bold" sx={{ my: 2 }}>
              Contributors <CounterLabel>{collaborators.length}</CounterLabel>
            </Text>

            <Stack direction="horizontal" wrap="wrap">
              {collaborators.map((c) => (
                <Box key={c.login}>
                  <Avatar
                    sx={{ cursor: "pointer" }}
                    alt={c.login}
                    src={c.avatar_url}
                    size={{ narrow: 10, regular: 30, wide: 40 }}
                    onMouseEnter={() => setHoveredCollab(c.login)}
                    onMouseLeave={() => setHoveredCollab(null)}
                    onClick={() => window.open(c.html_url, "_blank")}
                  />
                  <Popover open={hoveredCollab === c.login} caret="top-left">
                    <Popover.Content
                      sx={{ marginTop: 2, maxWidth: "fit-content", p: 2 }}
                    >
                      <Heading sx={{ fontSize: 2 }}>{c.login}</Heading>
                    </Popover.Content>
                  </Popover>

                  {/* <Avatar
                    sx={{ cursor: "pointer" }}
                    alt={c.login}
                    src={c.avatar_url}
                    size={{ narrow: 10, regular: 30, wide: 40 }}
                    onMouseEnter={() => setHoveredCollab(c.login)}
                    onMouseLeave={() => setHoveredCollab(null)}
                  /> */}
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Text as="h3" sx={{ my: 2 }} fontWeight="bold">
              Languages
            </Text>
            <ProgressBar animated>
              {languages &&
                Object.keys(languages).map((language) => {
                  const size = languages[language];
                  const percentage = (size / totalSize) * 100;

                  return (
                    <ProgressBar.Item
                      progress={percentage}
                      sx={{
                        bg: languageColors[language],
                      }}
                    />
                  );
                })}
            </ProgressBar>
            <Stack
              direction="horizontal"
              gap="condensed"
              sx={{
                my: 3,
              }}
              wrap="wrap"
            >
              {languages &&
                Object.keys(languages).map((language) => {
                  const size = languages[language];
                  const percentage = (size / totalSize) * 100;

                  return (
                    <Stack
                      align="center"
                      direction="horizontal"
                      gap="none"
                      key={language}
                    >
                      <CircleBadge
                        size={10}
                        sx={{
                          backgroundColor: languageColors[language],
                        }}
                      />
                      <Text sx={{ fontSize: 1, ml: 1 }}>{language}</Text>
                      <Text
                        sx={{
                          fontSize: "12px",
                          ml: 1,
                          color: "text.secondary",
                        }}
                      >{`${percentage.toFixed(1)}%`}</Text>
                    </Stack>
                  );
                })}
            </Stack>
          </Box>
        </Box>
      </PageLayout.Pane>
    </PageLayout>
  );
};

export default RepoView;
