import React, { useState } from "react";
import Image from "next/image";
import defaultImage from "../../assets/vn.png";
import { createGlobalStyle } from "styled-components";

export default function CustomImage({ layout = "fill", ...props }) {
  const [src, setSrc] = useState(defaultImage);
  return (
    <Image
      src={src}
      onError={() => {
        setSrc(defaultImage);
      }}
      layout={layout}
      {...props}
      className="custom-image"
    />
  );
}
