import { Avatar, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

export const AvatarDropdown = () => {
  const navigate = useNavigate();

  const menu = (
    <Menu
      className={styles.menu}
      onClick={(e) => {
        const { key } = e;
        if (key === "logout") {
          navigate("/auth/login");
        }
      }}
    >
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
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
        <Avatar className={styles.avatar} size="small" icon={<UserOutlined />} />
        <span className={`anticon`}>Nancode</span>
      </span>
    </Dropdown>
  );
};
