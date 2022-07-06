import React from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { showLoadBalanceForm } from '../redux/actions/show_configuration_form';
import { ELoadBalancerAlgorithm, ELoadBalancerSession, ESecurityType } from '../../GroupApiEndpoint/models';
import { LoadBalancerConfigurationEntity } from '../redux/models';
import { updateLoadBalancerConfiguration } from '../redux/actions/update_endpoint_configuration';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  showState: rootState.apiEndpointConfiguration.showState,
  getState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
});

const conn = connect(mapStateToProps, { showLoadBalanceForm, updateLoadBalancerConfiguration });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const { Option } = Select;

const LoadBalancerConfigModal = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const onClickSubmitBtn = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: LoadBalancerConfigurationEntity = {
          algorithm: values.algorithm,
          sessionManagement: values.session,
          sessionTimeout: values.timeout,
        };

        props.updateLoadBalancerConfiguration(param);
        NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
        props.showLoadBalanceForm(false);
      }
    });
  };

  const onClickCancelBtn = (e: any) => {
    resetFields();
    props.showLoadBalanceForm(false);
  };

  return (
    <Modal
      title="Cấu hình cân bằng tải"
      visible={props.showState.loadBalanceShow}
      onOk={onClickSubmitBtn}
      onCancel={onClickCancelBtn}
      okText="Lưu"
      cancelText="Hủy"
      footer={
        <StyledButton>
          <Button onClick={onClickCancelBtn}>Hủy</Button>

          <Button type="primary" onClick={onClickSubmitBtn}>
            Lưu
          </Button>
        </StyledButton>
      }
    >
      <Form>
        <Form.Item label="Thuật toán">
          {getFieldDecorator('algorithm', {
            initialValue:
              props.updateState.data?.loadBalancerConfiguration?.algorithm || ELoadBalancerAlgorithm.ROUND_ROBIN,
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <Select showSearch optionFilterProp="children" allowClear={true}>
              <Option value={ELoadBalancerAlgorithm.ROUND_ROBIN}> ROUND-ROBIN</Option>
              <Option value={ELoadBalancerAlgorithm.WEIGHTED_ROUND_ROBIN}>WEIGHTED ROUND-ROBIN</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Quản lý session">
          {getFieldDecorator('session', {
            initialValue:
              props.updateState.data?.loadBalancerConfiguration?.sessionManagement || ELoadBalancerSession.NONE,
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <Select showSearch optionFilterProp="children" allowClear={true}>
              <Option value={ELoadBalancerSession.NONE}>Không</Option>
              <Option value={ELoadBalancerSession.CLIENT_ID}>Client ID</Option>
              <Option value={ELoadBalancerSession.HTTP_COOKIE}>HTTP Cookie</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Thời gian hết hạn session (Mili giây)">
          {getFieldDecorator('timeout', {
            initialValue: props.updateState.data?.loadBalancerConfiguration?.sessionTimeout || 300,
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <InputNumber
              placeholder="300"
              min={1}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              maxLength={255}
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default conn(Form.create<IProps>()(LoadBalancerConfigModal));
const StyledButton = styled.div`
  margin-top: -35px;
  margin-right: 10px;
  padding-bottom: 18px;
`;
