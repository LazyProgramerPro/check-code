import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
export const Container = styled.div`
  padding: 10px 0;
  border: ${({ theme }) => theme.borderGray};

  @media only screen and (min-width: 576px) {
    border-top: none;
    border-right: none;
  }
`;
export const Div = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
`;
export const Content = styled(Row)`
  width: 80%;
  box-sizing: border-box;
  margin: 0px;
  height: 100%;
  flex: 1 1 0%;

  .wrapperLeft {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .showPrice {
    color: ${({ theme }) => theme.text};
    &[data-type='up'] {
      color: ${({ theme }) => theme.greenColor};
    }
    &[data-type='down'] {
      color: ${({ theme }) => theme.darkPinkColor};
    }
  }
  .subPrice {
    color: ${({ theme }) => theme.text};
  }

  .nowPrice {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 991px) {
    .wrapperLeft {
      justify-content: flex-start;
    }
  }
`;
export const SpotTutorial = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  color: ${({ theme }) => theme.grayColor};
  font-size: 12px;
  cursor: pointer;
  svg {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: ${({ theme }) => theme.grayColor};
    font-size: 16px;
    fill: ${({ theme }) => theme.grayColor};
    width: 1em;
    height: 1em;
  }

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;
export const ContentLeft = styled(Col)`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-right: ${({ theme }) => theme.borderBlack};
  padding: 0px;
  margin: 0px;
  padding-right: 10px;

  .linkQuote {
    text-decoration: none !important;
    padding-top: 2px;
  }
  .contentLeft-coin {
    display: flex;
    flex-direction: column;
    .coin {
      font-size: 20px;
      font-weight: 500;
    }
    .InformationCoin {
      svg {
        margin: 0px 4px 0px 0px;
        min-width: 0px;
        color: ${({ theme }) => theme.grayColor};
        font-size: 16px;
        fill: ${({ theme }) => theme.grayColor};
        width: 1em;
        height: 1em;
      }
      a {
        color: ${({ theme }) => theme.grayColor};
        text-decoration: underline;
      }
      &:hover {
        svg {
          color: ${({ theme }) => theme.matteWhiteColor};
          fill: ${({ theme }) => theme.matteWhiteColor};
        }
      }
    }
  }
`;
export const ContentRight = styled(Col)`
  display: flex;
  margin-left: 10px;
  .ticketList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .contentRightContainer {
    width: 100%;
    flex-flow: row nowrap;
    box-sizing: border-box;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    margin-right: 8px;
    font-size: 12px;
    overflow: hidden;
    .ticketItem {
      padding-right: 32px;
    }
    .tickerItemLabel {
      margin-bottom: 2px;
      color: ${({ theme }) => theme.grayColor};
      line-height: 16px;
      font-weight: 400;
    }
    .tickerPriceText {
      .tickerPriceText-value {
        color: ${({ theme }) => theme.text};
        &[data-type='up'] {
          color: ${({ theme }) => theme.greenColor};
        }
        &[data-type='down'] {
          color: ${({ theme }) => theme.darkPinkColor};
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .ticketItem {
      margin-bottom: 10px;
      text-align: left;
    }
  }
  @media only screen and (max-width: 767px) {
    margin-top: 20px;
  }
`;
