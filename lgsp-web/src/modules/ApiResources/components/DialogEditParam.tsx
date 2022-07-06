import { Button, Checkbox, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { updateParameterToResource } from '../redux/actions/api_resource_data';
import { AddParameterToResourceParam, ResourceParam } from '../redux/models';

const { Option } = Select;

interface DialogEditParamProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  paramEdit: any;
  data: ResourceParam;
}

interface FormData {
  value: string;
  label: string;
  type: string;
}

const mapState = (rootState: RootState) => ({ dataState: rootState.apiResource.dataState });

const connector = connect(mapState, { updateParameterToResource });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, DialogEditParamProps {}

function DialogEditParam(props: IProps) {
  const { visible, onClose, paramEdit, data, updateParameterToResource } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [type, setType] = useState<string>('Integer');

  const onChangeType = (value: any) => {
    setType(value);
    props.form.setFields({
      formData: {
        value: '',
      },
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      resetFields();
    }, 50);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params: AddParameterToResourceParam = {
          ...values,
          resource: {
            path: data.path,
            method: data.method,
          },
        };
        updateParameterToResource(params);
        handleClose();
      }
    });
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    } else {
      props.form.setFields({
        description: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  useEffect(() => {
    setType(paramEdit.type);
  }, [paramEdit, paramEdit.type]);

  const formatDataStringList = ['None', 'date', 'date-time', 'byte', 'binary', 'password'];

  const formatDataIntegerList = ['None', 'int64', 'int32'];

  const formatDataNumberList = ['None', 'float', 'double'];

  return (
    <View>
      <Modal
        title="Thay đổi tham số"
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </StyledButton>
        }
        visible={visible}
        onCancel={handleClose}
        onOk={handleSubmit}
      >
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại tham số">
                {getFieldDecorator('in', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: paramEdit.in,
                })(
                  <Select disabled={true}>
                    <Select.Option value="Query">Query</Select.Option>
                    <Select.Option value="Header">Header</Select.Option>
                    <Select.Option value="Cookie">Cookie</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Tên tham số">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: paramEdit.name,
                })(<Input disabled={true} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mô tả">
                {getFieldDecorator('description', {
                  initialValue: paramEdit.description ? paramEdit.description : '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: false, validator: validateDescription }],
                })(<TextArea rows={4} maxLength={5000} onPaste={pasteDescription} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Kiểu dữ liệu">
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: type,
                })(
                  paramEdit.in == 'formData' ? (
                    <Select onChange={onChangeType}>
                      <Select.Option value="integer">Integer</Select.Option>
                      <Select.Option value="number">Number</Select.Option>
                      <Select.Option value="string">String</Select.Option>
                      <Select.Option value="boolean">Boolean</Select.Option>
                    </Select>
                  ) : (
                    <Select onChange={onChangeType}>
                      <Select.Option value="integer">Integer</Select.Option>
                      <Select.Option value="number">Number</Select.Option>
                      <Select.Option value="string">String</Select.Option>
                      <Select.Option value="boolean">Boolean</Select.Option>
                    </Select>
                  ),
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              {type?.toLowerCase() === 'integer' && (
                <Form.Item label="Format Data">
                  {getFieldDecorator('formData', {
                    initialValue: formatDataIntegerList.includes(paramEdit.formData) ? paramEdit.formData : '',
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                    ],
                  })(
                    <Select>
                      <Option value="None">Không có</Option>
                      <Option value="int32">Int32</Option>
                      <Option value="int64">Int64</Option>
                    </Select>,
                  )}
                </Form.Item>
              )}

              {type?.toLowerCase() === 'number' && (
                <Form.Item label="Format Data">
                  {getFieldDecorator('formData', {
                    initialValue: formatDataNumberList.includes(paramEdit.formData) ? paramEdit.formData : '',
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                    ],
                  })(
                    <Select>
                      <Option value="None">Không có</Option>
                      <Option value="float">Float</Option>
                      <Option value="double">Double</Option>
                    </Select>,
                  )}
                </Form.Item>
              )}

              {type?.toLowerCase() === 'string' && (
                <Form.Item label="Format Data">
                  {getFieldDecorator('formData', {
                    initialValue: formatDataStringList.includes(paramEdit.formData) ? paramEdit.formData : '',
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                    ],
                  })(
                    <Select>
                      <Option value="None">Không có</Option>
                      <Option value="date">Date</Option>
                      <Option value="date-time">Date - time</Option>
                      <Option value="byte">Byte</Option>
                      <Option value="binary">Binary</Option>
                      <Option value="password">Password</Option>
                    </Select>,
                  )}
                </Form.Item>
              )}

              {type?.toLowerCase() === 'Boolean' && (
                <Form.Item label="Format Data">{getFieldDecorator('formData', {})(<Select />)}</Form.Item>
              )}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item style={{ marginBottom: '-10px' }}>
                {getFieldDecorator('required', {
                  // rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  valuePropName: 'checked',
                  initialValue: paramEdit.required,
                })(<Checkbox>Bắt buộc</Checkbox>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </View>
  );
}

export default connector(Form.create<IProps>()(DialogEditParam));
const StyledButton = styled.div`
  margin-top: -50px;
  margin-right: 10px;
  padding-bottom: 18px;
`;
const View = styled.div``;
