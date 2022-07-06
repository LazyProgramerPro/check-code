import styled from 'styled-components';
import { Col } from 'react-bootstrap';
export const OrderBookBidHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  overflow-y: scroll;

  .contractPrice {
    font-size: 20px;
    display: flex;
    align-items: center;
    &[data-type='up'] {
      color: ${({ theme }) => theme.greenColor};
    }
    &[data-type='down'] {
      color: ${({ theme }) => theme.darkPinkColor};
    }
  }
  .markPrice {
    font-size: 12px;
    margin-left: 8px;
    color: ${({ theme }) => theme.grayColor};
  }
  .readmore {
    color: ${({ theme }) => theme.grayColor};
    font-size: 12px;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
export const Price = styled(Col)`
  color: ${({ theme }) => theme.greenColor};
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  z-index: -1;
`;
export const Amount = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
  z-index: -1;
`;
export const Total = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
  z-index: -1;
`;
export const Table = styled.div`
  overflow-y: scroll;
  height: 717px;
  width: 100%;
  padding: 0;
  .table-item {
    height: 20px;
    padding: 0 16px;
    position: relative;

    &:hover {
      border-bottom: 1px dashed ${({ theme }) => theme.grayColor};
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
    /* padding-bottom: 16px; */
    overflow: visible;

    &::-webkit-scrollbar {
      display: none;
    }
    /* overflow-y: hidden;
    overflow-x: visible; */
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

export const Wrapper = styled.div`
  position: relative;
  .info {
    position: absolute;
    top: 100px;
    z-index: 5;
    right: 0;
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
