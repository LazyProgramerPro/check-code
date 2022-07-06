import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

interface FormDetailQuestionProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  question: string;
  answer: string;
}

function FormDetailQuestion(props: FormDetailQuestionProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose } = props;

  const handleClose = () => {
    resetFields();
    onClose();
  };

  return (
    <Wrapper>
      <Modal
        title="Chi tiết câu hỏi"
        visible={visible}
        onCancel={handleClose}
        maskClosable={false}
        footer={
          <StyledButton>
            <Button onClick={handleClose}>Hủy</Button>
          </StyledButton>
        }
      >
        <Form>
          <Form.Item label="Câu hỏi">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: props.question,
            })(<TextArea rows={2} disabled={true} maxLength={5000} />)}
          </Form.Item>

          <Form.Item label="Câu trả lời">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: props.answer,
            })(<TextArea rows={4} disabled={true} maxLength={5000} />)}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormDetailQuestionProps>()(FormDetailQuestion);
const Wrapper = styled.div``;
const StyledButton = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
