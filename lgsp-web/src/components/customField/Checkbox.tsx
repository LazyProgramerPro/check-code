import React from 'react';
import { FieldProps } from 'formik';
import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const FormItem = Form.Item;

type IInputField = FieldProps<any> & {
  label?: string;
  placeholder?: string;
  useNumberComponent?: boolean;
  className?: string;
  fieldArray?: boolean;
  required?: boolean;
  formItem?: boolean;
};
const MyCheckbox: React.FC<IInputField> = ({ field, form, label, required, className, formItem=true, ...rest }) => {
  const { name } = field;
  const { touched, errors, setFieldValue } = form;
  const errorMsg = touched[name] && errors[name];
  return (
    <>
      {formItem ? (<FormItem
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
        {' '}
        <Checkbox  {...rest} checked={field.value} onChange={(event: CheckboxChangeEvent) => setFieldValue(name, event.target.checked)} />
      </FormItem>) : (
        <>
          <Checkbox  {...rest }  checked={field.value} onChange={(event: CheckboxChangeEvent) => setFieldValue(name, event.target.checked)}/>
          <span style={{marginLeft: '8px'}}>{label}</span>
        </>
      )}
    </>
  );
};

export default MyCheckbox;
