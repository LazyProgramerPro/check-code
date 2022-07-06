import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Styled from '../styled/detailStyled';
import { getEmployees } from '../../../actions/employeeAction';

const { Search } = Input;
const { Option } = Select;

interface IProps {
  form: any;
  onGetEmployees: any;
  onClose: any;
  data: any;
}

const AddUserForm = (props: IProps) => {
  const { getFieldDecorator } = props.form;
  const [checkList, setCheckList] = useState([]);

  const columns = [
    {
      title: 'Mã nhân viên',
      render: (row: any) => <Link to="">{row.id}</Link>,
    },
    {
      title: 'Họ và tên',
      render: (row: any) => {
        return <span>{row.full_name}</span>;
      },
    },
    {
      title: 'Vị trí',
      render: (row: any) => {
        return <span>{row.position}</span>;
      },
    },
    {
      title: 'Ngày sinh',
      render: (row: any) => {
        return <span>{row.birth_commune}</span>;
      },
    },
    {
      title: 'Quê quán',
      render: (row: any) => {
        return <span>{row.home_town}</span>;
      },
    },
    {
      title: 'SĐT',
      render: (row: any) => {
        return <span>{row.phone}</span>;
      },
    },
    {
      title: 'Email',
      render: (row: any) => {
        return <span>{row.email}</span>;
      },
    },
  ];

  const filter = () => {
    props.form.validateFields((err: any, values: any) => {
      props.onGetEmployees({
        page: 0,
        size: 50,
        key: values.key,
        // status: values.status,
      });
    });
  };

  const handleOk = (e: any) => {
    if (typeof props.onClose === 'function') {
      props.onClose(checkList);
    }
  };

  const handleCancel = (e: any) => {
    if (typeof props.onClose === 'function') {
      props.onClose(null);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      let data: any = [];
      selectedRows.map(function(row: any, index: any) {
        data.push(row.id);
      });
      setCheckList(data);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => {
      return {
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      };
    },
  };
  const data = props.data && props.data.pages ? props.data.pages.content : [];

  return (
    <Modal width={1024} title="Thêm nhân viên" visible={true} onOk={handleOk} onCancel={handleCancel}>
      <Styled.Table>
        <Row>
          <Col className="clearfix" span={24}>
            <Row gutter={8}>
              <Col span={9}>
                <Form.Item>{getFieldDecorator('key', {})(<Search />)}</Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item>
                  {getFieldDecorator(
                    'position',
                    {},
                  )(
                    <Select placeholder="Vị trí">
                      <Option value="">Tất cả</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item>
                  {getFieldDecorator(
                    'job',
                    {},
                  )(
                    <Select placeholder="Chúc danh">
                      <Option value="">Tất cả</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item>
                  {getFieldDecorator(
                    'status',
                    {},
                  )(
                    <Select placeholder="Select a option and change input text above">
                      <Option value="">Tất cả</Option>
                      <Option value="working">Đang Làm việc</Option>
                      <Option value="0">Đã nghỉ</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8} className="m-15">
              <Col span={4}>
                <Button block={true} type={'primary'} onClick={() => filter()}>
                  Tìm kiếm
                </Button>
              </Col>
              <Col span={4}>
                <Button block={true} type={'default'}>
                  Làm mới bộ lọc
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Table
              rowKey="id"
              locale={{
                emptyText: 'Không tìm thấy kết quả tương ứng',
              }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            ,
          </Col>
        </Row>
      </Styled.Table>
    </Modal>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.employee.loading,
    data: state.employee.data,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onGetEmployees: (data: any) => {
    return dispatch(getEmployees(data));
  },
});

const AddUser: any = Form.create()(AddUserForm);
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
