import React, { ReactNode } from 'react';
import { ErrorMessage, FieldProps } from 'formik';
import { Form, Input, InputNumber } from "antd";
import TextError from '../TextError';

const FormItem = Form.Item;

type IInputField = FieldProps<any> & {
  label?: string;
  placeholder?: string;
  useNumberComponent?: boolean;
  className?: string;
  fieldArray?: boolean;
  required?: boolean;
  formItem?: boolean;
  prefix?: ReactNode;
  suffix? :ReactNode;
}

const InputField: React.FC<IInputField> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  label,
  className,
  fieldArray,
  required,
  useNumberComponent = false,
  formItem = true,
  prefix,
  suffix,
  ...props
}) => {
  let errorMsg = null;
  if (fieldArray) {
    const charSplit = field?.name?.split('.');
    if (charSplit.length) {
      const fieldNameIndex = +charSplit[charSplit.length - 1];
      const fieldError: any = Object.keys(errors).length > 0 ? errors[charSplit[0]] : [];
      errorMsg = fieldError?.length > 0 && touched[charSplit[0]] && (touched[charSplit[0]] as any)[fieldNameIndex] ? fieldError[fieldNameIndex] : '';
    }

  } else {
    errorMsg = touched[field.name] && errors[field.name];
  }
  const Comp = useNumberComponent ? InputNumber : Input;
  return (
    <>
      {
        formItem ? (
          <FormItem
            label={<> {required ? <span style={{ marginRight: '5px', color: 'red' }}>*</span> : ''}<span>{label}</span> </>}
            help={errorMsg}
            validateStatus={errorMsg ? "error" : undefined}
            className={className}
          >
            <Comp
              {...field}
              {...props}
              onChange={
                useNumberComponent
                  ? (newValue: any) => setFieldValue(field.name, newValue)
                  : onChange
              }
              suffix={suffix}
            />
          </FormItem>
        )
          : (
            <>
            <Comp
              {...field}
              {...props}
              className={`${className} ${errorMsg ? 'is-invalid' : ''}`}
              onChange={
                useNumberComponent
                  ? (newValue: any) => setFieldValue(field.name, newValue)
                  : onChange
              }
              suffix={suffix}
            />
            <ErrorMessage name={field.name} component={TextError} />
            </>
          )
      }
    </>
  );
}

export default InputField;
