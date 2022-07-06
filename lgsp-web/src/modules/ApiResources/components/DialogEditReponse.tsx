import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { updateResponseToResource } from '../redux/actions/api_resource_data';
import { AddResponseToResourceParam, ResourceParam } from '../redux/models';
const { Option } = Select;

interface DialogEditReponseProps extends FormComponentProps {
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

const codes = [
  100,
  200,
  201,
  204,
  206,
  301,
  302,
  303,
  304,
  307,
  308,
  401,
  403,
  404,
  406,
  407,
  409,
  410,
  412,
  416,
  418,
  425,
  451,
  500,
  501,
  502,
  503,
  504,
];

const connector = connect(mapState, { updateResponseToResource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, DialogEditReponseProps {}

function DialogEditReponse(props: IProps) {
  const { visible, onClose, paramEdit, data, updateResponseToResource } = props;
  const { getFieldDecorator, resetFields } = props.form;

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
        const params: AddResponseToResourceParam = {
          ...values,
          resource: {
            path: data.path,
            method: data.method,
          },
        };
        updateResponseToResource(params);
        handleClose();
      }
    });
  };

  const validateMessage = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Message trả về không phù hợp');
      }
      props.form.setFields({
        description: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };
  const pasteMessage = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };
  return (
    <View>
      <Modal
        title="Thay đổi Response"
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
              <Form.Item label="Mã code">
                {getFieldDecorator('code', { initialValue: paramEdit.code })(
                  <Select disabled={true}>
                    {codes.map((e: any, i: any) => {
                      return (
                        <Option value={e} key={i}>
                          {e}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Message trả về">
                {getFieldDecorator('description', {
                  initialValue: paramEdit.description ? paramEdit.description : '',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateMessage }],
                  validateTrigger: 'onBlur',
                })(<TextArea rows={4} maxLength={255} onPaste={pasteMessage} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </View>
  );
}

export default connector(Form.create<IProps>()(DialogEditReponse));
const StyledButton = styled.div`
  margin-top: -65px;
  margin-right: 10px;
  padding-bottom: 18px;
`;
const View = styled.div`
  .ant-modal-footer {
    padding-bottom: 16px;
  }
`;
