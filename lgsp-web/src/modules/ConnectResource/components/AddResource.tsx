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
      return callback('T??n resources kh??ng h???p l???');
    }
    validateNameCreate(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Gi???i h???n truy c???p resources ???? t???n t???i');
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
    <ViewAdd>
      <Button icon="plus" onClick={showdialog}>
        T???o m???i gi???i h???n truy c???p resource
      </Button>
      <Modal
        title="T???o m???i gi???i h???n truy c???p resource"
        visible={visible}
        onCancel={onCancelResourceClicked}
        afterClose={afterClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={onCancelResourceClicked} style={{ marginRight: '15px' }}>
              H???y
            </Button>
            <Button htmlType="submit" type="primary" onClick={onCreateResourceClicked}>
              T???o m???i
            </Button>
          </StyledButton>
        }
      >
        <Form layout="vertical">
          <Form.Item label="T??n">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                { validator: checkValiateCreate },
              ],
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="M?? t??? ">
            {getFieldDecorator('description', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(<TextArea style={{ height: '91px' }} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item>
            <p style={{ marginBottom: '27px' }}>H???n ng???ch</p>
            <div style={{ marginTop: '-20px' }}>
              {getFieldDecorator('type', { initialValue: 'requestCount' })(
                <Radio.Group onChange={onChange} value={click}>
                  <Radio value={'requestCount'}>S??? l?????ng y??u c???u</Radio>
                  <Radio value={'bandwidthVolume'}>Dung l?????ng</Radio>
                </Radio.Group>,
              )}
            </div>
          </Form.Item>
          <Form.Item>
            {click === 'requestCount' && (
              <>
                <Form.Item label="S??? l?????ng y??u c???u">
                  {getFieldDecorator('req', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
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
                    <Form.Item label="Dung l?????ng">
                      {getFieldDecorator('data', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: '????y l?? tr?????ng b???t bu???c nh???p',
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
                <Form.Item label="????n v??? th???i gian">
                  {getFieldDecorator('unitTime', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '????y l?? tr?????ng b???t bu???c nh???p',
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
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(AddCaching));
