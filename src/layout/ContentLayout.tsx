import * as React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className="content-layout">
      <h1>Content-{title}</h1>
      <div>{children}</div>
    </div>
  );
};
