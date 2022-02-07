import React from "react";
import { Row, Col, Space, Button, Empty } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { ArtifactItem } from "./styled";
import { useRequest } from "ahooks";
import { Artifact, getArtifact } from "@/services/artifacts";
import { useParams } from "react-router-dom";

const List = (props: { listData: Artifact[] }) => {
  const listData = props.listData;

  if (!listData || listData?.length <= 0) {
    return (
      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      </div>
    );
  }

  return (
    <Row gutter={20}>
      {listData?.map((item: any) => {
        return (
          <Col span={6} key={item.id}>
            <ArtifactItem>
              <div className="info">
                <div className="">
                  <span className="label">版本：</span>
                  <span className="value">{item.release}</span>
                </div>
                <div className="">
                  <span className="label">上传时间：</span>
                  <span className="value">{item.createdAt}</span>
                </div>
                <div className="">
                  <span className="label">文件：</span>
                  <span className="value">{item.path}</span>
                </div>
              </div>
              <div>
                <Space>
                  <Button>下载</Button>
                  {/*<Button>SCP</Button>*/}
                  <Button>预览</Button>
                </Space>
              </div>
            </ArtifactItem>
          </Col>
        );
      })}
    </Row>
  );
};

export const Artifacts = () => {
  const params = useParams();
  const appKey = params.appKey;

  const { data, run, loading } = useRequest(getArtifact, { manual: true });

  React.useEffect(() => {
    run({
      appKey: appKey!,
      limit: 100,
    });
  }, [run, appKey]);

  const list = data?.data?.items || [];

  return (
    <PageContainer title="制品管理" loading={loading}>
      <List listData={list} />
    </PageContainer>
  );
};
