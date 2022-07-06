import { Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { policyResourceMap } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
import { changePolicyType } from '../redux/actions/api_resource_data';
import { NotificationError } from '../../../components/Notification/Notification';
import { getAllPolicy } from '../../ConnectResource/redux/service/apis';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { changePolicyType });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  policyOptions: JSX.Element[];
  refresh: boolean;
}

const VolumeAccessConfig = (props: IProps) => {
  const onChoosePolicy = (value: any) => {
    props.changePolicyType(true, value);
  };

  const [policyOptions, setPolicyOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const policies = props.policyOptions.map(item => {
      return (
        <Select.Option key={item.props.value + '-volumeAccess'} value={item.props.value}>
          {item.props.children}
        </Select.Option>
      );
    });
    setPolicyOptions(policies);
  }, [props.refresh]);

  const onChangePolicyType = (e: any) => {
    const value: string = e.target.value;
    if (value === undefined) {
      return;
    } else if (value === '0') {
      props.changePolicyType(false);
    } else if (value === '1') {
      props.changePolicyType(true);
    }
  };

  return (
    <Wrapper className="volume-access-config">
      <div className="title colorText">Cấu hình dung lượng truy cập</div>

      <div className="box-content-config container-config">
        <div className="rate-limit-level-item">
          <div className="label">Mức giới hạn tỷ lệ</div>
          <Radio.Group onChange={onChangePolicyType} value={props.dataState.data?.apiLevel ? '1' : '0'}>
            <Radio className="colorText" value="1">
              Toàn bộ phương thức
            </Radio>
            <Radio className="colorText" value="0">
              Từng phương thức
            </Radio>
          </Radio.Group>
        </div>

        {props.dataState.data?.apiLevel && (
          <div className="rate-limit-policies-item">
            <div className="label">Số lượng truy cập</div>
            <Select
              showSearch
              defaultValue={props.dataState.data.policy}
              placeholder="Chọn giới hạn truy cập"
              style={{ width: '50%' }}
              onChange={onChoosePolicy}
              allowClear={true}
            >
              {policyOptions}
            </Select>
            <div className="label">Giới hạn sẽ được áp dụng cho toàn bộ API</div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .colorText {
    color: #232323;
  }
`;

export default connector(VolumeAccessConfig);
