import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { NotificationError } from '../../../components/Notification/Notification';
import { RootState } from '../../../redux/reducers';
import { addResponseToResource } from '../redux/actions/api_resource_data';
import { AddResponseToResourceParam, ApiResourceResponseEntity, ResourceParam } from '../redux/models';

const View = styled.div``;
const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { addResponseToResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
  data: ResourceParam;
  dataResponse?: ApiResourceResponseEntity[];
  test?: [1, 2, 3, 4, 5];
}

const AddResponseForm = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const clickReset = (e: any) => {
    resetFields();
  };

  const clickAdd = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const currResource: any = props.dataState.data?.resourceGroupList.find(
          (item: any) => item.path == props.data.path,
        );
        if (currResource == undefined) {
          return;
        }
        const currResourceData: any = currResource.data.find((item: any) => item.type == props.data.method);
        if (currResourceData == undefined) {
          return;
        }
        console.log('currResourceData: ' + JSON.stringify(currResourceData));
        const existResponse = currResourceData.responses.find((item: any) => item.code == values.code);
        if (existResponse != undefined) {
          NotificationError('Thất bại', 'Response đã tồn tại ');
          return;
        }
        const param: AddResponseToResourceParam = {
          code: values.code,
          description: values.description.trim(),
          resource: {
            path: props.data.path,
            method: props.data.method,
          },
        };
        props.addResponseToResource(param);
        const resourceGroup = props.dataState.data?.resourceGroupList.find(item => item.path === props.data.path);
        if (resourceGroup !== undefined) {
          const resource = resourceGroup?.data.find(item => item.type === props.data.method);
          const response = resource?.responses.find(item => item.code === values.code);
          if (response !== undefined) {
            NotificationError('Thất bại', 'Mô tả phản hồi đã tồn tại');
            return;
          }
        }
        clickReset(e);
      }
    });
  };

  const validateCode = (e: any, text: any, callback: any) => {};

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Message trả về không phù hợp');
      }
      props.form.setFields({
        description: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };
  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  return (
    <View>
      <Form layout="horizontal">
        <Row gutter={8}>
          <Col xs={24} lg={5}>
            <Form.Item label="Mã code">
              {getFieldDecorator('code', {
                // initialValue: '',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              })(
                <Select placeholder="Mã code" showSearch>
                  <Select.Option value="100">100</Select.Option>
                  <Select.Option value="101">101</Select.Option>
                  <Select.Option value="102">102</Select.Option>
                  <Select.Option value="103">103</Select.Option>
                  <Select.Option value="200">200</Select.Option>
                  <Select.Option value="201">201</Select.Option>
                  <Select.Option value="204">204</Select.Option>
                  <Select.Option value="206">206</Select.Option>
                  <Select.Option value="300">300</Select.Option>
                  <Select.Option value="301">301</Select.Option>
                  <Select.Option value="302">302</Select.Option>
                  <Select.Option value="303">303</Select.Option>
                  <Select.Option value="304">304</Select.Option>
                  <Select.Option value="305">305</Select.Option>
                  <Select.Option value="306">306</Select.Option>
                  <Select.Option value="307">307</Select.Option>
                  <Select.Option value="308">308</Select.Option>
                  <Select.Option value="400">400</Select.Option>
                  <Select.Option value="401">401</Select.Option>
                  <Select.Option value="403">403</Select.Option>
                  <Select.Option value="404">404</Select.Option>
                  <Select.Option value="405">405</Select.Option>
                  <Select.Option value="406">406</Select.Option>
                  <Select.Option value="407">407</Select.Option>
                  <Select.Option value="408">408</Select.Option>
                  <Select.Option value="409">409</Select.Option>
                  <Select.Option value="410">410</Select.Option>
                  <Select.Option value="412">412</Select.Option>
                  <Select.Option value="413">413</Select.Option>
                  <Select.Option value="414">414</Select.Option>
                  <Select.Option value="415">415</Select.Option>
                  <Select.Option value="416">416</Select.Option>
                  <Select.Option value="417">417</Select.Option>
                  <Select.Option value="418">418</Select.Option>
                  <Select.Option value="425">425</Select.Option>
                  <Select.Option value="421">421</Select.Option>
                  <Select.Option value="422">422</Select.Option>
                  <Select.Option value="423">423</Select.Option>
                  <Select.Option value="424">424</Select.Option>
                  <Select.Option value="425">425</Select.Option>
                  <Select.Option value="426">426</Select.Option>
                  <Select.Option value="428">428</Select.Option>
                  <Select.Option value="429">429</Select.Option>
                  <Select.Option value="431">431</Select.Option>
                  <Select.Option value="451">451</Select.Option>
                  <Select.Option value="500">500</Select.Option>
                  <Select.Option value="501">501</Select.Option>
                  <Select.Option value="502">502</Select.Option>
                  <Select.Option value="503">503</Select.Option>
                  <Select.Option value="504">504</Select.Option>
                  <Select.Option value="505">505</Select.Option>
                  <Select.Option value="506">506</Select.Option>
                  <Select.Option value="507">507</Select.Option>
                  <Select.Option value="508">508</Select.Option>
                  <Select.Option value="510">510</Select.Option>
                  <Select.Option value="511">511</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col xs={24} lg={15}>
            <Form.Item label="Message trả về">
              {getFieldDecorator('description', {
                initialValue: '',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateDescription }],
                validateTrigger: 'onBlur',
              })(<Input placeholder="Message trả về" maxLength={255} onPaste={pasteDescription} />)}
            </Form.Item>
          </Col>

          <Col xs={24} lg={4}>
            <Form.Item label={' '}>
              <div style={{ marginTop: '17px' }}>
                <Button type="primary" htmlType="submit" onClick={clickAdd} style={{ marginRight: '8px' }}>
                  Thêm
                </Button>
                <Button type="default" className="mr-3" onClick={clickReset}>
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </View>
  );
};

const Wrapper = styled.div``;
export default connector(Form.create<IProps>()(AddResponseForm));
