import React, { useEffect, useState } from 'react';
import TransportLayout from './TransportLayout';
import { Button, Col, Row } from 'antd';
import ResponseCachingLayout from './ResponseCachingLayout';
import ThroughputLayout from './ThroughputLayout';
import { getApiRuntimeConfigurationService } from '../redux/services/apis';
import { useParams } from 'react-router-dom';
import { NotificationError } from '../../../components/Notification/Notification';
import { RootState } from '../../../redux/reducers';
import { initDataRuntimeConfiguration, loadPage } from '../redux/actions/runtime_configuration_data';
import { connect, ConnectedProps } from 'react-redux';
import {
  ApiRuntimeConfigurationDataEntity,
  CertificateFileEntity,
  MaxTpsEntity,
  UpdateApiRuntimeConfigurationParam,
} from '../redux/models';
import { updateApiRuntimeConfiguration } from '../redux/actions/update_runtime_configuration';
import Loading from '../../../components/Loading';
import { EThroughput } from '../../../models/common';
import { lastUpdateTime } from '../../GroupApi/redux/services/apis';
import styled from 'styled-components';
import TopContent from 'src/components/groupApi/TopContent';

const mapState = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
  updateState: rootState.apiRuntimeConfiguration.updateState,
});

const connector = connect(mapState, { initDataRuntimeConfiguration, updateApiRuntimeConfiguration, loadPage });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const ApiRuntimeConfigurationPage = (props: IProps) => {
  document.title = 'Cấu hình runtime dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [lastUpdate, setLastUpdate] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickBtnSubmit = (e: any) => {
    console.log(JSON.stringify(props.dataState.data));
    const param: UpdateApiRuntimeConfigurationParam = {
      apiId: apiId,
      enabledSsl: props.dataState.data.enabledSsl || false,
      enabledCaching: props.dataState.data.enabledCaching,
      cacheTimeout: props.dataState.data.cacheTimeout,
      maxTps: props.dataState.data.maxTps || undefined,
      transports: props.dataState.data.transports || [],
      throughputType: props.dataState.data.throughputType || EThroughput.UNLIMITED,
    };
    console.log(JSON.stringify(param));
    props.updateApiRuntimeConfiguration(param);
  };

  const onClickBtnCancel = (e: any) => {
    props.loadPage();
  };

  useEffect(() => {
    setLoading(true);

    lastUpdateTime(apiId)
      .then(rs => {
        if (rs.code === 0) {
          setLastUpdate(rs.item);
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin dịch vụ');
      });

    getApiRuntimeConfigurationService(apiId)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }
        let maxTps;
        if (rs.item.maxTps === null) {
          maxTps = undefined;
        } else {
          maxTps = {
            production: rs.item.maxTps.production,
            sandbox: rs.item.maxTps.sandbox,
          };
        }
        let certList: CertificateFileEntity[];
        if (rs.item.certificateList === null) {
          certList = [];
        } else {
          certList = rs.item.certificateList;
        }
        const data: ApiRuntimeConfigurationDataEntity = {
          transports: rs.item.transport,
          enabledSsl: rs.item.enabledSsl,
          enabledCaching: rs.item.enabledCaching,
          cacheTimeout: rs.item.cacheTimeout,
          maxTps: maxTps,
          throughputType: rs.item.throughputType == undefined ? EThroughput.UNLIMITED : rs.item.throughputType,
          certificateList: certList,
        };
        props.initDataRuntimeConfiguration(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin cấu hình dịch vụ');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId, props.dataState.flag_reload]);

  return (
    <Wrapper>
      <ContentTab>
        <TopContent title="Cấu hình Runtime" time={lastUpdate}></TopContent>

        <h4>Thời gian chỉnh sửa lần cuối: {lastUpdate}</h4>
      </ContentTab>

      <div>
        <Row gutter={16}>
          <Col span={14}>
            <TransportLayout />
            <ResponseCachingLayout />
          </Col>
          <Col span={10}>
            <ThroughputLayout />
          </Col>
        </Row>

        <div>
          <Button className=" mr-3" onClick={onClickBtnCancel}>
            Hủy
          </Button>

          <Button type="primary" onClick={onClickBtnSubmit}>
            Lưu
          </Button>
        </div>
      </div>
      {props.updateState.loading || loading ? <Loading /> : null}
    </Wrapper>
  );
};

export default connector(ApiRuntimeConfigurationPage);
const Wrapper = styled.div`
  .containerRuntime {
    padding: 0px 40px 20px;
  }

  .titleCol {
    color: #232323;
    font-size: 20px;
  }
`;

const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
