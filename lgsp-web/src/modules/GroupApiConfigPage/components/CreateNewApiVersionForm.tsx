import React, { useState } from 'react';
import * as Yup from 'yup';
import InputField from 'src/components/customField/Input';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { Button, Radio, Form, Input, Modal } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { FormComponentProps } from 'antd/lib/form';
import { useParams } from 'react-router-dom';
import { ParamsCreateVersion } from '../redux/models';
import { createVersion, validateNameVersion } from '../redux/service/api';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { NotificationError } from 'src/components/Notification/Notification';
import { useHistory } from 'react-router';
import Loading from 'src/components/Loading';
import { validateNormalString } from 'src/constants/common';
interface ICreateNewApiVersionForm {
  onSubmit: (value: Partial<IRestApiObject>, callback: () => void) => void;
  onCancel: () => void;
}

const mapState = (rootState: RootState) => ({});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function CreateNewApiVersionForm(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const onChangeDefaultVersion = (e: RadioChangeEvent, form: any) => {
  //   const value = e.target.value;
  //   setDefaultVersion(value);
  //   // form?.setFieldValue('type', value);
  // };

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const showdialog = () => {
    setVisible(true);
  };

  const onCancelClicked = () => {
    resetFields();
    setVisible(false);
  };

  const create = (e: any) => {
    const form = props.form;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const params: ParamsCreateVersion = {
          defaultVersion: true,
          id: apiId,
          version: form.getFieldValue('version'),
        };
        const response = createVersion(params);
        setLoading(true);
        response
          .then(rs => {
            setLoading(false);
            if (rs.code !== 0) {
              NotificationError('Th???t b???i', rs.message);
              return;
            }
            NotificationSuccess('Th??nh c??ng', 'T???o phi??n b???n m???i th??nh c??ng');
            resetFields();
            setVisible(false);
            history.push('/manager-infor/group-api-config/' + rs.item);
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Th???t b???i', err.message);
          });
      }
    });
  };
  const checkvalidate = (rule: any, text: any, callback: any) => {
    const form = props.form;
    const version = form.getFieldValue('version');
    if (version === undefined || version.length === 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Phi??n b???n kh??ng h???p l???');
    }
    validateNameVersion(apiId, version).then(rs => {
      if (rs.code !== 0) {
        return callback('Phi??n b???n b??? tr??ng v???i phi??n b???n c??');
      }
      return callback();
    });
  };

  const pasteVersion = () => {
    const valueVersion = props.form.getFieldValue('version');
    props.form.setFields({
      version: {
        value: valueVersion.trim(),
      },
    });
  };
  return (
    <div>
      <Button className="mr-2" icon="plus" onClick={showdialog}>
        T???o phi??n b???n m???i
      </Button>
      <Modal title="T???o phi??n b???n m???i" visible={visible} footer={null} onCancel={onCancelClicked} maskClosable={false}>
        <Form layout="vertical">
          <Form.Item label="Phi??n b???n">
            {getFieldDecorator('version', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: checkvalidate }],
            })(<Input maxLength={255} onPaste={pasteVersion} />)}
          </Form.Item>
          <div style={{ marginLeft: '324px', display: 'flex' }}>
            <Button type="default" className="ml-4" onClick={onCancelClicked} style={{ marginRight: '15px' }}>
              H???y
            </Button>

            <Button type="primary" htmlType="submit" onClick={create}>
              T???o m???i
            </Button>
          </div>
        </Form>
      </Modal>
      {loading ? <Loading /> : null}
    </div>
  );
}

export default connector(Form.create<IProps>()(CreateNewApiVersionForm));

const Close = styled.div`
  margin-right: 10px;
`;
