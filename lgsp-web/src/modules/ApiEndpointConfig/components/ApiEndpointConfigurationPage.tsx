import React, { useEffect, useState } from 'react';
import EndpointLayout from './EndpointLayout';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import LoadBalancerConfig from './LoadBalancerConfig';
import ChooseEndpointType from './ChooseEndpointType';
import { Button, Popconfirm, Modal } from 'antd';
import { getApiEndpointConfiguration, reloadData } from '../redux/actions/get_endpoint_configuration';
import { useParams } from 'react-router';
import {
  checkClickUpdateConfiguration,
  initDefaultData,
  updateApiEndpointConfiguration,
} from '../redux/actions/update_endpoint_configuration';
import { initData, checkApiEndpointConfiguration } from '../redux/actions/check_endpoint';
import {
  ApiEndpointConfigurationData,
  EndpointEntity,
  UpdateApiEndpointConfigurationParam,
  UpdateEndpointListParam,
  CheckApiEndpointConfigurationParam,
  CheckEndpointEntity,
  LoadBalancerConfigurationEntity,
} from '../redux/models';
import TimeEditItem from '../../../components/groupApi/TimeEditItem';
import Loading from '../../../components/Loading';
import { EEndpointType, EGroupApiType } from '../../../models/common';
import {
  getApiEndpointConfigurationService,
  checkApiEndpointConfigurationService,
  updateApiEndpointConfigurationService,
} from '../redux/services/apis';
import { NotificationError } from '../../../components/Notification/Notification';
import { initEndpointDataList } from '../redux/actions/update_endpoint_list';
import styled from 'styled-components';
import TopContent from 'src/components/groupApi/TopContent';
import { NotificationSuccess } from 'src/components/Notification/Notification';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
  updateEndpointListState: rootState.apiEndpointConfiguration.updateEndpointListState,
  checkEndpointState: rootState.apiEndpointConfiguration.checkEndpointState,
});
const connector = connect(mapStateToProps, {
  getApiEndpointConfiguration,
  initDefaultData,
  reloadData,
  updateApiEndpointConfiguration,
  initEndpointDataList,
  initData,
  checkApiEndpointConfiguration,
  checkClickUpdateConfiguration,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

const ApiEndpointConfigurationPage = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  document.title = 'Cấu hình Endpoint';

  const initDefaultData = () => {
    const defaultEndpoint: EndpointEntity[] = [{ url: '' }];
    const initData: ApiEndpointConfigurationData = {
      endpointType: EEndpointType.http,
      productionEndpoints: defaultEndpoint,
      sandboxEndpoints: defaultEndpoint,
    };
    props.initDefaultData(initData);
  };

  useEffect(() => {
    setLoading(true);
    getApiEndpointConfigurationService(apiId)
      .then(rs => {
        if (rs.code != 0) {
          initDefaultData();
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }
        setLastUpdate(rs.item.lastUpdate);

        let productionActive = true;
        if (
          rs.item.productionEndpoints.length == 0 ||
          rs.item.productionEndpoints[0] == '' ||
          rs.item.productionEndpoints[0].url == ''
        ) {
          productionActive = false;
        }
        let initProductionList: string[] = [];
        if (productionActive) {
          for (let i = 1; i < rs.item.productionEndpoints.length; i++) {
            initProductionList.push(rs.item.productionEndpoints[i].url);
          }
        }

        let sandboxActive = true;
        if (
          rs.item.sandboxEndpoints.length == 0 ||
          rs.item.sandboxEndpoints[0] == '' ||
          rs.item.sandboxEndpoints[0].url == ''
        ) {
          sandboxActive = false;
        }
        let initSandboxList: string[] = [];
        if (sandboxActive) {
          for (let i = 1; i < rs.item.sandboxEndpoints.length; i++) {
            initSandboxList.push(rs.item.sandboxEndpoints[i].url);
          }
        }
        const initEndpointListParam: UpdateEndpointListParam = {
          type: rs.item.endpointType,
          sandboxList: initSandboxList,
          productionList: initProductionList,
        };
        props.initEndpointDataList(initEndpointListParam);
        const initData: ApiEndpointConfigurationData = {
          apiType: rs.item.apiType || EGroupApiType.rest,
          endpointType: rs.item.endpointType || EGroupApiType.rest,
          productionEndpoints: rs.item.productionEndpoints || [],
          sandboxEndpoints: rs.item.sandboxEndpoints || [],
          loadBalancerConfiguration: rs.item.loadBalancerConfiguration,
          productionSecurity: rs.item.productionSecurity,
          sandboxSecurity: rs.item.sandboxSecurity,
          productionActive: productionActive,
          sandboxActive: sandboxActive,
        };
        props.initDefaultData(initData);
        setLoading(false);
      })
      .catch(e => {
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmUpdate = (e: any, updateParam: UpdateApiEndpointConfigurationParam) => {
    setLoading(true);
    updateApiEndpointConfigurationService(updateParam)
      .then(rs => {
        setLoading(false);
        if (rs.code == 0) {
          props.checkClickUpdateConfiguration();
          NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(e => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  const onClickSubmitBtn = (e: any) => {
    e.preventDefault();

    if (!props.updateState.data?.productionActive && !props.updateState.data?.sandboxActive) {
      NotificationError(
        'Cảnh báo',
        'Vui lòng nhập thông tin endpoint ít nhất một trong hai môi trường production và testing',
      );
      return;
    }

    let data = props.updateState.data;
    const productionEndpointList: EndpointEntity[] = props.updateEndpointListState.params.productionList.map(item => {
      return {
        url: item,
      };
    });
    const sandboxEndpointList: EndpointEntity[] = props.updateEndpointListState.params.sandboxList.map(item => {
      return {
        url: item,
      };
    });
    productionEndpointList.unshift(props.updateState.data?.productionEndpoints[0] || { url: '' });
    sandboxEndpointList.unshift(props.updateState.data?.sandboxEndpoints[0] || { url: '' });

    const newParam: UpdateApiEndpointConfigurationParam = {
      apiId: apiId,
      loadBalancerConfiguration: data?.loadBalancerConfiguration,
      productionSecurity: data?.productionSecurity,
      sandboxSecurity: data?.sandboxSecurity,
      endpointType: props.updateEndpointListState.params.type,
      sandboxEndpoints: sandboxEndpointList,
      productionEndpoints: productionEndpointList,
      productionActive: data?.productionActive,
      sandboxActive: data?.sandboxActive,
    };
    setLoading(true);
    checkApiEndpointConfigurationService(newParam)
      .then(rs => {
        setLoading(false);
        if (rs.code == -1) {
          NotificationError('Thất bại', rs.message);
          return;
        }
        if (rs.code == -2) {
          Modal.confirm({
            content: 'Endpoint sẽ được cập nhật khác với cấu hình được triển khai. Bạn có xác nhận thay đổi?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',

            onOk() {
              confirmUpdate(e, newParam);
            },
            onCancel() {},
          });
          return;
        }
        props.checkClickUpdateConfiguration();
        NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  //CheckEndpoint
  const onCheckEndpoint = (e: any) => {
    e.preventDefault();
    let data = props.checkEndpointState.data;
    const productionEndpoint: CheckEndpointEntity[] = props.updateEndpointListState.params.productionList.map(item => {
      return {
        templateNotSupported: true,
        url: item,
      };
    });
    const sandboxEndpoint: CheckEndpointEntity[] = props.updateEndpointListState.params.sandboxList.map(item => {
      return {
        templateNotSupported: true,
        url: item,
      };
    });
    productionEndpoint.unshift(
      props.checkEndpointState.data?.productionEndpoints[0] || { templateNotSupported: true, url: '' },
    );
    sandboxEndpoint.unshift(
      props.checkEndpointState.data?.sandboxEndpoints[0] || { templateNotSupported: true, url: '' },
    );
    const params: CheckApiEndpointConfigurationParam = {
      apiId: apiId,
      loadBalancerConfiguration: data?.loadBalancerConfiguration,
      productionSecurity: data?.productionSecurity,
      sandboxSecurity: data?.sandboxSecurity,
      endpointType: props.updateEndpointListState.params.type,
      sandboxEndpoints: productionEndpoint,
      productionEndpoints: sandboxEndpoint,
      productionActive: data?.productionEndpoints.length != 0,
      sandboxActive: data?.sandboxEndpoints.length != 0,
    };
    const response = checkApiEndpointConfigurationService(params);
    response
      .then(rs => {
        if (rs.code !== 0) {
          console.log(JSON.stringify(rs));
          return setCode(-1);
        }
        NotificationSuccess('Thành Công', 'Cập nhật Endpoint thành công');
      })
      .catch(err => {
        NotificationError('Thất bại', err.message);
      });
  };

  const onClickCancel = (e: any) => {
    setLoading(true);
    getApiEndpointConfigurationService(apiId)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          return;
        }

        let productionActive = true;
        if (
          rs.item.productionEndpoints.length == 0 ||
          rs.item.productionEndpoints[0] == '' ||
          rs.item.productionEndpoints[0].url == ''
        ) {
          productionActive = false;
        }
        const initEndpointList: EndpointEntity[] = [{ url: '' }];
        let initProductionList: string[] = [];
        for (let i = 1; i < rs.item.productionEndpoints.length; i++) {
          initProductionList.push(rs.item.productionEndpoints[i].url);
        }

        let sandboxActive = true;
        if (
          rs.item.sandboxEndpoints.length == 0 ||
          rs.item.sandboxEndpoints[0] == '' ||
          rs.item.sandboxEndpoints[0].url == ''
        ) {
          sandboxActive = false;
        }
        let initSandboxList: string[] = [];
        for (let i = 1; i < rs.item.sandboxEndpoints.length; i++) {
          initSandboxList.push(rs.item.sandboxEndpoints[i].url);
        }
        const initEndpointListParam: UpdateEndpointListParam = {
          type: rs.item.endpointType,
          sandboxList: initSandboxList,
          productionList: initProductionList,
        };
        props.initEndpointDataList(initEndpointListParam);
        const initData: ApiEndpointConfigurationData = {
          endpointType: rs.item.endpointType || EGroupApiType.rest,
          productionEndpoints: rs.item.productionEndpoints || initEndpointList,
          sandboxEndpoints: rs.item.sandboxEndpoints || initEndpointList,
          loadBalancerConfiguration: rs.item.loadBalancerConfiguration,
          productionSecurity: rs.item.productionSecurity,
          sandboxSecurity: rs.item.sandboxSecurity,
          productionActive: productionActive,
          sandboxActive: sandboxActive
        };
        props.initDefaultData(initData);
        props.reloadData();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Hệ thống xảy ra lỗi');
      });
    // console.log('LoadPage');
  };

  return (
    <Wrapper>
      <ContentTab>
        <TopContent title="Cấu hình thông tin Endpoint" time={lastUpdate} />
        <h4>Thời gian chỉnh sửa lần cuối: {lastUpdate}</h4>
      </ContentTab>

      <div className="config-product-endpoint-env mt-5">
        {/* <ChooseEndpointType /> */}
        <EndpointLayout />
        <LoadBalancerConfig />
      </div>
      <div>
        <Button className=" mr-3" onClick={onClickCancel}>
          Huỷ
        </Button>
        {/* {code === 0 && ( */}
        <Button type="primary" onClick={onClickSubmitBtn}>
          Lưu
        </Button>
      </div>
      {props.getState.loading || props.updateState.loading || loading ? <Loading /> : null}
    </Wrapper>
  );
};

export default connector(ApiEndpointConfigurationPage);
const Wrapper = styled.div``;
const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
