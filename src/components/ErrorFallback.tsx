import * as React from "react";

const ErrorFallback = () => {
  return (
    <div className="" role="alert">
      <h2 className="">糟糕, 发生了未知错误 :( </h2>
      <button className="" onClick={() => window.location.assign(window.location.origin)}>
        <span className="">刷新</span>
      </button>
    </div>
  );
};

export default ErrorFallback;
