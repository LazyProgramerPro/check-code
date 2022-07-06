import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';

const ViewHeader = styled.div`
  .ant-from {
    width: 70%;
  }
  .ant-select-selection {
    margin-right: 10px !important;
  }
`;
const conn = connect();
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps {}
function SearchBar(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const [click, setclick] = useState('Theo ngày');
  const onChange = (value: any) => {
    setclick(value);
  };
  return (
    <ViewHeader>
      <Form style={{ width: '100%', padding: '16px', marginLeft: '15px' }}>
        <Row>
          <Col sm={12} xs={24} md={8} xl={5}>
            <Form.Item className="form-item">
              {getFieldDecorator('selection', { initialValue: 'Dịch vụ chia sẻ 1' })(
                <Select allowClear={true}>
                  <Select.Option value="Dịch vụ chia sẻ 1">Dịch vụ chia sẻ </Select.Option>
                  <Select.Option value="Toàn bộ dịch vụ chia sẻ">Toàn bộ dịch vụ chia sẻ</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} md={8} xl={5}>
            <Form.Item className="form-item">
              <Select optionFilterProp="children" allowClear={true} placeholder="Tên tài khoản">
                <Select.Option value="">test1</Select.Option>
                <Select.Option value="Warning">test2</Select.Option>
                <Select.Option value="Error">test3</Select.Option>
                <Select.Option value="Toàn bộ">test4</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} md={8} xl={5}>
            <Form.Item className="form-item">
              {getFieldDecorator('settime', { initialValue: 'Theo ngày' })(
                <Select optionFilterProp="children" allowClear={true} onChange={onChange}>
                  <Select.Option value="Theo ngày">Theo ngày</Select.Option>
                  <Select.Option value="Theo tháng">Theo tháng</Select.Option>
                  <Select.Option value="Theo giờ">Theo giờ</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          {click === 'Theo ngày' && (
            <>
              <Col sm={12} xs={24} md={8} xl={4}>
                <Form.Item className="form-item">
                  <DatePicker className="form-item" placeholder={'Ngày bắt đầu'} format={'DD/MM/yyyy'} />
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} md={8} xl={4} style={{ marginLeft: '10px' }}>
                <Form.Item className="form-item">
                  <DatePicker className="form-item" placeholder={'Ngày kết thúc'} format={'DD/MM/yyyy'} />
                </Form.Item>
              </Col>
            </>
          )}
          {click === 'Theo tháng' && (
            <>
              <Col sm={12} xs={24} md={8} xl={4} style={{ marginLeft: '10px' }}>
                <Form.Item className="form-item">
                  <DatePicker className="form-item" placeholder={'Tháng'} format={'YYYY/MM'} />
                </Form.Item>
              </Col>
            </>
          )}
          {click === 'Theo giờ' && (
            <>
              <Col sm={12} xs={24} md={8} xl={4} style={{ width: '95%', marginLeft: '-10px' }}>
                <Form.Item className="form-item">
                  <DatePicker className="form-item" placeholder={'Giờ'} format={'DD/MM/yyyy'} />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </ViewHeader>
  );
}

export default conn(Form.create<IProps>()(SearchBar));
