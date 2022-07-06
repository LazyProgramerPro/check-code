import { Col, InputNumber, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { getGeneral } from '../redux/actions/get_datageneral';
import { DataGeneralParams } from '../redux/models';
const ViewGeneral = styled.div`
  padding: 0px 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
  }
  .infoGeneral {
    margin-top: -25px;
  }
  .styleInput {
    width: 44%;
    margin: 28px 0px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 14px 24px;
  }
`;
const Content = styled.div`
  font-size: 20px;
`;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getGeneralState: rootState.dataGeneral.getGeneralState,
});
const connector = connect(mapState, { getGeneral });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function General({ getGeneralState, getGeneral }: IProps) {
  useEffect(() => {
    let params: DataGeneralParams = {
      ...getGeneralState.params,
    };
    getGeneral(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewGeneral>
      <div className={'header'}>
        <Content>Cấu hình cài đặt chung hệ thống </Content>
      </div>
      <div className="infoGeneral">
        {/* <div className={'styleInput'}>
        <Row>
          <h3>Cấu hình số lượng Thread tối đa </h3>
          <Col xs={24}>
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              value={parseInt(getGeneralState?.item?.threadNumber || '')}
            />
          </Col>
        </Row>
      </div> */}
        <div className={'styleInput'}>
          <Row>
            <h3>Cấu hình đường dẫn thư mục lưu trữ cấu hình hệ thống </h3>
            <Col xs={24}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                value={parseInt(getGeneralState?.item?.threadNumber || '')}
              />
            </Col>
          </Row>
        </div>
        <div className={'styleInput'}>
          <Row>
            <h3>Cấu hình đường dẫn đường dẫn ghi log </h3>
            <Col xs={24}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                value={parseInt(getGeneralState?.item?.loggingDirectoryNumber || '')}
              />
            </Col>
          </Row>
        </div>
      </div>
    </ViewGeneral>
  );
}

export default connector(General);
