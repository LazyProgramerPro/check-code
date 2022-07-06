import React from 'react';
import { Col, Popconfirm, Row, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import EditFormRepuest from '../Modal/EditFormRepuest';
import FormCheckRepuest from '../Modal/FormCheckRepuest';

export const EditableContext = React.createContext({ form: {} });

const REQUEST: any = {
  approved: { color: ' #55B135 ', text: 'Đã duyệt' },
  pending: { color: '#F5A623', text: 'Chưa duyệt' },
  reject: { color: '#E45356', text: 'Bị từ chối' },
};

// const ACTION: any = {
//   checkrequest: { class: ' show-icon ' },
//   done: { class: ' null-icon ' },
// };

const data = [
  {
    key: '0',
    code: '163414',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '1',
    code: '345423',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `pending`,
    action: `checkrequest`,
  },
  {
    key: '2',
    code: '125768',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `reject`,
    action: `done`,
  },
  {
    key: '3',
    code: '967535',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `reject`,
    action: `done`,
  },
  {
    key: '4',
    code: '163415',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `pending`,
    action: `checkrequest`,
  },
  {
    key: '5',
    code: '163416',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '6',
    code: '345427',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '7',
    code: '125768',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '8',
    code: '967535',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '9',
    code: '163423',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
  {
    key: '10',
    code: '163433',
    fullname: 'Đỗ Hoàng Nam',
    room: `Xưởng LED - Điện tử & TBCS - Nghành điện tử tự  - Tổ SMT`,
    position: `Công nhân`,
    startday: `03/03/2020`,
    enddate: `03/03/2020`,
    numberdays: `1`,
    request: `approved`,
    action: `done`,
  },
];
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    console.log(selected, selectedRows, changeRows);
  },
};

interface State {
  data: any;
  editingKey: any;
  deleteKey: any;
  visible: any;
  editVisible: any;
  approvalVisible: any;
}

interface ColumnPropsEditable<T> extends ColumnProps<T> {
  editable?: boolean;
}

export default class EditableTable extends React.Component<{}, State> {
  private columns: Array<ColumnPropsEditable<any>>;

  constructor(props: {}) {
    super(props);
    this.state = { data, editingKey: '', deleteKey: '', visible: false, approvalVisible: false, editVisible: false };
    this.columns = [
      {
        title: 'Mã nhân viên',
        dataIndex: 'id',
      },
      {
        title: 'Họ và tên',
        dataIndex: 'fullname',
      },
      {
        title: 'Đơn vị công tác',
        dataIndex: 'room',
        width: '18%',
      },
      {
        title: 'Chức vụ',
        dataIndex: 'position',
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'startday',
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'enddate',
      },
      {
        title: 'Số ngày',
        dataIndex: 'numberdays',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'request',
        render: request => {
          const sta = REQUEST[request];
          return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Tag
                style={{ width: '5px', height: '5px', borderRadius: '50%', padding: '0', display: 'inline-block' }}
                color={sta.color}
              ></Tag>
              {sta.text}
            </span>
          );
        },
      },
      {
        title: () => {
          return <div style={{ whiteSpace: 'nowrap' }}>Thao tác</div>;
        },
        dataIndex: 'action',
        width: '10%',
        render: (text: string, record: any) => {
          return (
            <Row style={{ whiteSpace: 'nowrap' }}>
              <Col className="gutter-row" md={8}>
                <span onClick={() => this.showModalApprovalRequest(record.key)} className="rd-icon rd-icon-pass">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                  <span className="path6"></span>
                  <span className="path7"></span>
                </span>
                <FormCheckRepuest
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.approvalVisible === record.key}
                  onCancelRequest={this.handleCancelRequest}
                  onNotApprovalRequest={this.handleCancelFormApproval}
                  onApprovalRequest={this.handleApprovalRequest}
                  onUpdateRequest={this.handleUpdateRequest}
                />
              </Col>

              <Col className="gutter-row" md={8}>
                <span onClick={() => this.showModalEditRequest(record.key)} className="rd-icon rd-icon-edit">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </span>
                <EditFormRepuest
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.editVisible === record.key}
                  onCancelEdit={this.handleCancelEdit}
                  onSaveEdit={this.handleSaveEditRequest}
                />
              </Col>

              <Col className="gutter-row" md={8}>
                <Popconfirm title="Chắc chắn để xóa?" onConfirm={() => this.handleDelete(record.key)}>
                  <span className="rd-icon rd-icon-delete-solid">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </span>
                </Popconfirm>
              </Col>
            </Row>
          );
        },
      },
    ];
  }

  formRef: any;

  // Modal 1
  handleCancelRequest = () => {
    alert('Huỷ');
    this.setState({ approvalVisible: false });
  };
  showModalApprovalRequest = (key: any) => {
    this.setState({ approvalVisible: key });
  };
  handleCancelFormApproval = () => {
    alert('Từ chối');
    this.setState({ approvalVisible: false });
  };
  handleApprovalRequest = () => {
    alert('Duyệt');
    this.setState({ approvalVisible: false });
  };
  handleUpdateRequest = () => {
    alert('Cập nhật');
    this.setState({ approvalVisible: false });
  };

  // Modal 2
  showModalEditRequest = (key: any) => {
    this.setState({ editVisible: key });
  };
  handleCancelEdit = () => {
    this.setState({ editVisible: false });
  };
  handleSaveEditRequest = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ editVisible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  public handleDelete = (key: any) => {
    let data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
  };

  public render() {
    const columns = this.columns.map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
      };
    });

    return (
      <Table
        className="custom-table"
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        dataSource={this.state.data}
        columns={columns}
        rowSelection={rowSelection}
      />
    );
  }
}
