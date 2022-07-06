import { Button, Form, Input, Popconfirm } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString, validatePhoneNumber, validateEmail } from 'src/constants/common';
import { useAppDispatch } from 'src/redux/hooks';
import styled from 'styled-components';
import { getContentFooterPage } from '../Homepage/redux/actions';
import { getSystemIntroDetailApi, updateSystemIntroDetailApi } from './services/api';
import { InfoFooter } from './services/models';
interface Param {
  id: string;
}

interface IProps extends FormComponentProps {}

function ContactInformationSystem(props: IProps) {
  const dispatch = useAppDispatch();

  const initInfoFooter: InfoFooter = {
    address: '',
    email: '',
    fax: '',
    status: '',
    telephone: '',
  };

  const { getFieldDecorator, getFieldValue } = props.form;
  const history = useHistory();
  const param: Param = useParams();

  const [loading, setLoading] = useState(false);
  const [infoFooter, setInfoFooter] = useState<InfoFooter>(initInfoFooter);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const param: InfoFooter = {
          address: values.address,
          email: values.email,
          fax: values.fax,
          telephone: values.telephone,
        };

        console.log('params: ', param);

        updateSystemIntroDetailApi(param)
          .then(res => {
            setLoading(false);

            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Công khai thông tin giới thiệu thành công');
              getSystemIntroDetail();

              dispatch(getContentFooterPage({}));
              return;
            }

            NotificationError('Thất bại', res.message);
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Thất bại', err.message);
          });
      }
    });
  };

  const cancel = () => {
    history.goBack();
  };

  const getSystemIntroDetail = () => {
    setLoading(true);
    getSystemIntroDetailApi(param.id)
      .then(res => {
        setInfoFooter(res.item);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const validateNumberPhone = (rule: any, text: any, callback: any) => {
    const checkValue = text.trim();
    const isValid: boolean = validatePhoneNumber(checkValue);
    if (!isValid && checkValue.length !== 0) {
      return callback('Số điện thoại không hợp lệ');
    }
    if (checkValue.length > 10) {
      return callback('Số điện thoại không hợp lệ');
    }
    props.form.setFields({
      telephone: {
        value: text.trim(),
      },
    });
    return callback();
  };

  const validateNumberFax = (rule: any, text: any, callback: any) => {
    const checkValue = text.trim();
    const isValid: boolean = validatePhoneNumber(checkValue);
    if (!isValid && checkValue.length !== 0) {
      return callback('Số máy fax không hợp lệ');
    }
    if (checkValue.length > 10) {
      return callback('Số máy fax không hợp lệ');
    }
    props.form.setFields({
      fax: {
        value: text.trim(),
      },
    });
    return callback();
  };
  const restrict = (event: any) => {
    const regex = new RegExp('^[0-9]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    const form = props.form;
    const checkLength = form.getFieldValue('telephone');
    if (checkLength.length > 9) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  const restrict1 = (event: any) => {
    debugger;
    const regex = new RegExp('^[0-9]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    const form = props.form;
    const checkLength = form.getFieldValue('fax');
    if (checkLength.length > 9) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  const validateEmailInput = (rule: any, text: any, callback: any) => {
    const checkEmail = text.trim();

    // props.form.setFields({
    //   email: {
    //     value: checkEmail,
    //   },
    // });

    const isValid: boolean = validateEmail(checkEmail);
    if (!isValid && checkEmail.length !== 0) {
      return callback('Email không hợp lệ');
    } else {
      props.form.setFields({
        email: {
          value: text.trim(),
        },
      });
      return callback();
    }
  };

  const validateAddress = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      const checkAddress = value.trim();
      props.form.setFields({
        address: {
          value: checkAddress,
        },
      });
      return callback();
    }
  };
  useEffect(() => {
    getSystemIntroDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  const pasteAddress = () => {
    const addressPaste = props.form.getFieldValue('address');
    props.form.setFields({
      address: {
        value: addressPaste.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <div className="bgr">
        <div className="header">Chi tiết thông tin giới thiệu hệ thống</div>
        <div className="containerInfo">
          <div className="mt-3 mb-3">
            <span>Chỉnh sửa thông tin liên hệ</span>{' '}
            {infoFooter.status === 'create' && <span className="statusCreate">(Tạo mới)</span>}
            {infoFooter.status === 'published' && <span className="statusPublish">(Công khai)</span>}
          </div>

          <div className="form">
            <Form {...formItemLayout}>
              <Form.Item label="Địa chỉ">
                {getFieldDecorator('address', {
                  initialValue: infoFooter.address,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateAddress }],
                })(<TextArea rows={4} maxLength={255} onPaste={pasteAddress} />)}
              </Form.Item>

              <Form.Item label="Số điện thoại">
                {getFieldDecorator('telephone', {
                  initialValue: infoFooter.telephone,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateNumberPhone }],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Số máy fax">
                {getFieldDecorator('fax', {
                  initialValue: infoFooter.fax,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateNumberFax }],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  initialValue: infoFooter.email,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateEmailInput }],
                })(<Input maxLength={255} />)}
              </Form.Item>
              <Form.Item label={' '}>
                <div className="container-button">
                  <Button className="mr-3" onClick={cancel}>
                    Hủy
                  </Button>
                  <Popconfirm
                    placement="top"
                    title="Nội dung thông tin giới thiệu sẽ được cập nhật trên trang chủ. Bạn có xác nhận thay đổi?"
                    okText="Xác nhận"
                    cancelText="Hủy"
                    onConfirm={e => handleSubmit(e)}
                  >
                    <Button type="primary" htmlType="submit" className="btn">
                      Công khai
                    </Button>
                  </Popconfirm>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px 15px;
  background-color: #fff;
  .bgr {
    padding: 10px 15px;
  }
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
  /* .container-button {
    margin-left: 135px;
  } */
  .containerInfo {
    /* margin-left: 135px; */
    .statusPublish {
      margin-left: 20px;
      color: green;
    }

    .statusCreate {
      margin-left: 20px;
      color: #1890ff;
    }

    .form {
      margin-top: 30px;
    }
  }
`;

export default Form.create<IProps>()(ContactInformationSystem);
