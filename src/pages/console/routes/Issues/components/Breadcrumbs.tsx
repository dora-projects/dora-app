import React from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import dayjs from "@/utils/date";

const Box = styled.div`
  background: #fff;
  padding: 30px;

  .time {
  }

  .category {
    font-size: 16px;
    font-weight: bold;
  }

  .message {
  }
`;

const Breadcrumbs = (props: {
  breadcrumbs: {
    category: string;
    message: string;
    timestamp: number;
  }[];
}) => {
  return (
    <Box>
      <Timeline reverse>
        {props?.breadcrumbs?.map((breadcrumb) => {
          return (
            <Timeline.Item key={breadcrumb?.timestamp}>
              <div className="time">{dayjs(breadcrumb?.timestamp * 1000).format("YYYY/MM/DD HH:mm:ss")}</div>
              <div className="category">{breadcrumb?.category}</div>
              <div className="message">{breadcrumb?.message}</div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Box>
  );
};

export default Breadcrumbs;
