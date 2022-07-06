import { Button, Collapse, Form, Input, Skeleton, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { getListDataServices } from '../ManagerDataServiceList/redux/action/get_dataSerivices';
import DataSourceCollapse from './components/DataSourceCollapse';
import FormCreateNew from './components/FormCreateNew';
import FormCreateNewOperation from './components/FormCreateNewOperation';
import FormCreateNewQuery from './components/FormCreateNewQuery';
import FormCreateNewResource from './components/FormCreateNewResource';
import FormXMLEditor from './components/FormXMLEditor';
import Header from './components/Header';
import OperationCollapse from './components/OperationCollapse';
import QueryCollapse from './components/QueryCollapse';
import ResourceCollapse from './components/ResourceCollapse';
import {
  createDataService,
  getDetailDataServiceUpdate,
  resetFormDataService,
  // resetIDDataService,
  updateDataService,
} from './redux/actions/create_dataService';
import { resetDataSource } from './redux/actions/create_dataSource';
import { resetOperation } from './redux/actions/create_operation';
import { resetQuery } from './redux/actions/create_query';
import { resetResource } from './redux/actions/create_resource';
import { CreateDataServiceParams } from './redux/models';
interface ManagerDataServiceAddNewProps {
  isUpdate: boolean;
  dataServiceId?: string;
}
const mapState = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource.DataSourceConfigs,
  operationState: rootState.createDataService.createOperation.operations,
  queryState: rootState.createDataService.createQuery.queries,
  resourceState: rootState.createDataService.createResource.resources,
  dataServiceUpdateState: rootState.createDataService.createDataService.dataServiceUpdate,
  isLoading: rootState.createDataService.createDataService.loading,
  dataServiceState: rootState.createDataService.createDataService,
});

const conn = connect(mapState, {
  createDataService,
  getListDataServices,
  getDetailDataServiceUpdate,
  resetFormDataService,
  resetDataSource,
  resetOperation,
  resetResource,
  resetQuery,
  updateDataService,
  // resetIDDataService,
});
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps, ManagerDataServiceAddNewProps {}

function ManagerDataServiceAddNew(props: IProps) {
  const {
    isUpdate,
    dataServiceId,
    createDataService,
    dataSourceState,
    operationState,
    queryState,
    resourceState,
    getListDataServices,
    getDetailDataServiceUpdate,
    resetFormDataService,
    resetDataSource,
    resetOperation,
    resetResource,
    resetQuery,
    updateDataService,
    // resetIDDataService,
    dataServiceUpdateState,
    isLoading,
    dataServiceState,
  } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const history = useHistory();

  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [openXML, setOpenXML] = useState(false);

  const titleAdd = 'TẠO MỚI DỊCH VỤ DỮ LIỆU';
  const titleUpdate = 'CẬP NHẬT DỊCH VỤ DỮ LIỆU';

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4, offset: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let file: any[] = [];

        dataSourceState.map(e => {
          if (e.url) {
            file.push(e.url);
          }
        });

        const params: CreateDataServiceParams = {
          ...values,
          dataSources: dataSourceState,
          file: file,
          queries: queryState,
          operations: operationState,
          resources: resourceState,
        };

        createDataService(params);
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params: CreateDataServiceParams = {
          ...values,
          id: dataServiceId,
          dataSources: dataSourceState,
          queries: queryState,
          operations: operationState,
          resources: resourceState,
        };

        updateDataService(params);
        history.goBack();
      }
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleOpenXML = () => {
    setOpenXML(true);
  };

  const handleCloseXML = () => {
    setOpenXML(false);
  };

  useEffect(() => {
    if (isUpdate) {
      getDetailDataServiceUpdate(dataServiceId);
    } else {
      resetFields();
      resetFormDataService();
      resetDataSource();
      resetOperation();
      resetQuery();
      resetResource();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceId, isUpdate]);

  useEffect(() => {
    if (dataServiceState.statusCreated === true && dataServiceState.idDataServiceCreated !== '') {
      history.replace(`/manager-data-services/manager-data-services/${dataServiceState.idDataServiceCreated}`);
      // resetIDDataService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceState.idDataServiceCreated, dataServiceState.statusCreated]);

  return (
    <Wrapper>
      <Header isUpdate={isUpdate} />
      <div className="container">
        <div className="header">
          <h3 className="title">{isUpdate ? titleUpdate : titleAdd}</h3>

          {isUpdate && (
            <div className="buttonHeader">
              <Button onClick={handleOpenXML}>XML Editor</Button>
              <Button icon="delete" className="buttonDelete"></Button>
            </div>
          )}
        </div>

        {isLoading ? (
          <Spin size="large" style={{ width: '100%', margin: '30% auto' }} tip="Đang tạo dịch vụ dữ liệu..." />
        ) : (
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Collapse defaultActiveKey={['1']} className="collapse">
              <Panel header="Thông tin chung" key="1">
                <Form.Item label="Tên dịch vụ">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                    initialValue: dataServiceUpdateState?.name,
                  })(<Input className="input" />)}
                </Form.Item>

                <Form.Item label="Mô tả dịch vụ">
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                    initialValue: dataServiceUpdateState?.description,
                  })(<TextArea className="input" />)}
                </Form.Item>
              </Panel>
            </Collapse>

            {/* DATA SOURCE COLLAPSE*/}
            <DataSourceCollapse />

            {/* QUERY COLLAPSE */}
            <QueryCollapse />

            {/* RESOURCE COLLAPSE */}
            <ResourceCollapse />

            {/* OPERATION COLLAPSE */}
            <OperationCollapse />

            <div className="containerButton">
              <Button type="default" onClick={handleCancel}>
                Hủy
              </Button>

              {isUpdate ? (
                <Button type="primary" onClick={handleUpdate}>
                  Lưu
                </Button>
              ) : (
                <Button type="primary" onClick={handleSubmit}>
                  Tạo mới
                </Button>
              )}
            </div>
          </Form>
        )}
      </div>

      <FormCreateNew />
      <FormCreateNewQuery />
      <FormCreateNewResource />
      <FormCreateNewOperation />
    </Wrapper>
  );
}

export default conn(Form.create<IProps>()(ManagerDataServiceAddNew));

const Wrapper = styled.div`
  background-color: #fff;
  color: #232323;
  min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .buttonDelete {
      border: none;
      box-shadow: none;
    }
  }

  .container {
    padding: 16px;
  }
  .title {
    font-weight: bold;
  }

  .collapse {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
  }

  .ant-collapse-header {
    background: #ff6060;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .containerButton {
    display: flex;
    justify-content: flex-end;

    & > button {
      margin: 0px 5px;
    }
  }
`;
