import { Avatar, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useLoginUserStore } from "@/stores";
import storage from "@/utils/storage";

export const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { userInfo } = useLoginUserStore();

  const loginOut = () => {
    storage.clearToken();
    window.location.href = "/auth/login";
  };

  const menu = (
    <Menu
      className={styles.menu}
      onClick={(e) => {
        const { key } = e;

        if (key === "center") {
          navigate("/setting/userinfo");
        }

        if (key === "logout") loginOut();
      }}
    >
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} overlayClassName={styles.container} placement="topRight">
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          className={styles.avatar}
          style={{ backgroundColor: "#f56a00" }}
          size="small"
          alt={userInfo?.username}
          // icon={<UserOutlined />}
        >
          {userInfo?.username?.slice(0, 1)?.toLocaleUpperCase()}
        </Avatar>
        <span className={`anticon`}>{userInfo?.username}</span>
      </span>
    </Dropdown>
  );
};
