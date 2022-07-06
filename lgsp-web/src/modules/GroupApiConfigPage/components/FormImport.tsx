import { Button, Form, Icon, Modal, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import { importApiDefinition } from '../redux/service/api';

interface FormImportProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  apiId: string;
  reload: Function;
}

function FormImport(props: FormImportProps) {
  const { visible, onClose, apiId, reload } = props;
  const { getFieldDecorator } = props.form;

  const [file, setFile] = useState<any>();
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const [loadingImport, setLoadingImport] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const fileName = file.name.split('.').pop();
        if ('json' !== fileName && 'yaml' !== fileName) {
          NotificationError('Thất bại', 'Vui lòng chọn file json hoặc yaml');
          return;
        }

        setLoadingImport(true);
        const params = {
          apiId: apiId,
          file: file,
        };

        importApiDefinition(params)
          .then(res => {
            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Tải lên file định nghĩa thành công!');
              setFile(null);
              onClose();
              reload();
              _resetSelectedFiles();

              setLoadingImport(false);

              return;
            }

            NotificationError('Thất bại', res.message);
            setLoadingImport(false);
          })
          .catch(err => {
            setLoadingImport(false);
            NotificationError('Thất bại', err.message);
          });
      }
    });
  };

  const onCancel = () => {
    props.form.resetFields();
    _resetSelectedFiles();
    onClose();
  };

  const validateFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      callback();
      return;
    }
    let fileName = value.file.name;
    // let fileType = value.file.type;
    let ext = fileName.split('.').pop();
    if (ext !== 'json' && ext !== 'yaml') {
      callback('Vui lòng chọn file json hoặc yaml');
      return;
    }
    callback();
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

  const _resetSelectedFiles = () => {
    setSelectedFiles([]);
  };

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  return (
    <Wrapper>
      <Modal
        title="Import định nghĩa dịch vụ chia sẻ"
        visible={visible}
        onOk={handleSubmit}
        onCancel={onCancel}
        // okText="Import"
        // cancelText="Hủy"
        footer={
          <StyledButton>
            <Button onClick={onCancel}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Import
            </Button>
          </StyledButton>
        }
      >
        {loadingImport ? (
          <Spin style={{ width: '100%', margin: '20px auto' }} />
        ) : (
          <Form>
            <Form.Item label="File (.yaml hoặc json)">
              {getFieldDecorator('fileImport', {
                initialValue: '',
                rules: [
                  { required: true, message: 'Đây là trường bắt buộc nhập' },
                  {
                    validator: validateFile,
                  },
                ],
              })(
                <Dragger
                  onChange={handleSelectedFile}
                  accept=".json,.yaml"
                  beforeUpload={beforeUpload}
                  fileList={selectedFiles}
                  multiple={false}
                  showUploadList={true}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Nhấp hoặc kéo thả file vào đây</p>
                </Dragger>,
              )}
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormImportProps>()(FormImport);

const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -41px;
  margin-right: 10px;
`;
