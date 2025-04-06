import { Box } from "@primer/react";
import { Banner } from "@primer/react/experimental";
import React, { useEffect, useState } from "react";

export type ToastNotificationProps = {
  id?: number;
  title: React.ReactNode;
  description: React.ReactNode;
  variant: "critical" | "info" | "success" | "upsell" | "warning";
  duration?: number;
  onDismiss?: () => void;
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  title,
  description,
  variant,
  duration = 5000,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState("toast-slide-in");

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimationClass("toast-slide-out");
        setTimeout(() => setIsVisible(false), duration);
        if (onDismiss) onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onDismiss]);

  return isVisible ? (
    <Box
      className={`${animationClass}`}
      sx={{
        width: "450px",
      }}
    >
      <Banner
        title={String(title)}
        description={description}
        variant={variant}
        onDismiss={() => {
          setIsVisible(false);
          setAnimationClass("toast-slide-out");
          if (onDismiss) onDismiss();
        }}
      />
    </Box>
  ) : null;
};

export default ToastNotification;
