import React from "react";
import Link from "next/link";
import CustomImage from "../image/CustomImage";

export const ContentRightItem = ({ item }) => (
  <Link href={`/posts/${item.slug}`}>
    <a>
      <div className="carousel-right-item">
        <div className="carousel-right-item--image">
          <CustomImage src={item.thumbnails[0]} />
        </div>
        <div className="carousel-right-item--title">{item.title}</div>
      </div>
    </a>
  </Link>
);

export default function ContentRight({ data }) {
  return (
    <div className="carousel-right">
      {data.map((item) => (
        <ContentRightItem item={item} />
      ))}
    </div>
  );
}
