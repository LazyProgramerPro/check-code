import styled from 'styled-components';
export const Container = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  height: 40px;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: auto;
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
  }

  @media only screen and (max-width: 700px) {
    .filterDay {
      width: 100%;
    }
  }
`;
export const SelectButton = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.grayColor};
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
  border-radius: 2px;
  min-width: 48px;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.matteWhiteColor};
    background-color: ${({ theme }) => theme.backgroundDropdown};
  }
  &[data-type='active'] {
    background-color: ${({ theme }) => theme.darkBrightGrayColor};
    color: ${({ theme }) => theme.matteWhiteColor};
    &:hover {
      color: ${({ theme }) => theme.matteWhiteColor};
      background-color: ${({ theme }) => theme.backgroundDropdown};
    }
  }
`;
export const TimeRangeGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;
  .time-range--label {
    box-sizing: border-box;
    margin: 0px 8px 0px 0px;
    min-width: 0px;
    font-size: 12px;
    color: ${({ theme }) => theme.grayColor};
  }
  .ant-picker {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.grayColor};
    &:focus-visible {
      outline: none;
    }
    .ant-picker-range-separator {
      color: ${({ theme }) => theme.text};
      min-width: 40px;
    }
    .ant-picker-input {
      input {
        font-size: 12px;
        color: ${({ theme }) => theme.matteWhiteColor};
      }
    }
    .ant-picker-suffix {
      color: ${({ theme }) => theme.grayColor};
    }
  }
  .ant-picker-focused {
    box-shadow: none;
  }
`;
export const ResetButton = styled.button`
  margin: 0px 0px 0px 8px;
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  padding: 4px 8px;
  min-width: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  min-height: 24px;
  border: none;
  color: ${({ theme }) => theme.grayColor};
  background-color: ${({ theme }) => theme.darkBrightGrayColor};
  border-radius: 2px;
  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.backgroundDropdown};
  }
`;
export const SearchButton = styled.button`
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  padding: 4px 8px;
  min-width: 40px;
  font-weight: 500;
  line-height: 20px;
  word-break: keep-all;
  min-height: 24px;
  border: none;
  background-color: ${({ theme }) => theme.brightBlackColor};
  color: ${({ theme }) => theme.matteWhiteColor};
  border-radius: 2px;
  font-size: 12px;
  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.backgroundDropdown};
  }
`;
