import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppstoreOutlined, AreaChartOutlined, SettingOutlined } from "@ant-design/icons";
import { HeaderStyle } from "./index.styled";
import Logo from "@/assets/logo.png";
import GlobalHeaderRight from "@/components/RightContent";

const menus = [
  {
    path: "/projects",
    name: " 我的项目",
    icon: <AppstoreOutlined />,
  },
  {
    path: "/artifacts",
    name: " 制品",
    icon: <AppstoreOutlined />,
  },
  {
    path: "/monitor",
    name: " 监控",
    icon: <AppstoreOutlined />,
  },
  {
    path: "/setting",
    name: " 设置",
    icon: <SettingOutlined />,
  },
];

const Header = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const menuActiveKeys = menus.map((i) => i.path).filter((p) => pathname.startsWith(p));

  return (
    <HeaderStyle>
      <div className="header-right-content">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="" />
            <h1>Dora</h1>
          </a>
        </div>
      </div>
      <div className="header-center-content">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={menuActiveKeys}
          onClick={(menu) => {
            const { key } = menu;
            navigator(key);
          }}
        >
          {menus.map((menu) => {
            return (
              <Menu.Item key={menu.path} icon={menu.icon}>
                {menu.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <div className="header-right-content">
        <GlobalHeaderRight />
      </div>
    </HeaderStyle>
  );
};

export default Header;
