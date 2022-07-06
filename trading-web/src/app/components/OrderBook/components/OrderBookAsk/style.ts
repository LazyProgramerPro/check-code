import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Wrapper = styled.div`
  position: relative;
  .info {
    position: absolute;
    top: 100px;
    right: 0;
    transform: translate(calc(100% + 5px), calc(-50% - 1px));
    background-color: ${({ theme }) => theme.grayColor};
    padding: 5px 20px;
    border-radius: 5px;
    width: auto;
    min-width: 200px;
    p {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;

      .label {
        margin-right: 15px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      height: 7px;
      width: 7px;

      background-color: inherit;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  @media only screen and (max-width: 650px) {
    .info {
      display: none !important;
    }
  }
`;

export const Price = styled(Col)`
  color: ${({ theme }) => theme.darkPinkColor};
  padding: 0;
  font-size: 12px;
  z-index: -1;
  cursor: pointer;
`;
export const Amount = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  z-index: -1;
  padding: 0;
  text-align: right;
`;
export const Total = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  z-index: -1;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Table = styled.div`
  overflow-y: scroll;
  height: 96%;
  max-height: 96%;
  padding: 0;

  .table-item {
    height: 20px;
    padding: 0 16px;
    position: relative;

    &:hover {
      border-top: 1px dashed ${({ theme }) => theme.grayColor};
    }

    .markOpen {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(30%, -5%);
      opacity: 0.5;
    }
  }

  &[data-type='mini'] {
    padding-bottom: 16px;
    overflow: visible;
    /* display: flex; */
    /* flex-direction: column; */
    /* flex-direction: column-reverse; */
  }

  @media only screen and (max-width: 650px) {
    .table-item {
      background-color: inherit !important;
      &:hover {
        border: none;
      }
    }
  }
`;
