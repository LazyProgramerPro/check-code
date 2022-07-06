import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { QueryParamEntity } from '../../redux/models';
import { gen_uuid } from '../../../../utils/string_utils';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;

interface IProps extends FormComponentProps {
  show: boolean;
  close: (value: boolean) => void;
  item: any;
  updateInputMapping: (value: any) => void;
  listInputMapping: QueryParamEntity[];
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

function FormUpdateParamsInput(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const [optional, setOptional] = useState<boolean>(false);

  useEffect(() => {
    if (props.show) {
      let opt = props.item.optional || false;
      setOptional(opt);
    }
  }, [props.item.optional, props.show]);

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
          optional: optional,
          id: props.item.id,
        };
        props.updateInputMapping(params);
        NotificationSuccess('Thành công', 'Cập nhật tham số đầu vào thành công');
        resetFields();
      }
    });
  };

  const handleClose = () => {
    // resetFields();
    props.close(false);
  };

  const afterModalClose = () => {
    setOptional(false);
    resetFields();
  };
  const checkParamsInput = (e: any, text: any, callback: any) => {
    const isDuplicate = props.listInputMapping || [];
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên tham số không hợp lệ');
    }

    const rs = isDuplicate.some(e => e.name === text);

    if (text === props.item.name) {
      return true;
    }
    if (rs) {
      return callback('Tham số đã tồn tại');
    }
    return callback();
  };

  const validateValues = (rule: any, text: any, callback: any) => {
    const checkValue = text.trim();
    props.form.setFields({
      defaultValue: {
        value: checkValue,
      },
    });
    return true;
  };

  const pasteDefaultValue = () => {
    const valueDefaultValue = props.form.getFieldValue('defaultValue');
    props.form.setFields({
      defaultValue: {
        value: valueDefaultValue.trim(),
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title={'Cập nhật tham số đầu vào'}
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
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkParamsInput }],
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
            {getFieldDecorator('sqlType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: props.item.sqlType || 'STRING',
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
                <Option value="TIME[hh:mm:ss]">TIME[hh:mm:ss]</Option>
                <Option value="TIMESTAMP">TIMESTAMP</Option>
                <Option value="TINYINT">TINYINT</Option>
                <Option value="UUID">UUID</Option>
                <Option value="VARINT">VARINT</Option>
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
              rules: [{ validator: validateValues }],
              validateTrigger: 'onBlur',
              initialValue: props.item.defaultValue || '',
            })(<Input maxLength={255} onPaste={pasteDefaultValue} />)}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Form.create<IProps>()(FormUpdateParamsInput);

const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
