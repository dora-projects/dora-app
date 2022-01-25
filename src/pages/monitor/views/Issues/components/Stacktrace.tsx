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

      .s2 {
      }

      .s3 {
        color: #a1a1a1;
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
        url: string;
        func: string;
        line: number;
        column: number;
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
              <div key={frame.column + frame.func} className="frame">
                <span className="s s1">({frame.url})</span>
                <span className="s s2">{frame.func}</span>
                <span className="s s3">
                  {frame.line}:{frame.column}
                </span>
              </div>
            );
          })}
      </div>
    </CodeFrame>
  );
};

export default Stacktrace;
