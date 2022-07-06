import styled from 'styled-components';
import { Modal, Tabs } from 'antd';
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
  .ant-tabs {
    margin: 0px;
    min-width: 0px;
    width: 100%;
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
export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    &::before {
      display: none;
    }
    margin: 0 0 24px 0;
    .ant-tabs-tab {
      border: none;
      border-radius: 4px !important;
    }
    .ant-tabs-tab-active {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.whiteSmokeColor};
    }
  }
  .ant-tabs-tab:first-child {
    margin-right: 1rem;
  }
`;
export const StyledTabPane = styled.div`
  margin: 0px;
  min-width: 0px;
  width: 100%;
  .input-address {
    box-sizing: border-box;
    margin: 24px 0px 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    width: 100%;
    height: 48px;
    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
    &:focus-within {
      border-color: ${({ theme }) => theme.primary};
    }
    .address-label {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: absolute;
      top: -24px;
      left: 0px;
      line-height: 24px;
      transition-property: top, font-size;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      z-index: 1;
      cursor: text;
      color: ${({ theme }) => theme.darkBrightGrayColor};
      font-size: 12px;
    }
    .input-field {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      height: 100%;
      padding: 0px 12px;
      outline: none;
      border: none;
      background-color: inherit;
      opacity: 1;
      color: rgb(30, 35, 41);
      font-size: 14px;
    }
  }
  .select--label {
    margin: 24px 0px 0px;
    min-width: 0px;
    min-width: 0px;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    &[data-type='adr-book'] {
      margin: 0;
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
  .withdraw-detail {
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    &--row {
      margin: 16px 0px 0px;
      min-width: 0px;
      display: flex;
      .detail-item {
        margin: 0px;
        min-width: 0px;
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        &--label {
          box-sizing: border-box;
          margin: 0px 0px 4px;
          min-width: 0px;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.slateGrayColor};
        }
        &--value {
          margin: 0px;
          min-width: 0px;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
  .hide {
    display: none;
  }
  .error {
    border-color: ${({ theme }) => theme.errorColor} !important;
  }
`;
export const NetworkWithFeeModal = styled(Modal)`
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
        display: flex;
        justify-content: space-between;
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
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .arrived-time {
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.slateGrayColor};
        }
        .fee {
          font-size: 14px;
          line-height: 20px;
          color: ${({ theme }) => theme.slateGrayColor};
        }
        .value {
          color: ${({ theme }) => theme.background};
        }
      }
    }
  }
`;
export const StyledWithdrawAmount = styled(StyledSelect)`
  margin-top: 1rem;
  &[data-type='hide'] {
    display: none;
  }
  .select--label {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.slateGrayColor};
    .right {
      margin: 4px 0px 0px;
      min-width: 0px;
      font-size: 14px;
      line-height: 16px;
      padding-bottom: 4px;
      display: flex;
      .right-value {
        margin-right: 8px;
      }
    }
  }
  .input-area {
    min-width: 0px;
    display: inline-flex;
    position: relative;
    -webkit-box-align: center;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    width: 100%;
    height: 48px;
    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
    .input-amount {
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
    .input-suffix {
      flex-shrink: 0;
      margin-left: 4px;
      margin-right: 4px;
      font-size: 14px;
      &--wrapper {
        margin: 0px 12px 0px 0px;
        min-width: 0px;
        display: flex;
        font-size: 14px;
        line-height: 20px;
        -webkit-box-align: center;
        align-items: center;
        .max {
          cursor: pointer;
          color: ${({ theme }) => theme.primary};
        }
        .separate {
          margin: 0px 12px;
          min-width: 0px;
          width: 1px;
          height: 16px;
          background-color: ${({ theme }) => theme.matteWhiteColor};
        }
        .coin-name {
          margin: 0px;
          min-width: 0px;
          color: ${({ theme }) => theme.slateGrayColor};
        }
      }
    }
  }
  .error {
    border-color: ${({ theme }) => theme.errorColor} !important;
  }
`;
export const StyledWithdrawSubmit = styled.div`
  margin: 24px 0px 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  &[data-type='hide'] {
    display: none;
  }
  @media screen and (min-width: 767px) {
    margin-top: 32px;
    flex-direction: row;
  }
  .left {
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
  .right {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    flex: 1 1 0%;
    width: 100%;
    @media screen and (min-width: 767px) {
      width: auto;
    }
    .content-wrapper {
      margin: 0px;
      min-width: 0px;
      display: flex;
      width: 100%;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      flex-direction: column;
      @media screen and (min-width: 767px) {
        flex-direction: row;
      }
      .amount-counted {
        margin: 0px;
        min-width: 0px;
        display: flex;
        width: 100%;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        .receive-amount {
          margin: 0px;
          min-width: 0px;
          font-weight: 600;
          font-size: 28px;
          line-height: 36px;
          color: ${({ theme }) => theme.body};
        }
        .fee-amount {
          margin: 0px;
          min-width: 0px;
          font-size: 14px;
          color: ${({ theme }) => theme.darkBrightGrayColor};
          line-height: 20px;
        }
      }
      .submit-btn {
        margin: 12px 0px 0px;
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
        padding: 12px 24px;
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
        width: 100%;
        @media screen and (min-width: 767px) {
          width: auto;
          margin-top: 0px;
        }
      }
      .disable {
        background-color: ${({ theme }) => theme.matteWhiteColor};
        color: ${({ theme }) => theme.colorDescription};
        cursor: not-allowed;
      }
    }
  }
`;
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
`;
export const StyledAddressBookModal = styled(Modal)``;
export const StyledSubmitModal = styled(Modal)`
  text-align: center;
  .transition-detail {
    font-size: 16px;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    padding: 2rem;
    text-align: left;
    .title {
      color: ${({ theme }) => theme.slateGrayColor};
    }
    margin-bottom: 2rem;
  }
  .submit-btn {
    margin: 12px 0px 0px;
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
    padding: 12px 24px;
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
    width: 100%;
    @media screen and (min-width: 767px) {
      width: auto;
      margin-top: 0px;
    }
  }
  .disable {
    background-color: ${({ theme }) => theme.matteWhiteColor};
    color: ${({ theme }) => theme.colorDescription};
    cursor: not-allowed;
  }
  .icon-coin {
    border-radius: 50%;
    margin-right: 4px;
  }
`;
