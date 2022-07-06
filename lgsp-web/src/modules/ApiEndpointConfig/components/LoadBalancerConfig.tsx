import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { EEndpointType } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { DeleteOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons';
import { showLoadBalanceForm } from '../redux/actions/show_configuration_form';
import LoadBalancerConfigModal from './LoadBalancerConfigModal';
import {
  addProductionEndpoint,
  addSandboxEndpoint,
  changeFailOverEndpointList,
  changeHttpEndpointList,
  changeLoadBalancerEndpointList,
  removeProductionEndpoint,
  removeSandboxEndpoint,
} from '../redux/actions/update_endpoint_list';
import { FormComponentProps } from 'antd/lib/form';
import { validateUrl } from 'src/constants/common';
import styled from 'styled-components';

const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiEndpointConfiguration.getState,
  showState: rootState.apiEndpointConfiguration.showState,
  updateState: rootState.apiEndpointConfiguration.updateState,
  updateEndpointListState: rootState.apiEndpointConfiguration.updateEndpointListState,
});

const conn = connect(mapStateToProps, {
  showLoadBalanceForm,
  changeLoadBalancerEndpointList,
  changeFailOverEndpointList,
  changeHttpEndpointList,
  addProductionEndpoint,
  removeProductionEndpoint,
  addSandboxEndpoint,
  removeSandboxEndpoint,
});

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const LoadBalancerConfig = (props: IProps) => {
  const [productionTitle, setProductionTitle] = useState('Môi trường Production');
  const [sandboxTitle, setSandboxTitle] = useState('Môi trường Testing');
  const { getFieldDecorator, resetFields } = props.form;
  const [currentProductionInput, setCurrentProductionInput] = useState('');
  const [currentSandboxInput, setCurrentSandboxInput] = useState('');

  useEffect(() => {
    resetURL2Field();
    resetURL3Field();
    resetFields();
  }, [props.updateState.checkClick]);

  useEffect(() => {
    if (props.getState.item?.endpointType === EEndpointType.load_balancer) {
      setProductionTitle('Endpoint cân bằng tải cho môi trường production');
      setSandboxTitle('Endpoint cân bằng tải cho môi trường test');
    } else if (props.getState.item?.endpointType === EEndpointType.failover) {
      setProductionTitle('Failover endpoint cho môi trường production');
      setSandboxTitle('Failover endpoint cho môi trường test');
    }
  }, [props.getState.item, props.updateEndpointListState.params.type]);

  const handleTypeChange = (value: any) => {
    if (value === EEndpointType.load_balancer) {
      setProductionTitle('Endpoint cân bằng tải cho môi trường production');
      setSandboxTitle('Endpoint cân bằng tải cho môi trường test');
      props.changeLoadBalancerEndpointList();
    } else if (value === EEndpointType.failover) {
      setProductionTitle('Failover endpoint cho môi trường production');
      setSandboxTitle('Failover endpoint cho môi trường test');
      props.changeFailOverEndpointList();
    } else {
      props.changeHttpEndpointList();
    }
  };

  const onChangeProductionInput = (e: any) => {
    setCurrentProductionInput(e.target.value);
  };

  const onChangeSandboxInput = (e: any) => {
    setCurrentSandboxInput(e.target.value);
  };

  const productionAddBtnClick = (e: any) => {
    const isValid: boolean = validateUrl(currentProductionInput);
    if (!isValid) {
      return;
    }
    props.addProductionEndpoint(currentProductionInput.trim());
    setCurrentProductionInput('');
    resetURL2Field();
  };

  const sandboxAddBtnClick = (e: any) => {
    const isValid: boolean = validateUrl(currentSandboxInput);
    if (!isValid) {
      return;
    }
    props.addSandboxEndpoint(currentSandboxInput.trim());
    setCurrentSandboxInput('');
    resetURL3Field();
  };

  const resetURL2Field = () => {
    if (currentProductionInput.trim() != '') {
      props.form.setFieldsValue({
        URL2: '',
      });
    }
  };

  const resetURL3Field = () => {
    if (currentSandboxInput.trim() != '') {
      props.form.setFieldsValue({
        URL3: '',
      });
    }
  };

  const productionRemoveBtnClick = (e: any, index: number) => {
    props.removeProductionEndpoint(index);
  };

  const sandboxRemoveBtnClick = (e: any, index: number) => {
    props.removeSandboxEndpoint(index);
  };

  const preventUpdateUrl = (e: any) => {
    e.preventDefault();
    return false;
  };

  const onClickLoadBalanceConfig = (e: any) => {
    props.showLoadBalanceForm(true);
  };

  //CheckvalidateURL
  const validUrl2 = (rule: any, text: any, callback: any) => {
    if (text === '' || text.length === 0) {
      return true;
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }

    props.form.setFields({
      URL2: {
        value: text.trim(),
      },
    });
    return true;
  };
  const validUrl3 = (rule: any, text: any, callback: any) => {
    if (text === '' || text.length === 0) {
      return true;
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }

    props.form.setFields({
      URL3: {
        value: text.trim(),
      },
    });
    return true;
  };
  const validUrl1 = (rule: any, text: any, callback: any) => {
    const { field } = rule;
    if (text === '' || text.length === 0) {
      return true;
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }

    props.form.setFields({
      [field]: {
        value: text.trim(),
      },
    });
    return true;
  };

  const validUrl = (rule: any, text: any, callback: any) => {
    const { field } = rule;
    if (text === '' || text.length === 0) {
      return true;
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }

    props.form.setFields({
      [field]: {
        value: text.trim(),
      },
    });
    return true;
  };

  const renderProductionList = (productions: string[]) => {
    if (productions == undefined) {
      return <></>;
    }
    return productions.map((item: any, index: number) => {
      const key = 'production-' + index;
      const divKey = 'productionDiv-' + index;
      return (
        <div style={{ margin: '10px 0px 10px 0px' }} key={divKey}>
          <Form>
            <Form.Item>
              {getFieldDecorator(key, {
                initialValue: item,
                validateTrigger: 'onBlur',
                rules: [{ validator: validUrl }],
              })(
                <Input
                  placeholder="URL"
                  style={{
                    width: '97.5%',
                    marginLeft: '15px',
                    color: 'rgba(0, 0, 0, 0.85)',
                    backgroundColor: 'transparent',
                  }}
                  key={key}
                  readOnly={true}
                  suffix={
                    <DeleteOutlined
                      onClick={e => productionRemoveBtnClick(e, index)}
                      style={{ color: 'rgba(0,0,0,.45)', fontSize: '14px', marginLeft: '-17px' }}
                    />
                  }
                  maxLength={1000}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
      );
    });
  };

  const renderSandboxList = (sandboxes: string[]) => {
    if (sandboxes == undefined) {
      return <></>;
    }
    return sandboxes.map((item: any, index: number) => {
      const key: string = 'sandbox-' + index;
      const divKey = 'sandboxDiv-' + index;
      return (
        <div style={{ margin: '10px 0px 10px 0px' }} key={divKey}>
          <Form>
            <Form.Item>
              {getFieldDecorator(key, {
                initialValue: item,
                validateTrigger: 'onBlur',
                rules: [{ validator: validUrl1 }],
              })(
                <Input
                  placeholder="URL"
                  style={{ width: '97.5%', marginLeft: '15px' }}
                  key={key}
                  readOnly={true}
                  suffix={
                    <DeleteOutlined
                      onClick={e => sandboxRemoveBtnClick(e, index)}
                      style={{ color: 'rgba(0,0,0,.45)', fontSize: '14px', marginLeft: '-17px' }}
                    />
                  }
                  maxLength={1000}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
      );
    });
  };

  return (
    <div className="mt-4 mb-4">
      <h3>Cấu hình cân bằng tải và chịu lỗi</h3>
      <Row>
        <Col span={5}>
          <Form>
            <Form.Item>
              <Select
                showSearch
                optionFilterProp="children"
                onChange={handleTypeChange}
                value={props.updateEndpointListState?.params.type}
                allowClear={true}
                style={{ width: '100%' }}
              >
                <Option value={EEndpointType.http}>Không</Option>
                <Option value={EEndpointType.load_balancer}>Cân bằng tải</Option>
                <Option value={EEndpointType.failover}>Chịu lỗi</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
        {props.updateEndpointListState.params.type === EEndpointType.load_balancer ? (
          <Col span={1}>
            <SettingFilled
              style={{ color: 'rgba(0,0,0,.45)', fontSize: '20px', marginLeft: '10px', paddingTop: '6px' }}
              onClick={onClickLoadBalanceConfig}
            />
          </Col>
        ) : null}
      </Row>
      {props.updateEndpointListState.params.type === EEndpointType.http ? null : (
        <View>
          {props.updateState.data?.productionActive ? (
            <div>
              <div style={{ margin: '10px 0px 10px 0px' }}>
                <p style={{ marginLeft: '1%' }}> {productionTitle}</p>
              </div>

              <div style={{ width: '97.5%', marginLeft: '15px' }}>
                <Form key="productionUrlForm">
                  <Form.Item hasFeedback>
                    {getFieldDecorator('URL2', {
                      initialValue: '',
                      // validateTrigger: 'onBlur',
                      rules: [{ validator: validUrl2 }],
                    })(
                      <Input
                        placeholder="URL"
                        key="production-input"
                        onChange={onChangeProductionInput}
                        suffix={
                          <PlusOutlined
                            disabled={currentProductionInput === ''}
                            style={{
                              color: 'rgba(0,0,0,.45)',
                              fontSize: '20px',
                              marginLeft: '10px',
                              paddingTop: '2px',
                            }}
                            onClick={productionAddBtnClick}
                          />
                        }
                        maxLength={1000}
                      />,
                    )}
                  </Form.Item>
                </Form>
              </div>

              <div>{renderProductionList(props.updateEndpointListState.params.productionList)}</div>
            </div>
          ) : (
            <></>
          )}

          {props.updateState.data?.sandboxActive ? (
            <div>
              <div style={{ margin: '10px 0px 10px 0px' }}>
                <p style={{ marginLeft: '1%' }}>{sandboxTitle}</p>
              </div>
              <div style={{ width: '97.5%', marginLeft: '15px' }}>
                <Form>
                  <Form.Item>
                    {getFieldDecorator('URL3', {
                      initialValue: '',
                      // validateTrigger: 'onBlur',
                      rules: [{ validator: validUrl3 }],
                    })(
                      <Input
                        placeholder="URL"
                        key="sandbox-input"
                        onChange={onChangeSandboxInput}
                        suffix={
                          <PlusOutlined
                            disabled={currentSandboxInput === ''}
                            style={{
                              color: 'rgba(0,0,0,.45)',
                              fontSize: '20px',
                              marginLeft: '10px',
                              paddingTop: '2px',
                            }}
                            onClick={sandboxAddBtnClick}
                          />
                        }
                        maxLength={1000}
                      />,
                    )}
                  </Form.Item>
                </Form>
              </div>
              <div style={{ marginBottom: '20px' }}>
                {renderSandboxList(props.updateEndpointListState.params.sandboxList)}
              </div>
            </div>
          ) : (
            <></>
          )}
        </View>
      )}
      <LoadBalancerConfigModal />
    </div>
  );
};

export default conn(Form.create<IProps>()(LoadBalancerConfig));
const View = styled.div`
  border: 1px solid #f9f9f9;
  border-radius: 10px;
  box-shadow: #c9c3c359 0px 5px 15px;
  margin-top: 20px;

  form .has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    margin-right: -18px;
  }
`;
