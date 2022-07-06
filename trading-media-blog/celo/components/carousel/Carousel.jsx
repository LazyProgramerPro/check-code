import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import ContentRight from "./ContentRight";
import Link from "next/link";
import defaultImage from "../../assets/vn.png";
import { createGlobalStyle } from "styled-components";
import CustomImage from "../image/CustomImage";
import { API_IMAGE_URL } from "../../constants/common";

export default function Carousel({ news, dataTopNew }) {
  const [dataIndex, setDataIndex] = useState(1);
  return (
    <div className="carousel">
      <div className="carousel-bg">
        {news[dataIndex] && <CustomImage src={news[dataIndex].thumbnails[0]} />}
      </div>
      <div className="carousel-left">
        <Swiper
          className="carousel-left-swiper"
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onActiveIndexChange={(swiper) => setDataIndex(swiper.realIndex)}
          //get index for background index
        >
          {news.map((n) => {
            return (
              <SwiperSlide>
                <CustomImage src={n.thumbnails[0]} />
                <Link href={`/posts/${n.slug}`}>
                  <div className="carousel-left-swiper--title">
                    <h4>{n.title}</h4>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <ContentRight data={dataTopNew} />
    </div>
  );
}
