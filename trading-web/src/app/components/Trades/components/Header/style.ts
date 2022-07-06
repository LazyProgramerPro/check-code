import styled from 'styled-components';
import { Row } from 'react-bootstrap';
export const THeader = styled(Row)`
  height: 20px;
  padding-right: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.grayColor};
  .pl-0 {
    padding-left: 0;
  }
`;
