import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";

export default function ScrollButton() {
  function handleScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="scrollbutton">
      <ArrowUpOutlined onClick={handleScroll} />
    </div>
  );
}
