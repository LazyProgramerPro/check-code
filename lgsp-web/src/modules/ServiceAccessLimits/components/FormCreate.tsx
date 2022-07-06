import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { validateNormalString } from 'src/constants/common';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { createServiceAccess, getPermissionListAccessLimit, updateServiceAccess } from '../redux/actions';
import { ServiceAccessLimit } from '../redux/models';
import { validateNameCreate } from '../redux/services/api';

interface FormCreateProps {
  visible: boolean;
  onClose: Function;
  isUpdate?: boolean;
  refreshList: Function;
  editParams?: ServiceAccessLimit;
}

const mapState = (rootState: RootState) => ({
  listPermission: rootState.serviceAccessLimit.servicesAccessLimits.permissionList,
});

const connector = connect(mapState, { getPermissionListAccessLimit, createServiceAccess, updateServiceAccess });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps, FormCreateProps {}

function FormCreate(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const {
    visible,
    onClose,
    isUpdate = false,
    getPermissionListAccessLimit,
    createServiceAccess,
    updateServiceAccess,
    listPermission,
    editParams,
  } = props;
  const { refreshList } = props;
  const [type, setType] = useState('requestCount');
  const [permissionType, setPermissionType] = useState('none');
  const [permissions, setPermissions] = useState([]);
  const [unpermissions, setUnPermissions] = useState([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        createServiceAccess(values);
        resetFields();
        refreshList();
        handleClose();
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          uuid: editParams?.uuid,
          ...values,
        };
        updateServiceAccess(params);
        handleClose();
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  const afterClose = () => {
    resetFields();
    setType('requestCount');
    setPermissionType('none');
  };

  const onChangeType = (e: any) => {
    setType(e.target.value);
  };

  const handleChangeSelect = (value: any) => {
    setPermissions(value);
  };
  const handleChangeSelectPermiss = (value: any) => {
    setPermissions(value);
  };

  const onChangePermissionType = (e: any) => {
    setPermissionType(e.target.value);
    setPermissions([]);
    props.form.resetFields(['permissions']);
  };

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(value);
    if (!isValid) {
      return callback('Tên giới hạn truy cập không hợp lệ');
    }
    validateNameCreate(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Giới hạn truy cập dịch vụ chia sẻ đã tồn tại');
      } else {
        return callback();
      }
    });
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
    getPermissionListAccessLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUpdate && editParams?.quotaType) {
      setType(editParams?.quotaType);
    }
  }, [editParams, isUpdate]);

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
    <Wrapper>
      <Modal
        title={'Tạo mới giới hạn truy cập'}
        visible={visible}
        onCancel={handleClose}
        afterClose={afterClose}
        maskClosable={false}
        footer={
          <StyledBotton>
            <Button onClick={handleClose}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </StyledBotton>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Tên">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },

                { validator: checkValiateCreate },
              ],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Mô tả">
            {getFieldDecorator('description', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item label="Hạn ngạch">
            {getFieldDecorator('type', {
              initialValue: type,
            })(
              <Radio.Group onChange={onChangeType}>
                <Radio value="requestCount">Số lượng yêu cầu</Radio>
                <Radio value="bandwidthVolume">Dung lượng</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item>
            {type === 'requestCount' && (
              <>
                <Form.Item label="Số lượng yêu cầu">
                  {getFieldDecorator('requestCount', {
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                      { validator: validateRequest },
                    ],
                    initialValue: '',
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      maxLength={255}
                    />,
                  )}
                </Form.Item>
              </>
            )}
            {type === 'bandwidthVolume' && (
              <>
                <Row type="flex">
                  <Col xs={24} md={20} style={{ marginRight: '17px' }}>
                    <Form.Item label="Dung lượng">
                      {getFieldDecorator('dataAmount', {
                        rules: [
                          {
                            required: true,
                            message: 'Đây là trường bắt buộc nhập',
                          },
                          { validator: validateBandwidthVolume },
                        ],

                        initialValue: '',
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
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                      { validator: validateTime },
                    ],
                    initialValue: '',
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

          <Form.Item label="Giới hạn quyền" style={{ marginTop: '-25px' }}>
            {getFieldDecorator('permissionType', {
              initialValue: 'none',
            })(
              <Radio.Group onChange={onChangePermissionType}>
                <Radio value="none">Không</Radio>
                <Radio value="allow">Cho phép</Radio>
                <Radio value="deny">Không cho phép</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {permissionType === 'none' && <></>}
          {permissionType === 'allow' && (
            <Form.Item label="Vai trò">
              {getFieldDecorator('permissions', {
                initialValue: permissions,
              })(
                <Select mode={'multiple'} onChange={handleChangeSelect}>
                  {listPermission?.map(e => (
                    <Select.Option value={e.name} key={e.name}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          )}
          {permissionType === 'deny' && (
            <Form.Item label="Vai trò">
              {getFieldDecorator('permissions', {
                initialValue: permissions,
              })(
                <Select
                  mode={'multiple'}
                  onChange={handleChangeSelectPermiss}
                  showSearch
                  optionFilterProp="children"
                  allowClear={true}
                >
                  {listPermission?.map(e => (
                    <Select.Option value={e.name} key={e.name}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Wrapper>
  );
}
export default connector(Form.create<IProps>()(FormCreate));

const Wrapper = styled.div``;
const StyledBotton = styled.div`
  margin-top: -50px;
`;
