import React from 'react';
import DataLog from './DataLog';

import styled from 'styled-components';

export default function SystemLogPage() {

  document.title = 'Danh sách log hệ thống';

  return (
    <ViewDataLog>
      <div className="contentPage">
        <div className={'header'}>
          <div className="header-title">Danh sách log hệ thống</div>
        </div>
        <DataLog />
      </div>
    </ViewDataLog>
  );
}

const ViewDataLog = styled.div`
padding: 0px 15px;
 .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
    }
`;
const Content = styled.div`
  color: rgba(0, 0, 0, 0.65);
  padding: 16px;
`;
