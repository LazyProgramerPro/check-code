import { Button, Col, Form, Icon, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { NotificationSuccess } from '../../../components/Notification/Notification';
import { EHttpMethod } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
import { addResource } from '../redux/actions/api_resource_data';
import { AddResourceParam, ApiResourceParamEntity } from '../redux/models';
import { validatePath, validatePathURI, validateUri, validateUrl } from '../../../constants/common';
import { NotificationError } from 'src/components/Notification/Notification';
import { FormComponentProps } from 'antd/lib/form';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { addResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const AddResourceForm = (props: IProps) => {
  const [url, setUrl] = useState<string>('');
  const { getFieldDecorator } = props.form;
  const [options, setOptions] = useState<EHttpMethod[]>([]);

  const onClickAddBtn = (e: any) => {
    if (options.length == 0) {
      NotificationError('Cảnh báo', 'Vui lòng chọn kiểu phương thức');
      return;
    }
    if (url == '') {
      NotificationError('Cảnh báo', 'Vui lòng nhập URI');
      return;
    }
    const isValid = validatePathURI(url);
    if (!isValid) {
      NotificationError('Cảnh báo', 'Đường dẫn không hợp lệ');
      return;
    }

    const pathSplit: string[] = url.split('/{');
    if (pathSplit.length == 1) {
      const param: AddResourceParam = {
        path: url,
        methods: options,
      };
      props.addResource(param);
      NotificationSuccess('Thành công', 'Thêm phương thức thành công');
      setOptions([]);
      setUrl('');

      return;
    }
    let i = 1;
    let resourceParamList: ApiResourceParamEntity[] = [];
    for (; i < pathSplit.length; i++) {
      const str: string = pathSplit[i];
      const lastCharacter: string = str.substr(str.length - 1, str.length);
      if (lastCharacter != '}') {
        NotificationError('Thất bại', 'Đường dẫn không hợp lệ');
        return;
      }
      const paramName: string = str.substr(0, str.length - 1);
      const findParam: ApiResourceParamEntity = resourceParamList.filter(item => item.name === paramName)[0];
      if (findParam !== undefined) {
        NotificationError('Thất bại', 'Tham số ở đường dẫn không hợp lệ');
        return;
      }
      const resourceParam: ApiResourceParamEntity = {
        name: paramName,
        in: 'path',
        type: 'string',
        required: true,
      };
      resourceParamList.push(resourceParam);
    }

    const param: AddResourceParam = {
      path: url,
      methods: options,
      resourceParamList: resourceParamList,
    };
    props.addResource(param);
    setOptions([]);
    setUrl('');
  };

  const onClickResetBtn = (e: any) => {
    setOptions([]);
    setUrl('');
  };

  const onChooseMethod = (value: any) => {
    setOptions(value);
  };

  const onChangeInput = (e: any) => {
    let str = e.target.value;
    if (url === '' && str[0] !== '/') {
      str = '/' + str;
    }
    setUrl(str);
  };

  const deleteInput = () => {
    setOptions([]);
    setUrl('');
  };

  const validUrl = (rule: any, text: any, callback: any) => {
    const isValid: boolean = validateUri(text);
    if (!isValid) {
      return callback('URI không phù hợp');
    }
    return true;
  };
  return (
    <div className="endpoint-wrapper">
      <Row className="row operation-item">
        <Form>
          <Col md={8}>
            <Form.Item>
              <Select
                value={options}
                placeholder="HTTP Verb"
                style={{ width: '70%' }}
                mode="multiple"
                onChange={onChooseMethod}
                optionLabelProp="label"
              >
                <Select.Option
                  label={<StyledLabel style={{ color: '#2CA1E2' }}>GET</StyledLabel>}
                  value={EHttpMethod.GET}
                >
                  {EHttpMethod.GET}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#EEA436' }}>POST</StyledLabel>}
                  value={EHttpMethod.POST}
                >
                  {EHttpMethod.POST}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#67D185' }}>PUT</StyledLabel>}
                  value={EHttpMethod.PUT}
                >
                  {EHttpMethod.PUT}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#FF0000' }}>DELETE</StyledLabel>}
                  value={EHttpMethod.DELETE}
                >
                  {EHttpMethod.DELETE}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#07FFD2' }}>PATCH</StyledLabel>}
                  value={EHttpMethod.PATCH}
                >
                  {EHttpMethod.PATCH}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#EB07FF' }}>HEAD</StyledLabel>}
                  value={EHttpMethod.HEAD}
                >
                  {EHttpMethod.HEAD}
                </Select.Option>
                <Select.Option
                  label={<StyledLabel style={{ color: '#4707FF' }}>OPTIONS</StyledLabel>}
                  value={EHttpMethod.OPTIONS}
                >
                  {EHttpMethod.OPTIONS}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item>
              <Input value={url} onChange={onChangeInput} placeholder="Nhập URI" maxLength={1000} />
            </Form.Item>
          </Col>

          <Col md={2}>
            <Button
              onClick={onClickAddBtn}
              style={{ marginLeft: '50px', borderRadius: '20px', width: '35px', height: '35px', background: '#323EDD' }}
            >
              <Icon
                type="plus"
                style={{
                  color: 'white',
                  verticalAlign: 'center',
                  fontSize: '20px',
                  marginTop: '4px',
                  marginLeft: '-8px',
                }}
              />
            </Button>
          </Col>

          <Col md={2}>
            <Button
              onClick={onClickResetBtn}
              style={{ borderRadius: '20px', width: '35px', height: '35px', color: 'white', border: 'white' }}
            >
              <Icon
                type="delete"
                style={{
                  color: 'black',
                  verticalAlign: 'center',
                  fontSize: '20px',
                  marginTop: '2px',
                  marginLeft: '-7px',
                }}
                onClick={deleteInput}
              />
            </Button>
          </Col>
        </Form>
      </Row>
    </div>
  );
};

const StyledLabel = styled.div`
  padding: 2px 10px;
  font-weight: bold;
`;

export default connector(Form.create<IProps>()(AddResourceForm));
