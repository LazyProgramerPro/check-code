import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select } from 'antd';
import styled from 'styled-components';
import { createResource, showCreateResourceForm } from '../redux/actions/create_resource';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { RootState } from '../../../redux/reducers';
import { CreateResourceParams, GetResourceParams } from '../redux/models';
import { getResource } from '../redux/actions/get_resource';
import TextArea from 'antd/lib/input/TextArea';
import { validateNameCreate } from '../redux/service/apis';
import { validateNormalString } from 'src/constants/common';
const ViewAdd = styled.div`
  .ant-form-item-label {
    margin-bottom: -13px;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
  }
  .ant-modal-body {
    padding: 16px 25px !important;
  }
`;

const StyledButton = styled.div`
  /* margin-left: 345px; */
  margin-top: -55px;
  margin-right: 10px;
  /* margin-bottom: -30px; */
`;

interface FormCreateProps {
  refreshList: Function;
}
const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  createState: rootState.connectResource.createState,
  getResourceState: rootState.connectResource.getResourceState,
});
const conn = connect(mapStateToProps, { createResource, showCreateResourceForm, getResource });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps, FormCreateProps {}

function AddCaching(props: IProps) {
  const [visible, setVisible] = useState(false);
  const { refreshList } = props;
  const showdialog = () => {
    setVisible(true);
  };
  const { getFieldDecorator, resetFields } = props.form;
  const [click, setclick] = useState('requestCount');
  const onChange = (e: any) => {
    setclick(e.target.value);
  };
  const onCreateResourceClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: CreateResourceParams = {
          dataAmount: Number(values.data),
          dataUnit: values.dataUnit,
          description: values.description,
          name: values.name,
          requestCount: values.req,
          timeUnit: values.timeUnit,
          type: values.type,
          unitTime: Number(values.unitTime),
        };
        console.log('Param:', param);
        props.createResource(param);
        setVisible(false);
        refreshList();
        resetFields();
      }
    });
  };
  const onCancelResourceClicked = () => {
    setVisible(false);
    props.showCreateResourceForm(false);
  };

  const afterClose = () => {
    resetFields();
    setclick('requestCount');
  };

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(value);
    if (!isValid) {
      return callback('Tên resources không hợp lệ');
    }
    validateNameCreate(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Giới hạn truy cập resources đã tồn tại');
      } else {
        return callback();
      }
    });
  };

  const [handclick, sethandclick] = useState('none');
  const onHandChange = (e: any) => {
    sethandclick(e.target.value);
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      props.form.setFields({
        description: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };
  useEffect(() => {
    let params: GetResourceParams = {
      ...props.getResourceState.params,
    };
    props.getResource(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  const validateRequest = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    }
    if (value < 1 || value > 2147483647) {
      return callback('Số lượng yêu cầu không hợp lệ');
    }
    return callback();
  };

  const validateBandwidthVolume = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    }
    if (value < 1 || value > 2147483647) {
      return callback('Dung lượng không hợp lệ');
    }
    return callback();
  };

  const validateTime = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    }
    if (value < 1 || value > 2147483647) {
      return callback('Đơn vị thơi gian không hợp lệ');
    }
    return callback();
  };
  return (
    <ViewAdd>
      <Button icon="plus" onClick={showdialog}>
        Tạo mới giới hạn truy cập resource
      </Button>
      <Modal
        title="Tạo mới giới hạn truy cập resource"
        visible={visible}
        onCancel={onCancelResourceClicked}
        afterClose={afterClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={onCancelResourceClicked} style={{ marginRight: '15px' }}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" onClick={onCreateResourceClicked}>
              Tạo mới
            </Button>
          </StyledButton>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
                { validator: checkValiateCreate },
              ],
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Mô tả ">
            {getFieldDecorator('description', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item>
            <p style={{ marginBottom: '27px' }}>Hạn ngạch</p>
            <div style={{ marginTop: '-20px' }}>
              {getFieldDecorator('type', { initialValue: 'requestCount' })(
                <Radio.Group onChange={onChange} value={click}>
                  <Radio value={'requestCount'}>Số lượng yêu cầu</Radio>
                  <Radio value={'bandwidthVolume'}>Dung lượng</Radio>
                </Radio.Group>,
              )}
            </div>
          </Form.Item>
          <Form.Item>
            {click === 'requestCount' && (
              <>
                <Form.Item label="Số lượng yêu cầu">
                  {getFieldDecorator('req', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                      { validator: validateRequest },
                    ],
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      maxLength={13}
                    />,
                  )}
                </Form.Item>
              </>
            )}
            {click === 'bandwidthVolume' && (
              <>
                <Row type="flex">
                  <Col xs={24} md={20} style={{ marginRight: '17px' }}>
                    <Form.Item label="Dung lượng">
                      {getFieldDecorator('data', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: 'Đây là trường bắt buộc nhập',
                          },
                          { validator: validateBandwidthVolume },
                        ],
                      })(
                        <InputNumber
                          style={{ width: '100%' }}
                          min={1}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          maxLength={13}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={3} style={{ marginTop: '29px' }}>
                    <Form.Item label="">
                      {getFieldDecorator('dataUnit', { initialValue: 'KB' })(
                        <Select allowClear={true}>
                          <Select.Option value="KB">KB</Select.Option>
                          <Select.Option value="MB">MB</Select.Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.Item>
          <Form.Item>
            <Row type="flex" style={{ marginTop: '-23px' }}>
              <Col xs={24} md={19} style={{ marginRight: '17px' }}>
                <Form.Item label="Đơn vị thời gian">
                  {getFieldDecorator('unitTime', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                      { validator: validateTime },
                    ],
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      // maxLength={255}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={4} style={{ marginTop: '29px' }}>
                <Form.Item label="">
                  {getFieldDecorator('timeUnit', { initialValue: 'min' })(
                    <Select>
                      <Select.Option value="min">Phút</Select.Option>
                      <Select.Option value="hour">Giờ</Select.Option>
                      <Select.Option value="days">Ngày</Select.Option>
                      <Select.Option value="month">Tháng</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(AddCaching));
