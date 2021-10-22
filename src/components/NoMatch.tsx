import { Result, Button } from "antd";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export function NoMatch() {
  return <Result status="404" title="404" subTitle="Sorry, 页面不存在." extra={<Link to="/">返回首页</Link>} />;
}
