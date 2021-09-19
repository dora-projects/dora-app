import toast, { Toaster } from "react-hot-toast";
import { useNotificationStore } from "@/stores/notifications";

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  console.log("notifications", notifications);

  return <Toaster />;
};
