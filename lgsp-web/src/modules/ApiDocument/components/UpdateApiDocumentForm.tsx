import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { showUpdateApiDocumentForm, updateApiDocument } from '../redux/actions/update_document';
import { useParams } from 'react-router';
import { Button, Form, Icon, Input, Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UpdateApiDocumentParam } from '../redux/models';
import styled from 'styled-components';
import { validateNormalString } from 'src/constants/common';
import { validateNameDocument } from '../redux/services/apis';

const mapStateToProps = (rootState: RootState) => ({
  updateState: rootState.apiDocument.updateState,
});

const connector = connect(mapStateToProps, { showUpdateApiDocumentForm, updateApiDocument });

type ReduxProps = ConnectedProps<typeof connector>;

export interface IProps extends FormComponentProps, ReduxProps {}

const UpdateApiDocumentForm = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

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

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const [docType, setDocType] = useState('');
  const [file, setFile] = useState<any>();

  useEffect(() => {
    setDocType(props.updateState?.originData?.docType || '');
  }, [props.updateState, props.updateState.show]);

  const onChangeDocType = (e: any) => {
    setDocType(e.target.value);
  };

  const onUpdateDocumentClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateApiDocumentParam = {
          docId: props.updateState?.originData?.id || '',
          apiId: apiId,
          name: values.name,
          summary: values.summary,
          docType: docType || 'url',
          file: file,
          url: values.url,
        };
        props.updateApiDocument(updateParam);
      }
    });
  };

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const onBtnCancelClicked = () => {
    resetFields();
    props.showUpdateApiDocumentForm(false);
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
  const validateName = (rule: any, text: any, callback: any) => {
    const form = props.form;
    const textName = form.getFieldValue('name');
    if (textName === undefined || textName.length === 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n t??i li???u kh??ng h???p l???');
    }

    if (text === props.updateState?.originData?.name) {
      return true;
    }
    validateNameDocument(textName, apiId).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n t??i li???u ???? t???n t???i');
      }
      return callback();
    });
  };
  const validateSumary = (rule: any, value: any, callback: any) => {
    if (value === undefined || value.length === 0) {
      return callback();
    }
    props.form.setFields({
      summary: {
        value: value.trim(),
      },
    });
    return true;
  };

  const pasteSumary = (value: any) => {
    const valueSumary = props.form.getFieldValue('summary');
    props.form.setFields({
      summary: {
        value: valueSumary.trim() + ' ',
      },
    });
  };
  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'C???p nh???t t??i li???u'}
      visible={props.updateState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        props.showUpdateApiDocumentForm(false);
      }}
      afterClose={() => {
        resetFields();
      }}
      footer={''}
    >
      <Form {...formItemLayout}>
        <Form.Item label="T??n t??i li???u" className="group-area">
          {getFieldDecorator('name', {
            initialValue: props.updateState?.originData?.name || '',
            rules: [
              { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
              {
                validator: validateName,
              },
            ],
          })(<Input maxLength={255} disabled={true} />)}
        </Form.Item>
        <Form.Item label="T??m t???t n???i dung" className="group-area">
          {getFieldDecorator('summary', {
            initialValue: props.updateState?.originData?.summary || '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateSumary }],
          })(<Input placeholder="T??m t???t n???i dung" maxLength={5000} onPaste={pasteSumary} />)}
        </Form.Item>

        <Form.Item
          label={
            <>
              {'File h?????ng d???n'}
              {<span style={{ marginLeft: '5px', color: '#f5222d' }}>*</span>}
            </>
          }
          className="group-area"
        >
          {getFieldDecorator('certificate', {
            valuePropName: 'file',
            // rules: [{ message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            initialValue: props.updateState?.originData?.file,
          })(
            <Dragger
              onChange={handleSelectedFile}
              beforeUpload={beforeUpload}
              multiple={false}
              showUploadList={true}
              fileList={selectedFiles}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Nh???p ho???c k??o th??? file v??o ????y</p>
            </Dragger>,
          )}
        </Form.Item>
        {selectedFiles.length == 0 && (
          <Form.Item label="File ???? ch???n">
            <label>{props.updateState?.originData?.fileName}</label>
          </Form.Item>
        )}
        <ViewButton>
          <Button type="default" className="mr-3" onClick={onBtnCancelClicked}>
            H???y
          </Button>
          <Button type="primary" htmlType="submit" onClick={onUpdateDocumentClicked}>
            L??u
          </Button>
        </ViewButton>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(UpdateApiDocumentForm));

const ViewButton = styled.div`
  margin-left: 375px;
  display: flex;
  margin-top: -15px;
`;
