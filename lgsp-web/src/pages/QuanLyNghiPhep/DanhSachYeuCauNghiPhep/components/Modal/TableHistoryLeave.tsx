import React, { Component } from 'react';
import { Table } from 'antd';

const data = [
  {
    no: '1',
    personal: 'Đỗ Hoàng Nam',
    action: 'Tạo',
    time: '02/02/2020',
  },
  {
    no: '2',
    personal: 'Admin',
    action: 'Sửa',
    time: '14/02/2020',
  },
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'no',
  },
  {
    title: 'Đối tượng thao tác',
    dataIndex: 'personal',
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
  },
];

class TableHistory extends Component {
  render() {
    return (
      <div>
        <div style={{ marginBottom: '10px', color: '#000' }}>Lịch sử thao tác với yêu cầu xin nghỉ phép</div>
        <Table
          columns={columns}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          dataSource={data}
          size="middle"
          pagination={false}
        />
      </div>
    );
  }
}

export default TableHistory;
