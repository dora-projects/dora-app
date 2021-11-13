import { Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";
import { AvatarDropdown } from "./AvatarDropdown";
import styles from "./index.module.less";

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space className={styles.right}>
      <AvatarDropdown />
      <span
        className={styles.action}
        onClick={() => {
          window.open("https://nancode.gitee.io/dora/");
        }}
      >
        <QuestionCircleOutlined />
      </span>
    </Space>
  );
};
export default GlobalHeaderRight;
