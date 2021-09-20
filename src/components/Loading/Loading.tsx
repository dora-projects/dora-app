import React from "react";
import { Spin } from "antd";
import type { SpinProps, SpinState } from "antd/es/spin";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

type LoadingProps = {
  loading: boolean;
  title?: string;
};

type Props = LoadingProps & SpinProps & SpinState;

export const Loading: React.FC<Props> = (props) => {
  const { children, loading = false, title = "", ...rest } = props;
  return (
    <Spin spinning={loading} indicator={antIcon} tip={title} {...rest}>
      {children}
    </Spin>
  );
};

export const FullLoading: React.FC<Props> = (props: Props) => {
  const { loading = false, title = "", ...rest } = props;
  return (
    <Spin spinning={loading} indicator={antIcon} tip={title} {...rest}>
      <div className={"w-screen h-screen"} />
    </Spin>
  );
};
