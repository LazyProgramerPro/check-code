import React, { useEffect, useState } from 'react';
import { RootState } from 'src/redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { Button, Form, Icon, Input, Modal, Select, Upload } from 'antd';
import { getDriver } from '../redux/actions/get_driver';
import { showUpdateDriverForm, updateDriver } from '../redux/actions/update_driver';
import { GetDriverParams, UpdateDriverParam } from '../redux/models';
import { getFileExt } from '../../../utils/string_utils';
import { validateNameCreate } from '../redux/service/apis';
import { validateNormalString } from 'src/constants/common';
const mapStateToProps = (rootState: RootState) => ({
  updateState: rootState.driverConnect.updateState,
  getDriverState: rootState.driverConnect.getDriverState,
});

interface UpdateProps {
  page: number;
}

const { Option } = Select;

const connector = connect(mapStateToProps, { getDriver, showUpdateDriverForm, updateDriver });
type ReduxProps = ConnectedProps<typeof connector>;

export interface IProps extends FormComponentProps, ReduxProps, UpdateProps {}

const UpdateDriver = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;
  const { getDriverState, getDriver, updateState, page } = props;
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<any>();
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const loadDataDriver = () => {
    let params: GetDriverParams = {
      ...getDriverState.params,
      page: page,
      size: size,
      name: valueSearch,
    };
    getDriver(params);
  };

  const onUpdateDriverClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateDriverParam = {
          id: updateState.originData?.id || '',
          file: file,
          version: values.version,
          type: values.type,
          name: values.name,
        };
        props.updateDriver(updateParam);
        resetFields();
        props.showUpdateDriverForm(false);
        loadDataDriver();
      }
    });
  };

  useEffect(() => {
    loadDataDriver();
  }, [page, size, valueSearch]);

  useEffect(() => {
    loadDataDriver();
  }, []);

  const onBtnCancelClicked = () => {
    resetFields();
    props.showUpdateDriverForm(false);
  };

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
      callback();
      return;
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

  const checkValidate = (rule: any, text: any, callback: any) => {
    const nameVersion = props.form.getFieldValue('version');
    if (nameVersion === undefined || nameVersion === '') {
      return callback();
    }
    const isVer: boolean = validateNormalString(nameVersion);
    if (!isVer) {
      return callback('T??n Version kh??ng h???p l???');
    }

    if (
      props.updateState?.originData?.name === props.form.getFieldValue('name') &&
      props.updateState?.originData?.version === nameVersion
    ) {
      return true;
    }
    if (
      nameVersion.trim().length > 0 &&
      props.form.getFieldValue('name').trim().length > 0 &&
      props.updateState?.originData?.name !== props.form.getFieldValue('name') &&
      props.updateState?.originData?.version !== nameVersion
    ) {
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
    if (nameDriver === undefined || nameDriver === '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(nameDriver);
    if (!isValid) {
      return callback('T??n driver kh??ng h???p l???');
    }

    if (
      props.updateState?.originData?.name === nameDriver &&
      props.updateState?.originData?.version === props.form.getFieldValue('version')
    ) {
      return true;
    }
    if (
      props.form.getFieldValue('version').trim().length > 0 &&
      nameDriver.trim().length > 0 &&
      props.updateState?.originData?.name !== nameDriver &&
      props.updateState?.originData?.version !== props.form.getFieldValue('version')
    ) {
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
    <Modal
      title="C???p nh???t driver"
      visible={props.updateState.show}
      footer={null}
      maskClosable={false}
      centered={true}
      onCancel={() => {
        resetFields();
        props.showUpdateDriverForm(false);
      }}
      afterClose={() => {
        resetFields();
        setSelectedFiles([]);
      }}
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
            initialValue: props.updateState?.originData?.name,
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

            initialValue: props.updateState?.originData?.type,
          })(
            <Select showSearch optionFilterProp="children" allowClear={true}>
              <Option value={1}>MySQL</Option>
              <Option value={2}>Microsoft SQL Server</Option>
              <Option value={3}>Oracle</Option>
              <Option value={4}>PostgresSQL</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Version" style={{ marginTop: '-15px' }}>
          {getFieldDecorator('version', {
            rules: [
              {
                required: true,
                message: '????y l?? tr?????ng b???t bu???c nh???p',
              },
              { validator: checkValidate },
            ],
            validateTrigger: 'onBlur',
            initialValue: props.updateState?.originData?.version,
          })(<Input maxLength={255} />)}
        </Form.Item>

        <Form.Item
          label={
            <>
              {'File c???u h??nh (.jar)'}
              {<span style={{ marginLeft: '5px', color: '#f5222d' }}>*</span>}
            </>
          }
        >
          {getFieldDecorator('file', {
            valuePropName: 'file',
            rules: [
              // {
              //   required: true,
              //   message: '????y l?? tr?????ng b???t bu???c nh???p',
              // },
              {
                validator: validateJarFile,
              },
            ],
            initialValue: props.updateState?.originData?.file_path,
          })(
            <Upload
              {...props}
              fileList={selectedFiles}
              onChange={handleSelectedFile}
              accept=".jar"
              multiple={false}
              beforeUpload={beforeUpload}
            >
              <Button style={{ width: '502px' }}>
                <Icon type="upload" style={{ marginLeft: '460px' }} />
              </Button>
            </Upload>,
          )}
        </Form.Item>
        {/* <Form.Item style={{ marginTop: '-10px' }}>
          <label>
            File ???? ch???n: {props.updateState?.originData?.name}_{props.updateState?.originData?.version}.jar
          </label>
        </Form.Item> */}

        {selectedFiles.length == 0 && (
          <Form.Item style={{ marginTop: '-10px' }}>
            <label>File ???? ch???n: {props.updateState?.originData?.fileName}</label>
          </Form.Item>
        )}

        <div style={{ marginLeft: '373px', marginTop: '-30px' }}>
          <Button onClick={onBtnCancelClicked} style={{ marginTop: '10px', marginRight: '15px' }}>
            H???y
          </Button>
          <Button htmlType="submit" type="primary" style={{ marginTop: '10px' }} onClick={onUpdateDriverClicked}>
            L??u
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(UpdateDriver));
