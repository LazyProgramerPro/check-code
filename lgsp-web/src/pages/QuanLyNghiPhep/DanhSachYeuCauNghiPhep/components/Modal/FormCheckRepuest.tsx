import React from 'react';
import {Button, Col, Form, Modal, Row, Tag} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import styled from 'styled-components';
import employee from '../images/employee.png';
import TableHistoryLeave from './TableHistoryLeave';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   min-height: 375px;
//   background-color: #fff;
//   padding: 10px 20px 30px 20px;
// `;

const Fullname = styled.h3`
  margin-bottom: 15px;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  padding-right: 15px;
`;
const Image = styled.img`
  display: inline-block;
  max-width: 100%;
`;
const Details = styled.div``;
const ResultStatus = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
`;
const InfoTitle = styled.span`
  width: 30%;
`;
const InfoValue = styled.span`
  color: #000;
`;
const BoxTable = styled.div`
  margin-top: 15px;
`;
const BoxBtn = styled.div`
  display: flex;
`;

interface Props extends FormComponentProps {
  visible: boolean;
  onCancelRequest: () => void;
  onApprovalRequest: () => void;
  onUpdateRequest: () => void;
  onNotApprovalRequest: () => void;
}

interface OptionProps {
  keyword: string;
  value: string;
}

const CollectionCreateForm = Form.create<Props>({name: 'form_in_modal'})(
  // eslint-disable-next-line
  class extends React.Component<any, any> {
    render() {
      const {visible, onCancelRequest, onNotApprovalRequest, onApprovalRequest, onUpdateRequest} = this.props;
      // const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Check yêu cầu nghỉ phép"
          okText="Duyệt"
          cancelText="Huỷ"
          onCancel={onCancelRequest}
          onOk={onApprovalRequest}
          footer={
            <BoxBtn>
              <Button type="danger" style={{width: '100%'}} onClick={onApprovalRequest}>
                Duyệt
              </Button>
              <Button type="danger" style={{width: '100%'}} onClick={onNotApprovalRequest}>
                Từ chối
              </Button>
              <Button style={{width: '100%'}} onClick={onUpdateRequest}>
                Cập nhật
              </Button>
              <Button style={{width: '100%'}} onClick={onCancelRequest}>
                Huỷ
              </Button>
            </BoxBtn>
          }
        >
          <div>
            <Row className="row">
              <Col md={6}>
                <ImageBox>
                  <Image src={employee} alt="Employee's image"/>
                </ImageBox>
              </Col>
              <Col md={18}>
                <Row className="row">
                  <Col md={18}>
                    <Details>
                      <Fullname>Đỗ Hoàng Nam</Fullname>
                      <InfoBox>
                        <InfoTitle>Mã NV</InfoTitle>
                        <InfoValue>RD019088</InfoValue>
                      </InfoBox>
                      <InfoBox>
                        <InfoTitle>Chức vụ</InfoTitle>
                        <InfoValue>Nhân viên</InfoValue>
                      </InfoBox>
                      <InfoBox>
                        <InfoTitle>Đơn vị</InfoTitle>
                        <InfoValue>Văn phòng 1</InfoValue>
                      </InfoBox>
                    </Details>
                  </Col>
                  <Col md={6}>
                    <ResultStatus>
                      <Tag
                        color="#E45356"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          padding: '0',
                          display: 'inline-block',
                        }}
                      ></Tag>
                      Bị từ chối
                    </ResultStatus>
                  </Col>
                </Row>
              </Col>
              <Col md={24}>
                <Details>
                  <InfoBox>
                    <InfoTitle>Ngày bắt đầu nghỉ</InfoTitle>
                    <InfoValue style={{fontWeight: 'bold'}}>29/01/2020</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoTitle>Ngày kết th nghỉ</InfoTitle>
                    <InfoValue>01/01/2020</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoTitle>Số ngày</InfoTitle>
                    <InfoValue>2</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoTitle>Loại nghỉ phép</InfoTitle>
                    <InfoValue>Nghỉ phép thường</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoTitle>Lý do</InfoTitle>
                    <InfoValue>Ngốm chăm sóc người nhà ốm</InfoValue>
                  </InfoBox>
                </Details>
              </Col>
            </Row>
            <BoxTable>
              <TableHistoryLeave/>
            </BoxTable>
          </div>
        </Modal>
      );
    }
  },
);
export default CollectionCreateForm;
