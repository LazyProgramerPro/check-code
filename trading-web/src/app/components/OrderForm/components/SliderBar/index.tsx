// import { useState } from 'react';
import { Container, SliderContainer } from './style';
import { getToken } from 'app/components/common/common';
import { Slider } from 'antd';
const SliderBar = ({ defaultpercent, change }: any) => {
  const marks = {
    0: '',
    25: '',
    50: '',
    75: '',
    100: '',
  };
  return (
    <Container>
      <SliderContainer>
        <Slider
          marks={marks}
          defaultValue={0}
          className="slider"
          disabled={getToken() ? false : true}
          onChange={change}
          value={defaultpercent}
        />
      </SliderContainer>
    </Container>
  );
};
export default SliderBar;
