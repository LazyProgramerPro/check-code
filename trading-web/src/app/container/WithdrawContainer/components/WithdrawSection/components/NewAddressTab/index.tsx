import { StyledTabPane, ErrorMessage } from '../../style';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'app/components/common/common';
import numeral from 'numeral';
import UpDownIcon from 'app/assets/img/UpDownIcon';

const TabNewAddress = ({
  showNetworkFeeModal,
  selectedNetwork,
  inputAddress,
  selectedCoin,
  coinBalance,
  feeTransfer,
  register,
  errors,
}) => {
  const { t } = useTranslation();
  return (
    <StyledTabPane className="select">
      <div>
        <div
          className={
            errors.address?.message ? 'input-address error' : 'input-address'
          }
        >
          <div className="address-label">{t('address')}</div>
          <input
            className="input-field"
            placeholder="Enter address here"
            {...register('address', {
              required: "Please enter Recipient's Address",
              // onChange: e => handleChangeAddress(e.target.value),
            })}
          ></input>
        </div>
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
      </div>
      <div>
        <div className="select--label">{t('network')}</div>
        <div className="select--input" onClick={showNetworkFeeModal}>
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
                  <span className="selected-desc">{t('select-network')}</span>
                )}
              </div>
            </div>
          </div>
          <UpDownIcon name="down" className="down-icon" />
        </div>
        <div
          className={
            inputAddress === '' || isEmpty(selectedNetwork)
              ? 'withdraw-detail'
              : 'withdraw-detail  hide'
          }
        >
          <div className="withdraw-detail--row">
            <div className="detail-item">
              <div className="detail-item--label">
                {selectedCoin?.assetName} {t('spot-balance')}
              </div>
              <div className="detail-item--value">
                {coinBalance} {selectedCoin?.assetName}
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-item--label">
                {t('minimum-withdrawal')}
              </div>
              <div className="detail-item--value">
                {numeral(feeTransfer?.min).format('0,0.00')}{' '}
                {selectedCoin?.assetName}
              </div>
            </div>
          </div>
          <div className="withdraw-detail--row">
            <div className="detail-item">
              <div className="detail-item--label">{t('network-fee')}</div>
              <div className="detail-item--value">
                {numeral(feeTransfer?.estimate_fee).format('0,0.00')}{' '}
                {selectedCoin?.assetName}
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-item--label">{t('remaining limit')}</div>
              <div className="detail-item--value">
                8,000.00 BUSD/8,000.00 BUSD
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledTabPane>
  );
};
export default TabNewAddress;
