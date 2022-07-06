import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { NotificationError } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { QueryParamEntity } from '../redux/models';

const { Option } = Select;

interface FormCreateParamsInputProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  isUpdate?: boolean;
  createQueryParams?: Function;
  queryParamUpdate?: QueryParamEntity;
  updateQueryParams?: Function;
  listParamsInput?: QueryParamEntity[];
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

function FormCreateParamsInput(props: FormCreateParamsInputProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const {
    visible,
    onClose,
    isUpdate = false,
    createQueryParams,
    queryParamUpdate,
    updateQueryParams,
    listParamsInput,
  } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (createQueryParams) {
          const isDuplicate = listParamsInput?.some(e => e.name === values.name);
          if (isDuplicate) {
            NotificationError('Thất bại', 'Tham số đã tồn tại');
          } else {
            createQueryParams({ ...values, optional: optional });
            resetFields();
          }
        }
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (updateQueryParams) {
          if (listParamsInput?.filter(e => e.name !== queryParamUpdate?.name).some(e => e.name === values.name)) {
            NotificationError('Thất bại', 'Tham số đã tồn tại');
          } else {
            updateQueryParams({ ...values, optional: optional });
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

  const [optional, setOptional] = useState(queryParamUpdate?.optional);

  useEffect(() => {
    setOptional(queryParamUpdate?.optional);
  }, [queryParamUpdate]);

  return (
    <Wrapper>
      <Modal
        title={isUpdate ? 'Cập nhật tham số đầu vào' : 'Tạo mới tham số đầu vào'}
        visible={visible}
        onCancel={handleClose}
        maskClosable={false}
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
              initialValue: queryParamUpdate?.name || '',
            })(<Input disabled={isUpdate} />)}
          </Form.Item>

          <Form.Item label="Kiểu tham số">
            {getFieldDecorator('paramType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: queryParamUpdate?.paramType || 'Scalar',
            })(
              <Select>
                <Option value="Array">Array</Option>
                <Option value="Scalar">Scalar</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Kiểu dữ liệu">
            {getFieldDecorator('sqlType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: queryParamUpdate?.sqlType || 'STRING',
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

          <Form.Item label="Bắt buộc">
            {getFieldDecorator(
              'optional',
              {},
            )(<Checkbox checked={optional} onChange={e => setOptional(e.target.checked)} />)}
          </Form.Item>

          <Form.Item label="Giá trị mặc định">
            {getFieldDecorator('defaultValue', {
              initialValue: queryParamUpdate?.defaultValue || '',
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormCreateParamsInputProps>()(FormCreateParamsInput);

const Wrapper = styled.div``;
