import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input, Modal, Select, Upload } from 'antd';
import styled from 'styled-components';
import { RootState } from 'src/redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { createDriver, showCreateDriverForm } from '../redux/actions/create_driver';
import { getDriver } from '../redux/actions/get_driver';
import { CreateDriverParams, GetDriverParams } from '../redux/models';
import { getFileExt } from '../../../utils/string_utils';
import { validateNameCreate } from '../redux/service/apis';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;
const ViewAdd = styled.div`
  /* margin-left: -15px; */
  .ant-form-item-label {
    margin-bottom: -13px;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
  }
`;

interface FormCreateProps {
  refreshList: Function;
}
const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  createState: rootState.driverConnect.createState,
  getDriverState: rootState.driverConnect.getDriverState,
});

const conn = connect(mapStateToProps, { createDriver, showCreateDriverForm, getDriver });
type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps, FormCreateProps {}

function AddDriver(props: IProps) {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<any>();

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const showdialog = () => {
    setVisible(true);
  };
  const { refreshList } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const onCreateDriverClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: CreateDriverParams = {
          file: file,
          name: values.name,
          type: values.type,
          version: values.version,
        };
        props.createDriver(param);
        setVisible(false);
        refreshList();
        resetFields();
      }
    });
  };

  const onCancelDriverClicked = () => {
    resetFields();
    setVisible(false);
    props.showCreateDriverForm(false);
  };

  const afterClose = () => {
    resetFields();
    setSelectedFiles([]);
  };

  useEffect(() => {
    let params: GetDriverParams = {
      ...props.getDriverState.params,
    };
    props.getDriver(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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

  const validateJarFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      return callback();
    }
    let fileName = value.file.name;
    let fileType = value.file.type;
    console.log('jar fileName: ' + fileName + ', type: ' + fileType);
    let ext = getFileExt(fileName);
    if ('jar' !== ext) {
      callback('Vui l??ng ch???n file jar');
      return;
    }
    callback();
  };

  //CheckValidate
  const checkValidate = (rule: any, text: any, callback: any) => {
    const nameVersion = props.form.getFieldValue('version');
    if (nameVersion === undefined) {
      return callback();
    }
    const isVer: boolean = validateNormalString(nameVersion);
    if (!isVer) {
      return callback('T??n Version kh??ng h???p l???');
    }

    if (nameVersion.trim().length > 0 && props.form.getFieldValue('name').trim().length > 0) {
      validateNameCreate(props.form.getFieldValue('name'), nameVersion).then(rs => {
        if (rs.code !== 0) {
          props.form.setFields({
            name: {
              value: props.form.getFieldValue('name'),
              errors: [new Error('Driver ???? t???n t???i')],
            },
            version: {
              value: nameVersion,
            },
          });
          return;
        }

        props.form.setFields({
          name: {
            value: props.form.getFieldValue('name'),
          },
          version: {
            value: nameVersion,
          },
        });
        return callback();
      });
    }
    return callback();
  };

  const checkValidateName = (rule: any, text: any, callback: any) => {
    const nameDriver = props.form.getFieldValue('name');
    if (nameDriver === undefined) {
      return callback();
    }
    const isValid: boolean = validateNormalString(nameDriver);
    if (!isValid) {
      return callback('T??n driver kh??ng h???p l???');
    }
    if (props.form.getFieldValue('version').trim().length > 0 && nameDriver.trim().length > 0) {
      validateNameCreate(nameDriver, props.form.getFieldValue('version')).then(rs => {
        if (rs.code !== 0) {
          props.form.setFields({
            name: {
              value: nameDriver,
              errors: [new Error('Driver ???? t???n t???i')],
            },
            version: {
              value: props.form.getFieldValue('version'),
            },
          });
          return;
        }

        props.form.setFields({
          name: {
            value: nameDriver,
          },
          version: {
            value: props.form.getFieldValue('version'),
          },
        });
        return callback();
      });
    }
    return callback();
  };
  return (
    <ViewAdd>
      <Button className="mr-2" icon="plus" onClick={showdialog}>
        T???o m???i driver
      </Button>
      <Modal
        title="T???o m???i driver"
        visible={visible}
        footer={null}
        onCancel={onCancelDriverClicked}
        maskClosable={false}
        afterClose={afterClose}
      >
        <Form layout="vertical">
          <Form.Item label="T??n">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                { validator: checkValidateName },
              ],
              validateTrigger: 'onBlur',
            })(<Input maxLength={255} />)}
          </Form.Item>
          <Form.Item label="Lo???i database">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
              ],
            })(
              <Select allowClear={true} placeholder="Ch???n">
                <Option value="1">MySQL</Option>
                <Option value="2">Microsoft SQL Server</Option>
                <Option value="3">Oracle</Option>
                <Option value="4">PostgresSQL</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Version">
            {getFieldDecorator('version', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                { validator: checkValidate },
              ],
              validateTrigger: 'onBlur',
            })(<Input maxLength={255} />)}
          </Form.Item>
          <Form.Item label="File c???u h??nh (.jar)">
            {getFieldDecorator('file', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                {
                  validator: validateJarFile,
                },
              ],
              validateTrigger: 'onBlur',
            })(
              <Upload
                {...props}
                beforeUpload={beforeUpload}
                multiple={false}
                fileList={selectedFiles}
                onChange={handleSelectedFile}
                accept=".jar"
                showUploadList={true}
              >
                <Button style={{ width: '502px' }}>
                  <Icon type="upload" style={{ marginLeft: '460px' }} />
                </Button>
              </Upload>,
            )}
          </Form.Item>

          <div style={{ marginLeft: '345px', marginTop: '-15px' }}>
            <Button onClick={onCancelDriverClicked} style={{ marginTop: '10px', marginRight: '15px' }}>
              H???y
            </Button>
            <Button htmlType="submit" type="primary" style={{ marginTop: '10px' }} onClick={onCreateDriverClicked}>
              T???o m???i
            </Button>
          </div>
        </Form>
      </Modal>
    </ViewAdd>
  );
}

export default conn(Form.create<IProps>()(AddDriver));
