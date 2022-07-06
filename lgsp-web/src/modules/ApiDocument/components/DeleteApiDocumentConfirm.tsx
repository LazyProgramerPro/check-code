import React from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Modal } from 'antd';
import { deleteApiDocument, showDeleteApiDocumentConfirm } from '../redux/actions/delete_document';
import { DeleteApiDocumentParam } from '../redux/models';

const mapStateToProps = (rootState: RootState) => ({
  deleteState: rootState.apiDocument.deleteState,
});

const connector = connect(mapStateToProps, { showDeleteApiDocumentConfirm, deleteApiDocument });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

const DeleteApiDocumentConfirm = (props: IProps) => {
  const onBtnDeleteClicked = (e: any) => {
    const param = props.deleteState.params;
    props.deleteApiDocument(param);
  };

  const onBtnCancelClicked = () => {
    props.showDeleteApiDocumentConfirm(false);
  };

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'Xác nhận xóa tài liệu'}
      visible={props.deleteState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        props.showDeleteApiDocumentConfirm(false);
      }}
      footer={''}
    >
      <div>
        <p>Bạn có xác nhận muốn xóa?</p>
      </div>
      <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnDeleteClicked}>
        Xác nhận
      </Button>

      <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
        Hủy
      </Button>
    </Modal>
  );
};

export default connector(DeleteApiDocumentConfirm);
