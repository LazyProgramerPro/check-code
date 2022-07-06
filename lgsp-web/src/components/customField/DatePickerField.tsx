import React from 'react';
import { FieldProps } from 'formik';
import { Form} from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormItem = Form.Item;

type IDatePicker = FieldProps<any> & {
  label?: string;
  className?: string;
  required?: boolean;
};
const DatePickerField: React.FC<IDatePicker> = ({ field, form, label, required, className, ...rest }) => {
  const { name } = field;
  
  const { touched, errors,setFieldValue } = form;

  const errorMsg = touched[name] && errors[name];

  return (
    <FormItem
      label={
        <>
          {' '}
          {required ? <span style={{ marginRight: '5px', color: 'red' }}>*</span> : ''}
          <span>{label}</span>{' '}
        </>
      }
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
      className={className}
    >
      <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val: any) => {
        setFieldValue(field.name, val);
      }}
    />
    </FormItem>
  );
};

export default DatePickerField;
