import styled from 'styled-components';
import { Col } from 'react-bootstrap';
export const Main = styled.main`
  margin: 0;
  min-width: 0;
  display: flex;
  overflow: hidden;
  margin-top: 0;
  align-items: center;
  flex: 1;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    margin-top: 64px;
  }
`;
export const LeftMenu = styled(Col)`
  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 16px;
  }
  .subTitle {
    box-sizing: border-box;
    margin: 0px 0px 16px;
    min-width: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colorDescription};
    @media screen and (min-width: 1023px) {
      margin-bottom: 24px;
    }
    @media screen and (min-width: 767px) {
      margin-bottom: 24px;
    }
  }
`;
