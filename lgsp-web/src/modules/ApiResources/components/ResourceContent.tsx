import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { ApiResourceEntity, ChangeDescriptionResourceParam, ChangePolicyResourceParam } from '../redux/models';
import SelectField from '../../../components/customField/SelectField';
import { POLICES } from '../../../constants/common';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import ParamTable from './ParamTable';
import ResponseTable from './ResponseTable';
import { Form, Select } from 'antd';
import { policyMap, policyResourceMap } from '../../../models/common';
import AddParameterForm from './AddParameterForm';
import AddResponseForm from './AddResponseForm';
import { changeDescriptionResource, changePolicyResource } from '../redux/actions/api_resource_data';
import styled from 'styled-components';
import { set } from 'immer/dist/utils/common';
import { FormComponentProps } from 'antd/lib/form';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { changePolicyResource, changeDescriptionResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
  data: ApiResourceEntity;
  policyOptions: JSX.Element[];
}

const ResourceContent = (props: IProps) => {
  const handleChangeDescription = (e: any) => {};
  const { getFieldDecorator, resetFields } = props.form;
  const [policyOptions, setPolicyOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const policies = props.policyOptions.map(item => {
      return (
        <Select.Option key={item.props.value + '-' + props.data.path + '-' + props.data.type} value={item.props.value}>
          {item.props.children}
        </Select.Option>
      );
    });
    setPolicyOptions(policies);
  }, []);

  const onBlurTextDescription = (e: any) => {
    const param: ChangeDescriptionResourceParam = {
      resource: {
        path: props.data.path || '',
        method: props.data.type,
      },
      description: e.target.value,
    };
    props.changeDescriptionResource(param);
  };

  const onChoosePolicy = (value: any) => {
    const param: ChangePolicyResourceParam = {
      resource: {
        path: props.data.path || '',
        method: props.data.type,
      },
      policy: value,
    };

    props.changePolicyResource(param);
  };

  const validateSumary = (rule: any, value: any, callback: any) => {
    props.form.setFields({
      sumary: {
        value: value.trim(),
      },
    });
    return true;
  };

  const pasteSumary = (value: any) => {
    const valueSumary = props.form.getFieldValue('sumary');
    props.form.setFields({
      sumary: {
        value: valueSumary.trim() + ' ',
      },
    });
  };
  useEffect(() => {
    resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataState.flag_reload]);

  return (
    <Wrapper className="entity-content-container">
      <div className="entity-summary-box mb-5">
        <div className="header mb-4">
          <span>Tóm tắt</span>
          <hr style={{ border: '1px solid gray' }} />
        </div>
        <div className="list-control">
          <Form>
            <Form.Item>
              {getFieldDecorator('sumary', {
                initialValue: props.data.description,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateSumary }],
              })(
                <TextArea
                  rows={4}
                  placeholder="Tóm tắt"
                  onChange={handleChangeDescription}
                  onBlur={onBlurTextDescription}
                  maxLength={5000}
                  onPaste={pasteSumary}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
      </div>

      {props.dataState.data?.apiLevel ? null : (
        <div className="entity-summary-box mb-5">
          <div className="header mb-4">
            <span>Quản trị giới hạn dung lượng sử dụng</span>
            <hr style={{ border: '1px solid gray' }} />
          </div>
          <div>
            <div style={{ marginLeft: '3%', marginBottom: '20px' }}>
              <span style={{ color: 'lightgray', fontSize: '10px' }}>Số lượng truy cập</span>
              <br />
              <Select
                showSearch
                defaultValue={props.data.policy}
                placeholder="Chọn giới hạn truy cập"
                style={{ width: '20%' }}
                onChange={onChoosePolicy}
                allowClear={true}
              >
                {policyOptions}
              </Select>
              <br />
              <span style={{ color: 'lightgray', fontSize: '10px' }}>Giới hạn sẽ được áp dụng cho API này</span>
            </div>
          </div>
        </div>
      )}

      <div className="entity-content-params mb-5">
        <div className="header mb-4 ">
          <span>Tham số</span>
          <hr style={{ border: '1px solid gray' }} />
        </div>
        <div className="list-control list-control-param">
          <AddParameterForm data={{ path: props.data.path || '', method: props.data.type }} />
        </div>
        <div className="params-table container ">
          <ParamTable
            resourceData={{ path: props.data.path || '', method: props.data.type }}
            data={props.data.params ?? []}
          />
        </div>
      </div>

      <div className="entity-content-response mb-5  ">
        <div className="header mb-4">
          <span>Cấu hình Response</span>
          <hr style={{ border: '1px solid gray' }} />
        </div>
        <div className="list-control list-control-response">
          <AddResponseForm data={{ path: props.data.path || '', method: props.data.type }} />
        </div>
        <div className="response-table container mt-4">
          <ResponseTable
            resourceData={{ path: props.data.path || '', method: props.data.type }}
            data={props.data.responses ?? []}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default connector(Form.create<IProps>()(ResourceContent));
