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
  editParams?: ServiceAccessLimit;
}

const mapState = (rootState: RootState) => ({
  listPermission: rootState.serviceAccessLimit.servicesAccessLimits.permissionList,
});

const connector = connect(mapState, { getPermissionListAccessLimit, createServiceAccess, updateServiceAccess });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps, FormCreateProps {}

function FormUpdate(props: IProps) {
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

  const [type, setType] = useState('requestCount');
  const [permissionType, setPermissionType] = useState(editParams?.permissionType || 'none');
  const [permissions, setPermissions] = useState<any>([]);

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

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
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

    setPermissions(editParams?.permissions);
    setPermissionType(editParams?.permissionType || 'none');
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
      return callback('S??? l?????ng y??u c???u kh??ng h???p l???');
    }
    return callback();
  };

  const validateBandwidthVolume = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    }
    if (value < 1 || value > 2147483647) {
      return callback('Dung l?????ng kh??ng h???p l???');
    }
    return callback();
  };

  const validateTime = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    }
    if (value < 1 || value > 2147483647) {
      return callback('????n v??? th??i gian kh??ng h???p l???');
    }
    return callback();
  };

  return (
    <Wrapper>
      <Modal
        title={'C???p nh???t gi???i h???n truy c???p'}
        visible={visible}
        onCancel={handleClose}
        afterClose={afterClose}
        maskClosable={false}
        footer={
          <StyledBotton>
            <Button onClick={handleClose}>H???y</Button>

            <Button type="primary" onClick={handleUpdate}>
              L??u
            </Button>
          </StyledBotton>
        }
      >
        <Form layout="vertical">
          <Form.Item label="T??n">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
              ],
              initialValue: editParams?.name,
              validateTrigger: 'onBlur',
            })(<Input disabled={true} maxLength={255} />)}
          </Form.Item>

          <Form.Item label="M?? t???">
            {getFieldDecorator('description', {
              initialValue: editParams?.description,
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item label="H???n ng???ch">
            {getFieldDecorator('type', {
              initialValue: type,
            })(
              <Radio.Group onChange={onChangeType}>
                <Radio value="requestCount">S??? l?????ng y??u c???u</Radio>
                <Radio value="bandwidthVolume">Dung l?????ng</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item>
            {type === 'requestCount' && (
              <>
                <Form.Item label="S??? l?????ng y??u c???u">
                  {getFieldDecorator('requestCount', {
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
                      },
                      { validator: validateRequest },
                    ],
                    initialValue: editParams?.quota,
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
                    <Form.Item label="Dung l?????ng">
                      {getFieldDecorator('dataAmount', {
                        rules: [
                          {
                            required: true,
                            message: '????y l?? tr?????ng b???t bu???c nh???p',
                          },
                          { validator: validateBandwidthVolume },
                        ],

                        initialValue: editParams?.quota,
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
                      {getFieldDecorator('dataUnit', { initialValue: editParams?.quotaUnit || 'KB' })(
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
                <Form.Item label="????n v??? th???i gian">
                  {getFieldDecorator('unitTime', {
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
                      },
                      { validator: validateTime },
                    ],
                    initialValue: editParams?.unitTime,
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
                  {getFieldDecorator('timeUnit', { initialValue: editParams?.timeUnit })(
                    <Select>
                      <Select.Option value="min">Ph??t</Select.Option>
                      <Select.Option value="hour">Gi???</Select.Option>
                      <Select.Option value="days">Ng??y</Select.Option>
                      <Select.Option value="month">Th??ng</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Gi???i h???n quy???n" style={{ marginTop: '-25px' }}>
            {getFieldDecorator('permissionType', {
              initialValue: permissionType,
            })(
              <Radio.Group onChange={onChangePermissionType}>
                <Radio value="none">Kh??ng</Radio>
                <Radio value="allow">Cho ph??p</Radio>
                <Radio value="deny">Kh??ng cho ph??p</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {permissionType === 'none' && <></>}
          {permissionType === 'allow' && (
            <Form.Item label="Vai tr??">
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
            <Form.Item label="Vai tr??">
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
export default connector(Form.create<IProps>()(FormUpdate));

const Wrapper = styled.div``;
const StyledBotton = styled.div`
  margin-top: -50px;
`;
