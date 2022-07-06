import React from 'react';
import {Alert, Col, Row} from 'antd';
import {connect} from 'react-redux';

interface iProps {
  loading: boolean;
  departmentDetails: any;
}

const DepartmentDetail = (props: iProps) => {
  let detail = null;
  let block = <Alert message="" description="Bạn chưa chọn đơn vị nào" type="error"/>;
  if (!props.loading && props.departmentDetails.item) {
    detail = props.departmentDetails.item;
    block = (
      <div>
        <Col span={24}>
          <h3 className="department-title">{detail.name}</h3>
        </Col>
        <Col className="clearfix" span={24}>
          <h4 className="manager-title">Quản lý</h4>
          <div className="manager-info">
            <Row gutter={16}>
              <Col className="mb-15" span={8}>
                <strong>Mã nhân viên: </strong>
                {detail.id}
              </Col>
              <Col className="mb-15" span={8}>
                <strong>Họ tên: </strong>Nguyễn Văn A
              </Col>
              <Col className="mb-15" span={8}>
                <strong>Địa chỉ: </strong>Hà Nội
              </Col>
              <Col span={8}>
                <strong>Ngày sinh: </strong>20/11/1989
              </Col>
              <Col span={8}>
                <strong>SĐT: </strong>0123456789
              </Col>
              <Col span={8}>
                <strong>Email: </strong>nva@gmail.com
              </Col>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
  return block;
};
const mapStateToProps = (state: any) => {
  return {
    loading: state.department.loading,
    departmentDetails: state.department.departmentDetails,
  };
};
export default connect(mapStateToProps, null)(DepartmentDetail);
