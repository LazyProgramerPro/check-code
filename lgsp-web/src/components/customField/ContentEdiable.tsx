import React, { useRef } from 'react';
import { FieldProps, ErrorMessage} from 'formik';
import { Form } from "antd";
import ContentEditable from 'react-contenteditable'
import TextError from '../TextError';

const FormItem = Form.Item;

type IContentEdiable  =  FieldProps<any> & {
  label: string;
  placeholder?:string;
  contenteditable?: boolean
}

const ContentEdiable: React.FC<IContentEdiable> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue }, 
  label,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];  
  const textRef = useRef(field.value);  
  const handleChange = (event: any) => {
    const value = event.target.value;
    setFieldValue(field.name, value);
    textRef.current = value;
  }

  return (
    <>
      <ContentEditable
        contenteditable={true}
        className="content-box"
        html={textRef.current}
        {...field}
        {...props}
        onChange={(event: any) => handleChange(event) }
      />
      <ErrorMessage name={label} component={TextError as any} />
      </>
  );
}

export default ContentEdiable;
