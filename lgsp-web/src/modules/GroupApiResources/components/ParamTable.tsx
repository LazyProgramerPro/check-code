import { Button, Icon, Table } from 'antd';
import React, { useState } from 'react';
import { IPagination, PAGE, SIZE } from 'src/models/common';
import { IParamObject } from '../redux/models';
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
  dataSource: IParamObject[];
}

const ParamTable = (props: ITableParam) => {
  const { onEdit, onDelete, dataSource } = props;
  const [pagination, setPagination] = useState<IPagination>({
    page: PAGE,
    size: SIZE,
  });

  const columns: ColumnProps<IParamObject>[] = [
    {
      title: 'Loại tham số',
      dataIndex: 'in',
      key: 'in',
    },
    {
      title: 'Tên tham sô',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Bắt buộc',
      dataIndex: 'required',
      key: 'required',
      render: (_text: boolean) => <span>{_text ? 'Required' : 'No Required'}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_text: string, record: IParamObject) => (
        <div className="table-action">
          <div>
            <Button size="small" className="btnIcon" icon="edit" onClick={() => onEdit(record)}></Button>
            <Button size="small" className="btnIcon" icon="delete" onClick={() => onDelete(record)}></Button>
          </div>
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

export default ParamTable;
