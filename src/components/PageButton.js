import React from "react";

// the buttons for selecting which page you want to see
const PageButton = ({ count, current, setCurrent }) => {
  return (
    <button
      style={{
        background: `${current === count ? "blue" : "inherit"}`,
        color: `${current === count ? "white" : "black"}`,
      }}
      onClick={() => {
        setCurrent(count);
      }}
    >
      {count}
    </button>
  );
};

export default PageButton;
