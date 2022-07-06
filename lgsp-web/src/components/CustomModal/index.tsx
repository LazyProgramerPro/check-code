import React from "react";
import {Form, Modal} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {useAppDispatch, useAppSelector} from "src/redux/hooks";
import {hideModal} from "src/modules/Modal/redux/actions";

interface IModalRestApi extends FormComponentProps {

}

function CustomModal(props: IModalRestApi) {
  const {resetFields} = props.form;
  const selectModal = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()
  const {showModal, title, component} = selectModal

  const handleCancel = () => {
    resetFields();
    dispatch(hideModal())
  };

  return (
    <Modal
      maskClosable={false}
      title={title}
      visible={showModal}
      onCancel={handleCancel}
      footer={null}
      afterClose={() => {
        resetFields();
      }}
      wrapClassName="custom-modal">
      {component}
    </Modal>
  );

}

export default Form.create<IModalRestApi>()(CustomModal);
