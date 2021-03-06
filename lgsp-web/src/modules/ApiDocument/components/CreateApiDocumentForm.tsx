import React, { useState } from 'react';
import { RootState } from 'src/redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Form, Icon, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { createApiDocument, showCreateApiDocumentForm } from '../redux/actions/create_documents';
import Dragger from 'antd/es/upload/Dragger';
import { CreateApiDocumentParam } from '../redux/models';
import { useParams } from 'react-router';
import { validateNormalString } from 'src/constants/common';
import { validateNameDocument } from '../redux/services/apis';

const mapStateToProps = (rootState: RootState) => ({
  createState: rootState.apiDocument.createState,
});

const connector = connect(mapStateToProps, { showCreateApiDocumentForm, createApiDocument });

type ReduxProps = ConnectedProps<typeof connector>;

export interface IProps extends FormComponentProps, ReduxProps {}

const CreateApiDocumentForm = (props: IProps) => {
  const { getFieldDecorator, resetFields, getFieldValue } = props.form;
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

  const [docType, setDocType] = useState('url');
  const [file, setFile] = useState<any>();

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const onCreateDocumentClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const createParam: CreateApiDocumentParam = {
          apiId: apiId,
          name: values.name,
          summary: values.summary,
          docType: docType,
          file: file,
          url: values.url,
        };
        props.createApiDocument(createParam);
      }
    });
  };

  // const validateName = (rule: any, text: any, callback: any) => {
  //   const isValid: boolean = validateNormalString(text);
  //   if (isValid) {
  //     return callback();
  //   } else {
  //     return callback('T??n t??i li???u ch??? bao g???m k?? t??? ch??? c??i, s???, g???ch ch??n d?????i, g???ch ngang');
  //   }
  // };

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
    validateNameDocument(textName, apiId).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n t??i li???u ???? t???n t???i');
      }
      return callback();
    });
  };

  const onBtnCancelClicked = () => {
    resetFields();
    props.showCreateApiDocumentForm(false);
  };

  const [selectedDocFiles, setSelectedDocFiles] = useState<any[]>([]);
  const handleSelectedDocFile = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setSelectedDocFiles(fileList);
  };

  const resetOnCloseFormDocument = () => {
    resetFields();
    setSelectedDocFiles([]);
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
      title={'T???o m???i t??i li???u'}
      visible={props.createState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        // resetFields();
        props.showCreateApiDocumentForm(false);
      }}
      afterClose={resetOnCloseFormDocument}
      onOk={onCreateDocumentClicked}
      // okText="Th??m m???i"
      // cancelText="H???y"
      footer={''}
    >
      <Form {...formItemLayout}>
        <Form.Item label="T??n t??i li???u" className="group-area">
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateName }],
          })(<Input placeholder="T??i li???u" maxLength={255} />)}
        </Form.Item>

        <Form.Item label="T??m t???t n???i dung" className="group-area">
          {getFieldDecorator('summary', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateSumary }],
          })(<Input placeholder="T??m t???t n???i dung" maxLength={5000} onPaste={pasteSumary} />)}
        </Form.Item>

        <Form.Item label="File h?????ng d???n" className="group-area">
          {getFieldDecorator('certificate', {
            valuePropName: 'file',
            rules: [
              {
                required: true,
                message: '????y l?? tr?????ng b???t bu???c nh???p',
              },
            ],
          })(
            <Dragger
              beforeUpload={beforeUpload}
              multiple={false}
              fileList={selectedDocFiles}
              onChange={handleSelectedDocFile}
              showUploadList={true}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Nh???p ho???c k??o th??? file v??o ????y</p>
            </Dragger>,
          )}
        </Form.Item>

        {/* <hr style={{ borderTop: '1px' }} />*/}
        <div style={{ marginBottom: '43px' }}>
          <Button htmlType="submit" type="primary" style={{ float: 'right' }} onClick={onCreateDocumentClicked}>
            T???o m???i
          </Button>
          <Button type="default" style={{ marginRight: '15px', float: 'right' }} onClick={onBtnCancelClicked}>
            H???y
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(CreateApiDocumentForm));
