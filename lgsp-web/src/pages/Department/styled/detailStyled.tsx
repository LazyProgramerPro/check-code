import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    .department-detail {
      padding: 30px 15px;
      .department-title {
        font-size: 20px;
        border-bottom: solid 1px #e8e8e8;
        padding-bottom: 18px;
        margin-bottom: 18px;
        font-weight: 700;
      }
      .manager-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 18px;
      }
      .manager-info {
        padding: 20px 15px;
        border: solid 1px #e8e8e8;
        font-size: 14px;
        color: #333;
        margin-bottom: 15px;
      }
      .mb-15 {
        margin-bottom: 15px;
      }
    }
  `,
  Table: styled.div`
    .table-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 18px;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${props => props.theme.colors.themePrimary};
      border-color: ${props => props.theme.colors.themePrimary};
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      background-color: ${props => props.theme.colors.themePrimary};
      border-color: ${props => props.theme.colors.themePrimary};
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: ${props => props.theme.colors.themePrimary};
    }

    .m-15 {
      margin-bottom: 15px !important;
      margin-top: 15px !important;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
    .ant-select {
      display: block;
    }
    .ant-form-item-control {
      line-height: 0;
    }

    .ant-btn-primary {
      color: #fff;
      background-color: ${props => props.theme.colors.themePrimary};
      border-color: ${props => props.theme.colors.themePrimary};
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      &:hover {
        background-color: ${props => props.theme.colors.themePrimary}e5;
        border-color: ${props => props.theme.colors.themePrimary}e5;
      }
    }
  `,
};
export default Styled;
