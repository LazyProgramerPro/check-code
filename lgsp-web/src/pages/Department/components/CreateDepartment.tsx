import React from 'react';
import {connect} from 'react-redux';
import {Col, Form, Input, Modal, Row} from 'antd';
import {createDepartment} from '../../../actions/departmentAction';
import {CreateDepartmentVariable} from '../../../models/department';

interface IProps {
  form?: any;
  onClose: any;
  saveDone?: boolean;
  onCreateDepartment?: any;
  department: CreateDepartmentVariable;
}

const DepartmentForm = (props: IProps) => {
  const {getFieldDecorator} = props.form;
  const parent_id = props.department?.parent_id;
  const handleOk = (e: any) => {
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const v = {
          ...values,
          parent_id,
        };
        props.onCreateDepartment(v);
      }
    });
  };

  if (props.saveDone === true) {
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  }

  const handleCancel = (e: any) => {
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  };
  return (
    <Modal title="Thêm mới đơn vị" visible={true} onOk={handleOk} onCancel={handleCancel}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Mã đơn vị">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mã đơn vị',
                },
              ],
            })(<Input autoFocus={true} placeholder="Nhập mã đơn vị"/>)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Tên đơn vị">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập tên đơn vị',
                },
              ],
            })(<Input placeholder="Nhập tên đơn vị"/>)}
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.department.loading,
    saveDone: state.department.saveDone,
    data: state.department.data,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onCreateDepartment: (data: CreateDepartmentVariable) => {
    return dispatch(createDepartment(data));
  },
});

const Department = connect(mapStateToProps, mapDispatchToProps)(DepartmentForm);
const CreateDepartment: any = Form.create()(Department);

export default CreateDepartment;
