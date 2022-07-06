import styled from 'styled-components';
export const Container = styled.div`
  box-sizing: border-box;
  margin: 0px 0px 0px 8px;
  min-width: 0px;
  float: right;
  /* position: fixed; */
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  box-shadow: none;
  height: 88vh;

  display: inline-block;
  @media screen and (min-width: 767px) {
    /* position: static; */
    /* width: 382px; */
    height: 88vh;
    margin-bottom: 80px;
    display: inline-block;
    box-shadow: rgb(0 0 0 / 8%) -2px 2px 4px;
  }
  @media screen and (min-width: 1023px) {
    /* position: static; */
    /* width: 382px; */
    height: 88vh;
    margin-bottom: 80px;
    box-shadow: none;
  }
  .wrapper {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    filter: drop-shadow(rgba(24, 26, 32, 0.1) 0px 0px 1px)
      drop-shadow(rgba(71, 77, 87, 0.04) 0px 3px 6px)
      drop-shadow(rgba(24, 26, 32, 0.04) 0px 1px 2px);
    flex-direction: column;
    height: 100%;
  }
  .ant-upload-select {
    padding: 0 !important;
  }
  .upload-btn {
    font-size: 20px;
    margin: 0 8px;
    color: ${({ theme }) => theme.graySmokeColor};
    transition: all 0.25s linear;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
export const ChatHeader = styled.div`
  box-sizing: border-box;
  height: 132px;
  background: ${({ theme }) => theme.whiteSmokeColor};
  position: relative;
  border-radius: 8px 8px 0px 0px;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding: 20px 17px 16px;
  width: 100%;
  flex-direction: column;
  z-index: 99;
  .ant-avatar {
    background-color: ${({ theme }) => theme.primary};
  }
  .partner-infomation {
    margin: 0px;
    min-width: 0px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    .item {
      margin: 0px;
      min-width: 0px;
      display: flex;
      cursor: pointer;
      .item-wrapper {
        box-sizing: border-box;
        margin: 0px 0px 0px 10px;
        min-width: 0px;
        display: flex;
        flex-direction: column;
        .name {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: ${({ theme }) => theme.body};
        }
        .subname {
          margin: 0px;
          min-width: 0px;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          color: ${({ theme }) => theme.body};
        }
      }
    }
  }
  .partner-desc {
    margin: 10px 0px 0px 50px;
    min-width: 0px;
    display: flex;
    .item {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
      .item-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: ${({ theme }) => theme.slateGrayColor};
      }
      .item-value {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.body};
      }
    }
  }
`;
export const ChatMessage = styled.div`
  cursor: default;
  background: ${({ theme }) => theme.text};
  overflow: auto;
  flex: 1 1 0%;
  padding: 16px 0;
  /* flex: 1; */
  height: 80%;
  .ant-upload-drag {
    background: transparent;
    border: none;
    width: 100%;
    overflow: hidden;
    .ant-upload-btn {
      padding: 0;
      .ant-upload-drag-container {
        /* display: flex; */
        /* flex-direction: column; */
        /* flex: 1; */
        overflow: hidden;
        cursor: default;
        #message {
          overflow: auto;
          height: 100%;
          flex: 1;
          display: flex;
          border-radius: 8px;
          flex-direction: column-reverse;
          padding: 1rem;
          text-align: start;
          .patient {
            border-radius: 8px;
            margin-bottom: 8px;
            max-width: 80%;
            display: flex;
            justify-content: space-between;
            .avt {
              width: 24px;
            }
            .msg {
              flex: 1;
              margin-left: 4px;
              .text {
                display: inline-block;
                border: 1px solid ${({ theme }) => theme.brightGreenColor};
                background-color: ${({ theme }) => theme.brightGreenColor};
                padding: 4px;
                border-radius: 8px;
                max-width: 80%;
              }
              .img-wrapper {
                max-width: 80%;
                text-align: start;
                .ant-image {
                  max-width: 50%;
                  margin: 4px;
                }
              }
            }
          }
          .mine {
            display: flex;
            justify-content: end;
            margin-bottom: 8px;
            .avt {
              width: 24px;
            }
            .msg {
              text-align: end;
              flex: 1;
              margin-right: 4px;
              .text {
                display: inline-block;
                border: 1px solid ${({ theme }) => theme.darkPinkColor};
                background-color: ${({ theme }) => theme.darkPinkColor};
                padding: 4px;
                border-radius: 8px;
                max-width: 80%;
              }
              .img-wrapper {
                max-width: 80%;
                text-align: end;
                display: inline-block;
                .ant-image {
                  max-width: 50%;
                  margin: 4px;
                }
              }
            }
          }
          .time {
            font-size: 10px;
            font-weight: 400;
            color: ${({ theme }) => theme.slateGrayColor};
          }
        }
      }
    }
  }
`;
export const ChatFooter = styled.div`
  align-items: center;
  padding: 8px 12px;
  background: ${({ theme }) => theme.text};
  border-radius: 0px 0px 8px 8px;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding-bottom: 65px;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.brightGrayColor};
  @media screen and (min-width: 767px) {
    padding-bottom: 8px;
  }
  & > span {
    width: 100%;
  }
  .ant-upload-drag {
    border: none;
    overflow: hidden;
    .ant-upload-btn {
      padding: 0;
      .ant-upload-drag-container {
        overflow: hidden;
        cursor: default;
        width: 100%;
        .group {
          display: flex;
          padding-top: 8px;
          height: 36px;
          .inputgroup {
            flex: 1;
            display: flex;
          }
          .inputfield {
            flex: 1;
            border-radius: 5px;
            z-index: 99;
            border: 1px solid ${props => props.theme.slateGrayColor};
            outline: none;
            padding: 2px 5px;
            transition: all 0.25s linear;
            &:hover,
            &:focus {
              border-color: ${({ theme }) => theme.primary};
            }
          }
          .send-btn {
            border-radius: 8px;
            cursor: pointer;
            svg {
              font-size: 20px;
              color: ${props => props.theme.graySmokeColor};
              transition: all 0.25s linear;
              &:hover {
                color: ${({ theme }) => theme.primary};
              }
            }
          }
        }
        .image-preview {
          .ant-upload-picture-card-wrapper {
            /* height: 64px; */
            .ant-upload-list-picture-card {
              /* height: 64px; */
              .ant-upload-list-picture-card-container {
                height: 64px;
                width: auto;
              }
            }
          }
        }
      }
    }
  }
`;
