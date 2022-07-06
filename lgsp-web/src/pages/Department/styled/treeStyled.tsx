import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    margin-bottom: 15px;
    .ant-tree li {
      padding: 0;
    }
    .ant-tree-child-tree > li:first-child {
      padding-top: 0;
    }
    .ant-input-search.ant-input-affix-wrapper {
      padding: 15px 15px;
      background-color: #e8e8e8;
      input {
        border: none;
        outline: none;
        box-shadow: none;
      }
    }
    .ant-tree li span.ant-tree-switcher,
    .ant-tree li span.ant-tree-iconEle {
      line-height: 36px;
      height: 36px;
    }
    .ant-tree li .ant-tree-node-content-wrapper {
      line-height: 36px;
      height: 36px;
    }
    .ant-input-affix-wrapper .ant-input-suffix {
      right: 25px;
    }
    .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
      background: rgba(97, 180, 69, 0.1);
    }
    .ant-tree li .ant-tree-node-content-wrapper:hover {
      background: rgba(97, 180, 69, 0.1);
    }
    .ant-tree li .ant-tree-node-content-wrapper {
      width: calc(100% - 24px);
      display: inline-block;
    }

    .item-row {
      position: relative;
      .filter-match {
        color: #f50;
      }
      .item-row-actions {
        position: absolute;
        right: 0;
        top: 0;
        .ant-btn {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          &:hover {
            background-color: #fff;
            color: ${props => props.theme.colors.themePrimary};
          }
        }
      }
    }
  `,
};
export default Styled;
