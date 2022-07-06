import styled from 'styled-components';
export const Container = styled.div`
  /* border: ${({ theme }) => theme.borderGray}; */
  /* border-top: none;
  border-bottom: none; */
`;
export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 10px;
  margin: 0 16px;
`;
export const ExtendButton = styled.div<{ extend: boolean }>`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  color: ${({ theme }) => theme.darkGrayColor};
  transition: all 0.3s ease 0s;
  cursor: pointer;
  transform: rotate(${({ extend }) => (extend ? '0deg' : '180deg')});
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  .extend-icon {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: currentcolor;
    font-size: 24px;
    fill: currentcolor;
    width: 1em;
    height: 1em;
  }
`;
export const ContentContainer = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
`;
export const Content = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  position: relative;
  transition: height 0.3s ease 0s;
  padding-left: 0px;
  padding-right: 0px;
  overflow-y: hidden;
  height: 82px;
`;
export const A = styled.a`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  height: 41px;
  flex: 0 0 auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundAccordion};
  .a-infor {
    margin: 0px 0px 2px;
    min-width: 0px;
    color: ${({ theme }) => theme.grayColor};
    font-size: 12px;
  }
  .a-rate {
    text-align: right;
    &--percent {
      box-sizing: border-box;
      margin: 0px 0px 2px;
      min-width: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${({ theme }) => theme.brightGreenColor};
      font-size: 12px;
    }
    &--timeRange {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${({ theme }) => theme.matteWhiteColor};
      font-size: 12px;
      padding-bottom: 1px;
    }
  }
  .a-symbol {
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    &--container {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      position: relative;
      width: 54px;
      height: 24px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
    }
    &--background {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      background-color: ${({ theme }) => theme.brightGreenColor};
      border-radius: 4px;
      opacity: 0.15;
    }
    &--svg {
      color: ${({ theme }) => theme.brightGreenColor};
      fill: ${({ theme }) => theme.brightGreenColor};
      font-size: 44px;
      width: 1em;
      height: 1em;
    }
  }
`;
