import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "@/store";

const iconList = {
  info: "😀",
  warning: "😬",
  success: "👏",
  error: "💀",
};

export const Notifications = () => {
  const dispatch = useDispatch<Dispatch>();
  const notifications = useSelector((state: RootState) => state.notifications);

  React.useEffect(() => {
    notifications.forEach((item) => {
      dispatch.notifications.dismiss(item.id!);

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
  }, [dispatch, notifications]);

  return <Toaster position="top-center" />;
};
