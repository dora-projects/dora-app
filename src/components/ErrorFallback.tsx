import * as React from "react";

const ErrorFallback = () => {
  return (
    <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
      <h2 className="text-lg">糟糕, 发生了未知错误 :( </h2>
      <button
        className="flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none"
        onClick={() => window.location.assign(window.location.origin)}
      >
        <span className="mx-2">刷新</span>
      </button>
    </div>
  );
};

export default ErrorFallback;
