import React from 'react';
import { FieldProps } from 'formik';
import { Form} from 'antd';

const FormItem = Form.Item;

type ICheckboxGroup = FieldProps<any> & {
  label?: string;
  className?: string;
  fieldArray?: boolean;
  required?: boolean;
  value?: any;
};
const MyCheckboxGroup: React.FC<ICheckboxGroup> = ({ field, form, label, required, className,value, ...rest }) => {
  const { name} = field;
  const { touched, errors,setFieldValue, initialValues } = form;
  const errorMsg = touched[name] && errors[name];  
  const handleChange = () => {
    const values = initialValues.checkbox || [];
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    setFieldValue(name, values);
  };

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
      <input type="checkbox" onChange={handleChange}
        checked={initialValues.checkbox.indexOf(value) !== -1}/>
    </FormItem>
  );
};

export default MyCheckboxGroup;
