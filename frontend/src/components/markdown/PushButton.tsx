import { RepoPushIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { Repository } from "../../types/repository";
import axiosInstance from "../../utils/axios";

type PushButtonProps = {
  markdown: string;
  repo: Repository | undefined;
};

const PushButton: React.FC<PushButtonProps> = ({ markdown, repo }) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const handlePush = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `api/github/repo/${repo?.name}/${repo?.default_branch}/push-readme`,
        {
          content: markdown,
        }
      );
      console.log("", response);
      setLoading(false);
      showNotification(
        "Push Successful",
        "Your README has been pushed. A pull request has been created. Please review and merge it.",
        "success"
      );
    } catch (error) {
      console.error("Error pushing README:", error);
      showNotification(
        "Push Failed",
        "There was an issue pushing your README. Please try again.",
        "critical"
      );
    }
  };

  return (
    <IconButton
      variant="primary"
      icon={RepoPushIcon}
      aria-label="Push to GitHub"
      onClick={handlePush}
      loading={loading}
    />
  );
};

export default PushButton;
