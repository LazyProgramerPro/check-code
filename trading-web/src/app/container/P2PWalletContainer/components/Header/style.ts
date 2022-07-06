import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const Title = styled.div`
  margin: 0px;
  min-width: 0px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.background};
  @media screen and (min-width: 767px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  @media screen and (min-width: 1023px) {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }
`;
export const GroupButton = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
  padding-top: 16px;
  padding-bottom: 16px;
  @media screen and (min-width: 767px) {
    display: block;
    width: 100%;
    flex-direction: column;
    overflow: scroll;
  }
  @media screen and (min-width: 1023px) {
    display: flex;
    width: auto;
    flex-direction: row;
    overflow: auto;
  }
`;
export const DepositButton = styled.div`
  margin-right: 4px;
  button {
    margin: 0px;
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
    padding: 10px 16px;
    min-width: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.brightBlackColor};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.primary};
    padding-left: 12px;
    padding-right: 12px;
    @media screen and (min-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }
    &:hover {
      opacity: 0.9;
    }
  }
`;
export const NormalButton = styled.a`
  box-sizing: border-box;
  margin: 0px 8px;
  min-width: 0px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.primary};
  display: inline-block;
  text-decoration: none !important;
  background-color: transparent !important;
  button {
    margin: 0px;
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
    padding: 10px 12px;
    min-width: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.background};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    @media screen and (min-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }
    &:hover {
      box-shadow: none;
      background-image: none;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
    }
    .wallet-icon {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-size: 16px;
      fill: ${({ theme }) => theme.background};
      width: 1em;
      height: 1em;
    }
  }
`;
export const WalletDirect = styled.div`
  margin: 0px;
  &:hover {
    .bn-tooltip-box {
      opacity: 1;
      visibility: visible;
    }
  }
  .bn-tooltip-box {
    box-sizing: content-box;
    position: absolute;
    right: 10px;
    top: 110px;
    transition: opacity 120ms ease-in-out 0s, transform 120ms ease-in-out 0s;
    opacity: 0;
    visibility: hidden;
    margin: 0px;
    width: max-content;
    min-width: 0px;
    max-width: 296px;
    word-break: normal;
    z-index: 1400;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.darkGrayColor};
    border-radius: 4px;
    padding: 8px 12px;
    filter: drop-shadow(rgba(20, 21, 26, 0.08) 0px 3px 6px)
      drop-shadow(rgba(71, 77, 87, 0.08) 0px 7px 14px)
      drop-shadow(rgba(20, 21, 26, 0.1) 0px 0px 1px);
    .gap-fill {
      top: -8px;
      left: 0px;
      width: 100%;
      height: 8px;
    }
  }
  .bn-tooltip-arrow {
    position: absolute;
    right: 60px;
    top: -3px;
    width: 6px;
    height: 6px;
    &::before {
      content: '';
      display: block;
      transform: rotate(225deg);
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: ${({ theme }) => theme.darkGrayColor};
    }
  }
  .gap-fill {
    position: absolute;
  }
`;

export const ModalTransfer = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    span {
      font-size: 20px;
    }

    .btn-close {
      box-shadow: none;
    }
  }
`;
export const ModalAuthenticator = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  margin: 0 auto;

  .modal-header {
    border: none;
    h5 {
      margin: 0;
    }
    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding-top: 5px;
    p {
      margin: 2px 0;
    }

    .labelQRcode {
      margin-top: 20px;
      font-weight: bold;
    }

    .qrCode {
      display: block;
      margin: 0 auto;
      border: 1px solid ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 5px;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .ant-input {
      width: 100%;
      height: 50px;
      font-size: 30px;

      &:focus {
        box-shadow: none;
      }
    }

    .ant-row {
      margin-bottom: 0;
    }

    .linkSecurityUnavailable {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
      margin-top: 20px;
    }

    .btnSubmit {
      width: 100%;
      margin-top: 20px;
      height: 40px;
      font-weight: bold;
    }
  }

  //loading
  .loader,
  .loader:before,
  .loader:after {
    background: ${({ theme }) => theme.p2pBackground};
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 6px;
    height: 3px;
  }
  .loader {
    color: ${({ theme }) => theme.p2pBackground};
    text-indent: -9999em;
    margin: 0 auto;
    position: relative;
    font-size: 9px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    margin-top: 8px;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
`;
