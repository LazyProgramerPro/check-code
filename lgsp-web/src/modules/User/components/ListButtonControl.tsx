import React from "react";
import {showCreateUserForm} from "../redux/action/create_user";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Button, Col, Icon, Row} from "antd";
import BreadCrumb from "../../../components/BreadCrumb";

const mapStateToProps = (rootState: RootState) => ({
  createState: rootState.user.createState
});
const connector = connect(mapStateToProps, {showCreateUserForm});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListButtonControl({showCreateUserForm}: IProps) {

  const listBreadCrumb = [
    {
      path: 'manager-account',
      breadcrumbName: 'Danh sách người dùng',
    },
  ];

  const onCreateNewClicked = () => {
    showCreateUserForm(true);
  }

  return (
    <div>
      <BreadCrumb actionName="Tạo mới người dùng" routes={listBreadCrumb} onClick={onCreateNewClicked} />
    </div>
  )
}
export default connector(ListButtonControl);
