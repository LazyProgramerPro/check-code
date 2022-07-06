import { Button, Form, Icon, Input, Modal, Select, Upload } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { NotificationError } from 'src/components/Notification/Notifications';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import {
  checkingConnection,
  closeFormAdd,
  createDataSource,
  saveEditDataSource,
} from '../redux/actions/create_dataSource';
import { CreateDataSourceParams } from '../redux/models';
const { Option } = Select;
const { Dragger } = Upload;

const mapState = (rootState: RootState) => ({
  createDataSourceState: rootState.createDataService.createDataSource,
  dataServiceState: rootState.createDataService.createDataService,
});
const connector = connect(mapState, { closeFormAdd, createDataSource, checkingConnection, saveEditDataSource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function FormCreateNew(props: IProps) {
  const {
    createDataSourceState,
    closeFormAdd,
    createDataSource,
    checkingConnection,
    saveEditDataSource,
    dataServiceState,
  } = props;

  // FORM
  const [dataSource, setDataSource] = useState<string>('RDBMS');
  const [dbType, setDbType] = useState('MySQL');
  const [file, setFile] = useState<File>();

  const [enableHeader, setEnableHeader] = useState('true');

  const { getFieldDecorator, resetFields } = props.form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (createDataSourceState.DataSourceConfigs.some(e => e.name === values.name)) {
          NotificationError('Thất bại', 'Data Source đã tồn tại');
        } else {
          if (dataSource === 'CSV' && values.enableHeader === 'true' && !values.rowContainHeader) {
            NotificationError('Thất bại!', 'Vui lòng nhập hàng chứa header');
          } else {
            const params: CreateDataSourceParams = { ...values, dbType: dbType, url: file, filename: file?.name || '' };
            createDataSource(params);
            onCancel();
          }
        }
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (
          createDataSourceState.DataSourceConfigs.filter(
            e => e.name !== createDataSourceState.DataSourceConfigEdit?.name,
          ).some(e => e.name === values.name)
        ) {
          NotificationError('Thất bại', 'Data Source đã tồn tại');
        } else {
          if (dataSource === 'CSV' && values.enableHeader === 'true' && !values.rowContainHeader) {
            NotificationError('Thất bại', 'Vui lòng nhập hàng chứa header!');
          } else {
            const params: CreateDataSourceParams = {
              ...values,
              dbType: dbType || values.dbType,
            };
            saveEditDataSource(params);
            NotificationSuccess('Thành công', 'Cập nhật Data Source thành công!');

            onCancel();
          }
        }
      }
    });
  };

  const onCancel = () => {
    resetFields();
    setDataSource('RDBMS');
    setDbType('MySQL');
    closeFormAdd();
  };

  function handleChangeDataSource(value: any) {
    if (value !== 'RDBMS') {
      setDataSource(value);
      setDbType(value);
    } else {
      setDataSource(value);
      setDbType(dbType);
    }
  }

  const handleChangeDatabaseName = (value: any) => {
    setDbType(value);
  };

  const handleCheckingConnection = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          database: values.database,
          dbType: dbType,
          password: values.password,
          port: values.port,
          server: values.server,
          username: values.username,
        };
        checkingConnection(params);
      }
    });
  };

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  // const normFile = (e: any) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   if (e && e.fileList) {
  //     setFile(e.file);
  //     return e && e.file;
  //   }
  // };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  // EDIT EDIT
  useEffect(() => {
    resetFields();
    setDataSource('RDBMS');
    setDbType(`MySQL`);
    setEnableHeader('true');

    if (createDataSourceState.isUpdate === true) {
      if (dataServiceState.isUpdate) {
        const dbt = createDataSourceState.DataSourceConfigEdit?.dbType;

        if (dbt === 'MySQL' || dbt === 'Microsoft SQL Server' || dbt === 'Oracle' || dbt === 'PostgreSQL') {
          setDataSource('RDBMS');
          setDbType(`${dbt}`);
        } else {
          setDataSource(`${dbt}`);
          setDbType(`${dbt}`);
        }

        setEnableHeader(createDataSourceState.DataSourceConfigEdit?.enableHeader.toString() || '');
      } else {
        const dbt = createDataSourceState.DataSourceConfigEdit?.dbType;
        const dbn = createDataSourceState.DataSourceConfigEdit?.databaseName;

        if (dbt === dbn) {
          setDataSource('RDBMS');
          setDbType(`${dbt}`);
        } else if (dbn === undefined) {
          setDataSource(`${dbt}`);
          setDbType(``);
        } else {
          setDataSource('RDBMS');
          setDbType(`MySQL`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createDataSourceState.DataSourceConfigEdit, createDataSourceState.show]);

  return (
    <Wrapper>
      <Modal
        title={createDataSourceState.isUpdate ? 'Cập nhật Data Source' : 'Tạo mới Data Source'}
        onCancel={onCancel}
        onOk={createDataSourceState.isUpdate ? handleUpdate : handleSubmit}
        visible={createDataSourceState.show}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>Hủy</Button>

            {(dataSource === 'MongoDB' || dataSource === 'RDBMS') && (
              <Button type="danger" onClick={handleCheckingConnection}>
                Kiểm tra kết nối
              </Button>
            )}

            {createDataSourceState.isUpdate ? (
              <Button type="primary" onClick={handleUpdate}>
                Lưu
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                Tạo mới
              </Button>
            )}
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          {/* DataSourceConfig.name */}
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: createDataSourceState.DataSourceConfigEdit?.name || '',
            })(<Input maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Data Source">
            {getFieldDecorator('dbType', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: dataSource,
            })(
              <Select onChange={handleChangeDataSource}>
                <Option value="RDBMS">RDBMS</Option>
                <Option value="MongoDB">MongoDB</Option>
                <Option value="CSV">CSV</Option>
                <Option value="Excel">Excel</Option>
              </Select>,
            )}
          </Form.Item>

          {(dataSource === 'RDBMS' || dataSource === 'MongoDB') && (
            <>
              {dataSource === 'RDBMS' && (
                <Form.Item label="Cơ sở dữ liệu">
                  {getFieldDecorator('databaseName', {
                    rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                    initialValue: dbType,
                  })(
                    <Select onChange={handleChangeDatabaseName}>
                      <Option value="MySQL">MySQL</Option>
                      <Option value="Microsoft SQL Server">Microsoft SQL Server</Option>
                      <Option value="Oracle">Oracle</Option>
                      <Option value="PostgreSQL">PostgreSQL</Option>
                    </Select>,
                  )}
                </Form.Item>
              )}

              <Form.Item label="Server">
                {getFieldDecorator('server', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.server || '',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Port">
                {getFieldDecorator('port', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.port || '',
                })(<Input type="number" min={1} maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Tên Database">
                {getFieldDecorator('database', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.database || '',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  initialValue: createDataSourceState.DataSourceConfigEdit?.username || '',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: createDataSourceState.DataSourceConfigEdit?.password || '',
                })(<Input maxLength={255} />)}
              </Form.Item>
            </>
          )}

          {dataSource === 'CSV' && (
            <>
              <Form.Item label="CSV file">
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.url || '',
                })(
                  <Dragger beforeUpload={beforeUpload} multiple={false} showUploadList={true}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Nhấp hoặc kéo thả file vào đây</p>
                  </Dragger>,
                )}
              </Form.Item>

              <Form.Item label="Column Separator">
                {getFieldDecorator('separator', {
                  initialValue: createDataSourceState.DataSourceConfigEdit?.separator || 'comma',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Đọc từ hàng">
                {getFieldDecorator('startingRow', {
                  initialValue: createDataSourceState.DataSourceConfigEdit?.startingRow || 2,
                })(<Input type="number" min={1} maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Số hàng đọc">
                {getFieldDecorator('maxRowRead', {
                  initialValue: createDataSourceState.DataSourceConfigEdit?.maxRowRead || '',
                })(<Input type="number" min={1} maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Chứa header">
                {getFieldDecorator('enableHeader', {
                  initialValue: enableHeader,
                })(
                  <Select
                    onChange={(value: string) => {
                      setEnableHeader(value);
                    }}
                  >
                    <Option value="true">Có</Option>
                    <Option value="false">Không</Option>
                  </Select>,
                )}
              </Form.Item>

              <Form.Item label="Hàng chứa header">
                {getFieldDecorator('rowContainHeader', {
                  rules: [{ required: enableHeader === 'true', message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.rowContainHeader || '',
                })(<Input type="number" min={1} maxLength={255} />)}
              </Form.Item>
            </>
          )}

          {dataSource === 'Excel' && (
            <>
              <Form.Item label="Excel URL">
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  initialValue: createDataSourceState.DataSourceConfigEdit?.url || '',
                })(
                  <Dragger beforeUpload={beforeUpload} multiple={false} showUploadList={true}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Nhấp hoặc kéo thả file vào đây</p>
                  </Dragger>,
                )}
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(FormCreateNew));

const Wrapper = styled.div`
  .footer {
    display: flex;
  }

  .formItem {
    & > .ant-form-item-control {
      width: 300px !important;
    }
  }
  .whiteSpace {
    width: 200px;
  }
`;
