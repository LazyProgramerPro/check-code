import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 8px;
  .ant-table {
    color: ${({ theme }) => theme.grayColor};
    background-color: transparent;
    font-size: 12px;
    font-weight: 400;
    .ant-table-container {
      border: none;
      min-height: 300px;
      .ant-table-thead > tr > th {
        position: relative;
        color: inherit;
        font-weight: 500;
        text-align: left;
        background: transparent;
        padding: 0;
        border-bottom: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
      }
      .ant-table-tbody > tr.ant-table-row:hover > td,
      .ant-table-tbody > tr > td.ant-table-cell-row-hover {
        background: ${({ theme }) => theme.darkBrightGrayColor};
      }
      .ant-table-tbody > tr > td {
        border-bottom: none;
        padding: 4px 0px;
        .white-color {
          color: ${({ theme }) => theme.text};
        }
        .typeof-side {
          &[data-type='buy'] {
            color: ${({ theme }) => theme.brightGreenColor};
          }
          &[data-type='sell'] {
            color: ${({ theme }) => theme.darkPinkColor};
          }
        }
      }
      .ant-table-tbody {
        .ant-table-placeholder {
          .ant-empty-normal {
            color: ${({ theme }) => theme.text};
          }
          &:hover {
            .ant-table-cell {
              background: ${({ theme }) => theme.darkBrightGrayColor};
            }
          }
        }
      }
    }
  }
  .ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item {
      height: 25px;
      line-height: 22px;
      min-width: 24px;
    }
    .ant-pagination-prev > button,
    .ant-pagination-next > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: ${({ theme }) => theme.text};
    }
  }
  .ant-table-cell-scrollbar {
    box-shadow: none;
  }
`;
