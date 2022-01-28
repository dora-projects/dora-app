import React from "react";

const SdkGuide: React.FC = (props) => {
  const eventCount = 0;

  if (eventCount === 0) {
    return <div>SdkGuide</div>;
  }

  return <>{props.children}</>;
};

export default SdkGuide;
