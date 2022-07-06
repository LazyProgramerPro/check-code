import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { FormComponentProps } from 'antd/es/form';
import { AddParameterToResourceParam, ResourceParam } from '../redux/models';
import { addParameterToResource } from '../redux/actions/api_resource_data';
import { NotificationError } from '../../../components/Notification/Notification';
import { E_REST_API_TYPE, validateNormalString } from '../../../constants/common';
import styled from 'styled-components';

const View = styled.div``;
const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { addParameterToResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
  data: ResourceParam;
}

const AddParameterForm = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const [paramNamePlaceholder, setParamNamePlaceholder] = useState('Tên tham số');
  const [required, setRequired] = useState(false);

  const dataTypePlaceholder = 'Định dạng dữ liệu';
  const paramTypePlaceholder = 'Loại tham số';

  const [isBody, setIsBody] = useState(false);

  const [isFormData, setIsFormData] = useState(false);

  const handleTypeChange = (value: any) => {
    props.form.resetFields(['type']);
    if (value == 'body') {
      setParamNamePlaceholder(dataTypePlaceholder);
      setIsBody(true);
      setIsFormData(false);
    } else if (value == 'formData') {
      setIsFormData(true);
      setIsBody(false);
      setParamNamePlaceholder('Tên tham số');
    } else {
      setIsBody(false);
      setIsFormData(false);
      setParamNamePlaceholder('Tên tham số');
    }
  };

  const clickReset = (e: any) => {
    resetFields();
    setRequired(false);
    setIsBody(false);
    setIsFormData(false);
    setParamNamePlaceholder('Tên tham số');
  };

  const validateName = (rule: any, text: any, callback: any) => {
    if (paramNamePlaceholder == 'Tên tham số') {
      const isValid: boolean = validateNormalString(text);
      if (isValid) {
        return callback();
      } else {
        return callback('Tên tham số không hợp lệ');
      }
    } else {
      callback();
    }
  };

  const clickAdd = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: AddParameterToResourceParam = {
          name: values.name,
          type: values.type,
          required: values.required,
          in: values.in,
          resource: {
            path: props.data.path,
            method: props.data.method,
          },
        };
        const resourceGroup = props.dataState.data?.resourceGroupList.find(item => item.path === props.data.path);
        if (resourceGroup !== undefined) {
          const resource = resourceGroup?.data.find(item => item.type === props.data.method);
          if (resource !== undefined && resource.params != null) {
            if (values.in == 'body' || values.in == 'formData') {
              const param = resource?.params.find(item => item.in === 'body' || item.in === 'formData');
              if (param !== undefined) {
                NotificationError('Thất bại', 'Resource có tối đa 1 tham số dạng Body hoặc FormData');
                return;
              }
            } else {
              const param = resource?.params.find(item => item.in === values.in && item.name === values.name);
              if (param !== undefined) {
                NotificationError('Thất bại', 'Tham số đã tồn tại');
                return;
              }
            }
          }
        }
        props.addParameterToResource(param);
        clickReset(e);
      }
    });
  };

  const changeRequired = (e: any) => {
    setRequired(!required);
  };

  const renderParamForRest = () => {
    return (
      <Form.Item>
        {getFieldDecorator('in', {
          // initialValue: '',
          rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
        })(
          props.data.method === 'GET' ||
            props.data.method === 'DELETE' ||
            props.data.method === 'HEAD' ||
            props.data.method === 'OPTIONS' ? (
            <Select
              showSearch
              placeholder={paramTypePlaceholder}
              optionFilterProp="children"
              onChange={handleTypeChange}
              allowClear={true}
            >
              <Select.Option value="query">Query</Select.Option>
              <Select.Option value="header">Header</Select.Option>
              <Select.Option value="cookie">Cookie</Select.Option>
            </Select>
          ) : (
            <Select
              showSearch
              placeholder={paramTypePlaceholder}
              optionFilterProp="children"
              onChange={handleTypeChange}
              allowClear={true}
            >
              <Select.Option value="query">Query</Select.Option>
              <Select.Option value="header">Header</Select.Option>
              <Select.Option value="cookie">Cookie</Select.Option>
              <Select.Option value="body">Body</Select.Option>
            </Select>
          ),
        )}
      </Form.Item>
    );
  };

  const renderParamForSoap = () => {
    return (
      <Form.Item>
        {getFieldDecorator('in', {
          // initialValue: '',
          rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
        })(
          props.data.method === 'GET' ||
            props.data.method === 'DELETE' ||
            props.data.method === 'HEAD' ||
            props.data.method === 'OPTIONS' ? (
            <Select
              showSearch
              placeholder={paramTypePlaceholder}
              optionFilterProp="children"
              onChange={handleTypeChange}
              allowClear={true}
            >
              <Select.Option value="query">Query</Select.Option>
              <Select.Option value="header">Header</Select.Option>
            </Select>
          ) : (
            <Select
              showSearch
              placeholder={paramTypePlaceholder}
              optionFilterProp="children"
              onChange={handleTypeChange}
              allowClear={true}
            >
              <Select.Option value="query">Query</Select.Option>
              <Select.Option value="header">Header</Select.Option>
              <Select.Option value="body">Body</Select.Option>
              <Select.Option value="formData">FormData</Select.Option>
            </Select>
          ),
        )}
      </Form.Item>
    );
  };

  const renderBodyDataType = () => {
    return (
      <Select showSearch placeholder="Kiểu dữ liệu" optionFilterProp="children" allowClear={true}>
        <Select.Option value="Integer">Integer</Select.Option>
        <Select.Option value="Number">Number</Select.Option>
        <Select.Option value="String">String</Select.Option>
        <Select.Option value="Boolean">Boolean</Select.Option>
        <Select.Option value="Object">Object</Select.Option>
      </Select>
    );
  };

  const renderNormalDataType = () => {
    return (
      <Select showSearch placeholder="Kiểu dữ liệu" optionFilterProp="children" allowClear={true}>
        <Select.Option value="Integer">Integer</Select.Option>
        <Select.Option value="Number">Number</Select.Option>
        <Select.Option value="String">String</Select.Option>
        <Select.Option value="Boolean">Boolean</Select.Option>
      </Select>
    );
  };

  const renderFormDataType = () => {
    return (
      <Select showSearch placeholder={'Kiểu dữ liệu'} optionFilterProp="children" allowClear={true}>
        <Select.Option value="Integer">Integer</Select.Option>
        <Select.Option value="Number">Number</Select.Option>
        <Select.Option value="String">String</Select.Option>
        <Select.Option value="Boolean">Boolean</Select.Option>
      </Select>
    );
  };

  return (
    <View>
      <div>
        <Form>
          <Row gutter={8}>
            <Col xs={24} lg={5}>
              {props.dataState.data?.apiType == E_REST_API_TYPE.HTTP ? renderParamForRest() : renderParamForSoap()}
            </Col>

            <Col xs={24} lg={5}>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
                })(<Input placeholder={paramNamePlaceholder} maxLength={255} />)}
              </Form.Item>
            </Col>

            <Col xs={24} lg={5}>
              <Form.Item>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                })(isBody ? renderBodyDataType() : isFormData ? renderFormDataType() : renderNormalDataType())}
              </Form.Item>
            </Col>

            <Col xs={24} lg={5}>
              <Form.Item>
                {getFieldDecorator('required', {
                  initialValue: '',
                })(
                  <Checkbox checked={required} onChange={changeRequired}>
                    Bắt buộc
                  </Checkbox>,
                )}
                {/* <StyledLabel>Kiểm tra xem thông số </StyledLabel>
                <LablelCheckbox>có được yêu cầu hay không</LablelCheckbox> */}
                <p style={{ lineHeight: '10px', marginBottom: '-6px', color: 'lightgray', fontSize: '10px' }}>
                  Kiểm tra xem thông số có được yêu cầu hay không
                </p>
              </Form.Item>
            </Col>

            <Col xs={24} lg={4}>
              <Button type="primary" htmlType="submit" onClick={clickAdd} style={{ marginRight: '8px' }}>
                Thêm
              </Button>
              <Button type="default" onClick={clickReset}>
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </View>
  );
};

export default connector(Form.create<IProps>()(AddParameterForm));
const StyledLabel = styled.div`
  margin-top: -15px;
`;
const LablelCheckbox = styled.div`
  margin-top: -22px;
`;
