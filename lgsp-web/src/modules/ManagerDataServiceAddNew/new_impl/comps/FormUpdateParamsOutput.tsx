import { Button, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';
import styled from 'styled-components';
import { OutputMappingEntity } from '../../redux/models';

const { Option } = Select;

interface IProps extends FormComponentProps {
  show: boolean;
  close: (value: boolean) => void;
  item: any;
  updateOutputMapping: (value: any) => void;
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

function FormUpdateParamsOutput(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        let oldName = props.item.name;
        if (values.name !== oldName) {
          NotificationError('Thất bại', 'Vui lòng không sửa tên');
          return;
        }

        let params = {
          ...values,
          id: props.item.id,
        };

        props.updateOutputMapping(params);
        NotificationSuccess('Thành công', 'Cập nhật tham số đầu ra thành công');
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

  const checkParamsOutput = (e: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên tham số không hợp lệ');
    }

    return callback();
  };
  return (
    <Wrapper>
      <Modal
        title={'Cập nhật tham số đầu ra'}
        visible={props.show}
        onCancel={handleClose}
        afterClose={afterModalClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkParamsOutput }],
              initialValue: props.item.name || '',
            })(<Input maxLength={50} disabled={true} />)}
          </Form.Item>

          <Form.Item label="Kiểu tham số">
            {getFieldDecorator('paramType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: props.item.paramType || 'Scalar',
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
              initialValue: props.item.dataType || 'STRING',
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

export default Form.create<IProps>()(FormUpdateParamsOutput);

const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -20px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
