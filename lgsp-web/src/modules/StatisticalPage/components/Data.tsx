import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import BarChar from './BarChar';
import SearchBar from './Filter';
import { connect, ConnectedProps } from 'react-redux';
import { getLogUser } from '../redux/actions/get_log_user';
import { getLogDataService } from '../redux/actions/get_log_data_service';
import { getLogApi } from '../redux/actions/get_log_api';
import { getData } from '../redux/actions/get_data';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
const DataBarChar = styled.div`
  .member {
    padding-top: 60px;
  }
  .ViewBarChar {
    width: 1100px;
    margin: 30px auto;
    border: 1px solid #e0d6d6;
    border-radius: 5px;
    background: #fff;
  }
`;
const Title = styled.div`
  padding: 16px;
`;
const StyleLable = styled.div`
  width: 100%;
  margin-top: 20px;
  .ant-col-xs-24 {
    margin-right: 25px;
    height: 148px;
    padding: 17px;
    border-radius: 8px;
  }
`;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getLogUserState: rootState.statisticalPageUser.getLogUserState,
  getLogDataServiceState: rootState.statisticalPageUser.getLogDataServiceState,
  getLogApiState: rootState.statisticalPageUser.getLogApiState,
  getDataState: rootState.statisticalPageUser.getData,
});
const connector = connect(mapState, { getLogUser, getLogDataService, getLogApi, getData });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function Data(props: IProps) {
  const {
    getLogUserState,
    getLogUser,
    getLogDataServiceState,
    getLogDataService,
    getLogApiState,
    getLogApi,
    getDataState,
    getData,
  } = props;
  const params = useParams();
  useEffect(() => {
    getLogUser(params);
  }, []);
  useEffect(() => {
    getLogDataService(params);
  }, []);
  useEffect(() => {
    getLogApi(params);
  }, []);
  useEffect(() => {
    getData(params);
  }, []);
  return (
    <DataBarChar>
      <div className={'ViewBarChar'}>
        <StyleLable>
          <Row style={{ margin: '0 auto' }}>
            <Col xs={24} md={7} style={{ background: '#33F569', marginLeft: '44px' }}>
              <div>
                <p>Người dùng hệ thống</p>
                <p className={'member'}>
                  {' '}
                  {`${getDataState.item.users}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} người
                </p>
              </div>
            </Col>
            <Col xs={24} md={7} style={{ background: '#5B7EFC' }}>
              <div>
                <p>Tổng số dịch vụ dữ liệu</p>
                <p className={'member'}>
                  {' '}
                  {`${getDataState.item.dataServices}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} dịch vụ dữ
                  liệu
                </p>
              </div>
            </Col>

            <Col xs={24} md={7} style={{ background: '#FA5D5D' }}>
              <div>
                <p>Tổng số dịch vụ chia sẻ</p>
                <p className={'member'}>
                  {' '}
                  {`${getDataState.item.services}`.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} dịch vụ chia sẻ
                </p>
              </div>
            </Col>
          </Row>
        </StyleLable>
        {/* <SearchBar /> */}
        <BarChar />
      </div>
      {props.getLogUserState.loading ? <Loading /> : null}
    </DataBarChar>
  );
}
export default connector(Data);
