import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { FormComponentProps } from 'antd/es/form';
import { Button, Col, Form, Icon, Input, Modal, Radio, Row, Select } from 'antd';
import {
  E_REST_API_TYPE,
  E_WSDL_TYPE,
  validateNormalString,
  validateNormalText,
  validateUrl,
} from 'src/constants/common';
import { createApi, showCreatApiForm } from '../redux/actions/create_api';
import Dragger from 'antd/es/upload/Dragger';
import { CreateGroupRestApiParams } from '../redux/models';
import Loading from 'src/components/Loading';
import { useHistory } from 'react-router';
import { validateApiInfo, validateApiName } from '../redux/services/apis';
import { getFileExt } from 'src/utils/string_utils';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  createState: rootState.groupRestApi.createState,
});

const connector = connect(mapStateToProps, { showCreatApiForm, createApi });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const CreateApiForm2 = (props: IProps) => {
  const history = useHistory();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };

  const { getFieldDecorator, resetFields } = props.form;

  const [apiType, setApiType] = useState(E_REST_API_TYPE.REST);
  const [wsdlType, setWsdlType] = useState(E_WSDL_TYPE.URL);
  const [files, setFiles] = useState<File[]>([]);
  const [valueEndpoint, setValueEndpoint] = useState('');
  const [valueWSDL, setValueWSDL] = useState('');
  useEffect(() => {
    setApiType(E_REST_API_TYPE.REST);
    setWsdlType(E_WSDL_TYPE.URL);
  }, [props.showCreatApiForm]);

  const beforeUpload = (file: File) => {
    setFiles([...files, file]);
    console.log('first', files);
    return false;
  };

  const validateName = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n d???ch v??? chia s??? kh??ng h???p l???');
    }
    validateApiName(text).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n d???ch v??? chia s??? ???? t???n t???i');
      }
      return callback();
    });
  };

  const validateVersion = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Phi??n b???n kh??ng h???p l???');
    }

    return callback();
  };

  const validateContext = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Context kh??ng h???p l???');
    }
    validateApiInfo(text).then(rs => {
      if (rs.code !== 0) {
        return callback('Context ???? t???n t???i');
      }
      return callback();
    });
  };

  const onChangeApiType = (e: any) => {
    const value = e.target.value;
    if (value !== undefined) {
      setApiType(value);
    }
  };

  const onChangeWsdlType = (e: any) => {
    const value = e.target.value;
    if (value !== undefined) {
      setWsdlType(value);
    }
  };

  const onClickCancelBtn = () => {
    props.showCreatApiForm(false);
    // setApiType(E_REST_API_TYPE.REST);
    resetFields();
  };

  const onClickCreateBtn = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let tempParam: CreateGroupRestApiParams = {
          apiType: apiType,
          name: values.name,
          deploymentLevel: values.deploymentLevel,
          context: values.context,
          version: values.version,
          endpointUrl: values.endpoint,
        };
        let param: CreateGroupRestApiParams = tempParam;
        if (apiType === E_REST_API_TYPE.SOAP) {
          if (wsdlType === E_WSDL_TYPE.FILE && files.length !== 0) {
            param = {
              ...tempParam,
              file: files[0],
            };
          } else if (wsdlType === E_WSDL_TYPE.URL) {
            param = {
              ...tempParam,
              wsdlUrl: values.wsdlUrl,
            };
          }
          props.createApi(param, history);
        } else if (apiType === E_REST_API_TYPE.SOAP2REST) {
          if (wsdlType === E_WSDL_TYPE.FILE && files.length !== 0) {
            param = {
              ...tempParam,
              file: files[0],
            };
          } else if (wsdlType === E_WSDL_TYPE.URL) {
            param = {
              ...tempParam,
              wsdlUrl: values.wsdlUrl,
            };
          }
          props.createApi(param, history);
        } else if (apiType === E_REST_API_TYPE.REST) {
          param = {
            ...tempParam,
          };
          props.createApi(param, history);
        }
      }
    });
  };

  const [selectedWSDLFiles, setSelectedWSDLFiles] = useState<any[]>([]);

  const handleSelectedWSDLFile = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setSelectedWSDLFiles(fileList);
  };

  const validateWSDLFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      callback();
      return;
    }
    let fileName = value.file.name;
    let fileType = value.file.type;
    console.log('csv fileName: ' + fileName + ', type: ' + fileType);
    let ext = getFileExt(fileName);
    if ('wsdl' !== ext) {
      callback('Vui l??ng ch???n file csv');
      return;
    }
    callback();
  };

  // const validateURL = (text: string): boolean => {
  //   const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  //   if (regex.test(text)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const validateFormCreate = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL kh??ng ph?? h???p');
    }
    return callback();
  };

  const pasteWSDL = () => {
    props.form.setFields({
      wsdlUrl: {
        value: valueWSDL.trim(),
      },
    });
  };

  const pasteEndpoit = () => {
    props.form.setFields({
      endpoint: {
        value: valueEndpoint.trim(),
      },
    });
  };
  return (
    <View>
      <Modal
        zIndex={2}
        maskClosable={false}
        title={'T???o m???i d???ch v??? chia s???'}
        visible={props.createState.show}
        centered={true}
        width="650px"
        onCancel={() => {
          resetFields();
          props.showCreatApiForm(false);
        }}
        afterClose={() => {
          resetFields();
          setApiType(E_REST_API_TYPE.REST);
        }}
        footer={''}
      >
        <Form layout="vertical">
          <Form.Item>
            {getFieldDecorator('apiType', {
              initialValue: E_REST_API_TYPE.REST,
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            })(
              <Radio.Group name="type" onChange={e => onChangeApiType(e)}>
                <Radio value={E_REST_API_TYPE.REST}>Rest API</Radio>
                <Radio value={E_REST_API_TYPE.SOAP} style={{ marginLeft: '32px' }}>
                  SOAP API
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {apiType === E_REST_API_TYPE.REST ? null : (
            <div>
              <Form.Item label="Ki???u tri???n khai" className="group-area" {...formItemLayout}>
                {getFieldDecorator('deployType', {
                  initialValue: E_REST_API_TYPE.SOAP,
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                })(
                  <Radio.Group name="type" onChange={e => onChangeApiType(e)}>
                    <Radio value={E_REST_API_TYPE.SOAP}>Gi??? nguy??n</Radio>
                    <Radio value={E_REST_API_TYPE.SOAP2REST} className="ml-4">
                      Chuy???n th??nh Rest
                    </Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="Ki???u nh???p" className="group-area" {...formItemLayout}>
                {getFieldDecorator('wsdlType', {
                  initialValue: E_WSDL_TYPE.URL,
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                })(
                  <Radio.Group name="type" onChange={e => onChangeWsdlType(e)}>
                    <Radio value={E_WSDL_TYPE.URL}>WSDL URL</Radio>
                    <Radio style={{ paddingLeft: '5px' }} value={E_WSDL_TYPE.FILE} className="ml-4">
                      WSDL File
                    </Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              {wsdlType === E_WSDL_TYPE.URL ? (
                <Form.Item label="WSDL URL">
                  {getFieldDecorator('wsdlUrl', {
                    initialValue: valueWSDL,
                    validateTrigger: 'onBlur',
                    rules: [
                      { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                      { validator: validateFormCreate },
                    ],
                  })(<Input placeholder="Nh???p ???????ng d???n file WSDL" maxLength={1000} onPaste={pasteWSDL} />)}
                </Form.Item>
              ) : (
                <Form.Item>
                  {getFieldDecorator('wsdlFile', {
                    valuePropName: 'file',
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
                      },
                      { validator: validateWSDLFile },
                    ],
                  })(
                    <Dragger
                      beforeUpload={beforeUpload}
                      multiple={false}
                      accept=".wsdl"
                      showUploadList={true}
                      fileList={selectedWSDLFiles}
                      onChange={handleSelectedWSDLFile}
                    >
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Nh???p ho???c k??o th??? file v??o ????y</p>
                    </Dragger>,
                  )}
                </Form.Item>
              )}
            </div>
          )}
          <Form.Item label="T??n d???ch v??? chia s???">
            {getFieldDecorator('name', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateName }],
            })(<Input placeholder="Nh???p t??n d???ch v??? chia s???" maxLength={50} />)}
          </Form.Item>

          <Row>
            <Col xs={24} md={8}>
              <Form.Item label="Context">
                {getFieldDecorator('context', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateContext }],
                })(<Input style={{ width: '98%' }} placeholder="Nh???p context" maxLength={60} />)}
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="C???p tri???n khai">
                {getFieldDecorator('deploymentLevel', {
                  initialValue: 'local',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                })(
                  <Select style={{ width: '197px' }}>
                    <Select.Option value="local">?????a ph????ng</Select.Option>
                    <Select.Option value="central">Trung ????ng</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Phi??n b???n">
                {getFieldDecorator('version', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateVersion }],
                })(<Input placeholder="Nh???p phi??n b???n" maxLength={60} />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Endpoint">
            {getFieldDecorator('endpoint', {
              initialValue: valueEndpoint,
              validateTrigger: 'onBlur',
              rules: [{ validator: validateFormCreate }],
            })(
              <Input
                style={{ width: '100%' }}
                placeholder="Nh???p ???????ng d???n endpoint"
                maxLength={1000}
                onPaste={pasteEndpoit}
              />,
            )}
          </Form.Item>
          <div style={{ marginBottom: '43px', marginTop: '12px' }}>
            <Button htmlType="submit" type="primary" style={{ float: 'right' }} onClick={onClickCreateBtn}>
              T???o m???i
            </Button>
            <Button style={{ marginRight: '15px', float: 'right' }} onClick={onClickCancelBtn}>
              H???y
            </Button>
          </div>
        </Form>
        {props.createState.loading ? <Loading /> : null}
      </Modal>
    </View>
  );
};

export default connector(Form.create<IProps>()(CreateApiForm2));
const View = styled.div``;
