import React from "react";

interface Props {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconFont = (props: Props) => {
  const { name, style, className } = props;
  return (
    <svg className={`iconfont ${className}`} style={style} aria-hidden="true">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default IconFont;
