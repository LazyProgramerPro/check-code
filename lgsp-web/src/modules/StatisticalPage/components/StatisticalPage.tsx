import React from 'react';
import styled from 'styled-components';
import Data from './Data';
const ViewBarChar = styled.div`
  /* .header {
    height: 62px;
    border-bottom: 0.5px solid #e0d6d6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
  padding: 0px 15px;
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
    }
  }
`;
const Content = styled.div`
  color: rgba(0, 0, 0, 0.65);
  padding: 16px;
`;

export default function DataLog() {

  document.title = 'Thống kê';

  return (
    <ViewBarChar>
      <div className="header">
        <div className="header-title">Thống kê</div>
      </div>
      <Data />
    </ViewBarChar>
  );
}
