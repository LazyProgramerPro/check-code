import React, {useState} from 'react';
import styled from 'styled-components';
import {Col, Row} from 'antd';
import moment from 'moment';

import Header from './Header';
import Employee from './Employee';
import Statistic from './Statistic';
import Timekeeping from './Timekeeping';
import History from './History';

const Dashboard = (props: any) => {
  const [filters, setFilters] = useState({time: moment(new Date()), type: 'day', group: 'tht'});

  const handleFilterChange = (value: any, type: String) => {
    switch (type) {
      case 'time':
        setFilters({...filters, time: value});
        break;
      case 'type':
        setFilters({...filters, type: value.target.value});
        break;
      case 'group':
        setFilters({...filters, group: value});
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Header/>

      <>
        <StyledRow gutter={20}>
          <Col xl={4} lg={6} md={8}>
            <Employee/>
          </Col>
          <Col xl={20} lg={18} md={16}>
            <Statistic filters={filters} onChangeFilter={handleFilterChange}/>
          </Col>
        </StyledRow>

        <StyledRow gutter={20}>
          <Col span={15}>
            <Timekeeping filters={filters}/>
          </Col>
          <Col span={9}>
            <History/>
          </Col>
        </StyledRow>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({
  className: 'contentPage',
})`
  padding-top: 0 !important;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

export default Dashboard;
