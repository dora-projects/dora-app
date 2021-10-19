import React from "react";
import styled from "styled-components";
import { useControlledValue } from "ahooks";
import classnames from "classnames";

const CheckGroupStyle = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: flex-start;

  .title {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }

  .options {
    display: flex;
    flex-wrap: wrap;

    .opt {
      cursor: pointer;
      color: #5c6173;
      font-size: 14px;
      padding: 2px 10px;
      margin: 0 5px 10px;
      border-radius: 20px;

      &.active {
        color: #fff;
        background-color: #4587ff;
      }
    }
  }
`;

type Props = {
  title: string;
  value?: number | string;
  options: { label: string; value: number | string }[];
  onChange: (val: number | string) => void;
};

const TagCheckGroup = (props: Props) => {
  const [activeValue, setActiveValue] = useControlledValue<number | string>(props, {
    defaultValue: undefined,
  });

  return (
    <CheckGroupStyle>
      <span className="title">{props.title}：</span>
      <div className="options">
        {props.options && props.options.length > 0 ? (
          props.options.map((opt) => {
            return (
              <span
                key={opt.value}
                className={classnames("opt", { active: activeValue === opt.value })}
                onClick={() => {
                  setActiveValue(opt.value);
                }}
              >
                {opt.label}
              </span>
            );
          })
        ) : (
          <span style={{ color: "#ccc" }}>暂无数据</span>
        )}
      </div>
    </CheckGroupStyle>
  );
};

export default TagCheckGroup;
