import React from 'react';
import styled from 'styled-components';
import TimeEditItem from './TimeEditItem';

interface ITopContent {
  time: string;
  title: string;
}
const TopContent = (props: ITopContent) => {
  const { time, title } = props;
  return (
    <Wrapper>
      <h3 className="title">{title}</h3>
      <TimeEditItem time={time} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin: 0px;
  }
`;
export default TopContent;
