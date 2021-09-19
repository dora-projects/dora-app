import * as React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <h1>main-{title}</h1>
      <div>{children}</div>
    </div>
  );
};
