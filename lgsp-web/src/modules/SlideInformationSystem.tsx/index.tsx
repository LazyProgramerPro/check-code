import { Button, Form, Input, Popconfirm } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateUrl } from 'src/constants/common';
import { gen_uuid } from 'src/utils/string_utils';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Styled from '../Auth/pages/styled/loginStyled';
import { getSystemIntroDetailApi, updateSlideImageApi } from './services/api';
import { ParamUpload } from './services/models';

export interface Param {
  id: string;
}

interface IProps extends FormComponentProps {}

let id = 0;

function SlideInformationSystem(props: IProps) {
  const { getFieldDecorator, getFieldValue } = props.form;

  const history = useHistory();
  const param: Param = useParams();

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  /** ANTD */
  const remove = (k: any) => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key.id !== k),
    });
  };

  const add = () => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat({
      id: v4(),
      image: '',
    });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const listImage = values.keys.map((e: any) => values.names[e.id].trim());
        const params: ParamUpload = {
          images: listImage,
        };
        updateSlideImageApi(params)
          .then(res => {
            setLoading(false);
            if (res.code === 0) {
              NotificationSuccess('Th??nh c??ng', 'C??ng khai th??ng tin gi???i thi???u th??nh c??ng');
              getSystemIntroDetail();
              return;
            }
            NotificationError('Th???t b???i', res.message);
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Th???t b???i', err.message);
          });
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  getFieldDecorator('keys', { initialValue: images });

  const keys = getFieldValue('keys');

  const validatePic = (rule: any, text: any, callback: any) => {
    const { field } = rule;
    if (text === undefined || text.length === 0 || text === '') {
      return callback();
    } else {
      if (text.trim().length === 0) {
        return callback('URL kh??ng ph?? h???p');
      }
      const isValid: boolean = validateUrl(text);
      if (!isValid) {
        return callback('URL kh??ng ph?? h???p');
      } else {
        props.form.setFields({
          [field]: {
            value: text.trim(),
          },
        });

        return callback();
      }
    }
  };
  const formItems = keys.map((k: any, index: any) => (
    <Form.Item label={`???nh ${index + 1}`} key={k.id}>
      {getFieldDecorator(`names[${k.id}]`, {
        validateTrigger: 'onBlur',
        rules: [
          {
            required: true,
            message: '????y l?? tr?????ng b???t bu???c nh???p',
          },
          { validator: validatePic },
        ],
        initialValue: k.image || '',
      })(<Input style={{ width: '60%', marginRight: 8 }} maxLength={1000} />)}
      <Button icon="delete" onClick={() => remove(k.id)} />
    </Form.Item>
  ));

  // TUANHQ

  const cancel = () => {
    history.goBack();
  };

  const getSystemIntroDetail = () => {
    setLoading(true);
    getSystemIntroDetailApi(param.id)
      .then(res => {
        const resImages = res.item.images.map((e: any) => ({
          id: v4(),
          image: e,
        }));

        setImages(resImages);

        setStatus(res.item.status);

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSystemIntroDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  return (
    <Wrapper>
      <div className="bgr">
        <div className="header">Chi ti???t th??ng tin gi???i thi???u h??? th???ng</div>

        <div className="containerSlide">
          <div className="mt-3 mb-3">
            <span>Ch???nh s???a ???nh trong slide ???nh</span>
            {status === 'create' && <span className="statusCreate">(T???o m???i)</span>}
            {status === 'published' && <span className="statusPublish">(C??ng khai)</span>}
          </div>

          <div className="form">
            <Form {...formItemLayout}>
              {formItems}

              <Form.Item label={' '}>
                <StyledButton>
                  <Button icon="plus" className="mb-3" onClick={add}>
                    Th??m m???i
                  </Button>
                </StyledButton>

                <div className="container-button">
                  <Button className="mr-3" onClick={cancel}>
                    H???y
                  </Button>
                  <Popconfirm
                    placement="top"
                    title="N???i dung th??ng tin gi???i thi???u s??? ???????c c???p nh???t tr??n trang ch???. B???n c?? x??c nh???n thay ?????i?"
                    okText="X??c nh???n"
                    cancelText="H???y"
                    onConfirm={e => handleSubmit(e)}
                  >
                    <Button type="primary" htmlType="submit" className="btn">
                      C??ng khai
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
  .container-button {
    /* margin-left: 135px; */
  }
  .containerSlide {
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

const StyledButton = styled.div`
  /* margin-left: 135px; */
`;

export default Form.create<IProps>()(SlideInformationSystem);
