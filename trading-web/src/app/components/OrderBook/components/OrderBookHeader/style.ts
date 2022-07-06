import styled from 'styled-components';
import { Row } from 'react-bootstrap';
export const THeader = styled(Row)`
  height: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.grayColor};
  padding: 0 16px;
`;
