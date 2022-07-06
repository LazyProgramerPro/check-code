import styled from 'styled-components';

export const App = styled.div`
  background-color: ${({ theme }) => theme.text};
  margin: 0px;
  min-width: 0px;
  flex: 1 1 0%;
  padding: 0px;
  @media screen and (min-width: 767px) {
    padding: 24px;
  }
  @media screen and (min-width: 1023px) {
    padding-bottom: 32px;
    padding-left: 32px;
    padding-right: 32px;
  }
  .coin-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .coin-url {
    color: ${({ theme }) => theme.colorDescription};
  }
  .coin-action {
    color: ${({ theme }) => theme.primary};
    opacity: 0.7;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }

  .spaceTotal {
    display: flex;
    flex-direction: column;

    .spanTotal {
      margin-top: 16px;
    }
    .avaiOrderRes {
      display: none;
    }
  }

  @media only screen and (max-width: 767px) {
    .spanTotal {
      margin-top: 0;
    }
    .avaiOrderRes {
      display: block !important;
      opacity: 0.4;
      p {
        margin-bottom: 0;
      }
    }

    .ant-table-cell {
      padding: 8px;
    }

    .colCoin {
      display: flex;
      flex-direction: column;
    }
  }
`;
export const Head = styled.div`
  margin: 0px 0px 24px 0px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  position: relative;
  @media screen and (min-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }
  @media screen and (min-width: 1023px) {
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
  }
`;
export const SearchBox = styled.div`
  margin: 0px;
  min-width: 0px;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  line-height: 1.6;
  border: 1px solid ${({ theme }) => theme.matteWhiteColor};
  border-radius: 4px;
  align-items: flex-end;
  width: 158px;
  height: 40px;
  @media screen and (min-width: 767px) {
    width: 214px;
    margin-right: 0px;
  }
  @media screen and (min-width: 1023px) {
    margin-right: 24px;
  }
  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
  .bn-input-prefix {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    flex-shrink: 0;
    font-size: 14px;
    .prefix-icon {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 40px;
      .search-icon {
        box-sizing: border-box;
        margin: 0px 0px 0px 8px;
        min-width: 0px;
        color: ${({ theme }) => theme.colorDescription};
        font-size: 24px;
        fill: ${({ theme }) => theme.colorDescription};
        width: 1em;
        height: 1em;
      }
    }
  }
  .search-input {
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    padding: 0px;
    outline: none;
    border: none;
    background-color: inherit;
    opacity: 1;
    color: ${({ theme }) => theme.background};
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;
export const Subfilter = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  @media screen and (min-width: 767px) {
    margin-top: 24px;
  }
  @media screen and (min-width: 1023px) {
    margin-top: 0px;
  }
`;
export const StyledCheckbox = styled.div`
  margin: 0px;
  min-width: 0px;
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  .labelView {
    font-size: 14px;
    position: relative;
    padding-left: 24px;
    color: ${({ theme }) => theme.colorDescription};
    cursor: pointer;
    user-select: none;
    .label-text {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      line-height: 22px;
      border-bottom: 1px dashed ${({ theme }) => theme.slateGrayColor};
      color: ${({ theme }) => theme.darkBrightGrayColor};
    }
    &:hover input ~ .checkmark {
      border-color: ${({ theme }) => theme.primary};
    }
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: ${({ theme }) => theme.primary};
        border-color: ${({ theme }) => theme.primary};
      }
      :checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 17px;
      width: 17px;
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colorDescription};
      &:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
`;
export const ConvertButton = styled.a`
  box-sizing: border-box;
  margin: 0px 0px 0px 24px;
  min-width: 0px;
  text-decoration: underline;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  &:hover {
    color: ${({ theme }) => theme.primary};
    opacity: 0.8;
  }
`;
