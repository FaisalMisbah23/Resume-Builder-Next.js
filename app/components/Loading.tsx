import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-50">
    <div className="w-16 h-16 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin mb-2"></div>
    <p className="">{message}</p>
  </div>
  );
};

export default Loading;
