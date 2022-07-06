import { Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';
import { createQuestion } from '../redux/services/apis';
import { CreateQuestionParam } from '../redux/models';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import Loading from '../../../components/Loading';

interface FormCreateQuestionPublishProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  onSuccess: Function;
  refreshList: Function;
}

function FormCreateQuestionPublish(props: FormCreateQuestionPublishProps) {
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
          answer: values.answer,
        };
        createQuestion(param)
          .then(rs => {
            setLoading(false);
            if (rs.code == 0) {
              NotificationSuccess('Thành công', 'Công khai câu hỏi thường gặp thành công');
              refreshList();
              handleOnSuccess();
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

  const checkValiateCreate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
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
  const checkValiate = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Câu trả lời không hợp lệ');
      }

      props.form.setFields({
        answer: {
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

  const pasteAnswer = () => {
    const valueAnswer = props.form.getFieldValue('answer');
    props.form.setFields({
      answer: {
        value: valueAnswer.trim() + ' ',
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
              Công khai
            </Button>
          </StyledButton>
        }
      >
        <Form>
          <Form.Item label="Câu hỏi">
            {getFieldDecorator('question', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkValiateCreate }],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<TextArea rows={3} maxLength={5000} onPaste={pasteQuestion} />)}
          </Form.Item>

          <Form.Item label="Câu trả lời">
            {getFieldDecorator('answer', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkValiate }],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<TextArea rows={3} maxLength={5000} onPaste={pasteAnswer} />)}
          </Form.Item>
        </Form>
      </Modal>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}

export default Form.create<FormCreateQuestionPublishProps>()(FormCreateQuestionPublish);
const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
