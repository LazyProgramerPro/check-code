import { Button, Form, Icon, Input, Modal, Select, Upload, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { checkingConnection } from '../../redux/service/api';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from '../../../../redux/reducers';
import { saveEditDataSource } from '../../redux/actions/create_dataSource';
import { connect, ConnectedProps } from 'react-redux';
import { setLoading } from '../../redux/actions/create_dataService';
import { getFileExt } from '../../../../utils/string_utils';
import { validateNormalString, validateNumber, validateServerData } from 'src/constants/common';

const { Option } = Select;
const { Dragger } = Upload;

const mapStateToProps = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource,
});

const mapDispatchToProps = {
  saveEditDataSource,
  setLoading,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface MProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  item: any;
  close: (value: boolean) => void;
  is_update_from_server: boolean;
}

function UFormCreateDataSource(props: MProps) {
  const [dataSource, setDataSource] = useState<string>('RDBMS');
  const [dbType, setDbType] = useState('MySQL');
  const [file, setFile] = useState<File>();
  const [enableHeader, setEnableHeader] = useState(`${props.item.enableHeader}`);
  const { getFieldDecorator, resetFields } = props.form;
  const [changeType, setChangeType] = useState(0);
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

  useEffect(() => {
    setEnableHeader(props.item.enableHeader);
  }, [props.item]);

  // xu ly chi upload 1 file csv
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
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

  useEffect(() => {
    if (props.item && props.show) {
      console.log('item: ' + JSON.stringify(props.item));
      console.log('is_update_from_server: ' + props.is_update_from_server);

      let type = props.item.dbType;
      setDbType(type);

      let ds = props.item.dataSource || '';
      if (ds.length > 0) {
        setDataSource(ds);
      } else {
        if (type === 'Excel' || type === 'CSV' || type === 'MongoDB') {
          setDataSource(type);
        } else {
          setDataSource('RDBMS');
        }
      }

      if (props.item.url) {
        setFile(props.item.url);
        let f = [];
        f.push(props.item.url);
        setSelectedFiles(f);
      }
    }
  }, [props.is_update_from_server, props.item, props.show]);

  const handleUpdateDataSource = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // if (dataSource === 'CSV' && values.enableHeader === 'true' && !values.rowContainHeader) {
        //   NotificationError('Th???t b???i', 'Vui l??ng nh???p h??ng ch???a header!');
        //   return;
        // }

        // No choose new file
        if (props.is_update_from_server && selectedFiles.length === 0) {
          const params = {
            ...values,
            dbType: dbType,
            url: file,
            filename: props.item.filename,
            dataSource: dataSource,
            is_new_file: false,
            urlFile: null,
            id: props.item.id,
          };
          console.log('params: ' + JSON.stringify(params));
          props.saveEditDataSource(params);
          NotificationSuccess('Th??nh c??ng', 'C???p nh???t Data Source th??nh c??ng');
          props.close(false);
          resetFields();
          _resetSelectedFiles();
          return;
        }

        let f = file;
        let fName = file?.name || '';
        if (dataSource !== 'CSV' && dataSource !== 'Excel') {
          f = undefined;
          fName = '';
        }

        const params = {
          ...values,
          dbType: dbType,
          url: f,
          filename: fName,
          dataSource: dataSource,
          id: props.item.id,
          is_new_file: true,
        };

        props.saveEditDataSource(params);
        console.log(params);
        NotificationSuccess('Th??nh c??ng', 'C???p nh???t Data Source th??nh c??ng');
        props.close(false);
        resetFields();
        _resetSelectedFiles();
      }
    });
  };

  const onCancel = () => {
    props.close(false);
    resetFields();
    // setDataSource('RDBMS');
    // setDbType('MySQL');
    setEnableHeader(`${props.item.enableHeader}`);
  };

  function handleChangeDataSource(value: any) {
    if (value !== 'RDBMS') {
      setDataSource(value);
      setDbType(value);
    } else {
      setDataSource(value);
      setDbType(dbType);
    }
    setChangeType(1);
    // reset file selected
    _resetSelectedFiles();
    props.form.validateFields();
  }

  const _resetSelectedFiles = () => {
    setSelectedFiles([]);
  };

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
              NotificationSuccess('Th??nh c??ng', 'X??c nh???n k???t n???i t???i' + ' ' + `${props.item?.name}`);
            } else {
              NotificationError('Th???t b???i', 'Kh??ng th??? k???t n???i t???i' + ' ' + `${props.item?.name}`);
            }
          })
          .catch(e => {
            console.error(e);
            NotificationError('Th???t b???i', 'Kh??ng th??? k???t n???i t???i' + ' ' + `${props.item?.name}`);
          })
          .finally(() => {
            props.setLoading(false);
          });
      }
    });
  };

  const beforeUpload = (file: File) => {
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
    if (text === undefined || text === '') {
      return callback();
    }
    if (text.trim().length === 0) {
      return callback('T??n Column Separator kh??ng h???p l???');
    }

    const isValid: boolean = validateNormalString(text.trim());
    if (!isValid && text.trim() !== 0) {
      return callback('T??n Column Separator kh??ng h???p l???');
    }
    if (text === props.item?.separator || text === 'comma') {
      return true;
    }
    props.form.setFields({
      separator: {
        value: text.trim(),
      },
    });
    return callback();
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
    }
    if (text === props.item?.startingRow || text === '2') {
      return true;
    }
    props.form.setFields({
      startingRow: {
        value: text.trim(),
      },
    });
    return callback();
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
    }
    if (text === props.item?.maxRowRead) {
      return true;
    }
    props.form.setFields({
      maxRowRead: {
        value: text.trim(),
      },
    });
    return callback();
  };

  const validateNumberHeader = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }

    if (text === props.item?.rowContainHeader) {
      return true;
    }
    const isValid: boolean = validateNumber(text);
    if (!isValid) {
      return callback('S??? li???u kh??ng h???p l???');
    }
    return callback();
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
  const checkNameFile = (e: any) => {
    if (props.item.filename.length > 48) {
      return props.item.filename.slice(0, 48) + '....csv';
    }
    return props.item.filename;
  };

  return (
    <Wrapper>
      <Modal
        title="C???p nh???t Data Source"
        afterClose={afterCloseModal}
        onCancel={onCancel}
        onOk={handleUpdateDataSource}
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
            <Button type="primary" onClick={handleUpdateDataSource}>
              L??u
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout} onSubmit={handleUpdateDataSource}>
          <Form.Item label="T??n">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
              initialValue: props.item?.name || '',
              validateTrigger: 'onBlur',
            })(<Input disabled={true} maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Data Source">
            {getFieldDecorator('dbType', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
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
                  rules: [
                    {
                      required: dataSource === 'RDBMS' || dataSource === 'MongoDB',
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    {
                      validator: validateServer,
                    },
                  ],
                  initialValue: props.item?.server || '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Port">
                {getFieldDecorator('port', {
                  rules: [
                    {
                      required: dataSource === 'RDBMS' || dataSource === 'MongoDB',
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: valdidatePort },
                  ],
                  validateTrigger: 'onBlur',
                  initialValue: props.item?.port || '',
                })(<Input maxLength={5} />)}
              </Form.Item>

              <Form.Item label="T??n Database">
                {getFieldDecorator('database', {
                  rules: [
                    {
                      required: dataSource === 'RDBMS' || dataSource === 'MongoDB',
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateDatabase },
                  ],
                  initialValue: props.item?.database || '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [{ validator: validateUsername }],
                  initialValue: props.item?.username || '',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteUsername} />)}
              </Form.Item>

              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: props.item?.password || '',
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validatePasswordInput }],
                })(<Input maxLength={255} onPaste={pastePassword} />)}
              </Form.Item>
            </>
          )}

          {dataSource === 'CSV' && (
            <>
              <Form.Item
                label={
                  <>
                    {'CSV file'}
                    {<span style={{ marginLeft: '5px', color: '#f5222d' }}>*</span>}
                  </>
                }
              >
                {getFieldDecorator('url', {
                  rules: [
                    // {
                    //   required: !props.is_update_from_server,
                    //   message: '????y l?? tr?????ng b???t bu???c nh???p',
                    // },
                    {
                      validator: validateCSVFile,
                    },
                  ],
                  initialValue: props.item?.url || '',
                })(
                  <Dragger
                    onChange={handleSelectedFile}
                    beforeUpload={beforeUpload}
                    accept=".csv"
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

              {props.is_update_from_server && selectedFiles.length == 0 && changeType == 0 && (
                <Form.Item label="File ???? ch???n">
                  <div>
                    <Tooltip title={`${props.item.filename}`}>{checkNameFile(props.item.filename)}</Tooltip>
                  </div>
                </Form.Item>
              )}

              <Form.Item label="Column Separator">
                {getFieldDecorator('separator', {
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateSeparator },
                  ],
                  initialValue: props.item?.separator || 'comma',
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteSeparator} />)}
              </Form.Item>

              <Form.Item label="?????c t??? h??ng">
                {getFieldDecorator('startingRow', {
                  initialValue: props.item?.startingRow || 2,
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateNumberInput },
                  ],
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} min={1} onPaste={pasteRow} />)}
              </Form.Item>

              <Form.Item label="S??? h??ng ?????c">
                {getFieldDecorator('maxRowRead', {
                  initialValue: props.item?.maxRowRead || '',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateNumberInput1 },
                  ],
                  validateTrigger: 'onBlur',
                })(<Input maxLength={255} onPaste={pasteMaxRow} />)}
              </Form.Item>

              <Form.Item label="Ch???a header">
                {getFieldDecorator('enableHeader', {
                  initialValue: enableHeader,
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                  ],
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
                    initialValue: props.item?.rowContainHeader || '',
                    validateTrigger: 'onBlur',
                  })(<Input maxLength={255} min={1} onPaste={pasteRowContain} />)}
                </Form.Item>
              ) : (
                <></>
              )}
              {/* {enableHeader === 'true' ? (
                <Form.Item label="H??ng ch???a header">
                  {getFieldDecorator('rowContainHeader', {
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
                      },
                      { validator: validateNumberHeader },
                    ],
                    initialValue: props.item?.rowContainHeader || '',
                    validateTrigger: 'onBlur',
                  })(<Input maxLength={255} min={1} onPaste={pasteRowContain} />)}
                </Form.Item>
              ) : (
                <></>
              )} */}
            </>
          )}

          {dataSource === 'Excel' && (
            <>
              <Form.Item
                label={
                  <>
                    {'Excel URL'}
                    {<span style={{ marginLeft: '5px', color: '#f5222d' }}>*</span>}
                  </>
                }
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      validator: validateExcelFile,
                    },
                  ],
                  initialValue: props.item?.url || '',
                })(
                  <Dragger
                    onChange={handleSelectedFile}
                    beforeUpload={beforeUpload}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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

              {props.is_update_from_server && selectedFiles.length == 0 && (
                <Form.Item label="File ???? ch???n">
                  <label>{props.item.filename}</label>
                </Form.Item>
              )}
            </>
          )}
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<MProps>()(UFormCreateDataSource));

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
