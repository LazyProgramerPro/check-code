import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: ${({ theme }) => theme.borderGray};
  .chart {
    height: 481px;
    /* height: 454px; */
  }
  .timeframe-filter {
    background-color: ${({ theme }) => theme.background};
    padding-top: 6px;
    &--title {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;
export const Span = styled.span`
  background-color: ${({ theme }) => theme.backgroundDropdown};
  margin: 0 1px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.primary};
  }
`;
