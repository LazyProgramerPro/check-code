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

  document.title = 'C???u h??nh d???ch v??? chia s???';

  const handleOpenXML = () => {
    setOpenXML(true);
  };

  const handleCloseXML = () => {
    setOpenXML(false);
  };

  // const listBreadCrumb = [
  //   {
  //     path: 'group-api',
  //     breadcrumbName: 'D???ch v??? chia s??? API',
  //   },
  //   {
  //     path: 'group-api',
  //     breadcrumbName: 'Danh s??ch API',
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
          NotificationError('Th???t b???i', rs.message);
          setLoading(false);
          dispatch(hideModal());
          return;
        }
        dispatch(hideModal());
        NotificationSuccess('Th??nh c??ng', 'T???o phi??n b???n m???i cho d???ch v??? th??nh c??ng');
        setLoading(false);
        history.push('/manager-infor/group-api-config/' + rs.item);
      })
      .catch(() => {
        dispatch(hideModal());
        NotificationError('Th???t b???i', 'X???y ra l???i h??? th???ng');
        setLoading(false);
      });
    // dispatch(createGroupRestApi(payload, callback));
  };

  // const handleShowModalCreateNewApiVersion = () => {
  //   dispatch(showModal());
  //   dispatch(changeTitleModal({ title: 'T???o phi??n b???n m???i' }));
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
            content: 'D???ch v??? ???? c?? ng?????i ????ng k??. B???n c?? ch???c mu???n x??a kh??ng?',
            okText: 'X??c nh???n',
            cancelText: 'H???y',
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
        NotificationError('Th???t b???i', 'X???y ra l???i h??? th???ng');
      });
  };

  const callApiDelete = (deleteParam: DeleteServiceParam) => {
    setLoading(true);
    deleteApiService(deleteParam)
      .then(rs => {
        setLoading(false);
        if (rs.code !== 0) {
          NotificationError('Th???t b???i', rs.message);
          return;
        }
        NotificationSuccess('Th??nh c??ng', 'X??a d???ch v??? chia s??? th??nh c??ng');
        history.replace('/manager-infor/group-api-config');
      })
      .catch(err => {
        setLoading(false);
        NotificationError('Th???t b???i', err.message);
      });
  };

  return (
    <div className="contentPage group-api-config-page" style={{ padding: '0px 15px' }}>
      {/* <BreadCrumb /> */}

      <Header>
        <div className="header">C???u h??nh d???ch v??? chia s???</div>
        <div className="container-button">
          <Button className="mr-2" onClick={handleOpenXML}>
            ?????nh ngh??a
          </Button>
          <CreateNewApiVersionForm />
          {/* <Button className="mr-2" onClick={handleShowModalCreateNewApiVersion}>
            T???o phi??n b???n m???i
          </Button> */}

          <Popconfirm
            placement="bottomRight"
            title="B???n c?? x??c nh???n mu???n x??a?"
            onConfirm={handleDelete}
            okText="X??c nh???n"
            cancelText="H???y"
          >
            <Button className="btnDelete">X??a</Button>
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
