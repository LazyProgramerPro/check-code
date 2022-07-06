import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { showUpdateResourceForm, updateResource } from '../redux/actions/update_resource';
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select } from 'antd';
import { GetResourceParams, UpdateResourceParam } from '../redux/models';
import { getResource } from '../redux/actions/get_resource';
import { useParams } from 'react-router';
import TextArea from 'antd/lib/input/TextArea';
const mapStateToProps = (rootState: RootState) => ({
  updateState: rootState.connectResource.updateState,
  getResourceState: rootState.connectResource.getResourceState,
});

interface UpdateProps {
  page: number;
}

const connector = connect(mapStateToProps, { getResource, showUpdateResourceForm, updateResource });
type ReduxProps = ConnectedProps<typeof connector>;
export interface IProps extends FormComponentProps, ReduxProps, UpdateProps {}

const UpdateResource = (props: IProps) => {
  const { getResourceState, getResource, updateState, page } = props;
  const params: any = useParams();
  const { getFieldDecorator, resetFields } = props.form;
  const [uuid] = useState<string>(params.uuid);
  // const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  const loadDataResource = () => {
    let params: GetResourceParams = {
      ...getResourceState.params,
      page: page,
      size: size,
      text: valueSearch,
      uuid: uuid,
    };
    getResource(params);
  };
  const onUpdateResourceClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateResourceParam = {
          description: values.description,
          quota: values.quota,
          quotaType: values.quotaType,
          quotaUnit: values.quotaUnit,
          timeUnit: values.timeUnit,
          unitTime: values.unitTime,
          uuid: updateState.originData?.uuid || '',
        };
        props.updateResource(updateParam);
        resetFields();
        props.showUpdateResourceForm(false);
        loadDataResource();
      }
    });
  };

  useEffect(() => {
    loadDataResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, valueSearch]);
  useEffect(() => {
    loadDataResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBtnCancelClicked = () => {
    // resetFields();
    props.showUpdateResourceForm(false);
  };
  const [click, setclick] = useState('requestCount');
  const onChange = (e: any) => {
    setclick(e.target.value);
  };

  const [time, setTime] = useState('min');
  useEffect(() => {
    if (props.updateState?.originData?.timeUnit === 'min') {
      setTime('Phút');
    } else if (props.updateState?.originData?.timeUnit === 'hour') {
      setTime('Giờ');
    } else if (props.updateState?.originData?.timeUnit === 'day') {
      setTime('Ngày');
    } else if (props.updateState?.originData?.timeUnit === 'month') {
      setTime('Tháng');
    } else if (props.updateState?.originData?.timeUnit === 'year') {
      setTime('Năm');
    }

    setclick(props.updateState?.originData?.quotaType || 'requestCount');
  }, [props.updateState]);

  const changeTime = (e: any) => {
    setTime(e);
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
    <Modal
      title="Cập nhật giới hạn truy cập resource"
      visible={props.updateState.show}
      footer={null}
      maskClosable={false}
      centered={true}
      onCancel={() => {
        // resetFields();
        props.showUpdateResourceForm(false);
      }}
      afterClose={() => {
        resetFields();
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Tên">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Đây là trường bắt buộc nhập',
              },
            ],
            initialValue: props.updateState?.originData?.name,
          })(<Input disabled={true} maxLength={255} />)}
        </Form.Item>

        <Form.Item label="Mô tả ">
          {getFieldDecorator('description', {
            initialValue: props.updateState?.originData?.description,
            validateTrigger: 'onBlur',
            rules: [{ validator: validateDescription }],
          })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
        </Form.Item>

        <Form.Item>
          <p style={{ marginBottom: '27px' }}>Hạn ngạch</p>
          <div style={{ marginTop: '-20px' }}>
            {getFieldDecorator('quotaType', {
              initialValue: props.updateState?.originData?.quotaType,
            })(
              <Radio.Group onChange={onChange}>
                <Radio value={'requestCount'}>Số lượng yêu cầu</Radio>
                <Radio value={'bandwidthVolume'}>Dung lượng</Radio>
              </Radio.Group>,
            )}
          </div>
        </Form.Item>

        {click === 'requestCount' && (
          <Form.Item label="Số lượng yêu cầu">
            {getFieldDecorator('quota', {
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
                { validator: validateRequest },
              ],
              initialValue: props.updateState?.originData?.quota,
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                maxLength={255}
              />,
            )}
          </Form.Item>
        )}
        {click === 'bandwidthVolume' && (
          <Row type="flex">
            <Col xs={24} md={20} style={{ marginRight: '17px' }}>
              <Form.Item label="Dung lượng">
                {getFieldDecorator('quota', {
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateBandwidthVolume },
                  ],
                  initialValue: props.updateState?.originData?.quota,
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    maxLength={255}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={3} style={{ marginTop: '29px' }}>
              <Form.Item label="">
                {getFieldDecorator('quotaUnit', { initialValue: props.updateState?.originData?.quotaUnit || 'KB' })(
                  <Select allowClear={true}>
                    <Select.Option value="KB">KB</Select.Option>
                    <Select.Option value="MB">MB</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        )}

        <Form.Item>
          <Row type="flex">
            <Col xs={24} md={19} style={{ marginRight: '17px' }}>
              <Form.Item label="Đơn vị thời gian">
                {getFieldDecorator('unitTime', {
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateTime },
                  ],
                  initialValue: props.updateState?.originData?.unitTime,
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    maxLength={255}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col xs={24} md={4} style={{ marginTop: '29px' }}>
              <Form.Item label="">
                {getFieldDecorator('timeUnit', { initialValue: props.updateState?.originData?.timeUnit || 'min' })(
                  <Select onSelect={changeTime}>
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
        <div style={{ marginLeft: '370px', marginTop: '-30px' }}>
          <Button onClick={onBtnCancelClicked} style={{ marginRight: '15px' }}>
            Hủy
          </Button>
          <Button htmlType="submit" type="primary" onClick={onUpdateResourceClicked}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(UpdateResource));
