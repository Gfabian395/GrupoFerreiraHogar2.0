import React from "react";
import "./Loading.css";

export const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-loader">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
      <div className="loading-loader">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};