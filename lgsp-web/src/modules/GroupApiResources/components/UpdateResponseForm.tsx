import { Field, Form, Formik } from 'formik';
import React from 'react'
import {  IResponseObject } from '../redux/models'
import * as Yup from 'yup';
import SelectField from 'src/components/customField/SelectField';
import InputField from 'src/components/customField/Input';
import { Button, Spin } from 'antd';
import {  ERRORS_CODE } from 'src/constants/common';

interface IUpdateResponseForm {
  onSubmit: (value: IResponseObject) => void,
  onCancel: () => void,
  formData: IResponseObject
}
const UpdateResponseForm = (props: IUpdateResponseForm) => {
  const { onSubmit, onCancel, formData } = props;
  const validationSchema = Yup.object().shape({
    code: Yup.number().required('Trường này không được để trống'),
    description: Yup.string().required('Trường này không được để trống'),
  });


  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        code: formData?.code,
        description: formData?.description ?? '',
        id: formData?.id

      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
          onSubmit(values)
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        values
      }) => (
        <Spin tip="Loading..." spinning={isSubmitting}>
          <Form onSubmit={handleSubmit} className="flex flex-col update-param-form">
            <Field
              name="code"
              label="Mã code"
              placeholder="Mã code"
              component={SelectField}
              options={ERRORS_CODE}
              required={true}
            />
            <Field
              name="description"
              label="Message trả về"
              placeholder="Nhập message trả về"
              component={InputField}
              required={true}
            />
            <div className="action-form mt-4">
              <Button type="primary" htmlType="submit" disabled={isSubmitting} >
                Lưu
              </Button>
              <Button type="default" className="ml-4" onClick={onCancel}>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        </Spin>
      )}
    </Formik>
  )
}

export default UpdateResponseForm
