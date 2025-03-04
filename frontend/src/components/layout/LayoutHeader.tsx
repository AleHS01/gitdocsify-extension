import {
  ReplyIcon,
  UnlockIcon,
  LockIcon,
  RepoForkedIcon,
  StarIcon,
  CodeIcon,
  MarkGithubIcon,
  CopyIcon,
} from "@primer/octicons-react";
import {
  PageLayout,
  Stack,
  Breadcrumbs,
  Avatar,
  Tooltip,
  Button,
  ActionMenu,
  ActionList,
  Link as LinkGitHub,
} from "@primer/react";
import React from "react";
import { Link } from "react-router-dom";
import { Repository } from "../../types/repository";

type LayoutHeaderProps = {
  repo: Repository | undefined;
  loading: boolean;
};

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ repo, loading }) => {
  return (
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
              src={repo ? repo?.owner.avatar_url : ""}
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
              count={repo ? repo.forks_count : 0}
            >
              Fork
            </Button>
            <Button
              loading={loading}
              leadingVisual={StarIcon}
              count={repo ? repo.stargazers_count : 0}
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
                      navigator.clipboard.writeText(repo ? repo?.clone_url : "")
                    }
                  >
                    Copy Clone URL
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
  );
};

export default LayoutHeader;
