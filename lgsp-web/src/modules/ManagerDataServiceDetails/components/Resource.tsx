import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Resource {
  description: 'string';
  method: 'string';
  params: any[];
  path: 'string';
  queryName: 'string';
}
interface ResourceProps {
  resourceEntities?: any[];
}

export default function Resource(props: ResourceProps) {
  const { resourceEntities } = props;

  const [page, setPage] = useState(1);

  const columns: ColumnProps<Resource>[] = [
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      key: 'path',
      width: 300,
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Tên query',
      dataIndex: 'queryName',
      key: 'queryName',
      width: 250,
    },
  ];

  const data: Resource[] = [];

  return (
    <Wrapper>
      <h3>Danh sách Resource</h3>

      <div className="dataSource">
        <Table
          columns={columns}
          rowKey="id"
          dataSource={resourceEntities}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          className="custom-table-2"
          pagination={{
            current: page,
            pageSize: 5,
            total: data.length,
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
