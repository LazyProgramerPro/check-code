import { Button, Input, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { tabOrderDetailService } from 'services/orderDetailService';
import { SpotWalletServices } from 'services/spotWalletService';
import styled from 'styled-components';

const FormAuthenticator = ({ finishForm }) => {
  const { getQRCode } = tabOrderDetailService;
  const { getValidateKey } = SpotWalletServices;
  const [loadingQRCode, setLoadingQRCode] = useState(false);
  const [loadingBtnSubmit, setLoadingBtnSubmit] = useState(false);
  const [validateCode, setValidateCode] = useState(false);

  const [qr, setQR] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleChangQRCode = e => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setValidateCode(false);
      setQrCode(e.target.value);
      console.log(e.target.value);
      if (e.target.value.length === 6) {
        handleSecurityCode({
          code: e.target.value,
        });
      }
    }
  };

  const handleSecurityCode = qrCode => {
    setLoadingBtnSubmit(true);
    getValidateKey(qrCode)
      .then(res => {
        if (res?.data) {
          finishForm();
        } else {
          setValidateCode(true);
        }
        setLoadingBtnSubmit(false);
      })
      .catch(() => setLoadingBtnSubmit(false));
  };
  const getCodeQRSecurity = () => {
    setLoadingQRCode(true);
    getQRCode().then(res => {
      if (res.status === 200) {
        setQR(res.data);
        setLoadingQRCode(false);
      }
    });
  };
  useEffect(() => {
    getCodeQRSecurity();
  }, []);

  return (
    <Wrapper>
      <p>To secure your account, please complete the following verification.</p>
      <p>
        You can also use{' '}
        <b>
          <u>ByteBuffer/Google Authenticator</u>
        </b>
      </p>
      <p className="labelQRcode">Your QR code here</p>
      {loadingQRCode ? (
        <div className="qrCode" style={{ height: 255, width: 255 }}></div>
      ) : (
        <QRCode value={qr} height="300" width="300" className="qrCode" />
      )}

      <Input value={qrCode} maxLength={6} onChange={handleChangQRCode} />
      {validateCode ? (
        <Typography.Text type="danger">
          Invalid verification code
        </Typography.Text>
      ) : (
        <span>Enter the 6 digit code</span>
      )}

      <p className="linkSecurityUnavailable">
        Security verification unavailable ?
      </p>
      <Button
        type="primary"
        className="btnSubmit"
        onClick={() =>
          handleSecurityCode({
            code: qrCode,
          })
        }
        disabled={loadingBtnSubmit}
      >
        {loadingBtnSubmit ? <div className="loader"></div> : 'Submit'}
      </Button>
    </Wrapper>
  );
};

export default FormAuthenticator;

const Wrapper = styled.div``;
