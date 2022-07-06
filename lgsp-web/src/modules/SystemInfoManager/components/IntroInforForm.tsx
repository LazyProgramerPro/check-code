import React from 'react'
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field, Formik } from 'formik';
import { useAppSelector } from 'src/redux/hooks';
import ContentEdiable from 'src/components/customField/ContentEdiable';
import { Button } from 'antd';
import { ISystemIntroInforEntity } from '../redux/models';
interface IIntroInforFormProps {
  onSubmit: ( value: Partial<ISystemIntroInforEntity>) => void,
  onCancel: () => void
}
const IntroInforForm: React.FC<IIntroInforFormProps> = (props) => {
  const { onSubmit, onCancel } = props;
  const selectRowEditting = useAppSelector(state => state.systemInforManager.systemIntroInfor.rowEditting)
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('This field is required.')
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
        initialValues={{ content: selectRowEditting?.content ? selectRowEditting?.content : '' }}
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
          <Form onSubmit={handleSubmit} className="flex flex-col form-intro-infor">
            <Field
              name="content"
              label="content"
              placeholder="Password"
              component={ContentEdiable}
            />
            <div className="action-form mt-4">
              {
                selectRowEditting?.id ? (
                  <>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                      Thay đổi
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                      Lưu
                    </Button>
                  </>
                )
              }
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

export default IntroInforForm
