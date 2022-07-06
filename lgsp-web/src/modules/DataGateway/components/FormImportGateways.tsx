import { Modal, Form, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import xlsx from 'xlsx';
import { downloadTemplate, exportGateway, importGateway } from '../redux/service/apis';

interface IProps extends FormComponentProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
}

function FormImportGateways(props: IProps) {
  const { visible, onClose, reload } = props;

  const { getFieldDecorator, resetFields } = props.form;

  const [file, setFile] = useState<any>();
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [loadingImport, setLoadingImport] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          file: file,
        };

        setLoadingImport(true);

        importGateway(params)
          .then(res => {
            if (res.code === 0) {
              NotificationSuccess('Thành công', res.message);
              setFile(null);
              onClose();
              reload();
              setSelectedFiles([]);

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

  const handleCancel = () => {
    onClose();
  };

  const afterCloseModal = () => {
    setSelectedFiles([]);
    resetFields();
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

  const validateExcelFile = (rule: any, value: any, callback: any) => {
    if (value === null || value === undefined || value.file === null || value.file === undefined) {
      return callback();
    }
    let fileType = value.file.type;
    console.log('value.file', value);
    if ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' !== fileType) {
      return callback('Vui lòng chọn file excel');
    }
    const template = ['Tên', 'Tên hiển thị', 'Mô tả', 'Tên host', 'HTTP(s) context', 'HTTP port', 'HTTPs port'];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = xlsx.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const dataHeader1 = xlsx.utils.sheet_to_json(ws, { header: 1 });
      if (!(JSON.stringify(dataHeader1[0]) === JSON.stringify(template))) {
        return callback('File không đúng template');
      }
      return callback();
    };
    if (rABS) reader.readAsBinaryString(value.file);
    else reader.readAsArrayBuffer(value.file);
    return callback();
  };

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const handleExportGateway = () => {
    downloadTemplate();
  };

  return (
    <Modal
      title="Import danh sách Gateway"
      visible={visible}
      onCancel={handleCancel}
      afterClose={afterCloseModal}
      onOk={handleSubmit}
      maskClosable={false}
      footer={
        <StyledButton>
          <Button onClick={handleCancel}>Hủy</Button>

          <Button type="primary" onClick={handleSubmit}>
            Import
          </Button>
        </StyledButton>
      }
    >
      <Form>
        <Form.Item label="File">
          {getFieldDecorator('File', {
            rules: [
              {
                required: true,
                message: 'Đây là trường bắt buộc nhập',
              },
              {
                validator: validateExcelFile,
              },
            ],
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
              <p className="ant-upload-text">Nhấp hoặc kéo thả file vào đây</p>
            </Dragger>,
          )}
        </Form.Item>
      </Form>
      <ClickImport>
        <Button onClick={record => handleExportGateway()}>Ấn vào đây để tải file template</Button>
      </ClickImport>

      {loadingImport && <Loading />}
    </Modal>
  );
}

export default Form.create<IProps>()(FormImportGateways);
const ClickImport = styled.div`
  .ant-btn {
    color: #1890ff;
    font-weight: 500;
    border: none;
    box-shadow: none;
    margin-left: -18px;
  }
`;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
