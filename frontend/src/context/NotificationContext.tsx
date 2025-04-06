import React, { createContext, ReactNode, useContext, useState } from "react";
import { ToastNotificationProps } from "../components/ToastNotification";

type ToastContextType = {
  showNotification: (
    title: string,
    description: React.ReactNode,
    variant: "critical" | "info" | "success" | "upsell" | "warning",
    duration?: number
  ) => void;
  notifications: ToastNotificationProps[];
};

const NotificationContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a ToastProvider");
  }
  return context;
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<ToastNotificationProps[]>(
    []
  );

  const showNotification = (
    title: React.ReactNode,
    description: React.ReactNode,
    variant: "critical" | "info" | "success" | "upsell" | "warning",
    duration: number = 5000
  ) => {
    const newToast = {
      id: Date.now(),
      title,
      description,
      variant,
    };
    setNotifications((prev) => [...prev, newToast]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((toast) => toast.id !== newToast.id)
      );
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
