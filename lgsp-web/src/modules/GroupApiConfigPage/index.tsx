import React, { useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { changeContentModal, changeTitleModal, hideModal, showModal } from 'src/modules/Modal/redux/actions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import ConfigItems from './components/ConfigItems';
import HeaderContent from './components/HeaderContent';
import GroupApiDetail from '../GroupApiDetail';
import CreateNewApiVersionForm from './components/CreateNewApiVersionForm';
import { IRestApiObject } from '../GroupApi/redux/models';
import { createGroupRestApi } from '../GroupApi/redux/actions/group_api';
import ApiResourcePage from '../ApiResources/components/ApiResourcePage';
import ApiGeneralInformationPage from '../ApiGeneralInformation/components/ApiGeneralInformationPage';
import BusinessPlanPage from '../ApiBusinessPlan/components/BusinessPlanPage';
import ApiEndpointConfigurationPage from '../ApiEndpointConfig/components/ApiEndpointConfigurationPage';
import ApiRuntimeConfigurationPage from '../ApiRuntimeConfiguration/components/ApiRuntimeConfigurationPage';
import ApiDocumentPage from '../ApiDocument/components/ApiDocumentPage';
import ApiDeploymentPage from '../ApiDeployment/components/ApiDeploymentPage';
import ApiTestingPage from '../ApiTesting/components/ApiTestingPage';
import FormJSONXML from './components/FormJSONXML';
import styled from 'styled-components';
import {
  checkingBeforeDeleteApiService,
  createGroupApiNewVersion,
  deleteApiService,
} from '../GroupApi/redux/services/apis';
import { NotificationError, NotificationSuccess } from '../../components/Notification/Notification';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm } from 'antd';
import { DeleteServiceParam } from '../ServicePublic/redux/models';

interface param {
  apiId: string;
}

export default function GroupApiConfigPage() {
  // const [formloading, setFormLoading] = useSate<boolean>()
  const selectGroupApiDetail = useAppSelector(state => state.GroupApiDetail.data);
  const dispatch = useAppDispatch();
  const { path, url } = useRouteMatch();

  const history = useHistory();
  const [openXML, setOpenXML] = useState(false);
  const [loading, setLoading] = useState(false);

  const param: param = useParams();

  document.title = 'Cấu hình dịch vụ chia sẻ';

  const handleOpenXML = () => {
    setOpenXML(true);
  };

  const handleCloseXML = () => {
    setOpenXML(false);
  };

  // const listBreadCrumb = [
  //   {
  //     path: 'group-api',
  //     breadcrumbName: 'Dịch vụ chia sẻ API',
  //   },
  //   {
  //     path: 'group-api',
  //     breadcrumbName: 'Danh sách API',
  //   },
  // ];

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleCreateNewApiVersion = (value: Partial<IRestApiObject>, callback: () => void) => {
    const payload = { ...value, id: selectGroupApiDetail?.myId };
    setLoading(true);
    createGroupApiNewVersion(payload)
      .then(rs => {
        if (rs.code != 0) {
          NotificationError('Thất bại', rs.message);
          setLoading(false);
          dispatch(hideModal());
          return;
        }
        dispatch(hideModal());
        NotificationSuccess('Thành công', 'Tạo phiên bản mới cho dịch vụ thành công');
        setLoading(false);
        history.push('/manager-infor/group-api-config/' + rs.item);
      })
      .catch(() => {
        dispatch(hideModal());
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
        setLoading(false);
      });
    // dispatch(createGroupRestApi(payload, callback));
  };

  // const handleShowModalCreateNewApiVersion = () => {
  //   dispatch(showModal());
  //   dispatch(changeTitleModal({ title: 'Tạo phiên bản mới' }));
  //   dispatch(
  //     changeContentModal({
  //       component: <CreateNewApiVersionForm onCancel={handleCloseModal} onSubmit={handleCreateNewApiVersion} />,
  //     }),
  //   );
  // };

  const handleDelete = () => {
    setLoading(true);
    const deleteParam: DeleteServiceParam = {
      id: param.apiId,
    };
    checkingBeforeDeleteApiService(deleteParam)
      .then(rs => {
        setLoading(false);

        if (rs.code === -1) {
          Modal.confirm({
            content: 'Dịch vụ đã có người đăng ký. Bạn có chắc muốn xóa không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk() {
              callApiDelete(deleteParam);
            },
            onCancel() {},
          });
          return;
        }

        callApiDelete(deleteParam);
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  const callApiDelete = (deleteParam: DeleteServiceParam) => {
    setLoading(true);
    deleteApiService(deleteParam)
      .then(rs => {
        setLoading(false);
        if (rs.code !== 0) {
          NotificationError('Thất bại', rs.message);
          return;
        }
        NotificationSuccess('Thành công', 'Xóa dịch vụ chia sẻ thành công');
        history.replace('/manager-infor/group-api-config');
      })
      .catch(err => {
        setLoading(false);
        NotificationError('Thất bại', err.message);
      });
  };

  return (
    <div className="contentPage group-api-config-page" style={{ padding: '0px 15px' }}>
      {/* <BreadCrumb /> */}

      <Header>
        <div className="header">Cấu hình dịch vụ chia sẻ</div>
        <div className="container-button">
          <Button className="mr-2" onClick={handleOpenXML}>
            Định nghĩa
          </Button>
          <CreateNewApiVersionForm />
          {/* <Button className="mr-2" onClick={handleShowModalCreateNewApiVersion}>
            Tạo phiên bản mới
          </Button> */}

          <Popconfirm
            placement="bottomRight"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={handleDelete}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button className="btnDelete">Xóa</Button>
          </Popconfirm>
        </div>
      </Header>

      <HeaderContent groupApiDetailData={selectGroupApiDetail} />

      <ConfigItems />

      <div style={{ background: '#fff', padding: '10px 15px' }}>
        <Switch>
          <Route exact path={path}>
            <GroupApiDetail />
          </Route>
          <Route path={`${path}/general-information`}>
            <ApiGeneralInformationPage />
          </Route>
          <Route path={`${path}/resources`} component={ApiResourcePage}>
            {/*<GroupApiResources />*/}
          </Route>
          <Route path={`${path}/endpoint`}>
            {/*<GroupApiEndpoint />*/}
            <ApiEndpointConfigurationPage />
          </Route>
          <Route path={`${path}/business-plan`}>
            <BusinessPlanPage />
          </Route>
          <Route path={`${path}/documentation`}>
            <ApiDocumentPage />
          </Route>
          <Route path={`${path}/runtime`}>
            <ApiRuntimeConfigurationPage />
          </Route>
          <Route path={`${path}/implementation`}>
            <ApiDeploymentPage />
          </Route>
          <Route path={`${path}/testing`}>
            <ApiTestingPage />
          </Route>
        </Switch>
      </div>

      <FormJSONXML visible={openXML} onClose={handleCloseXML} />
      {loading ? <Loading /> : null}
    </div>
  );
}

const Header = styled.div`
  height: 52px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    font-size: 20px;
  }
  .container-button {
    display: flex;
    align-items: center;
    .btnDelete {
      border: 1px solid #ff6060;
      color: #ff6060;
    }
  }
`;
