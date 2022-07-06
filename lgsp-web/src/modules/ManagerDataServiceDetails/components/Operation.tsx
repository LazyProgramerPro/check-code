import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Operation {
  description: 'string';
  name: 'string';
  params: any[];
  queryName: 'string';
}

interface OperationProps {
  operationEntities?: any[];
}

export default function Operation(props: OperationProps) {
  const { operationEntities } = props;
  const [page, setPage] = useState(1);
  const columns: ColumnProps<Operation>[] = [
    {
      title: 'Tên Operation',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Tên query',
      dataIndex: 'queryName',
      key: 'status',
    },
  ];

  return (
    <Wrapper>
      <h3>Danh sách Operation</h3>

      <div className="dataSource">
        <Table
          columns={columns}
          dataSource={operationEntities}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          rowKey="id"
          className="custom-table"
          pagination={{
            current: page,
            pageSize: 5,
            total: operationEntities?.length,
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
