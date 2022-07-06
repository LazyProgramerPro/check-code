import React from 'react'
import * as Yup from 'yup';
import { withFormik, FormikProps, FieldArray, Form, Field, Formik, ErrorMessage } from 'formik';
import { useAppSelector } from 'src/redux/hooks';
import ContentEdiable from 'src/components/customField/ContentEdiable';
import { Button, Row, Col } from 'antd';
import { ISystemIntroInforEntity } from '../redux/models';
import InputField from 'src/components/customField/Input';
import FormItem from 'antd/lib/form/FormItem';
import TextError from 'src/components/TextError';
interface ISliderFormProps {
  onSubmit: (value: any) => void,
  onCancel: () => void
}
const SliderForm: React.FC<ISliderFormProps> = (props) => {
  const { onSubmit, onCancel } = props;
  const selectRowEditting = useAppSelector(state => state.systemInforManager.systemIntroInfor.rowEditting);
  const validationSchema = Yup.object({
    images: Yup.array().min(1, 'Slider phải có ít nhất 1 ảnh').of(
      Yup.string().required('Trường này là bắt buộc.').matches(
        /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi,
        'Link ảnh là không hợp lệ'
    ))
  });
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ images: selectRowEditting?.images ? selectRowEditting?.images : [] }}
        onSubmit={(values, { setSubmitting }) => {
          const sliderValue: Partial<ISystemIntroInforEntity>  = {...values};
          if (selectRowEditting?.id) {
            sliderValue.id = selectRowEditting?.id;
          }
          onSubmit(sliderValue)
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          values,
          errors
        }) => {          
         return  (
            <Form onSubmit={handleSubmit}   className="flex flex-col slider-form">
            {errors.images && typeof errors.images === 'string' && <span className="text-error"> {errors.images} </span>}
              <FieldArray name="images">
                {arrayHelpers => (
                  <div>
                    {values.images.map((img, index) => {
                      return (
                        <div key={index} className="">
                          <Row className="row">
                            <Col md={22}>
                              <Field
                                name={`images.${index}`}
                                label={`ảnh ${index}`}
                                fieldArray={true}
                                // value={img.value}
                                component={InputField}
                                className="group-area input-filed"
                              />
                            </Col>
  
                            <Col md={2}>
  
                              <FormItem >
                                <Button onClick={() => arrayHelpers.remove(index)} className="btn-delete">
                                  x
                                </Button>
                              </FormItem>
                            </Col>
  
                          </Row>
  
                        </div>
                      );
                    })}
                    <div className="action-item" >
                      <Button
                        onClick={() =>
                          arrayHelpers.push("")
                        }
                        className="btn-add-img"
                      >
                        Thêm ảnh
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="action-form mt-4">
                <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                  Công khai
                </Button>
  
                <Button type="default" className="ml-4" onClick={onCancel}>
                  Hủy bỏ
                </Button>
  
              </div>
            </Form>
          )}}
        </Formik>
      </div>
    )
}

export default SliderForm
