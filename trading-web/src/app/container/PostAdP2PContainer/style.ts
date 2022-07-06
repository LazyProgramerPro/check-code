import { Radio } from 'antd';
import styled from 'styled-components';

export const RadioStyled = styled(Radio)`
  .ant-radio-checked .ant-radio-inner {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: none;

    &::after {
      background-color: ${({ theme }) => theme.primary};
      box-shadow: none;
    }
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: none;
  }
`;
