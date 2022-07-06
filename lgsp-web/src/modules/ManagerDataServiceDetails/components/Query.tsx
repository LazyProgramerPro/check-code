import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Query {
  dataSourceName: 'string';
  groupElement: 'string';
  name: 'string';
  outputs?: any[];
  params?: any[];
  query: 'string';
  rowName: 'string';
}

interface QueryProps {
  queryEntities?: any[];
}

export default function Query(props: QueryProps) {
  const { queryEntities } = props;

  const [page, setPage] = useState(1);

  const columns: ColumnProps<Query>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Query',
      dataIndex: 'query',
      render: (text: any, record: any) => {
        if (record.queryType == 0) {
          return <>{`${record.query}`}</>;
        }
        if (record.queryType == 1) {
          return <>{`${record.expression}`}</>;
        }
        return <></>;
      },
      ellipsis: true,
    },
    {
      title: 'Tên Data Source',
      dataIndex: 'dataSourceName',
      key: 'dataSourceName',
      width: 250,
    },
  ];

  return (
    <Wrapper>
      <h3>Danh sách câu lệnh query</h3>

      <div className="dataSource">
        <Table
          className="custom-table-2"
          columns={columns}
          dataSource={queryEntities}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 5,
            total: queryEntities?.length,
            onChange: page => {
              setPage(page);
            },
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
          }}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 45px;

  h3 {
    font-weight: bold;
    margin: 0px;
    padding-bottom: 16px;
  }

  .dataSource {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    padding: 15px;
  }
`;
