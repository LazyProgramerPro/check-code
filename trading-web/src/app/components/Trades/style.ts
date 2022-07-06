import styled from 'styled-components';

export const Container = styled.div`
  border: ${props => props.theme.borderGray};
  border-left: none;
  border-right: none;
  padding: 16px 8px 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* max-height: 384px; */
`;
export const Tabs = styled.div`
  padding: 0 0 8px 0;
  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: ${props => props.theme.text};
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .btn-myTrades {
    padding-left: 48px;
  }
  .btn-active {
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }
`;
