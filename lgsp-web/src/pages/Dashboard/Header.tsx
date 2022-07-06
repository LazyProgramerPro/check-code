import React from 'react';
import styled from 'styled-components';
import {Button, Col, Icon, Row} from 'antd';

const Header = (props: any) => {

  return (
    <Wrapper>
      <Row>
        <Col md={16}>
          <Title>Xin chào! Nguyễn Thanh Tâm - Chúc bạn một ngày làm việc hiệu quả</Title>
        </Col>
        <Col className="d-flex" md={8}>
          <div className="tmp-btn">
            <Button><Icon type="check-circle"/> Điểm danh</Button>
          </div>
          <div className="tmp-btn">
            <Button><Icon type="upload"/> Export</Button>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({
  className: 'entryHeader',
})`
    padding: 15px 0;
`

const Title = styled.div`
  margin: 0;
  font-size: 18px;
`;

export default Header;
