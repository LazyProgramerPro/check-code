import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Select, Tabs } from 'antd';
import Document from './Document';
import Production from './Production';
import Test from './Test';
import env from 'src/configs/env';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getInformation } from '../redux/actions/get_information';
import { getRegister } from '../redux/actions/get_register';
import { useParams } from 'react-router';
import PageTestAPI from './PageTestAPI';
import { GetRegisterParams, GetUnRegisterParams } from '../redux/models';
import { getUnRegister } from '../redux/actions/get_unregister';
import Loading from 'src/components/Loading';
import { Link } from 'react-router-dom';
const size = env.pageSize;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getInformationState: rootState.dataPublicDetail.getInformationState,
  getRegisterState: rootState.dataPublicDetail.getRegisterState,
  getUnRegisterState: rootState.dataPublicDetail.getUnRegisterState,
});
const connector = connect(mapState, { getInformation, getRegister, getUnRegister });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function DataDetail(props: IProps) {
  const params: any = useParams();
  const [id] = useState<string>(params.id);
  const { getInformationState, getInformation, getRegister, getRegisterState, getUnRegister } = props;
  const [register, setRegister] = useState<any>(getInformationState.item?.register);
  const [activeTab, setActiveTab] = useState('1');
  useEffect(() => {
    getInformation(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  document.title = 'Chi tiết dịch vụ chia sẻ công khai';

  const handChangeRegister = () => {
    const param: GetRegisterParams = {
      apiId: id,
    };
    getRegister(param);
  };
  const handChangeUnRegister = () => {
    const data: GetUnRegisterParams = {
      apiId: id,
    };
    getUnRegister(data);
    setActiveTab('1');
  };
  // useEffect(() => {
  //   getInformation(params);
  // }, [getRegisterState]);

  const { TabPane } = Tabs;

  const checkStatus = (status: any) => {
    if (status === 'registered') {
      return 'Đã đăng ký';
    } else if (status === 'unregistered') {
      return 'Chưa đăng ký';
    } else if (status === 'blocked') {
      return 'Bị khóa';
    }
  };

  const checkButton = (value: any) => {
    if (value === 'registered') {
      return (
        <>
          <Button style={{ margin: '20px 0px 0px 70px' }} onClick={handChangeUnRegister}>
            Hủy đăng ký
          </Button>
        </>
      );
    } else if (value === 'unregistered') {
      return (
        <>
          <Button style={{ margin: '20px 0px 0px 70px' }} onClick={handChangeRegister}>
            Đăng ký
          </Button>
        </>
      );
    } else if (value === 'blocked') {
    }
  };

  const changeTab = (activeKey: any) => {
    setActiveTab(activeKey);
  };

  return (
    <View>
      <div className="header">
        <div className="header-title">Chi tiết dịch vụ chia sẻ công khai</div>
      </div>

      <Row style={{ background: '#fff' }}>
        <Col xs={24} md={8} xl={4} style={{ paddingTop: '16px', borderRight: '0.5px solid #e0d6d6' }}>
          <Infor>
            <p className={'infoAPI'}>API 1: {getInformationState.item?.name}</p>
            <p className={'creator'}>Tạo bởi: {getInformationState.item?.provider}</p>
          </Infor>
        </Col>
        <Col xs={24} md={8} xl={16}>
          <p className={'status'}>{checkStatus(getInformationState.item?.register || '')}</p>
        </Col>
        <Col xs={24} md={8} xl={4}>
          {checkButton(getInformationState.item?.register || '')}
        </Col>
      </Row>
      {/* <p>TỔNG QUAN</p> */}
      <div>
        <Tabs activeKey={activeTab} animated={false} onChange={changeTab}>
          <TabPane tab="Tổng quan" key="1">
            <h3 className={'ContentTab'}>Tổng quan</h3>
            <ViewMetadata>
              <Row className="DetailTab1">
                <Col xs={24} md={8} xl={10}>
                  <h3 style={{ marginLeft: '-48px' }}>Metadata</h3>
                  <p>Mô tả chung: {getInformationState.item?.description} </p>
                  <p className="content">Thời gian tạo: {getInformationState.item?.createTime}</p>
                  <p className="content">
                    Cấp triển khai:{' '}
                    {getInformationState.item?.deploymentLevel === 'local'
                      ? 'Địa phương'
                      : getInformationState.item?.deploymentLevel === 'central'
                      ? 'Trung ương'
                      : ''}
                  </p>
                  <p className="content">Nhóm dịch vụ: {getInformationState?.item?.category}</p>
                  <p className="content">Đơn vị triển khai: {getInformationState.item?.deploymentUnit}</p>
                  <p className="content"> URL: {getInformationState.item?.httpEndpoint} </p>
                  <p className="content viewURL"> {getInformationState.item?.httpsEndpoint}</p>
                </Col>
                <Col xs={24} md={8} xl={6}>
                  <h3>Giới hạn truy cập </h3>
                  <p className="content"> {getInformationState.item?.policies.join(',')}</p>
                </Col>
              </Row>
            </ViewMetadata>
          </TabPane>

          {/* <p>TÀI LIỆU </p> */}
          <TabPane tab="Tài liệu" key="2">
            <Document />
          </TabPane>

          {/* <p>KIỂM THỬ </p> */}
          {getInformationState.item?.register === 'registered' ? (
            <TabPane tab="Kiểm thử" key="3">
              <PageTestAPI />
            </TabPane>
          ) : getInformationState.item?.register === 'unregistered' ? (
            <TabPane tab="Kiểm thử" disabled key="3">
              <PageTestAPI />
            </TabPane>
          ) : (
            <TabPane tab="Kiểm thử" disabled key="3">
              <PageTestAPI />
            </TabPane>
          )}

          {/* sign up on Production */}
          {getInformationState.item?.register === 'registered' ? (
            <TabPane tab="Đăng ký trên môi trường Production" key="4">
              <Production />
            </TabPane>
          ) : getInformationState.item?.register === 'unregistered' ? (
            <TabPane tab="Đăng ký trên môi trường Production" disabled key="4">
              <Production />
            </TabPane>
          ) : (
            <TabPane tab="Đăng ký trên môi trường Production" disabled key="4">
              <Production />
            </TabPane>
          )}

          {/* sign up on Test */}
          {getInformationState.item?.register === 'registered' ? (
            <TabPane tab="Đăng ký trên môi trường Test" key="5">
              <Test />
            </TabPane>
          ) : getInformationState.item?.register === 'unregistered' ? (
            <TabPane tab="Đăng ký trên môi trường Test" disabled key="5">
              <Test />
            </TabPane>
          ) : (
            <TabPane tab="Đăng ký trên môi trường Test" disabled key="5">
              <Test />
            </TabPane>
          )}
        </Tabs>
      </div>

      {props.getInformationState.loading || props.getRegisterState.loading || props.getUnRegisterState.loading ? (
        <Loading />
      ) : null}
    </View>
  );
}

const View = styled.div`
  .header {
    height: 52px;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
    }
  }
  .status {
    /* font-size: 20px;
      line-height: 23px; */
    /* color: #232323; */
    margin-top: 27px;
    border-radius: 0.5px solid #000000;
    margin-left: 24px;
  }
  .ant-row {
    border-bottom: 0.5px solid #000000;
    border-right: 0.5px solid #000000;
  }
  .ant-tabs {
    padding: 15px;
  }

  .ContentTab {
    margin-left: 18px;
    margin-top: 10px;
  }
  .DetailTab1 {
    margin-left: 65px;
    border-bottom: none;
  }
  .ant-col-xl-6 {
    margin-left: 100px;
  }
  .ant-table-wrapper {
    margin: 0 auto;
    background: #ffffff;
    /* border: 0.1px solid #000000; */
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  */ .anticon-eye {
    color: black;
  }
  .infor {
    .ant-col-md-8 {
      margin-left: 50px;
    }
    width: 70%;
  }
  .title {
    /* margin-left: 30px; */
  }
  .ant-row {
    border-bottom: none;
    border-right: none;
    display: flex;
    /* flex-direction: column; */
  }
  .parameter {
    margin-left: 50px;
    margin-top: -5px;
  }
  .ant-input {
    height: 40px;
    /* width: 364px; */
  }
  .styleButton {
    border-radius: 5px;
    color: #ffffff;
    /* margin-top: 20px; */
    margin-bottom: 10px;
  }
  .titleparameter {
    margin-top: 12px;
  }
  .term {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #0bd206;
    margin-top: 9px;
  }
  .security {
    width: 55%;
    margin: 0 auto;
  }
  .styleServers {
    width: 70%;
    margin: 43px auto;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 14px 24px;
  }
  .datatable {
    width: 70%;
    margin: 0px auto;
  }
  .ant-tabs-bar {
    margin: 0px 0px;
    background: #ffffff !important;
  }
  .card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #1890ff;
    font-weight: 500;
    border-bottom: 2px solid #1890ff;
  }
  .ant-tabs .ant-tabs-top-content {
    background: #ffffff;
  }
`;

const Infor = styled.div`
  margin-left: 24px;
  .infoAPI {
    /* font-size: 24px;
      line-height: 28px; */
    /* color: #232323; */
    margin-bottom: 21px;
    margin-top: -5px;
  }
  .creator {
    /* font-size: 18px;
      line-height: 21px; */
    /* color: #232323; */
    margin-top: -15px;
  }
`;
const ViewMetadata = styled.div`
  .content {
    margin-top: -6px;
  }
  .viewURL {
    margin-left: 32px;
  }
`;
export default connector(DataDetail);
