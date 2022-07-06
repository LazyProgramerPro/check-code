import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Radio } from 'antd';
import { EGroupApiType } from '../../../models/common';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
});
const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;
interface IProps extends ReduxProps {}

const ChooseEndpointType = (props: IProps) => {
  return (
    <div style={{ width: '94%', margin: '20px auto 20px' }}>
       <Radio.Group value={props.updateState.data?.apiType}>
        <Radio value={EGroupApiType.rest}>HTTP/Restful Endpoints</Radio>
        <Radio value={EGroupApiType.soap}>HTTP/SOAP Endpoints</Radio>
      </Radio.Group>
    </div>
  );
};

export default connector(ChooseEndpointType);
