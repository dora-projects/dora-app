import React from "react";
import Card from "antd";
import styled from "styled-components";

const CodeFrame = styled.div`
  background: #fff;
  padding: 30px;

  .title {
    span:first-child {
      font-size: 16px;
      font-weight: bold;
    }
    span:last-child {
      font-size: 16px;
    }
  }

  .stacktrace {
    padding: 5px 10px;
    font-size: 12px;

    .frame {
      .s {
        padding: 0 10px;
        white-space: nowrap;
      }
      .s1 {
      }
    }
  }
`;

interface Props {
  item: {
    value: string;
    type: string;
    stacktrace: {
      frames: {
        colno: number;
        filename: string;
        function: string;
        lineno: number;
      }[];
    };
  };
}

const Stacktrace = (props: Props) => {
  const { type, value, stacktrace } = props.item || {};
  return (
    <CodeFrame>
      <div className="title">
        <span>{type}：</span>
        <span>{value}</span>
      </div>
      <div className="stacktrace">
        {stacktrace?.frames &&
          stacktrace?.frames.map((frame) => {
            return (
              <div key={frame.colno} className="frame">
                {/*<span className="s s1">{frame.colno}</span>*/}
                <span className="s s2">{frame.function}</span>
                <span className="s s3">({frame.filename})</span>
              </div>
            );
          })}
      </div>
    </CodeFrame>
  );
};

export default Stacktrace;
