import React, { useEffect } from 'react';
import { Input, Radio } from 'antd';
import { EThroughput } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import {
  changeThroughputProductionValue,
  changeThroughputSandboxValue,
  changeThroughputType,
} from '../redux/actions/runtime_configuration_data';

const mapState = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
});

const connector = connect(mapState, {
  changeThroughputProductionValue,
  changeThroughputSandboxValue,
  changeThroughputType,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}
const ThroughputLayout = (props: IProps) => {
  useEffect(() => {}, []);

  const onChangeTypeLimit = (e: any) => {
    props.changeThroughputType(e.target.value);
  };

  const onChangeProductionInput = (e: any) => {
    if (e.target.value === undefined || e.target.value === '') {
      return;
    }
    try {
      const throughput: number = parseInt(e.target.value);
      props.changeThroughputProductionValue(throughput);
    } catch (err) {}
  };

  const onChangeSandboxInput = (e: any) => {
    if (e.target.value === undefined || e.target.value === '') {
      return;
    }
    try {
      const throughput: number = parseInt(e.target.value);
      props.changeThroughputSandboxValue(throughput);
    } catch (err) {}
  };

  return (
    <>
      <h3>Backend</h3>
      <div
        style={{
          border: '1px solid #f9f9f9',
          borderRadius: '10px',
          boxShadow: '#c9c3c359 0px 5px 15px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ margin: '10px 0px 20px 0' }}>
          <div style={{ width: '90%', marginLeft: '5%' }}>
            <h3>Cấu hình giới hạn truy cập API trên một giây</h3>
          </div>
          <hr style={{ borderTop: '1px' }} />
          <div style={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
            <span style={{ color: 'lightgray' }}>Giới hạn tối đa</span>
            <br />
            <Radio.Group onChange={onChangeTypeLimit} value={props.dataState.data.throughputType}>
              <Radio value={EThroughput.UNLIMITED}>Không giới hạn</Radio>
              <Radio value={EThroughput.SPECIFY}>Tùy chọn</Radio>
            </Radio.Group>
            {props.dataState.data.throughputType === EThroughput.SPECIFY ? (
              <div>
                <div style={{ margin: '10px 0 10px 0' }}>
                  <span style={{ color: '#1890ff', fontSize: '14px' }}>Môi trường Production</span>
                  <br />
                  <Input
                    value={props.dataState.data.maxTps?.production || 0}
                    onChange={onChangeProductionInput}
                    style={{ width: '40%' }}
                    suffix="TPS"
                    maxLength={10}
                  />
                </div>
                <div style={{ margin: '10px 0 10px 0' }}>
                  <span style={{ color: '#1890ff', fontSize: '14px' }}>Môi trường Test</span>
                  <br />
                  <Input
                    value={props.dataState.data.maxTps?.sandbox || 0}
                    onChange={onChangeSandboxInput}
                    style={{ width: '40%' }}
                    suffix="TPS"
                    maxLength={10}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(ThroughputLayout);
