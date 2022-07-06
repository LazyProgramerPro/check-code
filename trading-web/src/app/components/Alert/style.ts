import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { Typography } from 'antd';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.earthBrownColor};
  padding: 5px 40px 5px 15px;
  text-align: justify;
  position: relative;

  .btn-close {
    position: absolute;
    top: 50;
    right: 0;
    margin-right: 13px;
    color: ${({ theme }) => theme.whiteSmokeColor};
  }

  @media only screen and (max-width: 575px) {
    display: none;
  }
`;

export const StyledAlert = styled(Typography.Text)`
  color: ${({ theme }) => theme.text};
  border: none;
  margin-bottom: 0;
  svg {
    box-sizing: border-box;
    margin: 0 12px 0 0;
    min-width: 0px;
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
    fill: ${({ theme }) => theme.primary};
    width: 1em;
    height: 1em;
  }
`;
export const StyledAlertLink = styled(Alert.Link)`
  margin-left: 8px;
  color: ${({ theme }) => theme.primary} !important;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
`;
