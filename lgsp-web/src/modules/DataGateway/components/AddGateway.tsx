import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { getDataGateway } from '../redux/actions/get_data_gateway';
import { createGateway, showCreateGatewayForm } from '../redux/actions/create_gateway';
import { CreateGatewayParams, GetDataGatewayParams } from '../redux/models';
import TextArea from 'antd/lib/input/TextArea';
import { initHostList } from '../redux/reducers/create_gateway';
import { v4 } from 'uuid';
import {
  validateHostString,
  validateNormalString,
  validateNormalStringGateway,
  validateNormalText,
  validateNumber,
} from 'src/constants/common';
import { validateNameCreate } from '../redux/service/apis';

const ViewAdd = styled.div`
  .ant-row {
    width: 505px;
    height: 283px;
    left: 29px;
    top: 417px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
const ListHost = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  margin-bottom: 20px;
  .ant-col.ant-col-md-24.ant-col-md-6 {
    margin-top: -18px;
  }
  .url {
    font-size: 12px;
    line-height: 19px;
    color: #818181;
    margin-left: 31px;
  }
`;

const ButtonDialog = styled.div`
  margin-left: 343px;
  margin-top: 10px;
`;
const ShowModal = styled.div`
  .ant-form-item {
    margin-bottom: 4px !important;
  }
`;

interface FormCreateProps {
  refreshList: Function;
}

const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  createState: rootState.dataGateway.createState,
  getDataGatewayState: rootState.dataGateway.getDataGatewayState,
});
const conn = connect(mapStateToProps, { createGateway, showCreateGatewayForm, getDataGateway });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps, FormCreateProps {}
function AddGateway(props: IProps) {
  const [visible, setVisible] = useState(false);
  const { refreshList } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [list, setList] = useState<string[]>([v4()]);

  const onCreateClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const paramListHost = list.map((e: any) => ({
          context: values[`context${e}`],
          host: values[`host${e}`],
          httpPort: values[`httpPort${e}`],
          httpsPort: values[`httpsPort${e}`],
        }));

        let param: CreateGatewayParams = {
          description: values.description,
          name: values.name,
          displayName: values.displayName,
          hostList: paramListHost,
        };
        props.createGateway(param);
        setVisible(false);
        refreshList();
        resetFields();
      }
    });
  };

  const newList = () => {
    setList([...list, v4()]);
  };

  const onCancelClicked = () => {
    props.showCreateGatewayForm(false);
    setVisible(false);
  };

  const afterClose = () => {
    resetFields();
    setList([v4()]);
  };

  const onDelete = (id: string) => {
    const newArr = list.filter((e: any) => e !== id);
    setList(newArr);
  };

  const showdialog = () => {
    setVisible(true);
  };

  const validateName = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateNormalStringGateway(value);
    if (!isValid) {
      return callback('Tên Gateway không hợp lệ');
    }
    validateNameCreate(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Tên Gateway đã tồn tại');
      } else {
        return callback();
      }
    });
  };
  const validateUsername = (rule: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên hiển thị không hợp lệ');
    }
    return callback();
  };

  const checkHttps = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      return callback();
    } else {
      const isValid = validateNormalText(value);
      if (!isValid) {
        return callback('Tên HTTP(s) context không hợp lệ');
      } else {
        return callback();
      }
    }
  };

  const validateNumberInput = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    if (text < 0 || text > 65535) {
      return callback('HTTPS port không hợp lệ');
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('HTTPS port không hợp lệ');
    }
    return callback();
  };

  const validateNumberHttp = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }

    if (text < 0 || text > 65535) {
      return callback('HTTP port không hợp lệ');
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('HTTP port không hợp lệ');
    }
    return callback();
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
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

  const validateNameHost = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateHostString(value);
    if (!isValid) {
      return callback('Tên host không hợp lệ');
    }
    return callback();
  };

  useEffect(() => {
    let params: GetDataGatewayParams = {
      ...props.getDataGatewayState.params,
    };
    props.getDataGateway(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };
  return (
    <ViewAdd>
      <Button icon="plus" onClick={showdialog}>
        Tạo mới Gateway Environment
      </Button>

      <Modal
        title="Tạo mới Gateway Environment"
        visible={visible}
        footer={null}
        onCancel={onCancelClicked}
        afterClose={afterClose}
        maskClosable={false}
      >
        <Form>
          <ShowModal>
            <Form.Item label="Tên">
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Đây là trường bắt buộc nhập',
                  },
                  { validator: validateName },
                ],
                validateTrigger: 'onBlur',
              })(<Input maxLength={255} />)}
            </Form.Item>

            <Form.Item label="Tên hiển thị">
              {getFieldDecorator('displayName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'Đây là trường bắt buộc nhập',
                  },
                  {
                    validator: validateUsername,
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Input maxLength={255} />)}
            </Form.Item>

            <Form.Item label="Mô tả ">
              {getFieldDecorator('description', {
                initialValue: '',
                validateTrigger: 'onBlur',
                rules: [{ validator: validateDescription }],
              })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
            </Form.Item>

            {list.map((e: any, index: any) => (
              <ListHost key={e}>
                <Form.Item>
                  <Row>
                    <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                      <Form.Item label={`Tên host- ${index + 1}`}>
                        {getFieldDecorator(`host${e}`, {
                          initialValue: '',
                          rules: [
                            {
                              required: true,
                              message: 'Đây là trường bắt buộc nhập',
                            },
                            { validator: validateNameHost },
                          ],
                          validateTrigger: 'onBlur',
                        })(<Input maxLength={255} />)}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={3} style={{ marginLeft: '280px' }}>
                      {list.length > 1 && <Button onClick={() => onDelete(e)}>Xóa</Button>}
                    </Col>
                  </Row>
                </Form.Item>

                <Row>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                    <Form.Item label="HTTP(s) context">
                      {getFieldDecorator(`context${e}`, {
                        initialValue: '',
                        rules: [
                          // {
                          //   required: true,
                          //   message: 'Đây là trường bắt buộc nhập',
                          // },
                          { validator: checkHttps },
                        ],
                        validateTrigger: 'onBlur',
                      })(<Input maxLength={255} />)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                    <Form.Item label="HTTP port">
                      {getFieldDecorator(`httpPort${e}`, {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: 'Đây là trường bắt buộc nhập',
                          },
                          { validator: validateNumberHttp },
                        ],
                        validateTrigger: 'onBlur',
                      })(<Input maxLength={5} />)}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                    <Form.Item label="HTTPS port">
                      {getFieldDecorator(`httpsPort${e}`, {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: 'Đây là trường bắt buộc nhập',
                          },
                          { validator: validateNumberInput },
                        ],
                        validateTrigger: 'onBlur',
                      })(<Input maxLength={5} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <div className="url">
                  <span>Gateway Access URLS</span>
                  <p>
                    http://{props.form.getFieldValue(`host${e}`)}:{props.form.getFieldValue(`httpPort${e}`)}/
                    {props.form.getFieldValue(`context${e}`)} | https://{props.form.getFieldValue(`host${e}`)}:
                    {props.form.getFieldValue(`httpsPort${e}`)}/{props.form.getFieldValue(`context${e}`)}
                  </p>
                </div>
              </ListHost>
            ))}

            <Button onClick={newList}>Thêm Host</Button>
            <ButtonDialog>
              <Button onClick={onCancelClicked} style={{ marginRight: '15px' }}>
                Hủy
              </Button>
              <Button htmlType="submit" type="primary" onClick={onCreateClicked}>
                Tạo mới
              </Button>
            </ButtonDialog>
          </ShowModal>
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(AddGateway));
