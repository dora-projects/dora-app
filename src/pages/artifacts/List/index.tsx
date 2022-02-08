import React from "react";
import { Row, Col, Space, Button, Empty, Divider } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { LinkOutlined } from "@ant-design/icons";
import { ArtifactItem } from "./styled";
import { useRequest } from "ahooks";
import { Artifact, getArtifact, getArtifactPreview } from "@/services/artifacts";
import { useParams } from "react-router-dom";
import { formNow } from "@/utils/date";

const List = (props: { listData: Artifact[] }) => {
  const listData = props.listData;

  const { runAsync, loading } = useRequest(getArtifactPreview, { manual: true });

  if (!listData || listData?.length <= 0) {
    return (
      <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      </div>
    );
  }

  return (
    <Row gutter={[20, 20]}>
      {listData?.map((item: any) => {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} key={item.id}>
            <ArtifactItem>
              <div className="info">
                <div className="item">
                  <span className="label">版本：</span>
                  <span className="value bold">{item.release}</span>
                </div>
                <div className="item">
                  <span className="label">上传时间：</span>
                  <span className="value green bold">{formNow(item.createdAt)}</span>
                </div>
                <div className="item">
                  <span className="label">提交消息：</span>
                  <span className="value">{item.commit}</span>
                </div>
                <div className="item">
                  <span className="label">提交时间：</span>
                  <span className="value">{item.commitAt}</span>
                </div>
                <div className="item">
                  <span className="label">提交分支：</span>
                  <span className="value">{item.gitBranch}</span>
                </div>
                <div className="item">
                  <span className="label">提交人：</span>
                  <span className="value">{item.author}</span>
                </div>
                <div className="item">
                  <span className="label">提交邮箱：</span>
                  <span className="value">{item.authorMail}</span>
                </div>
                {/*<div className="item">*/}
                {/*  <span className="label">提交哈希：</span>*/}
                {/*  <span className="value">{item.commitHash}</span>*/}
                {/*</div>*/}
                {/*<div className="item">*/}
                {/*  <span className="label">文件：</span>*/}
                {/*  <span className="value">{item.path}</span>*/}
                {/*</div>*/}
              </div>
              <Divider />
              <div>
                <Space>
                  <Button>下载</Button>
                  {/*<Button>SCP</Button>*/}
                  <Button
                    icon={<LinkOutlined />}
                    loading={loading}
                    onClick={() => {
                      runAsync({ artifactId: item.id }).then((res) => {
                        if (res?.data?.data?.link) {
                          window.open(res?.data?.data?.link, "_blank");
                        }
                      });
                    }}
                  >
                    预览
                  </Button>
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
