import {
  Title,
  GroupButton,
  DepositButton,
  NormalButton,
  WalletDirect,
  ModalTransfer,
  ModalAuthenticator,
} from './style';
import IconSvg from 'app/assets/img/icon';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import openNotification from 'app/components/NotificationAntd';
import FormTransfer from 'app/components/FormTransfer';
import FormAuthenticator from 'app/components/FormAuthenticator';
import { P2PWalletServices } from 'services/p2pWalletService';

const FiatSpotHeader = ({ reload }) => {
  const { t } = useTranslation();
  const [showModalTransfer, setShowModalTransfer] = useState(false);
  const [showModalAuthen, setShowModalAuthen] = useState(false);
  const [amountTransfer, setAmountTransfer] = useState(0);
  const [tokenIdTransfer, setTokenIdTransfer] = useState(0);
  const { transferP2pToSpot } = P2PWalletServices;

  const finishFormTransfer = (amount, tokenId) => {
    setAmountTransfer(amount);
    setShowModalAuthen(true);
    setTokenIdTransfer(tokenId);
  };

  const finishFormAuthen = () => {
    transferP2pToSpot({
      tokenId: tokenIdTransfer,
      amount: amountTransfer,
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Success', 'Transferred');
          setShowModalAuthen(false);
          setShowModalTransfer(false);
          reload();
        } else openNotification('Error', res.data.rd);
      })
      .catch(() => openNotification('Error', 'Something went wrong!'));
  };
  return (
    <div className="d-flex justify-content-between py-5 align-items-center position-relative">
      <Title>P2P {t('wallet')}</Title>
      <GroupButton>
        <div className="d-flex ">
          <DepositButton>
            <button>{t('deposit')}</button>
          </DepositButton>
          <NormalButton href="#" id="spotAccount_top_withdrawal">
            <button data-bn-type="button" className=" css-sl95de">
              {t('withdraw')}
            </button>
          </NormalButton>
          <NormalButton
            href="#"
            rel="noopener noreferrer"
            id="spotAccount_top_pay"
          >
            <button>{t('pay')}</button>
          </NormalButton>
          <NormalButton
            id="spotAccount_top_transfer"
            onClick={() => setShowModalTransfer(true)}
          >
            <button>{t('transfer')}</button>
          </NormalButton>
          <NormalButton href="#">
            <button>{t('history')}</button>
          </NormalButton>
          <WalletDirect>
            <NormalButton
              id="spotAccount_top_wallet_direct"
              href="/en/wallet-direct"
              target="_blank"
              className="css-cyve3b"
            >
              <button>
                <IconSvg name="wallet" />
                {t('wallet-direct')}
              </button>
            </NormalButton>
            <div className="bn-tooltip-box">
              <div data-bn-type="text" className="css-1kv8tk2">
                {t('wallet-direct-tooltip')}
              </div>
              <div
                className="bn-tooltip-arrow css-1u9esp9"
                data-popper-arrow="true"
              ></div>
              <i className="gap-fill"></i>
            </div>
          </WalletDirect>
        </div>
      </GroupButton>

      <ModalTransfer
        centered
        show={showModalTransfer}
        onHide={() => setShowModalTransfer(false)}
      >
        <ModalTransfer.Header closeButton>
          <span>Transfer</span>
        </ModalTransfer.Header>
        <ModalTransfer.Body>
          <FormTransfer finishForm={finishFormTransfer} />
        </ModalTransfer.Body>
      </ModalTransfer>

      <ModalAuthenticator
        centered
        show={showModalAuthen}
        onHide={() => setShowModalAuthen(false)}
      >
        <ModalAuthenticator.Header closeButton>
          Google Authenticator
        </ModalAuthenticator.Header>
        <ModalAuthenticator.Body>
          <FormAuthenticator finishForm={finishFormAuthen} />
        </ModalAuthenticator.Body>
      </ModalAuthenticator>
    </div>
  );
};
export default FiatSpotHeader;
