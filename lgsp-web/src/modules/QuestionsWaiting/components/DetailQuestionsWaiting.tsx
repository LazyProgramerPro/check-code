import { Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AnswerQuestionParam } from '../redux/models';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { answerQuestion } from '../redux/services/apis';
import Loading from '../../../components/Loading';

interface DetailQuestionsWaitingProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  onSuccess: Function;
  question: string;
  answer: string;
  id: string;
}

function DetailQuestionsWaiting(props: DetailQuestionsWaitingProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: AnswerQuestionParam = {
          questionId: props.id,
          answer: values.answer,
        };
        setLoading(true);
        answerQuestion(param)
          .then(rs => {
            setLoading(false);
            if (rs.code == 0) {
              NotificationSuccess('Thành công', 'Gửi câu trả lời đến người dùng thành công');
              resetFields();
              onSuccess();
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
        title="Trả lời câu hỏi"
        visible={visible}
        onCancel={handleClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>

            <Button type="primary" onClick={handleSubmit}>
              Gửi
            </Button>
          </StyledButton>
        }
      >
        <Form>
          <Form.Item label="Câu hỏi">
            {getFieldDecorator('question', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: props.question,
            })(<TextArea disabled={true} rows={3} />)}
          </Form.Item>

          <Form.Item label="Câu trả lời">
            {getFieldDecorator('answer', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: checkValiate }],
              initialValue: props.answer,
              validateTrigger: 'onBlur',
            })(<TextArea rows={3} maxLength={5000} onPaste={pasteAnswer} />)}
          </Form.Item>
        </Form>
      </Modal>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}

export default Form.create<DetailQuestionsWaitingProps>()(DetailQuestionsWaiting);
const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
