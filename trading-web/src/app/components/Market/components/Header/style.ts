import styled from 'styled-components';
import { Row } from 'react-bootstrap';
export const THeader = styled(Row)`
  height: 20px;
  font-size: 12px;
  margin-top: 12px;
  color: ${({ theme }) => theme.grayColor};
  .sort-icon {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: currentcolor;
    font-size: 10px;
    fill: currentcolor;
    transform: scale(1.6);
    pointer-events: none;
    flex: 0 0 auto;
    width: 1em;
    height: 1em;
  }
  .change-icon {
    box-sizing: border-box;
    margin: 0px 0px 2px;
    color: currentcolor;
    fill: currentcolor;
    min-width: 16px;
    cursor: pointer;
    width: 1em;
    height: 1em;
    font-size: 16px;
    &:hover {
      color: ${({ theme }) => theme.matteWhiteColor};
    }
  }
`;
