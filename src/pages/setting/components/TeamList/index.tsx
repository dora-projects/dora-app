import React from "react";
import styled from "styled-components";
import ProCard from "@ant-design/pro-card";
import { Tooltip, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ListItem, ItemIcon, ListContainer } from "./index.styled";

const { Title, Paragraph } = Typography;

export default function TeamListView({ teams }: { teams: any[] }) {
  return (
    <ListContainer>
      {teams.map((team, index) => (
        <ListItem key={team.id} onClick={() => {}}>
          <div className="head">
            <ItemIcon>{team.name.slice(0, 1)}</ItemIcon>
            <Title level={5} ellipsis className="name" style={{ maxWidth: "80%" }}>
              {team.name}
            </Title>
          </div>
          <div className="operation">
            <SettingOutlined style={{ fontSize: "18px" }} />
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
}
