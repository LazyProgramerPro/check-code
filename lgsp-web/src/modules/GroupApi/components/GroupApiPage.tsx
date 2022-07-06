import React from 'react';
import BreadCrumb from 'src/components/BreadCrumb';
import { E_REST_API_TYPE } from 'src/constants/common';
import { changeContentModal, changeTitleModal, hideModal, showModal } from 'src/modules/Modal/redux/actions';
import { useAppDispatch } from 'src/redux/hooks';
import { createGroupRestApi, createWsdlFileApi, setRowApiEditting } from '../redux/actions/group_api';
import ContentPage from './ContentPage';
import { showCreatApiForm } from '../redux/actions/create_api';
import CreateApiForm from './CreateApiForm';
import styled from 'styled-components';
import { Button } from 'antd';

export default function GroupApiPage() {
  // const [formloading, setFormLoading] = useSate<boolean>()
  const dispatch = useAppDispatch();
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

  document.title = 'Danh sách dịch vụ chia sẻ';

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const handleSubmitForm = (values: any, callback: () => void) => {
    if (values?.type === E_REST_API_TYPE.SOAP && values?.file) {
      const formData = new FormData();
      Object.keys(values).forEach((key: string) => {
        formData.append(key, values[key]);
      });
      dispatch(createWsdlFileApi(values, callback));
    } else {
      delete values?.file;
      dispatch(createGroupRestApi(values, callback));
    }
  };

  const onShowModalCreateRestApi = () => {
    dispatch(showCreatApiForm(true));
    // dispatch(setRowApiEditting(null));
    // dispatch(showModal());
    // dispatch(
    //   changeContentModal({ component: <CreateApiForm onCancel={handleCloseModal} onSubmit={handleSubmitForm} /> }),
    // );
    // dispatch(changeTitleModal({ title: 'Tạo mới dịch vụ chia sẻ' }));
  };

  return (
    <View>
      <div className="header">
        <Content>Danh sách dịch vụ chia sẻ</Content>
        <Button icon="plus" onClick={onShowModalCreateRestApi}>
          Tạo mới dịch vụ chia sẻ
        </Button>
      </div>
      <ContentPage />
    </View>
  );
}

const Content = styled.div`
  font-size: 20px;
`;

const View = styled.div`
  padding: 0px 15px;
  background: #e8e8e8;

  .header {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
`;
