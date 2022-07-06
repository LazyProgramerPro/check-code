import { ErrorMessage, FieldProps } from "formik";
import React from "react";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select/lib/types";
import { Option } from "src/constants/common";
import TextError from "../TextError";
import {LabeledValue} from "antd/es/select";

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option<string, string>>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  arrayObject?: boolean;
  type?: string;
  label?: string;
  required?: boolean;
}

export const SelectField = ({
  className,
  placeholder,
  label,
  field,
  form,
  options,
  isMulti = false,
  isDisabled = false,
  arrayObject = false,
  type,
  required = false

}: CustomSelectProps) => {  
  const onChange = (option: ValueType<Option<string, string> | Option<string, string>[]>) => {    
    if(arrayObject) {
      form.setFieldValue(
        field.name,
        isMulti
          ? (option as Option<string, string>[]).map((item: Option<string, string>) => ({...field.value[0],[type as string] : item.value}))
          : (option as Option<string, string>).value
      );
    } else {
      form.setFieldValue(
        field.name,
        isMulti
          ? (option as Option<string, string>[]).map((item: Option<string, string>) => (item.value))
          : (option as Option<string, string>).value
      );
    }
  };  

  const getValue = () => {
    if (options) {
      if(arrayObject) {
        return isMulti
          ? options.filter(option => field.value.find((item: any) => item[type as string] === option.value))
          : options.find(option => option.value === field.value[type as string]);
      } else {
        return options.find(option => option.value === field.value);
        // return isMulti
        //   ? options.filter(option => field.value.indexOf(option.value) >= 0)
        //   : options.find(option => option.value === field.value);
      }
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const onBlur= (e: any) => {
    e.target.name = field.name;
    field.onBlur(e);
  }

  return (
    <div className="custom-select">
    {required ? <span style={{ marginRight: '5px', color: 'red' }}>*</span> : ''}
    {label && <label className="label">{label}</label>}
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      onBlur={onBlur}
      classNamePrefix="select"
      isDisabled={isDisabled}
    />
   <ErrorMessage name={field.name} component={TextError} />
    </div>
  );
};

export default SelectField;
