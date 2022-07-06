import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import styled from 'styled-components';

interface DataSource {
  dataSourceType: 'string';
  database: 'string';
  dbType: 'string';
  id: 'string';
  name: 'string';
  password: 'string';
  port: number;
  queries: any[];
  server: 'string';
  username: 'string';
  active: boolean;
}

interface DataSourceProps {
  data?: any[];
}

export default function DataSource(props: DataSourceProps) {
  const { data } = props;

  const [page, setPage] = useState(1);

  const columns: ColumnProps<DataSource>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Data Source',
      dataIndex: 'dataSourceType',
      key: 'dataSourceType',
      render: (text: any, record: any) => <>{record.dbType}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      width: 250,
      render: (text: any, record: any) => <>{`Hoạt động`}</>,
    },
  ];

  return (
    <Wrapper>
      <h3>Danh sách Data Source</h3>

      <div className="dataSource">
        <Table
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 5,
            total: data?.length,
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
