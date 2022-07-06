import React, { ChangeEvent } from 'react'
import { Col, Input, Row, Checkbox, Button } from 'antd';
import { DATA_TYPE, PARAMS_TYPE } from 'src/constants/common';
import { Option as OptionSelect } from "src/constants/common";
import { Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { IParamObject } from '../redux/models';

const { Option } = Select;
interface IListControlParams {
  onAddParams: () => void,
  onResetParams: () => void,
  objectParam: IParamObject,
  onChange: (value: string | boolean, type: string) => void

}
const ListControlParams = (props: IListControlParams) => {
  const { onAddParams, objectParam, onChange, onResetParams } = props;
  const handleChange = (value: string | boolean, type: string) => {
    onChange(value, type)
  }
  
  return (
    <Row gutter={25}>
      <Col md={4}>
        <Select dropdownMatchSelectWidth={false} value={objectParam.in} onChange={(value: string) => handleChange(value, 'in')}>
          {PARAMS_TYPE.map((type: OptionSelect<string, string>, index: number) => {
            return (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            )
          })}
        </Select>
        <span>Chọn loại tham số</span>
      </Col>
      <Col md={7}>
        <Input value={objectParam.name} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value, 'name')} />
        <span>Nhập tên tham số</span>
      </Col>
      <Col md={4}>
        <Select dropdownMatchSelectWidth={false} value={objectParam.type} onChange={(value: string) => handleChange(value, 'type')}>
          {DATA_TYPE.map((type: OptionSelect<string, string>, index: number) => {
            return (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            )
          })}
        </Select>
        <span>Chọn kiểu dữ liệu</span>
      </Col>
      <Col md={5}>
        <div className="param-require">
          <Checkbox onChange={(event: CheckboxChangeEvent) => handleChange(event.target.checked, 'required')} />
        </div>
        <div>kiểm tra xem thông số có được yêu cầu hay không</div>
      </Col>
      <Col md={2} className="">
        <Button
          onClick={onAddParams}
          className="btn-add-param action-param"
        >
          +
        </Button>

      </Col>

      <Col md={1}>

        <Button onClick={onResetParams} className="btn-delete-param action-param" >
          x
        </Button>
      </Col>
    </Row>
  )
}

export default ListControlParams
