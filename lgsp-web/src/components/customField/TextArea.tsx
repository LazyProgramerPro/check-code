import React from 'react';
import {FieldProps} from 'formik';
import { Form, Input } from "antd";

const FormItem = Form.Item;
type ITextArea  =  FieldProps<any> & {
  label?: string;
  placeholder?:string;
  className?: string;
  required?: boolean;
}

const TextAreaField: React.FC<ITextArea> = ({
  field,
  form: { touched, errors, setFieldValue }, 
  label,
  required,
  className,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  
  const { TextArea } = Input;
  return (
    <FormItem
    label={<> {required ? <span style={{marginRight: '5px', color: 'red'}}>*</span> : ''}<span>{label}</span> </>}
    help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
      className={className}
    >
      <TextArea
        {...field}
        {...props}
        rows={4}
      />
    </FormItem>
  );
}

export default TextAreaField;
