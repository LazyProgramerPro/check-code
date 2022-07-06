import { Carousel } from 'antd';
import React from 'react';
import styled from 'styled-components';

export interface IBanner {
  images?: string[];
}
export const Banner = (props: IBanner) => {
  const { images } = props;

  return (
    <div className="lgsp-model">
      <View>
        <div className="slider-wrapper-title title-header">
          <h1 className="header--blue-text name title">MÔ HÌNH LGSP</h1>
        </div>
      </View>

      <div className="header__flex">
        <div className="header--line" />
      </div>

      <WrapperCarousel>
        <Carousel autoplay>
          {images?.map((imgSrc: string, index: any) => {
            return <img src={imgSrc} key={index} alt="LGSP" />;
          })}
        </Carousel>
      </WrapperCarousel>
    </div>
  );
};

const View = styled.div`
  .title {
    margin-top: 24px;
  }
`;
const WrapperCarousel = styled.div`
  .ant-carousel .slick-initialized .slick-slide {
    padding: 0px 50px;

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & img {
      max-width: 1200px;
      max-height: 628px;
      object-fit: fill;
    }
  }

  .ant-carousel .slick-dots li {
    background-color: #2b61eb50;
    border-radius: 3px;
    height: 5px;

    & button {
      width: 40px;
      border-radius: 3px;
      height: 5px;
    }
  }

  .ant-carousel .slick-dots li.slick-active button {
    width: 55px;
    background: #2b61eb;
    opacity: 1;
  }
`;

export default Banner;
