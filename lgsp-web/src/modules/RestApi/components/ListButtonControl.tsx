import React from "react";
import {Button, Col, Icon, Row} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";


const mapStateToProps = (rootState: RootState) => ({
});


const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}


function ListButtonControl() {

  const onCreateNewClicked = () => {
    // showCreateGroupApiForm(true);
  }

  return (
    <div className="entryHeader">
      <Row>
        <Col md={16}>
          <div className="tmp-title-page-size20">Dịch vụ Restful API chi tiết</div>
        </Col>
        <Col className="d-flex" md={8}>
          <Button onClick={onCreateNewClicked}>
            <Icon type="plus"/> Thêm mới
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default connector(ListButtonControl);
