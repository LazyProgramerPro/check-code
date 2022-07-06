import { Col, Select, Row, Button, Input } from 'antd';
import React, { ChangeEvent } from 'react'
import { ERRORS_CODE } from 'src/constants/common';
import { IResponseObject } from '../redux/models';
import { Option as OptionSelect } from "src/constants/common";
const { Option } = Select;

interface IListControlResponse {
  onAddResponse: () => void,
  onResetResponse: () => void,
  objectResponse: IResponseObject,
  onChange: (value: string | boolean | number, type: string) => void
}
const ListControlResponse = (props: IListControlResponse) => {
  const {onAddResponse, onResetResponse, objectResponse,onChange} = props;
  const handleChange = (value: string | boolean | number, type: string) => {
    onChange(value, type)
  }
  return (
    <Row gutter={25}>
      <Col md={4}>
        <Select dropdownMatchSelectWidth={false} value={objectResponse.code} onChange={(value: number) => handleChange(value, 'code')}>
          {ERRORS_CODE.map((type: OptionSelect<string, number>, index: number) => {
            return (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            )
          })}
        </Select>
        <span>Chọn mã code</span>
      </Col>
      <Col md={7}>
        <Input value={objectResponse.description} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value, 'description')} />
        <span>Nhập message trả về</span>
      </Col>
      <Col md={2} className="">
        <Button
          onClick={onAddResponse}
          className="btn-add-response action-response"
        >
          +
        </Button>
      </Col>

      <Col md={1}>
        <Button onClick={onResetResponse} className="btn-delete-response  action-response" >
          x
        </Button>
      </Col>
    </Row>
  )
}

export default ListControlResponse
