import { Button, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { NotificationError } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { OutputMappingEntity } from '../../redux/models';
import { gen_uuid } from '../../../../utils/string_utils';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;

interface IProps extends FormComponentProps {
  show: boolean;
  close: (value: boolean) => void;
  createOutputMapping: (value: any) => void;
  listOutputMapping: OutputMappingEntity[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function FormCreateParamsOutput(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // const isDuplicate = props.listOutputMapping?.some(e => e.name === values.name);
        // if (isDuplicate) {
        //   NotificationError('Thất bại', 'Tham số đầu ra đã tồn tại');
        //   return;
        // }
        let params = {
          ...values,
          id: gen_uuid(),
        };
        props.createOutputMapping(params);
        NotificationSuccess('Thành công', 'Tạo mới tham số đầu ra thành công');
        resetFields();
      }
    });
  };

  const handleClose = () => {
    // resetFields();
    props.close(false);
  };

  const afterModalClose = () => {
    resetFields();
  };

  const checkValidateOutput = (e: any, text: any, callback: any) => {
    let isDuplicate = props.listOutputMapping || [];
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên tham số không hợp lệ');
    }
    const rs = isDuplicate.some(e => e.name === text);

    if (rs) {
      return callback('Tham số đã tồn tại');
    }
    return callback();
  };
  return (
    <Wrapper>
      <Modal
        title={'Tạo mới tham số đầu ra'}
        visible={props.show}
        onCancel={handleClose}
        afterClose={afterModalClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkValidateOutput }],
              initialValue: '',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Kiểu tham số">
            {getFieldDecorator('paramType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: 'Scalar',
            })(
              <Select>
                <Option value="Array">Array</Option>
                <Option value="Scalar">Scalar</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Kiểu dữ liệu">
            {getFieldDecorator('dataType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              // initialValue: 'STRING',
            })(
              <Select>
                <Option value="BINARY">BINARY</Option>
                <Option value="BIT">BIT</Option>
                <Option value="BLOB">BLOB</Option>
                <Option value="CLOB">CLOB</Option>
                <Option value="DATE[yyyy-mm-dd]">DATE[yyyy-mm-dd]</Option>
                <Option value="DOUBLE">DOUBLE</Option>
                <Option value="INETADDRESS">INETADDRESS</Option>
                <Option value="INTEGER">INTEGER</Option>
                <Option value="NUMBERIC">NUMBERIC</Option>
                <Option value="ORACLE REF CURSOR">ORACLE REF CURSOR</Option>
                <Option value="QUERYSTRING">QUERYSTRING</Option>
                <Option value="REAL">REAL</Option>
                <Option value="SMALLINT">SMALLINT</Option>
                <Option value="STRING">STRING</Option>
                <Option value="TINYINT">TINYINT</Option>
                <Option value="TIME[hh:mm:ss]">TIME[hh:mm:ss]</Option>
                <Option value="TIMESTAMP">TIMESTAMP</Option>
                <Option value="UUID">UUID</Option>
                <Option value="VARINT">VARINT</Option>
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Form.create<IProps>()(FormCreateParamsOutput);

const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
