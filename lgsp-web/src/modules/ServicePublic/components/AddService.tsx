import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { CreateServiceParams, GetServiceParams, Name } from '../redux/models';
import { createService, showCreateServiceForm } from '../redux/actions/create_service';
import { RootState } from '../../../redux/reducers';
import { getService } from '../redux/actions/get_service';
import TextArea from 'antd/lib/input/TextArea';
import { validateNameCreate } from '../redux/services/apis';
import { validateNormalString } from 'src/constants/common';
const ViewAdd = styled.div`
  .ant-form-item-label {
    margin-bottom: -13px;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
interface FormCreateProps {
  refreshList: Function;
}
const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
  createState: rootState.servicePublic.createState,
  getServiceState: rootState.servicePublic.getState,
});
const conn = connect(mapStateToProps, { createService, showCreateServiceForm, getService });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps, FormCreateProps {}

function AddService(props: IProps) {
  const [visible, setVisible] = useState(false);
  const { refreshList } = props;
  const showdialog = () => {
    setVisible(true);
  };

  const { getFieldDecorator, resetFields } = props.form;
  const onCreateServiceClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: CreateServiceParams = {
          description: values.description,
          name: values.name,
        };
        props.createService(param);
        setVisible(false);
        refreshList();
        resetFields();
      }
    });
  };
  const onCancelServiceClicked = () => {
    resetFields();
    setVisible(false);
    props.showCreateServiceForm(false);
  };

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Tên nhóm dịch vụ không hợp lệ');
      }
      const form = props.form;

      props.form.setFields({
        name: {
          value: value.trim(),
        },
      });
      let param: Name = {
        name: form.getFieldValue('name'),
      };
      const response = validateNameCreate(param);
      response.then(rs => {
        if (rs.code !== 0) {
          return callback('Tên nhóm dịch vụ đã tồn tại');
        } else {
          return callback();
        }
      });
    }
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
    let params: GetServiceParams = {
      ...props.getServiceState.params,
    };
    props.getService(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const pasteName = () => {
    const valueName = props.form.getFieldValue('name');
    props.form.setFields({
      name: {
        value: valueName.trim(),
      },
    });
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
    <ViewAdd>
      <Button icon="plus" onClick={showdialog}>
        Tạo mới nhóm dịch vụ
      </Button>
      <Modal
        title="Tạo mới nhóm dịch vụ"
        visible={visible}
        footer={null}
        onCancel={onCancelServiceClicked}
        maskClosable={false}
      >
        <Form layout="vertical">
          <Form.Item label="Tên nhóm dịch vụ">
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
            })(<Input maxLength={255} onPaste={pasteName} />)}
          </Form.Item>

          <Form.Item label="Mô tả">
            {getFieldDecorator('description', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(<TextArea style={{ height: '100px' }} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>
          <div style={{ marginLeft: '345px' }}>
            <Button onClick={onCancelServiceClicked} style={{ marginTop: '-20px', marginRight: '15px' }}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary" style={{ marginTop: '-20px' }} onClick={onCreateServiceClicked}>
              Tạo mới
            </Button>
          </div>
        </Form>
      </Modal>
    </ViewAdd>
  );
}
export default conn(Form.create<IProps>()(AddService));
