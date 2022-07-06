import styled from 'styled-components';
import { Col, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    margin: 0;
    min-width: 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    @media screen and (min-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }
  }
  .sub-title {
    margin: 0;
    min-width: 0;
    margin-top: 8px;
    color: ${({ theme }) => theme.brightGrayColor};
    @media screen and (min-width: 767px) {
      margin-top: 16px;
    }
  }
`;
export const GroupHelpButton = styled.div`
  margin: 0;
  min-width: 0;
  display: flex;
  margin-top: 16px;
  flex-direction: column;
`;
export const StyledLink = styled(Link)`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  display: block;
  margin-top: 8px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primary};
    opacity: 0.9;
  }
`;
export const StyledToastContainer = styled(ToastContainer)`
  opacity: 1;
  transition: all 1s ease-out;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
