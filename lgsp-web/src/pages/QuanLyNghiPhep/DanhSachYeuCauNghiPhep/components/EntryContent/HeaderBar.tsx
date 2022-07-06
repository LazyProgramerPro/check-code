import React, {Component} from 'react';
import {Button, Col, Form, Input, Row, Select} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import styled from 'styled-components';

const SearchForm = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const {Option} = Select;

// const { Search } = Input;

const roomDataProps = [
  {keyword: 'Phòng bán hàng', value: 'A'},
  {keyword: 'Phòng chăm sóc khách hàng', value: 'B'},
  {keyword: 'Phòng kỹ thuật', value: 'C'},
  {keyword: 'Phòng quản lý', value: 'D'},
];

const positionDataProps = [
  {keyword: 'Giám đốc', value: 'A'},
  {keyword: 'Quản lý', value: 'B'},
  {keyword: 'Trưởng nhóm', value: 'C'},
  {keyword: 'Nhân viên', value: 'D'},
];

const statusDataProps = [
  {keyword: 'Tất cả', value: 'Tất cả'},
  {keyword: 'Đã nghỉ', value: 'Đã nghỉ'},
];

const optionDataProps = [
  {keyword: 'Mã nhân viên', value: 'A'},
  {keyword: 'Họ và tên', value: 'B'},
  {keyword: 'Ngày sinh', value: 'C'},
  {keyword: 'Giới tính', value: 'D'},
  {keyword: 'Số CMND', value: 'E'},
  {keyword: 'Quê quán', value: 'F'},
  {keyword: 'Đơn vị', value: 'G'},
  {keyword: 'Chức vụ', value: 'H'},
  {keyword: 'Ngày tạo', value: 'Y'},
  {keyword: 'Số điện thoại', value: 'K'},
  {keyword: 'Email', value: 'M'},
  {keyword: 'Địa chỉ thường trú', value: 'L'},
];

interface OptionProps {
  keyword: string;
  value: string;
}

class HeaderBarCustomer extends Component<FormComponentProps, any> {
  handleChange = (e: any) => {
    this.setState({
      checkNick: e.target.checked,
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <SearchForm>
        <Row className="row d-flex-align-center">
          <Col md={21}>
            <Form>
              <Row className="row">
                <Col md={7}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('keyword', {
                      rules: [
                        {
                          message: 'Nhập từ khoá tìm kiếm',
                          required: true,
                        },
                      ],
                    })(<Input placeholder="Mã nhân viên, họ tên, CMND, SĐT, Email"/>)}
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator(
                      'room',
                      {},
                    )(
                      <Select placeholder="Đơn vị">
                        {roomDataProps.map((item: OptionProps, index: number) => {
                          return (
                            <Option key={index} value={item.value}>
                              {item.keyword}
                            </Option>
                          );
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator(
                      'position',
                      {},
                    )(
                      <Select placeholder="Chức vụ">
                        {positionDataProps.map((item: OptionProps, index: number) => {
                          return (
                            <Option key={index} value={item.value}>
                              {item.keyword}
                            </Option>
                          );
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator(
                      'status',
                      {},
                    )(
                      <Select placeholder="Đang làm việc">
                        {statusDataProps.map((item: OptionProps, index: number) => {
                          return (
                            <Option key={index} value={item.value}>
                              {item.keyword}
                            </Option>
                          );
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col md={5}>
                  <Form.Item>
                    <Row className="row">
                      <Col md={12}>
                        <Button style={{width: '100%'}} type="danger" onClick={this.check}>
                          Tìm kiếm
                        </Button>
                      </Col>
                      <Col md={12}>
                        <Button style={{width: '100%'}} type="default" onClick={this.handleReset}>
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={3}>
            <Select placeholder="Tuỳ chọn hiển thị" showSearch style={{width: '100%'}}>
              {optionDataProps.map((item: OptionProps, index: number) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.keyword}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </SearchForm>
    );
  }
}

const WrappedHeaderBarCustomer = Form.create({})(HeaderBarCustomer);
export default WrappedHeaderBarCustomer;
