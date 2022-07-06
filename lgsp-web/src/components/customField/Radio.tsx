import React from 'react';
import { FieldProps } from 'formik';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;

type IInputField = FieldProps<any> & {
  label?: string;
  placeholder?: string;
  useNumberComponent?: boolean;
  className?: string;
  required?: boolean;
  options?: any;
  formItem?: boolean;
  horizontal?:boolean;
};
const MyRadioButton: React.FC<IInputField> = ({ field, form, label, required, className, options, formItem = true,horizontal = true, ...rest }) => {
  const { name } = field;
  const { touched, errors,setFieldValue } = form;
  const errorMsg = touched[name] && errors[name];
  return (
    <>
      {
        formItem ? (
          <FormItem
            label={
              <>
                {required ? <span style={{ marginRight: '5px', color: 'red' }}>*</span> : ''}
                <span>{label}</span>{' '}
              </>
            }
            help={errorMsg}
            validateStatus={errorMsg ? 'error' : undefined}
            className={className}
          >
            {options.map((option: any) => {
              return (
                <React.Fragment key={option.key}>
                  <Radio type="radio" id={option.id} {...field} value={option.value} checked={field.value === option.value} onChange={() => setFieldValue(name, option.value)}/>
                  <label className={horizontal ? 'mr-4' : ''} htmlFor={option.id}>{option.key}</label>
                </React.Fragment>
              );
            })}
          </FormItem>
        ) : (
          options.map((option: any) => {
            return (
              <React.Fragment key={option.key}>
              <Radio type="radio" id={option.id} {...field} value={option.value} checked={field.value === option.value} onChange={() => setFieldValue(name, option.value)}/>
              <label htmlFor={option.id} className={horizontal ? 'mr-4' : ''}>{option.key}</label>
              </React.Fragment>
            );
          })
        )
      }
    </>
  );
};

export default MyRadioButton;
