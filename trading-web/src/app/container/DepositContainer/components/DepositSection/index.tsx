/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyledSelect,
  CoinModal,
  NetworkModal,
  AddressSection,
  StyledWalletAddress,
  StyledQRTooltip,
  StyledNoticed,
} from './style';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import IconSvg from 'app/assets/img/icon';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDepositCryptoSlice } from './slice';
import { selectDepositCrypto } from './slice/selectors';
import { isEmpty } from 'app/components/common/common';
import QRCode from 'react-qr-code';

const DepositSection = () => {
  const { t } = useTranslation();
  const [isCoinModalVisible, setIsCoinModalVisible] = useState(false);
  const [isNetworkModalVisible, setIsNetworkModalVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork]: any = useState({});
  const [isNotice, setIsNotice] = useState(false);
  const { selectedCoin, networksList, coinList, selectedWallet }: any =
    useSelector(selectDepositCrypto);
  const { currency } = useParams();
  const dispatch = useDispatch();
  const { actions } = useDepositCryptoSlice();
  useEffect(() => {
    dispatch(actions.getCoinRequest(currency));
  }, []);
  useEffect(() => {
    if (!isEmpty(selectedCoin)) {
      dispatch(actions.getNetworkRequest(selectedCoin?.id));
    }
  }, [selectedCoin]);
  const showCoinModal = () => {
    setIsCoinModalVisible(true);
    dispatch(actions.getListCoinRequest({ whitelist: 1 }));
  };
  const handleCoinModalCancel = () => {
    setIsCoinModalVisible(false);
  };
  const showNetworkModal = () => {
    setIsNetworkModalVisible(true);
  };
  const handleNetworkModalCancel = () => {
    setIsNetworkModalVisible(false);
  };
  const handleSelectNetwork = (network: any) => {
    setSelectedNetwork(network);
    setIsNetworkModalVisible(false);
    dispatch(
      actions.getWalletRequest({
        token_id: selectedCoin?.id,
        network_id: network?.networkId,
      }),
    );
  };
  const handleSelectCoin = (coin: any) => {
    dispatch(actions.getCoinSuccess(coin));
    setIsCoinModalVisible(false);
    setSelectedNetwork({});
  };
  const handleSearchCoin = (value: string) => {
    console.log(value);
    dispatch(actions.getListCoinRequest({ name: value }));
  };
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet);
  };
  return (
    <>
      <div>
        <StyledSelect>
          <div className="select-title">{t('select-coin')}</div>
          <div className="select">
            <div className="select--label">{t('coin')}</div>
            <div className="select--input" onClick={showCoinModal}>
              <div className="selected--wrapper">
                <div className="selected">
                  <img
                    src={selectedCoin?.icon}
                    width="24"
                    height="24"
                    alt="icon"
                  />
                  <div className="selected-information">
                    <span className="selected-name">
                      {selectedCoin?.assetName}
                    </span>
                    <span className="selected-desc">{selectedCoin?.note}</span>
                  </div>
                </div>
              </div>
              <UpDownIcon name="down" className="down-icon" />
            </div>
          </div>
        </StyledSelect>
        <StyledSelect data-type="network">
          <div className="select-title">{t('deposit-to')}</div>
          <div className="select">
            <div className="select--label">{t('network')}</div>
            <div className="select--input" onClick={showNetworkModal}>
              <div className="selected--wrapper">
                <div className="selected">
                  <div className="selected-information">
                    {!isEmpty(selectedNetwork) ? (
                      <>
                        <span className="selected-name">
                          {selectedNetwork?.symbolName}
                        </span>
                        <span className="selected-desc">
                          {selectedNetwork?.networkName}
                        </span>
                      </>
                    ) : (
                      <span className="selected-desc">
                        {t('select-network')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <UpDownIcon name="down" className="down-icon" />
            </div>
            {!isEmpty(selectedNetwork) && !isNotice ? (
              <StyledNoticed>
                <div className="wrapper">
                  <div className="notice-content">
                    <div className="notice-message">
                      {t('no')} {selectedNetwork?.networkName}{' '}
                      {t('deposit-addresses-have-been')}
                    </div>
                    <button
                      id="crypto_deposit_get_address"
                      className="get-address-btn"
                      onClick={() => {
                        setIsNotice(true);
                      }}
                    >
                      {t('get-address')}
                    </button>
                  </div>
                </div>
              </StyledNoticed>
            ) : !isEmpty(selectedNetwork) && isNotice ? (
              <AddressSection>
                <div className="address-section">
                  <div className="content-item">
                    <div className="address-wallet">
                      <div className="address-title">{t('address')}</div>
                      <StyledWalletAddress>
                        <div className="address-wrapper">
                          <div>{selectedWallet}</div>
                          <Tooltip title="Click to copy" color="#707a8a">
                            <div
                              className="copy-icon"
                              onClick={() => handleCopyAddress()}
                            >
                              <IconSvg name="copy" />
                            </div>
                          </Tooltip>
                          <Tooltip
                            title={
                              <QRTooltip
                                value={selectedWallet}
                                coinname={selectedCoin?.assetName}
                                networkname={selectedNetwork?.symbolName}
                              />
                            }
                            color="#eaecef"
                          >
                            <div className="qr-icon">
                              <IconSvg name="QR" />
                            </div>
                          </Tooltip>
                        </div>
                      </StyledWalletAddress>
                    </div>
                  </div>
                  <div className="content-item"></div>
                </div>
                <div className="note">
                  <ul>
                    <li>
                      {t('send-only')}{' '}
                      <span className="note-coin-name">
                        {selectedCoin?.assetName}{' '}
                      </span>
                      {t('to-this-deposit-address')}
                    </li>
                    <li>
                      {t('ensure-the-network')}{' '}
                      <span className="note-network-name">
                        {selectedNetwork?.symbolName}
                      </span>
                      .
                    </li>
                  </ul>
                </div>
              </AddressSection>
            ) : (
              ''
            )}
          </div>
        </StyledSelect>
        <CoinModal
          title="Select coin to deposit"
          visible={isCoinModalVisible}
          onCancel={handleCoinModalCancel}
          footer={null}
        >
          <div className="search-coin">
            <div className="search-icon">
              <IconSvg name="search" className="icon-search" />
            </div>
            <input
              placeholder="Search coin name"
              className="search-input"
              // value=""
              onChange={e => handleSearchCoin(e.target.value)}
            ></input>
          </div>
          <div className="coin-list">
            {coinList.map((coin: any, index: number) => (
              <div
                className="coin-item"
                key={index}
                onClick={() => handleSelectCoin(coin)}
              >
                <div className="coin-item--wrapper">
                  <img src={coin.icon} alt="Icon" className="coin-item--icon" />
                  <div className="coin-item--information">
                    <span className="coin-name">{coin.assetName}</span>
                    <div className="coin-note">{coin.note}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CoinModal>
        <NetworkModal
          title="Select network"
          visible={isNetworkModalVisible}
          onCancel={handleNetworkModalCancel}
          footer={null}
        >
          <div className="content-header">
            {t('endsure-the-network-you-choose')}
          </div>
          <div className="network-list">
            {networksList.map((item: any, index: number) => (
              <div
                className="network-item"
                key={index}
                onClick={() => handleSelectNetwork(item)}
              >
                <div className="network-item--wrapper">
                  <span className="network-item--symbol">
                    {item.symbolName}
                  </span>
                  <div className="network-item--network">
                    {item.networkName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NetworkModal>
      </div>
    </>
  );
};

const QRTooltip = ({ value, coinname, networkname }) => {
  const { t } = useTranslation();
  return (
    <StyledQRTooltip>
      <div className="guide">{t('scan-the-code')}</div>
      <div className="qr-code">
        <QRCode value={value} size={160} />
      </div>
      <div className="note">
        <ul>
          <li>
            {t('send-only')} <span className="note-coin-name">{coinname} </span>
            {t('to-this-deposit-address')}
          </li>
          <li>
            {t('ensure-the-network')}{' '}
            <span className="note-network-name">{networkname}</span>.
          </li>
        </ul>
      </div>
    </StyledQRTooltip>
  );
};
export default DepositSection;
