import React from "react";

interface Props {
  name: string;
  style?: React.CSSProperties;
}

const IconFont = (props: Props) => {
  const { name, style } = props;
  return (
    <svg className="iconfont" style={style} aria-hidden="true">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default IconFont;
