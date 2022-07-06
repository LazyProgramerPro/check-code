import React from 'react'
import * as Yup from 'yup';
import { Form, Field, Formik } from 'formik';
import { useAppSelector } from 'src/redux/hooks';
import { Button } from 'antd';
import { ISystemIntroInforEntity } from '../redux/models';
import TextAreaField from 'src/components/customField/TextArea';
import InputField from 'src/components/customField/Input';

interface IAddressForm {
  onSubmit: (value: Partial<ISystemIntroInforEntity>) => void,
  onCancel: () => void
}
const AddressForm: React.FC<IAddressForm> = (props) => {
  const { onSubmit, onCancel } = props;
  const selectRowEditting = useAppSelector(state => state.systemInforManager.systemIntroInfor.rowEditting)
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Trường này không được để trống'),
    mobile: Yup.string().required('Trường này không được để trống').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Số điện thoại không hợp lệ'),
    telephone: Yup.string().required('Trường này không được để trống').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Số máy fax không hợp lệ'),
    email: Yup.string().required('Trường này không được để trống').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Địa chỉ email không hợp lệ'),
  });
  const convertValues = (values: Partial<ISystemIntroInforEntity>) => {
    const introInforValue: Partial<ISystemIntroInforEntity> = { ...values };
    if (selectRowEditting?.id) {
      introInforValue.id = selectRowEditting?.id;
    }
    return introInforValue;
  }

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          address: selectRowEditting?.address ? selectRowEditting?.address : '',
          mobile: selectRowEditting?.mobile ? selectRowEditting?.mobile : '',
          telephone: selectRowEditting?.telephone ? selectRowEditting?.telephone : '',
          email: selectRowEditting?.email ? selectRowEditting?.email : '',

        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(convertValues(values))
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          values
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col address-form">
            <Field
              name="address"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              component={TextAreaField}
              required={true}
            />
            <Field
              name="mobile"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              component={InputField}
              required={true}

            />
            <Field
              name="telephone"
              label="Số máy fax:"
              placeholder="Nhập số fax"
              component={InputField}
              required={true}

            />
            <Field
              name="email"
              label="email:"
              placeholder="Nhập địa chỉ email"
              component={InputField}
              required={true}
            />
            <div className="action-form mt-4">
              <Button type="primary" htmlType="submit" disabled={isSubmitting} ghost>
                Công khai
              </Button>
              <Button type="default" className="ml-4" onClick={onCancel}>
                Hủy bỏ
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddressForm;
