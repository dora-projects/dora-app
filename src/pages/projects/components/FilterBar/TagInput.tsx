import React from "react";
import { useControllableValue } from "ahooks";
import { Tag, TagGroup } from "./styled";
import { timeList } from "./common";

const TagInput = (props: any) => {
  const [value, setValue] = useControllableValue(props);
  return (
    <TagGroup>
      {timeList.map((tag) => {
        return (
          <Tag
            key={tag.label}
            active={tag.value === value}
            onClick={() => {
              setValue(tag.value);
            }}
          >
            {tag.label}
          </Tag>
        );
      })}
    </TagGroup>
  );
};

export default TagInput;
