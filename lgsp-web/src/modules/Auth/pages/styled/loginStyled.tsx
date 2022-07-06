import styled from 'styled-components';
import src from '../../../../assets/images/bg-login.png';

const Styled = {
  Container: styled.div`
    padding: 0 15px;
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: #ff6060;
    padding-top: 60px;
    min-height: calc(100vh - 60px);
    background-size: cover;

    background-position: center;
    .has-error .ant-form-explain,
    .has-error .ant-form-split {
      // color: #fff;
    }
    .logo {
      position: absolute;
      top: 5%;
      left: 10%;
      img {
        height: 120px;
      }
      span {
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        padding-left: 20px;
      }
    }
    .loginContent {
      width: 400px;
      max-width: 100%;
      min-height: 250px;
      background-color: rgba(255, 255, 255, 0.53);
      padding: 32px 40px 0;
      // color: #fff;
      box-sizing: border-box;
      border-radius: 30px;
      .ant-form-item-label > label {
        color: #000000;
        font-size: 14px;
        font-weight: 400;
        &:before,
        &:after {
          /* display: none; */
        }
      }
      .title {
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        // color: #fff;
        text-transform: uppercase;
        text-align: center;
      }
    }
    input {
      height: 40px;
      border-radius: 50px;
      border: 0;
      outline: none;
      padding-left: 30px;
    }
    .ant-btn-primary {
      color: #fff;
      height: 40px;
      background-color: #043bff;
      border-color: #043bff;
      width: 140px;
      border-radius: 10px;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

      &:hover {
        background-color: #043bff;
        border-color: #043bff;
        font-size: 14px;
      }
      font-size: 14px;
      font-family: 'Roboto';
    }
    .remember-password {
      display: inline-flex;
      align-items: center
      span:last-child {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      .ant-checkbox-inner {
        width: 18px;
        height: 18px;
        border-radius: 5px;
      }
    }

    .forgot-password {
      font-size: 14px;
      color: #1a23ff;
      display: inline-block;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #043bff;
      border-color: #043bff;
      border-radius: 6px;
      width: 18px;
      height: 18px;
      &::after {
        top: 47%;
        left: 25%;
      }
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      background-color: #02a7f0;
      border-color: #02a7f0;
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: #02a7f0;
    }
  `,
};
export default Styled;
