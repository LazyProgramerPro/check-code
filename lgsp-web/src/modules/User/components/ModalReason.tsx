import { Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { rejectUser } from '../redux/action/create_user';
import { RejectUserParam } from '../redux/models';

interface ModalReasonProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  accountId: string;
}

const mapStateToProps = (rootState: RootState) => ({});

const conn = connect(mapStateToProps, { rejectUser });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps, ModalReasonProps {}

function ModalReason(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose, accountId, rejectUser } = props;
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const params: RejectUserParam = {
          reason: values.reason.trim(),
          userId: accountId,
        };
        setLoading(false);
        rejectUser(params);

        handleClose();
      }
    });
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };
  const validateReason = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      props.form.setFields({
        reason: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };

  return (
    <Wrapper>
      <Modal
        title={'Thông báo từ chối tạo tài khoản'}
        visible={visible}
        onCancel={handleClose}
        onOk={handleSubmit}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>
            <Button htmlType="submit" type="primary" style={{ marginLeft: '20px' }} onClick={handleSubmit}>
              Xác nhận
            </Button>
          </StyledButton>
        }
      >
        <Form layout="horizontal">
          <Form.Item label="Vui lòng nhập lý do từ chối">
            {getFieldDecorator('reason', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateReason }],
            })(<TextArea rows={4} maxLength={1000} />)}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default conn(Form.create<IProps>()(ModalReason));

const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -30px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
