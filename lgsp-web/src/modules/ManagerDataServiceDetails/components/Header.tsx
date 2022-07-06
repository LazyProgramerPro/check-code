import React from 'react';
import styled from 'styled-components';
import { DetailDataService } from '../redux/models';

export default function Header() {
  return (
    <Wrapper>
      <p>Thông tin chi tiết dịch vụ dữ liệu</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 52px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;

  p {
    margin: 0px;
  }
`;
