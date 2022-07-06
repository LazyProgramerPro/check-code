import { NetworkWithFeeModal } from '../../style';
import { useTranslation } from 'react-i18next';
const ModalSelectNetworkWithFee = ({
  isNetworkFeeModalVisible,
  handleNetworkFeeModalCancel,
  networksList,
  handleSelectNetwork,
  selectedCoin,
}) => {
  const { t } = useTranslation();
  return (
    <NetworkWithFeeModal
      title={t('select-network')}
      visible={isNetworkFeeModalVisible}
      onCancel={handleNetworkFeeModalCancel}
      footer={null}
    >
      <div className="content-header">{t('ensure-network-withdraw')}</div>
      <div className="network-list">
        {networksList.map((item: any, index: number) => (
          <div
            className="network-item"
            key={index}
            onClick={() => handleSelectNetwork(item)}
          >
            <div className="network-item--wrapper">
              <div className="left">
                <span className="network-item--symbol">{item.symbolName}</span>
                <div className="network-item--network">{item.networkName}</div>
              </div>
              <div className="right">
                <div className="arrived-time">
                  {t('arrival-time')} <span className="value">≈ 5 mins</span>
                </div>
                <div className="fee">
                  {t('fee')}{' '}
                  <span className="value">
                    0.0000047 {selectedCoin?.assetName} ( ≈ $0.193026)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NetworkWithFeeModal>
  );
};
export default ModalSelectNetworkWithFee;
