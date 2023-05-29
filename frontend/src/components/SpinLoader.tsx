import React from "react";

const SpinLoader = () => {
  return (
    <div className="relative h-8 w-8">
      <div
        className="absolute h-8 w-8 rounded-full
                            border-4 border-solid border-gray-200"
      ></div>

      <div
        className="absolute h-8 w-8 animate-spin rounded-full
                            border-4 border-solid border-pink-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default SpinLoader;
