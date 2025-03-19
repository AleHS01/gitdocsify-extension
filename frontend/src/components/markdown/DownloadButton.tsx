import { DownloadIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import React from "react";
import { useNotification } from "../../context/NotificationContext";

type DownloadButtonProps = {
  markdown: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ markdown }) => {
  const { showNotification } = useNotification();
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    showNotification(
      "Download Started",
      "Your file is downloading...",
      "upsell"
    );
  };

  return (
    <IconButton
      variant="primary"
      icon={DownloadIcon}
      aria-label="Dowload"
      onClick={handleDownload}
    />
  );
};

export default DownloadButton;
