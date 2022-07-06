import React from 'react';
import {Table} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {H4, Panel, PanelContent, PanelHeader} from './Common';

const truncateStr = (str: String, num: any) => {
  let newStr = str.slice(0, num + 1);
  return `${newStr}...`;
};

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
    width: '20%',
  },
  {
    title: 'Đơn vị công tác',
    dataIndex: 'group',
    key: 'group',
    width: '30%',
    render: (text: any) => {
      return <span title={text}>{truncateStr(text, 35)}</span>;
    },
  },
  {
    title: 'Hình thức',
    dataIndex: 'type',
    key: 'type',
    width: '20%',
  },
  {
    title: 'Thiết bị ghi nhận',
    dataIndex: 'device',
    key: 'device',
    width: '30%',
    render: (record: any) => {
      return record.cameraV2Responses || record.cardReaderResponses
    }
  },
];

const generateData = (n: Number) => {
  let data: any[] = [];

  for (let i = 0; i < n; i++) {
    const item = {
      time: '02/02/2010 18:46',
      group: 'Xưởng Led - Điện tử & TBCS - Nghành Điện tử tụ động - Tổ SMT',
      type: 'Quẹt thẻ',
      device: 'Tổ THT - Ngành DTTD',
    };
    data = [...data, item];
  }

  return data;
};

const History = (props: any) => {
  return (
    <Panel>
      <StyledHeader>
        <H4>Lịch sử điểm danh</H4>
        <StyledLink to="/quan-ly-cham-cong/lich-su-ghi-nhan-cham-cong">Xem tất cả</StyledLink>
      </StyledHeader>
      <StyledContent>
        <StyledTable columns={columns} dataSource={generateData(6)} pagination={false}/>
      </StyledContent>
    </Panel>
  );
};

const StyledHeader = styled(PanelHeader)`
  background-color: #fff;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const StyledContent = styled(PanelContent)`
  padding-top: 0;
  padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const StyledTable = styled(Table)`
  border: 1px solid #f2f2f2;
`;

export default History;
