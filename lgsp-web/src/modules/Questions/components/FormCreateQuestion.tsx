import { Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { CreateQuestionParam } from '../redux/models';
import { createQuestion } from '../redux/services/apis';
import Loading from '../../../components/Loading';

interface FormCreateQuestionProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  onSuccess: Function;
  refreshList: Function;
}

function FormCreateQuestion(props: FormCreateQuestionProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose, onSuccess, refreshList } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleOnSuccess = () => {
    resetFields();
    onSuccess();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const param: CreateQuestionParam = {
          question: values.question,
        };
        createQuestion(param)
          .then(rs => {
            setLoading(false);
            if (rs.code == 0) {
              NotificationSuccess(
                'Thành công',
                'Câu hỏi đã được gửi đến cho Admin hệ thống.Chúng tôi sẽ phản hồi lại sớm nhất có thể',
              );
              handleOnSuccess();
              refreshList();
            } else {
              NotificationError('Thất bại', rs.message);
            }
          })
          .catch(() => {
            setLoading(false);
            NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
          });
      }
    });
  };
  const validateQuestion = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Câu hỏi không hợp lệ');
      }
      props.form.setFields({
        question: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };

  const pasteQuestion = () => {
    const valueQuestion = props.form.getFieldValue('question');
    props.form.setFields({
      question: {
        value: valueQuestion.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title="Tạo mới câu hỏi"
        visible={visible}
        onCancel={handleClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </StyledButton>
        }
      >
        <Form>
          <Form.Item label="Câu hỏi">
            {getFieldDecorator('question', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateQuestion }],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<TextArea rows={2} maxLength={5000} onPaste={pasteQuestion} />)}
          </Form.Item>
        </Form>
      </Modal>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}

export default Form.create<FormCreateQuestionProps>()(FormCreateQuestion);
const Wrapper = styled.div`
  .ant-modal-footer {
    padding-bottom: 20px !important;
  }
`;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
