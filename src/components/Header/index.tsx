import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  FileProtectOutlined,
  FundProjectionScreenOutlined,
  CaretDownOutlined,
  SettingOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { HeaderStyle } from "./index.styled";
import Logo from "@/assets/logo.png";
import Home from "@/assets/home.svg";
import GlobalHeaderRight from "@/components/RightContent";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const project = useSelector((state: RootState) => state.userConfig?.project);

  const menus = [
    {
      path: "/projects",
      name: " 我的项目",
      icon: <AppstoreOutlined />,
    },
    {
      path: `/project/${project?.appKey}/artifacts`,
      name: " 制品",
      icon: <FileProtectOutlined />,
    },
    {
      path: `/project/${project?.appKey}/monitor`,
      name: " 监控",
      icon: <FundProjectionScreenOutlined />,
    },
    {
      path: "/setting",
      name: " 设置",
      icon: <SettingOutlined />,
    },
  ];

  const [clickKeys, setClickKeys] = React.useState<string[]>([]);
  const routerKeys = menus.map((i) => i.path).filter((p) => pathname.startsWith(p));

  return (
    <HeaderStyle>
      <div className="header-right-content">
        <div className="logo">
          <a href="/">
            <img className="logo-img" src={Logo} alt="" />
            <img className="home-img" src={Home} alt="" />
          </a>
        </div>
        <div
          className="switch"
          onClick={() => {
            navigator("/projects");
          }}
        >
          <span className="name">{project?.name}</span>
          <CaretDownOutlined />
        </div>
      </div>
      <div className="header-center-content">
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={clickKeys.length > 0 ? clickKeys : routerKeys}
          onClick={(menu) => {
            const { key } = menu;
            setClickKeys([key]);
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
