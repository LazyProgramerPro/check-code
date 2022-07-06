import React from 'react';
import {connect} from 'react-redux';
import {Col, Form, Input, Modal, Row} from 'antd';
import {updateDepartment} from '../../../actions/departmentAction';

interface IDepartment {
  parent_id: any;
  name?: string;
  code?: string;
  id?: string;
}

interface IProps {
  form?: any;
  onClose: any;
  saveDone?: boolean;
  onCreateDepartment?: any;
  department: IDepartment;
}

const DepartmentForm = (props: IProps) => {
  const {getFieldDecorator} = props.form;
  const {parent_id, id, code} = props.department;
  const handleOk = (e: any) => {
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const v = {
          parent_id: parent_id,
          id: id,
          code: code,
          name: values.name,
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
    <Modal title="Cập nhật đơn vị" visible={true} onOk={handleOk} onCancel={handleCancel}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Mã đơn vị">
            {getFieldDecorator('code', {
              initialValue: props.department.code,
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mã đơn vị',
                },
              ],
            })(<Input readOnly={true} autoFocus={true} placeholder="Nhập mã đơn vị"/>)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Tên đơn vị">
            {getFieldDecorator('name', {
              initialValue: props.department.name,
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
  onCreateDepartment: (data: IDepartment) => {
    return dispatch(updateDepartment(data));
  },
});

const Department = connect(mapStateToProps, mapDispatchToProps)(DepartmentForm);
const UpdateDepartment: any = Form.create()(Department);
export default UpdateDepartment;
