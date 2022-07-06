import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, DatePicker, Form, Icon, Input, Modal, Select } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { useParams } from 'react-router-dom';
import { addFileCertificateToList, showAddCertificationForm } from '../redux/actions/runtime_configuration_data';
import { CertificateFileEntity, UploadCertificateParam } from '../redux/models';
import { uploadCertificateFileService, validate } from '../redux/services/apis';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import Loading from '../../../components/Loading';
import Dragger from 'antd/es/upload/Dragger';
import { getAllPolicy } from '../../ConnectResource/redux/service/apis';
import { validateNormalString } from '../../../constants/common';

import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { getFileExt } from '../../../utils/string_utils';

moment.locale('vi');

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiRuntimeConfiguration.dataState,
});

const conn = connect(mapStateToProps, { showAddCertificationForm, addFileCertificateToList });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const UploadCertificateForm = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [loading, setLoading] = useState(false);

  const initPolicyOptions = [
    <Select.Option key="Unlimited" value="Unlimited">
      Không giới hạn
    </Select.Option>,
    <Select.Option key="Gold" value="Gold">
      5000 yêu cầu mỗi phút
    </Select.Option>,
    <Select.Option key="Silver" value="Silver">
      2000 yêu cầu mỗi phút
    </Select.Option>,
    <Select.Option key="Bronze" value="Bronze">
      1000 yêu cầu mỗi phút
    </Select.Option>,
  ];
  const [policyOptions, setPolicyOptions] = useState<JSX.Element[]>(initPolicyOptions);

  const [expiredDate, setExpiredDate] = useState('');
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const { getFieldDecorator, resetFields } = props.form;
  const [locale] = useState(viVN);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    getAllPolicy()
      .then(rs => {
        if (rs.code != 0) {
          NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
        }
        const data = rs.rows.map(item => {
          return (
            <Select.Option key={item.name} value={item.name}>
              {item.displayName}
            </Select.Option>
          );
        });
        setPolicyOptions(data);
      })
      .catch(() => {
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  }, []);

  const onUploadCertificateClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: UploadCertificateParam = {
          apiId: apiId,
          alias: values.name,
          tier: values.tier,
          file: file,
          expiredDate: expiredDate,
        };
        setLoading(true);
        uploadCertificateFileService(param)
          .then(rs => {
            if (rs.code == 0) {
              NotificationSuccess('Thành công', 'Tạo mới chứng chỉ SSL thành công');
            }
            if (rs.code !== 0) {
              NotificationError('Thất bại', rs.message);
            } else {
              const certFile: CertificateFileEntity = {
                alias: values.name,
                tier: values.tier,
              };
              props.addFileCertificateToList(certFile);
            }
            props.showAddCertificationForm(false);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            NotificationError('Thất bại', 'Xảy ra lỗi khi tải file chứng chỉ');
          });
      }
    });
  };

  const validateName = (rule: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (isValid) {
      return callback();
    } else {
      return callback('Tên chứng chỉ không hợp lệ');
    }
  };

  function beforeUpload(file: File) {
    setFile(file);
    return false;
  }

  const onBtnCancelClicked = () => {
    props.showAddCertificationForm(false);
    // resetFields();
  };

  const [selectedCertFiles, setSelectedCertFiles] = useState<any[]>([]);

  const handleSelectedCertFile = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setSelectedCertFiles(fileList);
  };

  const validateCertFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      callback();
      return;
    }
    let fileName = value.file.name;
    let fileType = value.file.type;
    let ext = getFileExt(fileName);
    if ('crt' !== ext && 'cer' !== ext) {
      callback('Vui lòng chọn file crt hoặc cer');
      return;
    }
    callback();
  };

  const validateNameCertificate = (rule: any, text: any, callback: any) => {
    const form = props.form;
    const textName = form.getFieldValue('name');
    if (textName === undefined || textName.length === 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên chứng chỉ SSL không hợp lệ');
    }
    validate(textName, apiId).then(rs => {
      if (rs.code !== 0) {
        return callback('Chứng chỉ SSL đã tồn tại');
      }
      return callback();
    });
  };

  const onChangeExpiredDate = (date: any, dateString: string) => {
    setExpiredDate(dateString);
  };

  const disabledDate = (current: any) => {
    return current < moment().startOf('day');
  };

  const localeDatePicker = {
    lang: {
      locale: 'en_US',
      today: 'Ngày hiện tại',
      yearFormat: 'YYYY',
      dateFormat: 'DD/MM/yyyy',
      dayFormat: 'D',
      dateTimeFormat: 'DD/MM/yyyy',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
    },
    timePickerLocale: {
      placeholder: 'Select time',
    },
    dateFormat: 'DD/MM/yyyy',

    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM',
  };

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'Tạo mới chứng chỉ SSL'}
      visible={props.dataState.showAddCert}
      centered={true}
      width="550px"
      onCancel={() => {
        props.showAddCertificationForm(false);
        // resetFields();
      }}
      afterClose={() => {
        setSelectedCertFiles([]);
        resetFields();
      }}
      footer={''}
    >
      <Form {...formItemLayout} layout="vertical">
        <Form.Item label="Tên chứng chỉ SSL" className="group-area">
          {getFieldDecorator('name', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateNameCertificate }],
          })(<Input placeholder="Vui lòng nhập tên chứng chỉ" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="Giới hạn truy cập" className="group-area">
          {getFieldDecorator('tier', {
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <Select showSearch style={{ width: '100%' }} placeholder="Chọn giới hạn truy cập" allowClear={true}>
              {policyOptions}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="File chứng chỉ(.cer) " className="group-area">
          {getFieldDecorator('certificate', {
            valuePropName: 'file',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateCertFile }],
          })(
            <Dragger
              accept="application/x-x509-ca-cert"
              beforeUpload={beforeUpload}
              multiple={false}
              showUploadList={true}
              fileList={selectedCertFiles}
              onChange={handleSelectedCertFile}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Nhấp hoặc kéo thả file vào đây</p>
            </Dragger>,
          )}
        </Form.Item>
        <Form.Item label="Ngày hết hạn chứng chỉ" className="group-area">
          {getFieldDecorator('expiredDate', {
            rules: [
              {
                required: true,
                message: 'Đây là trường bắt buộc nhập',
              },
            ],
          })(
            <DatePicker
              placeholder={'Ngày hết hạn'}
              format={'DD/MM/yyyy'}
              style={{ width: '100%' }}
              onChange={onChangeExpiredDate}
              disabledDate={disabledDate}
              locale={localeDatePicker}
            />,
          )}
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="default" className="mr-3" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" onClick={onUploadCertificateClicked}>
            Tạo mới
          </Button>
        </div>
      </Form>
      {loading ? <Loading /> : null}
    </Modal>
  );
};

export default conn(Form.create<IProps>()(UploadCertificateForm));
