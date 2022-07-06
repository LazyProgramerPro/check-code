import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {deleteUser, showDeleteUserConfirm} from "../redux/action/delete_user";
import {Button, Form, Modal} from "antd";
import {DeleteUserParam} from "../redux/models";
import React from "react";

const mapStateToProps = (rootState: RootState) => ({
  deleteState: rootState.user.deleteState,
  auth: rootState.auth
});

const conn = connect(mapStateToProps, {deleteUser, showDeleteUserConfirm});

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {
}

function DeleteUserConfirm(props: IProps) {
  const onBtnDeleteClicked = (e: any) => {
    let params: DeleteUserParam = {
      username: props?.deleteState?.param?.username || ""
    };
    props.deleteUser(params);
  }

  const onBtnCancelClicked = () => {
    props.showDeleteUserConfirm(false);
  }

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title={"Xác nhận xóa quyền"}
      visible={props.deleteState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        props.showDeleteUserConfirm(false);
      }}

      footer={""}>
      {props.deleteState.canDelete
        ? <div><p>Bạn có chắc chắn muốn xóa người dùng này không?</p></div>
        : <div><p>{props.deleteState.message}</p></div>
      }
      {props.deleteState.canDelete
        ? <div>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnDeleteClicked}>
            Xác nhận
          </Button>

          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </div>
        : <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>OK</Button>}
    </Modal>
  )

}
export default conn(Form.create<IProps>()(DeleteUserConfirm));
