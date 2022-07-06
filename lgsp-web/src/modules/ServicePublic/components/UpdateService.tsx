import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { GetServiceParams, Name, UpdateServiceParam } from '../redux/models';
import { Button, Form, Input, Modal } from 'antd';
import { showUpdateServiceForm, updateService } from '../redux/actions/update_service';
import { getService } from '../redux/actions/get_service';
import { useParams } from 'react-router';
import TextArea from 'antd/lib/input/TextArea';
import { validateNormalString } from 'src/constants/common';
import { validateNameCreate } from '../redux/services/apis';
const mapStateToProps = (rootState: RootState) => ({
  updateState: rootState.servicePublic.updateState,
  getServiceState: rootState.servicePublic.getState,
});

interface UpdateProps {
  page: number;
}
const connector = connect(mapStateToProps, { getService, showUpdateServiceForm, updateService });
type ReduxProps = ConnectedProps<typeof connector>;
export interface IProps extends FormComponentProps, ReduxProps, UpdateProps {}

const UpdateService = (props: IProps) => {
  const { getServiceState, getService, updateState, page } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [size] = useState<number>(50);
  const params: any = useParams();
  const [categoryId] = useState<string>(params.categoryId);
  const [valueSearch, setValueSearch] = useState('');
  const loadDataServicePublic = () => {
    let params: GetServiceParams = {
      ...getServiceState.params,
      page: page,
      size: size,
      text: valueSearch,
      categoryId: categoryId,
    };
    getService(params);
  };
  const onUpdateServiceClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateServiceParam = {
          categoryId: updateState.originData?.id,
          name: values.name,
          description: values.description,
        };
        props.updateService(updateParam);
        resetFields();
        props.showUpdateServiceForm(false);
        loadDataServicePublic();
      }
    });
  };

  useEffect(() => {
    loadDataServicePublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, valueSearch]);
  useEffect(() => {
    loadDataServicePublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onBtnCancelClicked = () => {
    resetFields();
    props.showUpdateServiceForm(false);
  };

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    }
    if (props.updateState?.originData?.name === value) {
      return true;
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
    <Modal
      title="Cập nhật nhóm dịch vụ"
      visible={props.updateState.show}
      footer={null}
      maskClosable={false}
      centered={true}
      onCancel={() => {
        resetFields();
        props.showUpdateServiceForm(false);
      }}
      afterClose={() => {
        resetFields();
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Tên nhóm dịch vụ">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Đây là trường bắt buộc nhập',
              },
              { validator: checkValiateCreate },
            ],
            initialValue: props.updateState?.originData?.name || '',
            validateTrigger: 'onBlur',
          })(<Input maxLength={255} onPaste={pasteName} />)}
        </Form.Item>
        <Form.Item label="Mô tả ">
          {getFieldDecorator('description', {
            initialValue: props.updateState?.originData?.description || '',
            validateTrigger: 'onBlur',
            rules: [{ validator: validateDescription }],
          })(<TextArea style={{ height: '100px' }} maxLength={5000} onPaste={pasteDescription} />)}
        </Form.Item>

        <p style={{ color: '#000000', marginTop: '-20px' }}>
          {' '}
          Số dịch vụ chia sẻ kết nối: {`${props.updateState?.originData?.numberApis}`}{' '}
        </p>
        <div style={{ marginLeft: '374px' }}>
          <Button onClick={onBtnCancelClicked} style={{ marginTop: '-10px', marginRight: '15px' }}>
            Hủy
          </Button>
          <Button htmlType="submit" type="primary" style={{ marginTop: '-10px' }} onClick={onUpdateServiceClicked}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connector(Form.create<IProps>()(UpdateService));
