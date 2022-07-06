import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledSelect = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  &[data-type='network'] {
    margin: 24px 0px 0px;
  }
  @media screen and (min-width: 767px) {
    flex-direction: row;
  }
  @media screen and (min-width: 1023px) {
    flex-direction: row;
  }
  .select-title {
    margin: 0px 24px 0px 0px;
    min-width: 0px;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    @media screen and (min-width: 767px) {
      width: 160px;
    }
    @media screen and (min-width: 1023px) {
      width: 180px;
    }
  }
  .select {
    margin: 0px;
    min-width: 0px;
    width: 100%;
    &--label {
      margin: 0px 0px 4px;
      min-width: 0px;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.darkBrightGrayColor};
    }
  }
  .select--input {
    margin: 0px;
    min-width: 0px;
    display: flex;
    width: 100%;
    height: 48px;
    background-color: ${({ theme }) => theme.text};
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.matteWhiteColor};
    justify-content: space-between;
    align-items: center;
    cursor: auto;
    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
    .selected--wrapper {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      flex: 1 1 0%;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      padding-bottom: 14px;
      cursor: pointer;
      overflow: hidden;
      .selected {
        box-sizing: border-box;
        margin: 0px 4px 0px 0px;
        min-width: 0px;
        display: flex;
        align-items: center;
        width: auto;
        flex-shrink: 0;
        &-information {
          margin: 0px 0px 0px 8px;
          min-width: 0px;
          display: flex;
          flex: 1 1 0%;
          flex-direction: row;
          align-items: center;
          .selected-name {
            margin: 0px;
            min-width: 0px;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: ${({ theme }) => theme.background};
          }
          .selected-desc {
            margin: 0px 0px 0px 8px;
            min-width: 0px;
            color: ${({ theme }) => theme.darkBrightGrayColor};
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
    .down-icon {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 16px;
      fill: currentcolor;
      transform: rotate(0deg);
      color: ${({ theme }) => theme.slateGrayColor};
      width: 1em;
      height: 1em;
    }
  }
`;
export const CoinModal = styled(Modal)`
  .search-coin {
    box-sizing: border-box;
    margin: 4px 0px 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    height: 40px;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    width: 100%;
    .search-icon {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      .icon-search {
        box-sizing: border-box;
        margin: 0px 0px 0px 8px;
        min-width: 0px;
        color: ${({ theme }) => theme.colorDescription};
        font-size: 16px;
        fill: ${({ theme }) => theme.colorDescription};
        width: 1em;
        height: 1em;
      }
    }
    .search-input {
      margin: 0px;
      min-width: 0px;
      width: 100%;
      height: 100%;
      padding: 0 12px;
      outline: none;
      border: none;
      background-color: inherit;
      opacity: 1;
      color: ${({ theme }) => theme.background};
      font-size: 14px;
    }
  }
  .coin-list {
    margin: 16px 0px;
    min-width: 0px;
    height: 100%;
    overflow: scroll;
    @media screen and (min-width: 767px) {
      height: 352px;
    }
    .coin-item {
      margin: 0px;
      min-width: 0px;
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (min-width: 767px) {
        padding-left: 24px;
        padding-right: 24px;
      }
      border-style: solid;
      border-width: 0px 0px 1px;
      border-color: ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 4px;
      &:hover {
        background-color: ${({ theme }) => theme.colorDescription};
      }
      &--wrapper {
        margin: 0px;
        min-width: 0px;
        display: flex;
        flex: 1 1 0%;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;
        padding-bottom: 14px;
        cursor: pointer;
      }
      &--icon {
        width: 32px;
        height: 32px;
      }
      &--information {
        margin: 0px 0px 0px 16px;
        min-width: 0px;
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        align-items: flex-start;
        .coin-name {
          margin: 0px;
          min-width: 0px;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.background};
        }
        .coin-note {
          margin: 0px;
          min-width: 0px;
          color: ${({ theme }) => theme.darkBrightGrayColor};
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
`;
export const NetworkModal = styled(Modal)`
  .content-header {
    box-sizing: border-box;
    margin: 0px 0px 16px;
    min-width: 0px;
    font-size: 14px;
    color: ${({ theme }) => theme.background};
    line-height: 20px;
    padding-left: 16px;
    padding-right: 16px;
    @media screen and (min-width: 767px) {
      margin-top: 16px;
      padding-left: 24px;
      padding-right: 24px;
    }
    @media screen and (min-width: 1023px) {
      margin-top: 16px;
    }
  }
  .network-list {
    height: 100%;
    margin: 0px;
    @media screen and (min-width: 767px) {
      height: auto;
    }
    .network-item {
      margin: 0px;
      min-width: 0px;
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (min-width: 767px) {
        padding-left: 24px;
        padding-right: 24px;
      }
      border-style: solid;
      border-width: 0px 0px 1px;
      border-color: ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 4px;
      &:hover {
        background-color: ${({ theme }) => theme.colorDescription};
      }
      &--wrapper {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        padding-top: 16px;
        padding-bottom: 16px;
        cursor: pointer;
      }
      &--symbol {
        margin: 0px 0px 4px;
        min-width: 0px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.background};
        vertical-align: middle;
      }
      &--network {
        margin: 4px 0px 0px;
        min-width: 0px;
        font-size: 14px;
        color: ${({ theme }) => theme.darkBrightGrayColor};
        line-height: 20px;
      }
    }
  }
`;
export const AddressSection = styled.div`
  .address-section {
    .content-item {
      margin: 24px 0px 0px;
      min-width: 0px;
      .address-wallet {
        color: ${({ theme }) => theme.background};
        .address-title {
          margin: 0px 0px 4px;
          min-width: 0px;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }

  .note {
    margin: 24px 0px 0px;
    min-width: 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    ul {
      padding: 0px 0px 0px 16px;
      .note-coin-name {
        color: ${({ theme }) => theme.background};
        font-size: 14px;
      }
      .note-network-name {
        color: ${({ theme }) => theme.redColor};
        font-size: 14px;
      }
    }
  }
`;
export const StyledWalletAddress = styled.div`
  margin: 0px;
  min-width: 0px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  word-break: break-all;
  .address-wrapper {
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex: 1 1 0%;
    .copy-icon {
      margin: 0px 0px 0px 24px;
      min-width: 0px;
      width: 24px;
      svg {
        box-sizing: border-box;
        margin: 0px 0px 0px 4px;
        min-width: 0px;
        color: ${({ theme }) => theme.slateGrayColor};
        font-size: 24px;
        fill: ${({ theme }) => theme.slateGrayColor};
        vertical-align: middle;
        border-radius: 4px;
        cursor: pointer;
        width: 1em;
        height: 1em;
        &:hover {
          color: ${({ theme }) => theme.background};
        }
      }
    }
    .qr-icon {
      margin: 0px 0px 0px 24px;
      width: 24px;
      height: 24px;
      svg {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        cursor: pointer;
        font-size: 24px;
        color: ${({ theme }) => theme.slateGrayColor};
        fill: currentcolor;
        width: 1em;
        height: 1em;
        &:hover {
          color: ${({ theme }) => theme.background};
        }
      }
    }
  }
`;
export const StyledQRTooltip = styled.div`
  background-color: ${({ theme }) => theme.matteWhiteColor};
  padding: 16px 8px;
  border-radius: 4px;
  width: max-content;
  max-width: 290px;
  .guide {
    box-sizing: border-box;
    margin: 0px 0px 16px;
    min-width: 0px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    text-align: center;
  }
  .qr-code {
    margin: 0px;
    min-width: 0px;
    display: flex;
    justify-content: center;
  }
  .note {
    margin: 16px 0px 0px;
    min-width: 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    ul {
      padding: 0px 0px 0px 16px;
      margin-bottom: 0;
      .note-coin-name {
        color: ${({ theme }) => theme.background};
        font-size: 14px;
      }
      .note-network-name {
        color: ${({ theme }) => theme.redColor};
        font-size: 14px;
      }
    }
  }
`;
export const StyledNoticed = styled.div`
  .wrapper {
    margin: 16px 0px;
    min-width: 0px;
    display: flex;
    height: 216px;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    padding: 24px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    .notice-content {
      margin: 0px;
      min-width: 0px;
      max-width: 312px;
      text-align: center;
      .notice-message {
        margin: 0px;
        min-width: 0px;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.slateGrayColor};
      }
      .get-address-btn {
        margin: 24px 0px 0px;
        appearance: none;
        user-select: none;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        box-sizing: border-box;
        font-family: inherit;
        text-align: center;
        text-decoration: none;
        outline: none;
        padding: 10px 16px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        word-break: keep-all;
        color: ${({ theme }) => theme.backgroundFooter};
        border-radius: 4px;
        min-height: 24px;
        border: none;
        background-image: none;
        background-color: ${({ theme }) => theme.primary};
        min-width: 180px;
      }
    }
  }
`;
