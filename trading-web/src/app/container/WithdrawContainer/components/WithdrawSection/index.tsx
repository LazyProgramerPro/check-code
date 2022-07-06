/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyledSelect,
  StyledTabs,
  StyledWithdrawAmount,
  StyledWithdrawSubmit,
  ErrorMessage,
} from './style';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWithdrawCryptoSlice } from './slice';
import { selectWithdrawCrypto } from './slice/selectors';
import { isEmpty } from 'app/components/common/common';
import { Tabs } from 'antd';
import ModalSelectCoin from './components/CoinModal';
import ModalSelectNetworkWithFee from './components/NetworkWithFeeModal';
import TabNewAddress from './components/NewAddressTab';
import TabArressBook from './components/AddressBookTab';
import ModalSelectAddressBook from './components/AddressBookModal';
import ModalSubmit from './components/SubmitModal';
import { useForm } from 'react-hook-form';
const WithdrawSection = () => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const [isCoinModalVisible, setIsCoinModalVisible] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const wallet_type = 1;
  const { currency } = useParams();
  const dispatch = useDispatch();
  const [isNetworkFeeModalVisible, setIsNetworkFeeModalVisible] =
    useState(false);
  const [isAddressBookModalVisible, setIsAddressBookModalVisible] =
    useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork]: any = useState({});
  const {
    selectedCoin,
    networksList,
    coinList,
    feeTransfer,
    coinBalance,
  }: any = useSelector(selectWithdrawCrypto);
  const { actions } = useWithdrawCryptoSlice();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const withdrawAmount = getValues('amount');
  const inputAddress = getValues('address');
  useEffect(() => {
    dispatch(actions.getCoinRequest(currency));
  }, []);
  useEffect(() => {
    if (!isEmpty(selectedCoin)) {
      dispatch(actions.getNetworkRequest(selectedCoin.id));
      dispatch(
        actions.getCoinBalanceRequest({
          wallet_type: wallet_type,
          token_id: selectedCoin.id,
        }),
      );
    }
  }, [selectedCoin]);
  const showCoinModal = () => {
    setIsCoinModalVisible(true);
    dispatch(actions.getListCoinRequest({ whitelist: 1 }));
  };
  const handleCoinModalCancel = () => {
    setIsCoinModalVisible(false);
  };
  const showNetworkFeeModal = () => {
    setIsNetworkFeeModalVisible(true);
  };
  const handleNetworkFeeModalCancel = () => {
    setIsNetworkFeeModalVisible(false);
  };
  const showAddressBookModal = () => {
    setIsAddressBookModalVisible(true);
  };
  const handleAddressBookModalCancel = () => {
    setIsAddressBookModalVisible(false);
  };
  const showSubmitModal = () => {
    setIsSubmitModalVisible(true);
  };
  const handleSubmitModalCancel = () => {
    setIsSubmitModalVisible(false);
  };
  const handleSelectNetwork = (network: any) => {
    setSelectedNetwork(network);
    setIsNetworkFeeModalVisible(false);
    dispatch(
      actions.getFeeTransferRequest({
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
  const handlesetMax = coinBalance => {
    setValue('amount', coinBalance, { shouldValidate: true });
    setReceiveAmount(
      parseFloat(coinBalance) - parseFloat(feeTransfer?.estimate_fee),
    );
  };
  const onSubmit = data => {
    dispatch(
      actions.withdrawRequest({
        token_id: selectedCoin?.id,
        network_id: selectedNetwork?.networkId,
        address: data?.address,
        amount: data?.amount,
      }),
    );
  };
  return (
    <>
      <form>
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
          <div className="select-title">{t('withdraw-to')}</div>
          <StyledTabs defaultActiveKey="1" type="card">
            <TabPane tab="New Address" key="1">
              <TabNewAddress
                showNetworkFeeModal={showNetworkFeeModal}
                selectedNetwork={selectedNetwork}
                inputAddress={inputAddress}
                selectedCoin={selectedCoin}
                coinBalance={coinBalance}
                feeTransfer={feeTransfer}
                register={register}
                errors={errors}
              />
            </TabPane>
            <TabPane tab="Address Book" key="2">
              <TabArressBook
                showAddressBookModal={showAddressBookModal}
                selectedNetwork={selectedNetwork}
                inputAddress={inputAddress}
                selectedCoin={selectedCoin}
                coinBalance={coinBalance}
                feeTransfer={feeTransfer}
              />
            </TabPane>
          </StyledTabs>
        </StyledSelect>
        <StyledWithdrawAmount
          data-type={
            inputAddress === '' || isEmpty(selectedNetwork) ? 'hide' : ''
          }
        >
          <div className="select-title">{t('withdraw-amount')}</div>
          <div className="select">
            <div className="select--label">
              <div>{t('amount')}</div>
              <div className="right">
                <div className="right-value">8,000.00 BUSD/8,000.00 BUSD</div>
                <div className="css-rxpm2l">{t('remaining limit')}</div>
              </div>
            </div>
            <div
              className={
                errors.amount?.message ? 'input-area error' : 'input-area'
              }
            >
              <input
                className="input-amount"
                type="number"
                placeholder="Minimum 0.01"
                step={0.00001}
                {...register('amount', {
                  required: 'Please enter an amount',
                  max: {
                    value: coinBalance,
                    message: `Maximum ${coinBalance}`,
                  },
                  onChange: value =>
                    setReceiveAmount(
                      parseFloat(value.target.value) -
                        parseFloat(feeTransfer?.estimate_fee),
                    ),
                })}
              />
              <div className="input-suffix">
                <div className="input-suffix--wrapper">
                  <div
                    className="max"
                    onClick={() => handlesetMax(coinBalance)}
                  >
                    MAX
                  </div>
                  <div className="separate"></div>
                  <div className="coin-name">{selectedCoin?.assetName}</div>
                </div>
              </div>
            </div>
            <ErrorMessage>{errors.amount?.message}</ErrorMessage>
          </div>
        </StyledWithdrawAmount>
        <StyledWithdrawSubmit
          data-type={
            inputAddress === '' || isEmpty(selectedNetwork) ? 'hide' : ''
          }
        >
          <div className="left">{t('receive-amount')}</div>
          <div className="right">
            <div className="content-wrapper">
              <div className="amount-counted">
                <div>
                  <div className="receive-amount">
                    {isNaN(
                      parseFloat(withdrawAmount) -
                        parseFloat(feeTransfer?.estimate_fee),
                    )
                      ? 0
                      : receiveAmount}{' '}
                    {selectedCoin?.assetName}
                  </div>
                  <div className="fee-amount">
                    {numeral(feeTransfer?.estimate_fee).format('0,0.00')}{' '}
                    {selectedCoin?.assetName} {t('network-fee-included')}
                  </div>
                </div>
              </div>
              <button
                className={
                  receiveAmount > 0 && isEmpty(errors)
                    ? 'submit-btn'
                    : 'submit-btn disable'
                }
                disabled={receiveAmount > 0 && isEmpty(errors) ? false : true}
                type="button"
                onClick={() => showSubmitModal()}
              >
                {t('withdraw')}
              </button>
            </div>
          </div>
        </StyledWithdrawSubmit>
        <ModalSubmit
          submitForm={handleSubmit(onSubmit)}
          handleSubmitModalCancel={handleSubmitModalCancel}
          isSubmitModalVisible={isSubmitModalVisible}
          receiveAmount={receiveAmount}
          coinName={selectedCoin?.assetName}
          fee={feeTransfer?.estimate_fee}
          address={inputAddress}
          networkName={selectedNetwork?.networkName}
          icon={selectedCoin?.icon}
        />
      </form>
      <ModalSelectCoin
        isCoinModalVisible={isCoinModalVisible}
        handleCoinModalCancel={handleCoinModalCancel}
        coinList={coinList}
        handleSearchCoin={handleSearchCoin}
        handleSelectCoin={handleSelectCoin}
      />
      <ModalSelectNetworkWithFee
        isNetworkFeeModalVisible={isNetworkFeeModalVisible}
        handleNetworkFeeModalCancel={handleNetworkFeeModalCancel}
        networksList={networksList}
        handleSelectNetwork={handleSelectNetwork}
        selectedCoin={selectedCoin}
      />
      <ModalSelectAddressBook
        handleAddressBookModalCancel={handleAddressBookModalCancel}
        isAddressBookModalVisible={isAddressBookModalVisible}
      />
    </>
  );
};
export default WithdrawSection;
