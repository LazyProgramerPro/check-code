import { Button, Form, Icon, Input, Modal, Select, Upload } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import styled from 'styled-components';
import { checkingConnection } from '../../redux/service/api';
import { gen_uuid } from 'src/utils/string_utils';
import { RootState } from 'src/redux/reducers';
import { createDataSource } from '../../redux/actions/create_dataSource';
import { connect, ConnectedProps } from 'react-redux';
import { setLoading } from '../../redux/actions/create_dataService';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString, validateNumber, validatePassword, validateServerData } from 'src/constants/common';

const { Option } = Select;
const { Dragger } = Upload;

const mapStateToProps = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource,
});

const mapDispatchToProps = {
  createDataSource,
  setLoading,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface MProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  close: (value: boolean) => void;
}

function CFormCreateDataSource(props: MProps) {
  const [dataSource, setDataSource] = useState<string>('RDBMS');
  const [dbType, setDbType] = useState('MySQL');
  const [file, setFile] = useState<File>();
  const [enableHeader, setEnableHeader] = useState('false');
  const { getFieldDecorator, resetFields } = props.form;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

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

  const handleCreateDataSource = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // if (dataSource === 'CSV' && values.enableHeader === 'true' && !values.rowContainHeader) {
        //   NotificationError('Th???t b???i', 'Vui l??ng nh???p h??ng ch???a header!');
        //   return;
        // }

        // let dts = props.dataSourceState.DataSourceConfigs || [];
        // if (dts.length > 0) {
        //   for (let i = 0; i < dts.length; i++) {
        //     if (dts[i].name === values.name) {
        //       NotificationError('???? t???n t???i t??n data source n??y', '');
        //       return;
        //     }
        //   }
        // }

        let f = file;
        let fName = file?.name || '';
        if (dataSource !== 'CSV' && dataSource !== 'Excel') {
          f = undefined;
          fName = '';
        }

        const params = {
          ...values,
          dbType: dbType,
          dataSource: dataSource,
          url: f,
          filename: fName,
          id: gen_uuid(),
        };
        console.log('PARAMS', params);
        props.createDataSource(params);
        NotificationSuccess('Th??nh c??ng', 'T???o m???i Data Source th??nh c??ng');
        props.close(false);
        resetFields();
        _resetSelectedFiles();
      }
    });
  };

  const checkValidate = (e: any, text: any, callback: any) => {
    let dts = props.dataSourceState.DataSourceConfigs || [];
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n Data Source kh??ng h???p l???');
    }

    const rs = dts.some(e => e.name === text);

    if (rs) {
      return callback('Data Source ???? t???n t???i');
    }
    return callback();
  };

  const onCancel = () => {
    resetFields();
    setEnableHeader('false');
    // setDataSource('RDBMS');
    // setDbType('MySQL');
    props.close(false);
  };

  const _resetSelectedFiles = () => {
    setSelectedFiles([]);
  };

  function handleChangeDataSource(value: any) {
    if (value !== 'RDBMS') {
      setDataSource(value);
      setDbType(value);
    } else {
      setDataSource(value);
      setDbType(dbType);
    }
    // reset file selected
    _resetSelectedFiles();
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
        props.setLoading(true);
        checkingConnection(params)
          .then(res => {
            if (res.code === 0) {
              NotificationSuccess('Th??nh c??ng', 'X??c nh???n k???t n???i t???i' + ' ' + props.form.getFieldValue('name'));
            } else {
              NotificationError('Th???t b???i', 'Kh??ng th??? k???t n???i t???i' + ' ' + props.form.getFieldValue('name'));
            }
          })
          .catch(e => {
            console.error(e);
            NotificationError('Th???t b???i', 'Kh??ng th??? k???t n???i t???i' + ' ' + props.form.getFieldValue('name'));
          })
          .finally(() => {
            props.setLoading(false);
          });
      }
    });
  };

  const handleSelectedFile = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setSelectedFiles(fileList);
  };

  const beforeUpload = (file: File) => {
    console.log('file: ' + file.type);
    setFile(file);
    return false;
  };

  const afterCloseModal = () => {
    resetFields();
    setDataSource('RDBMS');
    setDbType('MySQL');
    _resetSelectedFiles();
  };

  const validateExcelFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      callback();
      return;
    }
    let fileName = value.file.name;
    let fileType = value.file.type;
    console.log('excel fileName: ' + fileName + ', type: ' + fileType);
    if ('application/vnd.ms-excel' == fileType) {
      return true;
    }
    if ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' !== fileType) {
      callback('File excel kh??ng h???p l???');
      return;
    }
    callback();
  };

  const validateCSVFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      callback();
      return;
    }
    let fileName = value.file.name;
    let fileType = value.file.type;
    console.log('csv fileName: ' + fileName + ', type: ' + fileType);
    let ext = getFileExt(fileName);
    if ('csv' !== ext) {
      callback('Vui l??ng ch???n file csv');
      return;
    }
    callback();
  };

  const getFileExt = (filename: string) => {
    return filename.split('.').pop();
  };

  const validateServer = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    const isValid: boolean = validateServerData(text);
    if (!isValid) {
      return callback('T??n Server kh??ng h???p l???');
    }
    return callback();
  };

  const validateDatabase = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n Database kh??ng h???p l???');
    }
    return callback();
  };

  const validateUsername = (rule: any, text: any, callback: any) => {
    const checkUser = text.trim();

    props.form.setFields({
      username: {
        value: checkUser,
      },
    });
    return true;
  };
  const validateSeparator = (rule: any, text: any, callback: any) => {
    if (text.length === 0 || text === undefined || text === '') {
      return callback();
    }

    if (text.trim().length === 0) {
      return callback('T??n Column Separator kh??ng h???p l???');
    }

    const isValid: boolean = validateNormalString(text.trim());
    if (!isValid && text.trim() !== 0) {
      return callback('T??n Column Separator kh??ng h???p l???');
    } else {
      if (text === 'comma') {
        return true;
      }
      props.form.setFields({
        separator: {
          value: text.trim(),
        },
      });
      return callback();
    }
  };

  const validateNumberInput = (rule: any, text: any, callback: any) => {
    if (text.length === 0 || text === undefined || text === '') {
      return callback();
    }

    if (text.trim().length === 0) {
      return callback('S??? li???u kh??ng h???p l???');
    }
    const isValid: boolean = validateNumber(text.trim());
    if (!isValid && text.trim().length !== 0) {
      return callback('S??? li???u kh??ng h???p l???');
    } else {
      if (text === '2') {
        return true;
      }
      props.form.setFields({
        startingRow: {
          value: text.trim(),
        },
      });
      return callback();
    }
  };

  const validateNumberInput1 = (rule: any, text: any, callback: any) => {
    if (text.length === 0 || text === undefined || text === '') {
      return callback();
    }

    if (text.trim().length === 0) {
      return callback('S??? li???u kh??ng h???p l???');
    }

    const isValid: boolean = validateNumber(text.trim());
    if (!isValid && text.trim().length !== 0) {
      return callback('S??? li???u kh??ng h???p l???');
    } else {
      props.form.setFields({
        maxRowRead: {
          value: text.trim(),
        },
      });
      return callback();
    }
  };
  const restrict = (event: any) => {
    const regex = new RegExp('^[0-9 ]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  };

  const validateNumberHeader = (rule: any, text: any, callback: any) => {
    if (text.length === 0) {
      return callback();
    } else {
      const isValid: boolean = validateNumber(text);
      if (!isValid) {
        return callback('S??? li???u kh??ng h???p l???');
      }
      return callback();
    }
  };
  const valdidatePort = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('T??n Port kh??ng h???p l???');
    }
    if (!(Number(text) >= 1 && Number(text) <= 65535)) {
      return callback('T??n Port kh??ng h???p l???');
    }
    return callback();
  };

  const validatePasswordInput = (rule: any, text: any, callback: any) => {
    const checkValue = text.trim();
    props.form.setFields({
      password: {
        value: checkValue,
      },
    });
    return true;
  };

  const pasteUsername = () => {
    const valueUsername = props.form.getFieldValue('username');
    props.form.setFields({
      username: {
        value: valueUsername.trim(),
      },
    });
  };
  const pastePassword = () => {
    const valuePassword = props.form.getFieldValue('password');
    props.form.setFields({
      password: {
        value: valuePassword.trim(),
      },
    });
  };

  const pasteSeparator = () => {
    const valueSeparator = props.form.getFieldValue('separator');
    props.form.setFields({
      separator: {
        value: valueSeparator.trim(),
      },
    });
  };

  const pasteRow = () => {
    const valueRow = props.form.getFieldValue('startingRow');
    props.form.setFields({
      startingRow: {
        value: valueRow.trim(),
      },
    });
  };

  const pasteMaxRow = () => {
    const valueMaxRow = props.form.getFieldValue('maxRowRead');
    props.form.setFields({
      maxRowRead: {
        value: valueMaxRow.trim(),
      },
    });
  };

  const pasteRowContain = () => {
    const valueRowContain = props.form.getFieldValue('rowContainHeader');
    props.form.setFields({
      rowContainHeader: {
        value: valueRowContain.trim(),
      },
    });
  };
  return (
    <Wrapper>
      <Modal
        title="T???o m???i Data Source"
        afterClose={afterCloseModal}
        onCancel={onCancel}
        onOk={handleCreateDataSource}
        visible={props.show}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>H???y</Button>
            {(dataSource === 'MongoDB' || dataSource === 'RDBMS') && (
              <Button type="danger" onClick={handleCheckingConnection}>
                Ki???m tra k???t n???i
              </Button>
            )}
            <Button type="primary" onClick={handleCreateDataSource}>
              T???o m???i
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout} onSubmit={handleCreateDataSource}>
          <Form.Item label="T??n">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: checkValidate }],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Data Source">
            {getFieldDecorator('dbType', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
              validateTrigger: 'onBlur',
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
                <Form.Item label="C?? s??? d??? li???u">
                  {getFieldDecorator('databaseName', {
                    rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                    initialValue: 'MySQL',
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
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateServer }],
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Port">
                {getFieldDecorator('port', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: valdidatePort }],
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={5} />)}
              </Form.Item>

              <Form.Item label="T??n Database">
                {getFieldDecorator('database', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateDatabase }],
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [{ validator: validateUsername }],
                  initialValue: '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteUsername} />)}
              </Form.Item>

              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validatePasswordInput }],
                })(<Input maxLength={255} onPaste={pastePassword} />)}
              </Form.Item>
            </>
          )}

          {dataSource === 'CSV' && (
            <>
              <Form.Item label="CSV file">
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    {
                      validator: validateCSVFile,
                    },
                  ],
                  initialValue: '',
                  // validateTrigger: 'onBlur',
                })(
                  <Dragger
                    onChange={handleSelectedFile}
                    accept=".csv"
                    beforeUpload={beforeUpload}
                    fileList={selectedFiles}
                    multiple={false}
                    showUploadList={true}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Nh???p ho???c k??o th??? file v??o ????y</p>
                  </Dragger>,
                )}
              </Form.Item>

              <Form.Item label="Column Separator">
                {getFieldDecorator('separator', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateSeparator }],
                  initialValue: 'comma',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteSeparator} />)}
              </Form.Item>

              <Form.Item label="?????c t??? h??ng">
                {getFieldDecorator('startingRow', {
                  initialValue: '2',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                    {
                      validator: validateNumberInput,
                    },
                  ],
                })(<Input maxLength={255} min={1} onKeyPress={e => restrict(e)} onPaste={pasteRow} />)}
              </Form.Item>

              <Form.Item label="S??? h??ng ?????c">
                {getFieldDecorator('maxRowRead', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                    {
                      validator: validateNumberInput1,
                    },
                  ],
                })(<Input maxLength={255} min={1} onKeyPress={e => restrict(e)} onPaste={pasteMaxRow} />)}
              </Form.Item>

              <Form.Item label="Ch???a header">
                {getFieldDecorator('enableHeader', {
                  initialValue: enableHeader,
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                })(
                  <Select
                    onChange={(value: string) => {
                      setEnableHeader(value);
                    }}
                  >
                    <Option value="true">C??</Option>
                    <Option value="false">Kh??ng</Option>
                  </Select>,
                )}
              </Form.Item>
              {enableHeader === 'true' ? (
                <Form.Item label="H??ng ch???a header">
                  {getFieldDecorator('rowContainHeader', {
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
                      },
                      { validator: validateNumberHeader },
                    ],
                    initialValue: '',
                    validateTrigger: 'onBlur',
                  })(<Input maxLength={255} min={1} onPaste={pasteRowContain} />)}
                </Form.Item>
              ) : (
                <></>
              )}
            </>
          )}

          {dataSource === 'Excel' && (
            <>
              <Form.Item label="Excel URL">
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    {
                      validator: validateExcelFile,
                    },
                  ],
                  initialValue: '',
                })(
                  <Dragger
                    onChange={handleSelectedFile}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    beforeUpload={beforeUpload}
                    fileList={selectedFiles}
                    multiple={false}
                    showUploadList={true}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Nh???p ho???c k??o th??? file v??o ????y</p>
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

export default connector(Form.create<MProps>()(CFormCreateDataSource));

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
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
