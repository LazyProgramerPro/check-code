import { Button, Form, Input, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { tabOrderDetailService } from 'services/orderDetailService';
import styled from 'styled-components';
import Select from 'react-select';
import { BiPlus } from 'react-icons/bi';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const FormAppeal = ({ cancel, type, tradeId }) => {
  const baseUploadURL: any = process.env.REACT_APP_BASE_UPLOAD_URL;
  const accessToken = localStorage.getItem('access_token');
  const { getListAppealReason, updateTradeById, createAppeal } =
    tabOrderDetailService;
  const [form] = Form.useForm();

  const [optionsAppeal, setOptionsAppeal] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [validateUpLoadText, setValidateUpLoadText] = useState('');

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const findAllAppealReason = () => {
    getListAppealReason().then(res => {
      if (res.data.rc === 0) {
        if (type === 'Buy') {
          setOptionsAppeal(
            res.data.rows
              .filter(x => x.reasonType === 'FOR_BUY')
              .map((appeal: any) => ({
                value: appeal,
                label: appeal?.appealReason,
                key: appeal?.id,
              })),
          );
        } else {
          setOptionsAppeal(
            res.data.rows
              .filter(x => x.reasonType === 'FOR_SELL')
              .map((appeal: any) => ({
                value: appeal,
                label: appeal?.appealReason,
                key: appeal?.id,
              })),
          );
        }
      }
    });
  };

  const updateTradeToAppeal = () => {
    updateTradeById({
      id: tradeId,
      status: 'APPEAL',
    });
  };

  const createAppealP2P = data => {
    createAppeal(data);
  };

  //upload file

  const handleChange = (file: any) => {
    setFileList(file.fileList);
    if (file?.fileList?.length === 0) {
      setValidateUpLoadText('Please select at least one image!');
    } else setValidateUpLoadText('');
  };
  const handleRemove = file => {};
  const uploadFileCustom = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `${accessToken}`,
      },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        // setProgress(percent);
        if (percent === 100) {
          // setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('files', file);
    try {
      const res = await axios.post(baseUploadURL, fmData, config);
      onSuccess(res.data);
    } catch (err) {
      onError({ err });
    }
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const propUpload = {
    action: baseUploadURL,
    fileList: fileList,
    showUploadList: true,
    multiple: true,
    maxCount: 5,
    customRequest: uploadFileCustom,
    openFileDialogOnClick: true,
    accept: 'image/*',
    beforeUpload: (file: any) => {
      const isImage =
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif' ||
        file.type === 'image/ico';
      if (!isImage) {
        alert(`${file.name} is not a image file`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onPreview: handlePreview,
    onChange: handleChange,
    onRemove: handleRemove,
  };

  const finishFormAppeal = value => {
    if (fileList?.length) {
      console.log({
        description: value?.description,
        images: fileList?.map((x: any) => x?.response?.url),
        reasonId: value?.reasonId?.key,
        tradeId: tradeId,
      });
      createAppealP2P({
        description: value?.description,
        images: fileList?.map((x: any) => x?.response?.url),
        reasonId: value?.reasonId?.key,
        tradeId: tradeId,
      });
      // updateTradeToAppeal();
    }
  };

  const clickBtnAppeal = () => {
    if (!fileList?.length) {
      setValidateUpLoadText('Please select at least one image!');
    }
  };

  useEffect(() => {
    findAllAppealReason();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Form form={form} onFinish={finishFormAppeal}>
        <Form.Item
          name="reasonId"
          label="Reason for Appeal (Mandatory)"
          labelAlign="left"
          rules={[{ required: true, message: 'Please input your reason!' }]}
          requiredMark="optional"
        >
          <Select
            className="selectAppeal"
            classNamePrefix="select"
            name="color"
            options={optionsAppeal}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          labelAlign="left"
          rules={[
            { required: true, message: 'Please input your description!' },
          ]}
          requiredMark="optional"
        >
          <Input.TextArea />
        </Form.Item>
        <span style={{ display: 'block' }}>Upload proof (Mandatory)</span>
        <span className="totalSpan">
          Screenshots of payment and communication data should not exceed a
          total of 5 files .
        </span>
        <Upload {...propUpload} listType="picture-card">
          {fileList.length < 5 && (
            <div>
              <BiPlus />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        <Typography.Text type="danger">{validateUpLoadText}</Typography.Text>
        <Form.Item
          name="phone"
          label="Phone (Mandatory)"
          labelAlign="left"
          rules={[{ required: true, message: 'Please input your phone!' }]}
          requiredMark="optional"
        >
          <Input />
        </Form.Item>
        <div className="btnGroup">
          <Button onClick={cancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" onClick={clickBtnAppeal}>
            Appeal
          </Button>
        </div>
      </Form>
      <ModalPreview
        show={previewVisible}
        onHide={() => setPreviewVisible(false)}
        centered
      >
        <ModalPreview.Header closeButton>{previewTitle}</ModalPreview.Header>
        <ModalPreview.Body>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </ModalPreview.Body>
      </ModalPreview>
    </Wrapper>
  );
};

export default FormAppeal;

const Wrapper = styled.div`
  .ant-form {
    &-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .totalSpan {
      color: ${({ theme }) => theme.grayColor};
      font-size: 13px;
    }

    .btnGroup {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .ant-btn {
        width: 49%;
        height: 40px;
      }
    }

    .selectAppeal {
      .select__control {
        border-color: ${({ theme }) => theme.brightGrayColor};
        border-radius: 2px;
        box-shadow: none;
        &:focus {
          border-color: ${({ theme }) => theme.primary};
        }

        &:hover,
        &:focus {
          border-color: ${({ theme }) => theme.primary} !important;
        }
        cursor: pointer;
      }
      .select__option {
        transition: all 0.25s linear;
        cursor: pointer;
        &--is-selected {
          background-color: ${({ theme }) => theme.primary};
        }
      }
    }

    .ant-input {
      border-color: ${({ theme }) => theme.brightGrayColor} !important;
      box-shadow: none !important;

      &:hover,
      &:focus {
        border-color: ${({ theme }) => theme.primary} !important;
      }
    }
  }
`;

const ModalPreview = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};
  .modal-content {
    width: 98%;
    margin: 0 auto;
  }
  .modal-header {
    padding-bottom: 0;
    border-bottom: none;

    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  }
`;
