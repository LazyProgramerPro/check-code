import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Field, Formik, FormikProps, FormikHelpers as FormikActions } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Button, Radio, Form as FormItem, Input, Spin, Select, Col, Row } from 'antd';
import InputField from 'src/components/customField/Input';
import { IRestApiObject } from '../redux/models';
import { RadioChangeEvent } from 'antd/lib/radio';
import FileUpload from 'src/components/FileUpload';
import { E_REST_API_TYPE, E_WSDL_TYPE, LEVEL_DEPLOYMENT, POLICES } from 'src/constants/common';
import SelectField from '../../../components/customField/SelectField';
import styled from 'styled-components';

interface ICreateApiForm {
  onSubmit: (value: Partial<IRestApiObject>, callback: () => void) => void;
  onCancel: () => void;
}

const View = styled.div`
  /* .ant-col-xs-24 {
    margin-left: 6px;
  } */
  .css-1hwfws3 {
    height: 15px !important;
  }
  .css-151xaom-placeholder {
    padding-top: 34px;
  }

  .css-dvua67-singleValue {
    margin: 18px auto;
  }
  .css-1pcexqc-container {
    margin-top: -27px;
  }
  .ant-input {
    height: 38px;
  }
  .custom-select .label {
    margin-bottom: 18px;
    color: rgba(0, 0, 0, 0.85);
  }
  ant-col ant-form-item-label {
    margin-bottom: -9px;
  }
  .text-error {
    line-height: normal;
    margin-top: 3px;
  }
  .ant-form-explain {
    line-height: normal;
    margin-top: 3px;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`;
const CreateApiForm: React.FC<ICreateApiForm> = props => {
  const { onSubmit, onCancel } = props;
  const dispatch = useAppDispatch();
  const groupApiSelect = useAppSelector(state => state.groupRestApi.getState);
  const { loading, rowEditting } = groupApiSelect;
  const [apiType, setApiType] = useState<E_REST_API_TYPE>(E_REST_API_TYPE.REST);
  const [wsdlType, setWsdlType] = useState<E_WSDL_TYPE>(E_WSDL_TYPE.FILE);
  const [wsdlFile, setWsdlFile] = useState();
  const [wsdlUrl, setWsdlUrl] = useState();
  const [files, setFiles] = useState<File[]>([]);
  const [levelOptions] = useState(['?????a ph????ng', 'Trung ????ng']);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Tr?????ng n??y kh??ng ???????c ????? tr???ng')
      .matches(/^\S*$/, 'T??n API kh??ng ???????c ch???a kho???ng tr???ng'),
    context: Yup.string()
      .required('Tr?????ng n??y kh??ng ???????c ????? tr???ng')
      .matches(/^\S*$/, 'Context kh??ng ???????c ch???a kho???ng tr???ng'),
    version: Yup.string().required('Tr?????ng n??y kh??ng ???????c ????? tr???ng'),
    endpointUrl: Yup.string()
      .required('Tr?????ng n??y kh??ng ???????c ????? tr???ng')
      .matches(
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
        '?????a ch??? endpoint kh??ng h???p l???',
      ),
    wsdl_url:
      wsdlType === E_WSDL_TYPE.URL && apiType === E_REST_API_TYPE.SOAP
        ? Yup.string().required('Tr?????ng n??y kh??ng ???????c ????? tr???ng')
        : Yup.string(),
    file: Yup.mixed().when('type', {
      is: (value: E_REST_API_TYPE) => value === E_REST_API_TYPE.SOAP,
      then: Yup.mixed()
        .required('B???n c???n cung c???p m???t file wsdl')
        .test('fileSize', 'K??ch th?????c c???a file l?? qu?? l???n', (value: any) => {
          return value && value.size <= 1048576;
        })
        .test('fileFormat', 'B???n ch??? c?? th??? upload file v???i ?????nh d???ng ki???u wsdl.', (value: any) => {
          if (value) {
            const ext = value.name.substr(value.name.lastIndexOf('.') + 1, value.name.length);
            console.log('extextext', ext);
            return ext === 'wsdl';
          } else {
            return false;
          }
        }),
    }),
  });

  const convertValues = (values: Partial<IRestApiObject>) => {
    const groupApiBody: Partial<IRestApiObject> = { ...values, policies: [POLICES[0].value] };
    if (rowEditting?.id) {
      groupApiBody.id = rowEditting?.id;
    }
    return groupApiBody;
  };

  const onChangeRestType = (e: RadioChangeEvent, form: any) => {
    const value = e.target.value as E_REST_API_TYPE;
    setApiType(value);
    form?.setFieldValue('type', value);
  };

  const onChangeWsdlType = (e: RadioChangeEvent) => {
    const value = e.target.value as E_WSDL_TYPE;
    setWsdlType(value);
  };

  // const onFinish = (type: 'create' | 'publish', values: IRestApiObject) => {
  //   console.log(type);
  // };

  const renderInputType = (form: any) => {
    return (
      <>
        <div className="radio-wsdl-group">
          <span className="label">{wsdlType === E_WSDL_TYPE.FILE ? 'input types:' : 'Ki???u nh???p:'}</span>
          <Radio.Group onChange={onChangeWsdlType} value={wsdlType} className="input-type-group">
            <Radio value={E_WSDL_TYPE.URL}>WSDL URL</Radio>
            <Radio value={E_WSDL_TYPE.FILE}>WSDL File</Radio>
          </Radio.Group>
        </div>
        {renderContentTypeWsdl(form)}
      </>
    );
  };

  const validateFile = (file: File) => {
    if (file) {
      if (file.size > 1048576) {
        return false;
      }
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length);
      if (ext !== 'wsdl') {
        return false;
      }
      return true;
    }
  };

  const renderContentTypeWsdl = (form: any) => {
    const onDrop = (acceptedFiles: File[]) => {
      const isValid = validateFile(acceptedFiles[0]);
      if (isValid) {
        setFiles(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
      }

      form?.setFieldValue('file', acceptedFiles[0]);
      form?.setTouched({ ...form.touched, file: true });
    };
    let contentTypeWsdl = null;
    if (wsdlType === E_WSDL_TYPE.FILE) {
      contentTypeWsdl = (
        <Field name="file" type="file" component={FileUpload} required={true} files={files} onDrop={onDrop} />
        // <FileUpload type="file" files={files} onDrop={onDrop} />
      );
    } else {
      contentTypeWsdl = (
        <Field name="wsdl_url" label="WSDL URL:" placeholder="Nh???p wsdl url" component={InputField} required={true} />
      );
    }
    return contentTypeWsdl;
  };

  return (
    <View>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          type: E_REST_API_TYPE.REST,
          name: rowEditting?.name ? rowEditting?.name : '',
          context: rowEditting?.context ? rowEditting?.context : '',
          version: rowEditting?.version ? rowEditting?.version : '',
          endpointUrl: rowEditting?.endpointUrl ? rowEditting?.endpointUrl : '',
          // rest_api: E_REST_API_TYPE.REST,
          // soap_api: E_REST_API_TYPE.SOAP,
          file: wsdlFile,
        }}
        onSubmit={(values, { setSubmitting }: FormikActions<Partial<IRestApiObject>>) => {
          setSubmitting(true);
          const callback = () => {
            setSubmitting(false);
          };
          onSubmit(convertValues(values), callback);
        }}
      >
        {({ handleSubmit, isSubmitting, ...form }: FormikProps<Partial<IRestApiObject>>) => (
          <Spin tip="Loading..." spinning={isSubmitting}>
            <Form onSubmit={handleSubmit} className="flex flex-col create-api-form">
              <FormItem.Item className="group-area">
                <Radio.Group name="type" onChange={e => onChangeRestType(e, form)} value={apiType}>
                  <Radio value={E_REST_API_TYPE.REST}>Rest Api</Radio>
                  <Radio value={E_REST_API_TYPE.SOAP} className="ml-4">
                    SOAP API
                  </Radio>
                </Radio.Group>
              </FormItem.Item>
              {apiType === E_REST_API_TYPE.SOAP && renderInputType(form)}
              <Field name="name" label="T??n API" placeholder="Nh???p t??n API" component={InputField} required={true} />

              <Row style={{ marginTop: '13px' }}>
                <Col xs={24} md={7}>
                  <FormItem.Item className="group-area">
                    <Field
                      name="context"
                      label="Context"
                      placeholder="Nh???p ???????ng d???n"
                      component={InputField}
                      required={true}
                      className="context-item"
                    />
                  </FormItem.Item>
                </Col>
                <Col xs={24} md={9} style={{ marginLeft: '9px' }}>
                  <FormItem.Item style={{ marginTop: '-9px' }}>
                    <Field
                      name="context"
                      label="C???p tri???n khai"
                      component={SelectField}
                      placeholder="Ch???n c???p tri???n khai"
                      options={LEVEL_DEPLOYMENT}
                      required={true}
                      className="context-item"
                    />
                  </FormItem.Item>
                </Col>
                <Col xs={24} md={7} style={{ marginLeft: '9px' }}>
                  <FormItem.Item className="group-area">
                    <Field
                      name="version"
                      label="Phi??n b???n"
                      placeholder="Nh???p phi??n b???n"
                      component={InputField}
                      required={true}
                      className="version-item"
                    />
                  </FormItem.Item>
                </Col>
              </Row>

              {/* <Input.Group compact className="group-compact-item">
              <Field
                name="context"
                label="Context"
                placeholder="Nh???p ???????ng d???n"
                component={InputField}
                required={true}
                className="context-item"
              />
              <Field
                name="context"
                label="C???p tri???n khai"
                component={SelectField}
                placeholder='Ch???n c???p tri???n khai'
                options={LEVEL_DEPLOYMENT}
                required={true}
              />
              <Field
                name="version"
                label="Phi??n b???n:"
                placeholder="Nh???p phi??n b???n"
                component={InputField}
                required={true}
                className="version-item"
              />
            </Input.Group> */}
              <Field
                name="endpointUrl"
                label="Endpoint:"
                placeholder="Nh???p Endpoint"
                component={InputField}
                required={true}
              />
              <div className="action-form mt-4">
                <Button className="btn-create" type="primary" htmlType="submit" disabled={isSubmitting}>
                  T???o m???i
                </Button>

                <Button type="default" onClick={onCancel}>
                  H???y
                </Button>
              </div>
            </Form>
          </Spin>
        )}
      </Formik>
    </View>
  );
};

export default CreateApiForm;
