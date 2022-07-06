import { Button, Icon, Table } from 'antd';
import React, { useState } from 'react';
import { IPagination, PAGE, SIZE } from 'src/models/common';
import { IResponseObject } from '../redux/models';
import { ColumnProps } from 'antd/es/table';
import styled from 'styled-components';

const View = styled.div`
  width: 100%;
  .btnIcon {
    margin: 0px 4px;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
`;

interface ITableParam {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  dataSource: IResponseObject[];
}

const ResponseTable = (props: ITableParam) => {
  const { onEdit, onDelete, dataSource } = props;
  const [pagination, setPagination] = useState<IPagination>({
    page: PAGE,
    size: SIZE,
  });

  const columns: ColumnProps<IResponseObject>[] = [
    {
      title: 'Mã code',
      dataIndex: 'code',
      key: 'code',
      width: '30%',
    },
    {
      title: 'Message trả về',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
    },
    {
      title: 'Hành động',
      width: '20%',
      key: 'action',
      render: (_text: string, record: IResponseObject) => (
        <div>
          <Button size="small" className="btnIcon" icon="edit" onClick={() => onEdit(record)}></Button>
          <Button size="small" className="btnIcon" icon="delete" onClick={() => onDelete(record)}></Button>
        </div>
      ),
    },
  ];
  return (
    <View>
      <Table
        rowKey="id"
        className="custom-table-paging-client"
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: dataSource?.length,
          onChange: page => setPagination({ ...pagination, page }),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </View>
  );
};

export default ResponseTable;
