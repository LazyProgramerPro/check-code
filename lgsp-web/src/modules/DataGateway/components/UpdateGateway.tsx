import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { getDataGateway } from '../redux/actions/get_data_gateway';
import { showUpdateGatewayForm, updateGateway } from '../redux/actions/update_gateway';
import { useParams } from 'react-router';
import { GetDataGatewayParams, UpdateGatewayParam } from '../redux/models';
import { validateHostString, validateNormalString, validateNormalText, validateNumber } from 'src/constants/common';
import { v4 } from 'uuid';
interface UpdateProps {
  page: number;
}

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
  .url {
    font-size: 12px;
    line-height: 19px;
    color: #818181;
    margin-left: 31px;
  }
`;

const ButtonDialog = styled.div`
  margin-left: 374px;
  margin-top: 10px;
`;
const ShowModal = styled.div`
  .ant-form-item {
    margin-bottom: 4px !important;
  }
`;

const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  updateState: rootState.dataGateway.updateState,
  getDataGatewayState: rootState.dataGateway.getDataGatewayState,
});
const conn = connect(mapStateToProps, { getDataGateway, showUpdateGatewayForm, updateGateway });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps, UpdateProps {}
function UpdateGateway(props: IProps) {
  const { getDataGatewayState, getDataGateway, showUpdateGatewayForm, updateState, updateGateway, page } = props;
  const [visible, setVisible] = useState(false);
  const [size] = useState<number>(50);
  const params: any = useParams();
  const [gatewayId] = useState<string>(params.gatewayId);
  const [valueSearch, setValueSearch] = useState('');
  const { getFieldDecorator, resetFields } = props.form;

  const [listHost, setListHost] = useState<any[]>([]);

  const loadDataGateway = () => {
    let params: GetDataGatewayParams = {
      ...getDataGatewayState.params,
      text: valueSearch,
      page: page,
      size: size,
      gatewayId: gatewayId,
    };
    getDataGateway(params);
  };

  const onUpdateGatewayClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const paramListHost = listHost.map((e: any, index: any) => ({
          context: values[`context${e.id}`],
          host: values[`host${e.id}`],
          httpPort: values[`httpPort${e.id}`],
          httpsPort: values[`httpsPort${e.id}`],
        }));

        const updateParam: UpdateGatewayParam = {
          gatewayId: updateState.originData?.id || '',
          name: values.name,
          description: values.description,
          displayName: values.displayName,
          hostList: paramListHost,
        };
        console.log('originData: ', updateState.originData);
        props.updateGateway(updateParam);
        resetFields();
        props.showUpdateGatewayForm(false);
        loadDataGateway();
      }
    });
  };

  useEffect(() => {
    loadDataGateway();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, valueSearch]);

  const onDelete = (id: any) => {
    const newArr = listHost.filter((e: any) => e.id !== id);

    setListHost(newArr);
  };

  useEffect(() => {
    loadDataGateway();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newList = () => {
    const newHost = { id: v4() };
    setListHost([...listHost, newHost]);
  };

  const onBtnCancelClicked = () => {
    // resetFields();
    props.showUpdateGatewayForm(false);
  };

  const onCreateClicked = (e: any) => {
    e.preventDefault();
  };
  const showdialog = () => {
    setVisible(true);
  };

  const validateUsername = (rule: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n hi???n th??? kh??ng h???p l???');
    }
    return callback();
  };

  const validateNumberInput = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    if (text < 0 || text > 65535) {
      return callback('HTTPS port kh??ng h???p l???');
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('HTTPS port kh??ng h???p l???');
    }
    return callback();
  };

  const validateNumberHttp = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    if (text < 0 || text > 65535) {
      return callback('HTTP port kh??ng h???p l???');
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('HTTP port kh??ng h???p l???');
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

  useEffect(() => {
    const newListHost = updateState.originData?.hostList.map((e: any) => ({
      ...e,
      id: v4(),
    }));
    setListHost(newListHost || []);
  }, [updateState.originData]);

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  const checkHttps = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return true;
    }
    const isValid = validateNormalText(value);
    if (!isValid) {
      return callback('T??n HTTP(s) context kh??ng h???p l???');
    }
    return true;
  };

  const validateNameHost = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateHostString(value);
    if (!isValid) {
      return callback('T??n host kh??ng h???p l???');
    }
    return callback();
  };
  return (
    <ViewAdd>
      <Modal
        title="C???p nh???t Gateway Environment"
        visible={updateState.show}
        footer={null}
        centered={true}
        maskClosable={false}
        onCancel={() => {
          // resetFields();
          showUpdateGatewayForm(false);
          setVisible(false);
        }}
        afterClose={() => {
          resetFields();
        }}
      >
        <Form>
          <ShowModal>
            <Form.Item label="T??n">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '????y l?? tr?????ng b???t bu???c nh???p',
                  },
                ],
                initialValue: updateState.originData?.name,
              })(<Input disabled={true} maxLength={255} />)}
            </Form.Item>

            <Form.Item label="T??n hi???n th???">
              {getFieldDecorator('displayName', {
                rules: [
                  {
                    required: true,
                    message: '????y l?? tr?????ng b???t bu???c nh???p',
                  },
                  { validator: validateUsername },
                ],
                initialValue: updateState.originData?.displayName,
                validateTrigger: 'onBlur',
              })(<Input maxLength={255} />)}
            </Form.Item>

            <Form.Item label="M?? t??? ">
              {getFieldDecorator('description', {
                initialValue: updateState.originData?.description,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateDescription }],
              })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
            </Form.Item>

            {listHost.map((e: any, index: number) => (
              <ListHost key={e.id}>
                <Form.Item>
                  <Row>
                    <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                      <Form.Item label={`T??n host- ${index + 1}`}>
                        {getFieldDecorator(`host${e.id}`, {
                          rules: [
                            {
                              required: true,
                              message: '????y l?? tr?????ng b???t bu???c nh???p',
                            },
                            { validator: validateNameHost },
                          ],
                          initialValue: e.host,
                        })(
                          <Input
                            disabled={index < (updateState.originData?.hostList?.length || [].length)}
                            maxLength={255}
                          />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={3} style={{ marginLeft: '280px' }}>
                      {listHost.length > 1 && <Button onClick={() => onDelete(e.id)}>X??a</Button>}
                    </Col>
                  </Row>
                </Form.Item>

                <Row>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                    <Form.Item label="HTTP(s) context">
                      {getFieldDecorator(`context${e.id}`, {
                        initialValue: e.context || '',
                        rules: [{ validator: checkHttps }],
                      })(
                        <Input
                          disabled={index < (updateState.originData?.hostList?.length || [].length)}
                          maxLength={255}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-2.5px' }}>
                    <Form.Item label="HTTP port">
                      {getFieldDecorator(`httpPort${e.id}`, {
                        rules: [
                          {
                            required: true,
                            message: '????y l?? tr?????ng b???t bu???c nh???p',
                          },
                          { validator: validateNumberHttp },
                        ],
                        initialValue: e.httpPort,
                      })(
                        <Input
                          disabled={index < (updateState.originData?.hostList?.length || [].length)}
                          maxLength={5}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6} style={{ marginLeft: '31px', marginTop: '-3px' }}>
                    <Form.Item label="HTTPS port">
                      {getFieldDecorator(`httpsPort${e.id}`, {
                        rules: [
                          {
                            required: true,
                            message: '????y l?? tr?????ng b???t bu???c nh???p',
                          },
                          { validator: validateNumberInput },
                        ],
                        initialValue: e.httpsPort,
                      })(
                        <Input
                          disabled={index < (updateState.originData?.hostList?.length || [].length)}
                          maxLength={5}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <div className="url">
                  <span>Gateway Access URLS</span>
                  <p>
                    http://{props.form.getFieldValue(`host${e.id}`)}:{props.form.getFieldValue(`httpPort${e.id}`)}/
                    {props.form.getFieldValue(`context${e.id}`)} | http://{props.form.getFieldValue(`host${e.id}`)}:
                    {props.form.getFieldValue(`httpsPort${e.id}`)}/{props.form.getFieldValue(`context${e.id}`)}
                  </p>
                </div>
              </ListHost>
            ))}

            <Button onClick={newList}>Th??m Host</Button>
            <ButtonDialog>
              <Button onClick={onBtnCancelClicked} style={{ marginRight: '15px' }}>
                H???y
              </Button>
              <Button htmlType="submit" type="primary" onClick={onUpdateGatewayClicked}>
                L??u
              </Button>
            </ButtonDialog>
          </ShowModal>
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(UpdateGateway));
