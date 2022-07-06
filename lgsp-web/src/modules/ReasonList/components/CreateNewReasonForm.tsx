import React, { useState, useEffect, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Modal, Form, Input, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { requiredMessage } from 'src/configs/locales';
import { RootState } from 'src/redux/reducers';
import { SelectValue } from 'antd/lib/select';
import moment from 'moment';
import RadioGroup from 'antd/lib/radio/group';
import { NotificationSuccess, NotificationError } from 'src/components/Notification/Notifications';

import { createReason, updateReason } from '../redux/services/apis';
import { LeaveReason } from '../types';

const { TextArea } = Input;
const { Option } = Select;

const REASON_LIST = [
  {
    code: 'LEAVE_REQUEST_REASON',
    name: 'Lý do nghỉ phép',
  },
  {
    code: 'OVERTIME_REASON',
    name: 'Lý do làm việc cuối tuần',
  },
  {
    code: 'FORGOT_CHECK_IN_OUT_REASON',
    name: 'Lý do quên điểm danh thủ công',
  },
  {
    code: 'EMPLOYEE_OUTSIDE_REASON',
    name: 'Lý do làm việc ngoài cơ quan',
  },
];
const mapState = ({}: RootState) => ({});

const connector = connect(mapState, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  isOpenModal: any;
  setOpenModal: any;
  reloadList: any;
  editData: any;
}

function CreateReasonForm(props: IProps) {
  const [isLeaveRequest, setIsLeaveRequest] = useState(false);
  useEffect(() => {
    if (props.editData) {
      if (props.editData.code === 'LEAVE_REQUEST_REASON') {
        setFieldsValue({
          name: props.editData.name,
          code: props.editData.code,
          take_leave_code: props.editData.take_leave_code,
        });
      } else {
        setFieldsValue({
          name: props.editData.name,
          code: props.editData.code,
        });
      }
    } else {
      setFieldsValue({
        name: '',
        code: '',
        take_leave_code: '',
      });
    }
  }, [props.isOpenModal]);

  function handleCancel() {
    props.setOpenModal(false);
    resetFields();
    setIsLeaveRequest(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (props.editData) {
          updateReason(props.editData.id, values as LeaveReason).then(res => {
            if (res && res.rc.code === 0) {
              handleCancel();
              props.reloadList(Math.random());
              NotificationSuccess('Thành công', res.rc.desc);
            } else {
              NotificationError('Thất bại', res.rc.desc);
            }
          });
        } else {
          createReason(values as LeaveReason).then(res => {
            if (res && res.rc.code === 0) {
              handleCancel();
              props.reloadList(Math.random());
              NotificationSuccess('Thành công', res.rc.desc);
            } else {
              NotificationError('Thất bại', res.rc.desc);
            }
          });
        }
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const handleChangeReason = (value: any) => {
    console.log('reason => ', value);
    if (value === 'LEAVE_REQUEST_REASON') {
      setIsLeaveRequest(true);
    } else {
      setIsLeaveRequest(false);
    }
  };

  const { getFieldDecorator, resetFields, setFieldsValue } = props.form;
  return (
    <>
      <Modal
        maskClosable={false}
        centered
        title={props.editData ? 'Chỉnh sửa lý do' : 'Thêm mới lý do'}
        visible={props.isOpenModal}
        // width="650px"
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => handleCancel()}
        footer={''}
        zIndex={4}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Loại lý do">
            {getFieldDecorator('code', {
              initialValue: '',
              rules: [{ required: true, message: requiredMessage }],
            })(
              <Select placeholder="Chọn lý do" onChange={handleChangeReason} disabled={props.editData ? true : false}>
                {REASON_LIST?.map(item => {
                  return (
                    <Option key={item.code} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Lý do">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [{ required: true, message: requiredMessage }],
            })(<Input />)}
          </Form.Item>
          {props.editData.take_leave_code || isLeaveRequest ? (
            <Form.Item label="Mã lý do">
              {getFieldDecorator('take_leave_code', {
                initialValue: '',
                rules: [{ required: true, message: requiredMessage }],
              })(<Input disabled={props.editData ? true : false} />)}
            </Form.Item>
          ) : null}
          <Form.Item className="right-btns" label=" " style={{ marginBottom: '0', marginTop: '8px' }} colon={false}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={handleSubmit}>
              {props.editData ? 'Cập nhật' : 'Thêm mới'}
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={handleCancel}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default connector(Form.create<IProps>()(CreateReasonForm));
