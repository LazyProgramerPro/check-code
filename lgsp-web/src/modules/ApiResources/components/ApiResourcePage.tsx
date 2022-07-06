import { Button, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import TopContent from '../../../components/groupApi/TopContent';
import Loading from '../../../components/Loading';
import { NotificationError } from '../../../components/Notification/Notification';
import { RootState } from '../../../redux/reducers';
import { initApiResourceData, loadPage } from '../redux/actions/api_resource_data';
import { updateApiResource } from '../redux/actions/update_api_resource';
import { ApiResourceConfigData, UpdateApiResourceParam } from '../redux/models';
import { getApiResourcesService } from '../redux/services/apis';
import AddResourceForm from './AddResourceForm';
import ResourceConfig from './ResourceConfig';
import VolumeAccessConfig from './VolumnAccessConfig';
import { getAllPolicy } from '../../ConnectResource/redux/service/apis';
import { ref } from 'yup';
import styled from 'styled-components';

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  apiResourceDataState: rootState.apiResource.dataState,
  updateApiResourceState: rootState.apiResource.updateState,
});

const connector = connect(mapState, { updateApiResource, initApiResourceData, loadPage });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const ApiResourcePage = (props: IProps) => {
  document.title = 'Cấu hình Resource dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const initPolicyOptions = [
    <Select.Option value="Unlimited">Không giới hạn</Select.Option>,
    <Select.Option value="Gold">5000 yêu cầu mỗi phút</Select.Option>,
    <Select.Option value="Silver">2000 yêu cầu mỗi phút</Select.Option>,
    <Select.Option value="Bronze">1000 yêu cầu mỗi phút</Select.Option>,
  ];
  const [policyOptions, setPolicyOptions] = useState<JSX.Element[]>(initPolicyOptions);

  useEffect(() => {
    setLoading(true);
    getApiResourcesService(apiId)
      .then(rs => {
        if (rs.code !== 0) {
          setLoading(false);
          NotificationError('Thất bại', rs.message);
          return;
        }
        const data: ApiResourceConfigData = {
          apiType: rs.item.apiType,
          apiLevel: rs.item.apiLevel,
          policy: rs.item.policy,
          resourceGroupList: rs.item.resourceList,
          lastUpdate: rs.item.lastUpdate,
        };
        props.initApiResourceData(data);
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi khi lấy thông tin cấu hình dịch vụ');
      });

    getAllPolicy()
      .then(rs => {
        if (rs.code != 0) {
          NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
        }
        const data = rs.rows.map(item => {
          return <Select.Option value={item.name}>{item.displayName}</Select.Option>;
        });
        setPolicyOptions(data);
      })
      .catch(() => {
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId, props.apiResourceDataState.flag_reload]);

  const onClickSubmitBtn = (e: any) => {
    const data = props.apiResourceDataState.data;
    if (data === undefined) {
      NotificationError('Thất bại', 'Không thể cập nhật dịch vụ');
      return;
    }
    const param: UpdateApiResourceParam = {
      apiId: apiId,
      apiLevel: data.apiLevel,
      policy: data.policy,
      resourceList: data.resourceGroupList,
    };
    props.updateApiResource(param);
  };

  const pathsRef = useRef<string[]>([]);
  Yup.addMethod(Yup.array, 'unique', function(message, mapper = (a: any) => a) {
    return this.test('unique', message, function(list) {
      return list?.length === new Set(list?.map(mapper)).size;
    });
  });

  const duplicateNameCheck = (list: string[], value: string | undefined, operation: any) => {
    list = list?.filter(Boolean);
    const regExp = /\[([^)]+)\]/;
    const matches = regExp.exec(operation.path);
    if (matches?.length) {
      const pathIndex = +matches[1];
      if (list.length < 2) return true;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value && i != pathIndex) {
          return false;
        }
      }
    }
    return true;
  };

  const validationSchema = Yup.object({
    resourceList: Yup.array().of(
      Yup.object().shape({
        type: Yup.array()
          .min(1, 'Http method phải có ít nhất 1 item')
          .of(Yup.string().required('Trường này là bắt buộc.')),
        path: Yup.string()
          .required('Trường này không được để trống')
          .matches(/^\//, 'Endpoint phải bắt đầu bằng kí tự /')
          .test('Unique', 'Path needs te be unique', (values: string | undefined, resourceList: any) => {
            return duplicateNameCheck(pathsRef.current, values, resourceList);
          }),
      }),
    ),
  });

  const getListPath = (resourceList: any) => {
    pathsRef.current = resourceList?.map((item: any) => {
      return item?.path;
    });
  };

  const handleSaveResourceConfig = async (values: any, callback: () => void) => {};

  const onBtnCancelClicked = (e: any) => {
    props.loadPage();
  };

  return (
    <div className="group-api-resources-page config-api-content">
      <ContentTab>
        <TopContent title="Resources" time={props.apiResourceDataState.data?.lastUpdate || ''} />
        <h4>Thời gian chỉnh sửa lần cuối: {props.apiResourceDataState.data?.lastUpdate}</h4>
      </ContentTab>

      <div className="mt-5">
        <VolumeAccessConfig refresh={refresh} policyOptions={policyOptions} />
        <AddResourceForm />
        <ResourceConfig policyOptions={policyOptions} />
        <div className="action-form mt-4">
          <Button type="default" className="mr-3 " onClick={onBtnCancelClicked}>
            Hủy
          </Button>
          {/* <Button type="default" className="mr-3 ">
            Hủy
          </Button> */}
          <Button
            type="primary"
            className="mr-3 "
            onClick={onClickSubmitBtn}
            disabled={loading || props.updateApiResourceState.loading}
          >
            Lưu
          </Button>
        </div>
      </div>
      {loading || props.updateApiResourceState.loading ? <Loading /> : null}
    </div>
  );
};
export default connector(ApiResourcePage);

const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
