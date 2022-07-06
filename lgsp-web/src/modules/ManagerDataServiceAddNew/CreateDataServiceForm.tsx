import { Button, Collapse, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { getListDataServices } from '../ManagerDataServiceList/redux/action/get_dataSerivices';
import Header from './components/Header';
import {
  createDataService,
  getDetailDataServiceUpdate,
  resetFormDataService,
  setScreenNumber,
} from './redux/actions/create_dataService';
import { resetDataSource } from './redux/actions/create_dataSource';
import { resetOperation } from './redux/actions/create_operation';
import { resetQuery } from './redux/actions/create_query';
import { resetResource } from './redux/actions/create_resource';
import { CreateDataServiceParams } from './redux/models';
import CollapseCreateDataSource from './new_impl/create/CollapseCreateDataSource';
import CollapseCreateQuery from './new_impl/create/CollapseCreateQuery';
import CollapseCreateResource from './new_impl/create/CollapseCreateResource';
import CollapseCreateOperation from './new_impl/create/CollapseCreateOperation';
import Loading from 'src/components/Loading';
import { zIndex } from 'html2canvas/dist/types/css/property-descriptors/z-index';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNameCreate } from './redux/service/api';
import { validateNormalString } from 'src/constants/common';

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
  setScreenNumber,
});
type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

function CreateDataServiceForm(props: IProps) {
  const {
    createDataService,
    dataSourceState,
    operationState,
    queryState,
    resourceState,
    dataServiceUpdateState,
    dataServiceState,

    resetFormDataService,
    resetDataSource,
    resetOperation,
    resetResource,
    resetQuery,
  } = props;

  const { getFieldDecorator } = props.form;
  const history = useHistory();

  const { Panel } = Collapse;
  const { TextArea } = Input;

  const titleAdd = 'TẠO MỚI DỊCH VỤ DỮ LIỆU';

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
        createDataService(params, history);
      } else {
        window.scrollTo(0, 0);
      }
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    resetFormDataService();
    resetDataSource();
    resetOperation();
    resetResource();
    resetQuery();
  }, [resetDataSource, resetFormDataService, resetOperation, resetQuery, resetResource]);

  // useEffect(() => {
  //   if (dataServiceState.statusCreated && dataServiceState.statusCreated === true) {
  //     history.goBack();
  //   }
  // }, [dataServiceState.statusCreated, history]);

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value == '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(value);
    if (!isValid) {
      return callback('Tên dịch vụ dữ liệu không hợp lệ');
    }
    validateNameCreate(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Dịch vụ dữ liệu đã tồn tại');
      } else {
        return callback();
      }
    });
  };

  const validatedescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Mô tả dịch vụ không hợp lệ');
      }

      const checkValue = value.trim();
      props.form.setFields({
        description: {
          value: checkValue,
        },
      });
      return callback();
    }
  };

  const pasteDescription = (value: any) => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <Header isUpdate={false} />

      <div className="containerDataService">
        <Form {...formItemLayout}>
          <Collapse defaultActiveKey={['1']} className="collapse">
            <Panel header="Thông tin chung" key="1">
              <Form.Item label="Tên dịch vụ">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: 'Đây là trường bắt buộc nhập' },
                    { validator: checkValiateCreate },
                  ],
                  initialValue: dataServiceUpdateState?.name,
                  validateTrigger: 'onBlur',
                })(<Input className="input" maxLength={50} />)}
              </Form.Item>

              <Form.Item label="Mô tả">
                {getFieldDecorator('description', {
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validatedescription }],
                  initialValue: dataServiceUpdateState?.description,
                })(<TextArea className="input" maxLength={5000} onPaste={pasteDescription} />)}
              </Form.Item>
            </Panel>
          </Collapse>

          {/* DATA SOURCE COLLAPSE*/}
          <CollapseCreateDataSource />

          {/* QUERY COLLAPSE */}
          <CollapseCreateQuery />

          {/* RESOURCE COLLAPSE */}
          <CollapseCreateResource />

          {/* OPERATION COLLAPSE */}
          <CollapseCreateOperation />

          <div className="containerButton">
            <Button type="default" onClick={handleCancel}>
              Hủy
            </Button>

            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </div>
        </Form>
      </div>

      {dataServiceState.loading && <Loading />}
    </Wrapper>
  );
}

export default conn(Form.create<IProps>()(CreateDataServiceForm));

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0px 15px;

  .containerDataService {
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
