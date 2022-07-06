import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { Button, Form, Modal, Select } from 'antd';
import { useParams } from 'react-router';
import { showUpdateSubscriptionForm, updateApiPolicySubscription } from '../redux/actions/update_api_subscription';
import { UpdateApiPolicySubscriptionParam } from '../redux/models';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  getApiPolicyState: rootState.apiBusinessPlan.getPolicyState,
  updateApiSubscriptionState: rootState.apiBusinessPlan.updateApiSubscriptionUserState,
});

const conn = connect(mapStateToProps, { showUpdateSubscriptionForm, updateApiPolicySubscription });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const { Option } = Select;

const ChangePolicyAccessForm = (props: IProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const { getFieldDecorator, resetFields } = props.form;

  const [optionList, setOptionList] = useState<JSX.Element[]>([]);

  const [policy, setPolicy] = useState('');

  const handleChangePolicy = (value: any) => {
    setPolicy(value);
  };

  useEffect(() => {
    setPolicy(props.updateApiSubscriptionState?.params?.policy || '');
    let options = props.getApiPolicyState.item.policies.map(item => {
      return (
        <Option key={item} value={item}>
          {item}
        </Option>
      );
    });
    setOptionList(options);
  }, [props.updateApiSubscriptionState.show]);

  const onUpdateBtnClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const addParam: UpdateApiPolicySubscriptionParam = {
          apiId: apiId,
          username: props.updateApiSubscriptionState?.params?.username || '',
          policy: policy,
        };
        props.updateApiPolicySubscription(addParam);
      }
    });
  };

  const onCancelBtnClicked = (e: any) => {
    resetFields();
    setPolicy('');
    props.showUpdateSubscriptionForm(false);
  };

  return (
    <Modal
      maskClosable={false}
      title={'Thay đổi cấu hình truy cập'}
      visible={props.updateApiSubscriptionState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        props.showUpdateSubscriptionForm(false);
      }}
      afterClose={() => {
        resetFields();
      }}
      footer={''}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Giới hạn truy cập" className="group-area">
          {getFieldDecorator('policy', {
            initialValue: policy,
            rules: [{ required: true, message: 'Vui lòng chọn giới hạn truy cập' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn giới hạn"
              optionFilterProp="children"
              onChange={handleChangePolicy}
              allowClear={true}
            >
              {optionList}
            </Select>,
          )}
        </Form.Item>

        <ViewButton>
          <Button type="default" className="mr-3" onClick={onCancelBtnClicked}>
            Hủy
          </Button>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onUpdateBtnClicked}>
            Lưu
          </Button>
        </ViewButton>
      </Form>
    </Modal>
  );
};

export default conn(Form.create<IProps>()(ChangePolicyAccessForm));

const ViewButton = styled.div`
  margin-left: 355px;
`;
