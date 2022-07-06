import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Price = styled(Col)`
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  &[data-type='down'] {
    color: ${({ theme }) => theme.darkPinkColor};
  }
  &[data-type='up'] {
    color: ${({ theme }) => theme.brightGreenColor};
  }
`;
export const Amount = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Time = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Table = styled.div`
  max-height: 300px; /* relevant part */
  overflow-y: auto;
  padding-right: 6px;
  .table-item {
    height: 20px;
  }
`;
export const MyTradesComponent = styled.div`
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
