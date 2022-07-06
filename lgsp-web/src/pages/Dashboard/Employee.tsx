import React from 'react';
import styled from 'styled-components';
import employee from '../../assets/images/employee.png';
import {H3, H4} from './Common';

const Employee = (props: any) => {
  return (
    <Wrapper>
      <Heading>Thông tin chung</Heading>

      <ImageBox>
        <Image src={employee} alt="Employee's image"/>
      </ImageBox>

      <Details>
        <Fullname>Nguyễn Thanh Tâm</Fullname>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 375px;
  background-color: #fff;
  padding: 10px 20px 30px 20px;
`;

const Heading = styled(H4)`
  padding-bottom: 10px;
`;

const Fullname = styled(H3)`
  margin-bottom: 3px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const Image = styled.img`
  display: inline-block;
  max-width: 100%;
`;

const Details = styled.div``;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 18px;
`;

const InfoTitle = styled.span`
  width: 40%;
`;

const InfoValue = styled.span``;

export default Employee;
