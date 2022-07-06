import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  z-index: 10;
  bottom: 0px;
  background-color: ${({ theme }) => theme.backgroundFooter};
  padding: 0px 0px 0px 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border: ${({ theme }) => theme.borderBlack};
  .connect-title {
    margin: 0px 0px 0px 10px;
    min-width: 0px;
    color: ${({ theme }) => theme.brightGreenColor};
    font-size: 12px;
  }
`;
export const SupportSection = styled.div`
  display: flex;
  span {
    color: ${({ theme }) => theme.brightGrayColor};
    font-size: 12px;
  }
  .download-section {
    border-left: ${({ theme }) => theme.borderSectionFooter};
    padding: 0px 16px;
    .download-icon {
      margin: 0px 10px 0px 0px;
      min-width: 0px;
      color: currentcolor;
      font-size: 14px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
  .online-section {
    border-left: ${({ theme }) => theme.borderSectionFooter};
    padding: 0px 16px;
    .docs-icon {
      box-sizing: border-box;
      margin: 0px 10px 0px 0px;
      min-width: 0px;
      color: currentcolor;
      font-size: 14px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
`;
