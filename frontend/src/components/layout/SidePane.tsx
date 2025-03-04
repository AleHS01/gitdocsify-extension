import { GitBranchIcon } from "@primer/octicons-react";
import {
  PageLayout,
  Box,
  Stack,
  BranchName,
  Octicon,
  Label,
  CounterLabel,
  Text,
} from "@primer/react";
import CollaboratorsStack from "../CollaboratorsStack";
import LanguageProgressBar from "../LanguageProgressBar";
import { Collaborators, Repository } from "../../types/repository";
import React from "react";

type SidePaneProps = {
  collaborators: Collaborators[];
  languages: string[];
  repo: Repository | undefined;
  totalSize: number;
};

const SidePane: React.FC<SidePaneProps> = ({
  repo,
  languages,
  collaborators,
  totalSize,
}) => {
  const formatDate = (dateString: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
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
          {repo ? repo.description : ""}
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
              href={repo ? `${repo.html_url}/tree/${repo?.default_branch}` : ""}
              target="_blank"
              sx={{ width: "fit-content" }}
            >
              <Stack direction="horizontal" gap="condensed" align="center">
                <Octicon icon={GitBranchIcon} />
                {repo?.default_branch}
              </Stack>
            </BranchName>

            <Label variant="accent" size="small" sx={{ width: "fit-content" }}>
              Created: {formatDate(repo ? repo.created_at : "")}
            </Label>
            <Label variant="success" size="small" sx={{ width: "fit-content" }}>
              Last Push: {formatDate(repo ? repo.pushed_at : "")}
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
          <CollaboratorsStack collaborators={collaborators} />
        </Box>
        <Box>
          <Text as="h3" sx={{ my: 2 }} fontWeight="bold">
            Languages
          </Text>
          <LanguageProgressBar languages={languages} totalSize={totalSize} />
        </Box>
      </Box>
    </PageLayout.Pane>
  );
};

export default SidePane;
