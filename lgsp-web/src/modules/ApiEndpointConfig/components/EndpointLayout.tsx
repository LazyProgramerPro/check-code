import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { Checkbox, Collapse, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { EEnvironmentType } from '../../GroupApiEndpoint/models';
import { SafetyCertificateFilled } from '@ant-design/icons';
import { showSecurityForm } from '../redux/actions/show_configuration_form';
import ProductionSecurityConfigModal from './ProductionSecurityConfigModal';
import { getApiEndpointConfiguration } from '../redux/actions/get_endpoint_configuration';
import { useParams } from 'react-router';
import {
  changeProductionEndpoint,
  changeSandboxEndpoint,
  setProductionEndpointActive,
  setSandboxEndpointActive,
} from '../redux/actions/update_endpoint_configuration';
import styled from 'styled-components';
import SandboxSecurityConfigModal from './SandboxSecurityConfigModal';
import { validateUrl } from 'src/constants/common';

const { Panel } = Collapse;

const mapStateToProps = (rootState: RootState) => ({
  getEndpointState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
});

const connector = connect(mapStateToProps, {
  getApiEndpointConfiguration,
  showSecurityForm,
  changeProductionEndpoint,
  changeSandboxEndpoint,
  setProductionEndpointActive,
  setSandboxEndpointActive,
});

type ReduxProps = ConnectedProps<typeof connector>;
export interface IProps extends ReduxProps, FormComponentProps {}

const EndpointLayout = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const [productionActive, setProductionActive] = useState(true);
  const [sandboxActive, setSandboxActive] = useState(true);

  useEffect(() => {
    setProductionActive(props.updateState.data?.productionActive || false);
    setSandboxActive(props.updateState.data?.sandboxActive || false);
  }, [props.updateState.data?.productionActive || props.updateState.data?.sandboxActive]);

  const callbackProduction = (key: string | string[]) => {
    setProductionActive(productionActive);
  };

  const callbackSandbox = (key: string | string[]) => {
    setSandboxActive(sandboxActive);
  };

  const onClickProduction = (e: any) => {
    const checked: boolean = e.target.checked;
    props.setProductionEndpointActive(checked);
    setProductionActive(checked);
  };

  const onClickSandbox = (e: any) => {
    const checked: boolean = e.target.checked;
    props.setSandboxEndpointActive(checked);
    setSandboxActive(checked);
  };

  const onShowModalProductionSecurityConfig = (e: any) => {
    props.showSecurityForm(true, EEnvironmentType.PROD, props.updateState.data?.productionSecurity);
  };

  const onShowModalSandboxSecurityConfig = (e: any) => {
    props.showSecurityForm(true, EEnvironmentType.TEST, props.updateState.data?.sandboxSecurity);
  };

  const onChangeProductionInput = (e: any) => {
    props.changeProductionEndpoint(e.target.value);
  };

  const onChangeSandboxInput = (e: any) => {
    props.changeSandboxEndpoint(e.target.value);
  };

  const validUrl = (rule: any, text: any, callback: any) => {
    if (text.length === 0) {
      return callback();
    }

    if (text.length > 0 && text.trim() === '') {
      return callback('URL không phù hợp');
    }

    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }
    props.form.setFields({
      production_endpoint: {
        value: text.trim(),
      },
    });
    return true;
  };

  const checkUrl = (rule: any, text: any, callback: any) => {
    if (text.length === 0) {
      return callback();
    }

    if (text.length > 0 && text.trim() === '') {
      return callback('URL không phù hợp');
    }

    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    }
    props.form.setFields({
      sandbox_endpoint: {
        value: text.trim(),
      },
    });
    return true;
  };

  useEffect(() => {
    resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getEndpointState.flag_reload]);

  return (
    <Wrapper>
      <Collapse
        activeKey={[1]}
        onChange={callbackProduction}
        bordered={false}
        className="resource-entity-collapse"
        style={{ cursor: 'pointer' }}
      >
        <Panel
          showArrow={false}
          forceRender={true}
          className="resource-entity-panel"
          header={
            <Checkbox checked={props.updateState.data?.productionActive} onChange={onClickProduction}>
              Endpoint cho môi trường Production
            </Checkbox>
          }
          key={props.updateState.data?.productionActive ? 1 : 0}
          style={{ cursor: 'pointer', background: 'white' }}
        >
          <div>
            <Form>
              <Form.Item label="Production Endpoint">
                {getFieldDecorator('production_endpoint', {
                  initialValue:
                    props.updateState.data?.productionEndpoints.length == 0
                      ? ''
                      : props.updateState.data?.productionEndpoints[0].url,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validUrl }],
                })(
                  <Input
                    onPressEnter={onChangeProductionInput}
                    onBlur={onChangeProductionInput}
                    suffix={
                      <SafetyCertificateFilled
                        onClick={onShowModalProductionSecurityConfig}
                        style={{ color: 'rgba(0,0,0,.45)', fontSize: '18px' }}
                      />
                    }
                    maxLength={1000}
                  />,
                )}
              </Form.Item>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Collapse activeKey={[1]} onChange={callbackSandbox} bordered={false} className="resource-entity-collapse">
        <Panel
          showArrow={false}
          forceRender={true}
          className="resource-entity-panel"
          style={{ cursor: 'pointer', background: 'white' }}
          header={
            <Checkbox checked={props.updateState.data?.sandboxActive} onChange={onClickSandbox}>
              Endpoint cho môi trường Testing
            </Checkbox>
          }
          key={props.updateState.data?.sandboxActive ? 1 : 0}
        >
          <div>
            <Form>
              <Form.Item label="Testing Endpoint">
                {getFieldDecorator('sandbox_endpoint', {
                  initialValue:
                    props.updateState.data?.sandboxEndpoints.length == 0
                      ? ''
                      : props.updateState.data?.sandboxEndpoints[0].url,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkUrl }],
                })(
                  <Input
                    onPressEnter={onChangeSandboxInput}
                    onBlur={onChangeSandboxInput}
                    suffix={
                      <SafetyCertificateFilled
                        onClick={onShowModalSandboxSecurityConfig}
                        style={{ color: 'rgba(0,0,0,.45)', fontSize: '18px' }}
                      />
                    }
                    maxLength={1000}
                  />,
                )}
              </Form.Item>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <ProductionSecurityConfigModal />
      <SandboxSecurityConfigModal />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
`;

export default connector(Form.create<IProps>()(EndpointLayout));
