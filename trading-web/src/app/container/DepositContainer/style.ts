import styled from 'styled-components';
export const App = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundWallet};
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  padding: 24px 16px;
  @media screen and (min-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  .wrapper {
    box-sizing: border-box;
    min-width: 0px;
    width: 100%;
    max-width: 1200px;
    margin: 0px auto;
    .directional {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
    }
  }
`;
export const ReturnDirect = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  .return-direct-icon {
    color: ${({ theme }) => theme.body};
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 24px;
    fill: currentcolor;
    cursor: pointer;
    width: 1em;
    height: 1em;
    &:hover {
      background: ${({ theme }) => theme.matteWhiteColor};
      border-radius: 4px;
    }
    @media screen and (min-width: 767px) {
      width: 32px;
      height: 32px;
      font-size: 32px;
    }
    @media screen and (min-width: 767px) {
      margin-left: 0px;
    }
  }
  .return-direct-title {
    box-sizing: border-box;
    margin: 0px 0px 0px 16px;
    min-width: 0px;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: ${({ theme }) => theme.body};
  }
`;
export const ForWardDirect = styled.button`
  margin: 0px;
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  padding: 6px 12px;
  min-width: 52px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  color: rgb(30, 35, 41);
  border-radius: 4px;
  min-height: 24px;
  border: none;
  background: ${({ theme }) => theme.matteWhiteColor};
  display: none;
  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => theme.whiteSmokeColor};
  }
  @media screen and (min-width: 767px) {
    display: flex;
  }
`;
export const MainContent = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  flex: 1 1 0%;
  background-color: ${({ theme }) => theme.text};
  border-radius: 40px 40px 0px 0px;
  padding: 24px 16px;
  @media screen and (min-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
