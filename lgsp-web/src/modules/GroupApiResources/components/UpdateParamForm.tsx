import { Field, Form, Formik } from 'formik';
import React from 'react'
import { IParamObject } from '../redux/models'
import * as Yup from 'yup';
import SelectField from 'src/components/customField/SelectField';
import InputField from 'src/components/customField/Input';
import { Button, Spin } from 'antd';
import TextAreaField from 'src/components/customField/TextArea';
import { DATA_TYPE, PARAMS_TYPE } from 'src/constants/common';

interface IUpdateParamForm {
  onSubmit: (values: IParamObject) => void,
  onCancel: () => void,
  formData: IParamObject
}
const UpdateParamForm = (props: IUpdateParamForm) => {
  const  {onSubmit, onCancel, formData} = props;
  const validationSchema = Yup.object().shape({
    in: Yup.string().required('Trường này không được để trống'),
    name: Yup.string().required('Trường này không được để trống'),
    type: Yup.string().required('Trường này không được để trống'),
  });


  return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          in: formData?.in,
          name: formData?.name,
          required: formData.required,
          type: formData.type,
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
              name="in"
              label="Loại tham số"
              placeholder="Loại tham số"
              component={SelectField}
              options={PARAMS_TYPE}
              required={true}
            />
            <Field
              name="name"
              label="Tên tham số"
              placeholder="Tên tham số"
              component={InputField}
              required={true}

            />
            <Field
              name="description"
              label="Mô tả:"
              placeholder="Nhập thông tin mô tả"
              component={TextAreaField}
            />
            <Field
              name="type"
              label="type:"
              placeholder="Chọn kiểu dữ liệu"
              component={SelectField}
              options={DATA_TYPE}
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

export default UpdateParamForm
