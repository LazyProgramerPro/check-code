import { Button, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { NotificationError } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { OutputMappingEntity } from '../redux/models';

const { Option } = Select;

interface FormCreateParamsOutputProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  isUpdate?: boolean;
  createOutputMapping?: Function;
  outputMappingUpdate?: OutputMappingEntity;
  handleUpdateOutputMapping?: Function;
  listOutputMapping?: OutputMappingEntity[];
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

function FormCreateParamsOutput(props: FormCreateParamsOutputProps) {
  const { getFieldDecorator, resetFields } = props.form;

  const {
    visible,
    onClose,
    isUpdate = false,
    createOutputMapping,
    outputMappingUpdate,
    handleUpdateOutputMapping,
    listOutputMapping,
  } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        if (createOutputMapping) {
          const isDuplicate = listOutputMapping?.some(e => e.name === values.name);
          if (isDuplicate) {
            NotificationError('Thất bại', 'Tham số đã tồn tại');
          } else {
            createOutputMapping({ ...values });
            resetFields();
          }
        }
      }
    });
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (handleUpdateOutputMapping) {
          if (listOutputMapping?.filter(e => e.name !== outputMappingUpdate?.name).some(e => e.name === values.name)) {
            NotificationError('Thất bại', 'Tham số đã tồn tại');
          } else {
            handleUpdateOutputMapping({ ...values });
            resetFields();
          }
        }
      }
    });
  };

  return (
    <Wrapper>
      <Modal
        title={isUpdate ? 'Cập nhật tham số đầu ra' : 'Tạo mới tham số đầu ra'}
        visible={visible}
        onCancel={handleClose}
        footer={
          <div className="footer">
            <Button onClick={handleClose}>Hủy</Button>

            {isUpdate ? (
              <Button type="primary" onClick={handleUpdate}>
                Lưu
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                Tạo mới
              </Button>
            )}
          </div>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: outputMappingUpdate?.name || '',
            })(<Input disabled={isUpdate} />)}
          </Form.Item>

          <Form.Item label="Kiểu tham số">
            {getFieldDecorator('paramType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: outputMappingUpdate?.paramType || 'Scalar',
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
              initialValue: outputMappingUpdate?.dataType || 'STRING',
            })(
              <Select>
                <Option value="STRING">STRING</Option>
                <Option value="INTEGER">INTEGER</Option>
                <Option value="REAL">REAL</Option>
                <Option value="DOUBLE">DOUBLE</Option>
                <Option value="NUMBERIC">NUMBERIC</Option>
                <Option value="TINYINT">TINYINT</Option>
                <Option value="SMALLINT">SMALLINT</Option>
                <Option value="DATE[yyyy-mm-dd]">DATE[yyyy-mm-dd]</Option>
                <Option value="TIME[hh:mm:ss]">TIME[hh:mm:ss]</Option>
                <Option value="TIMESTAMP">TIMESTAMP</Option>
                <Option value="BIT">BIT</Option>
                <Option value="ORACLE REF CURSOR">ORACLE REF CURSOR</Option>
                <Option value="BINARY">BINARY</Option>
                <Option value="BLOB">BLOB</Option>
                <Option value="CLOB">CLOB</Option>
                <Option value="UUID">UUID</Option>
                <Option value="VARINT">VARINT</Option>
                <Option value="INETADDRESS">INETADDRESS</Option>
                <Option value="QUERYSTRING">QUERYSTRING</Option>
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormCreateParamsOutputProps>()(FormCreateParamsOutput);

const Wrapper = styled.div``;
