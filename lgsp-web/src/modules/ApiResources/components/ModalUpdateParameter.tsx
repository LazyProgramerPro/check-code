import React from 'react';
import { Form, Modal } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { showUpdateParamModal } from '../redux/actions/show_modal';

const mapStateToProps = (rootState: RootState) => ({
  showState: rootState.apiResource.showState,
});

const conn = connect(mapStateToProps, { showUpdateParamModal });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}
const ModalUpdateParameter = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'Thêm mới người dùng'}
      visible={props.showState.showParam}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        props.showUpdateParamModal(false);
      }}
      afterClose={() => {
        resetFields();
      }}
      footer={''}
    />
  );
};
export default conn(Form.create<IProps>()(ModalUpdateParameter));
