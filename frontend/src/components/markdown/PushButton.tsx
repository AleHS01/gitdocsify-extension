import { RepoPushIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import React from "react";
import { useNotification } from "../../context/NotificationContext";

type PushButtonProps = {
  markdown: string;
};

const PushButton: React.FC<PushButtonProps> = ({ markdown }) => {
  const { showNotification } = useNotification();
  const handlePush = () => {
    console.log(markdown); // Temp Code
    showNotification(
      "Push Successful",
      "Your changes have been pushed to the repository.",
      "success"
    );
  };

  return (
    <IconButton
      variant="primary"
      icon={RepoPushIcon}
      aria-label="Push to GitHub"
      onClick={handlePush}
    />
  );
};

export default PushButton;
