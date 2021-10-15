import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNotificationStore } from "@/stores/notifications";

const iconList = {
  info: "😀",
  warning: "😬",
  success: "👏",
  error: "💀",
};

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  React.useEffect(() => {
    notifications.forEach((item) => {
      dismissNotification(item.id);
      switch (item.type) {
        case "success":
          toast.success(item.title as string);
          return;
        case "error":
          toast.error(item.title as string);
          return;
        default:
          toast(item.title as string, { icon: iconList[item.type] });
      }
    });
  }, [dismissNotification, notifications]);

  return <Toaster position="bottom-right" />;
};
