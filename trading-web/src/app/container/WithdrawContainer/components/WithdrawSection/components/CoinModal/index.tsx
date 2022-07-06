import { CoinModal } from '../../style';
import IconSvg from 'app/assets/img/icon';

const ModalSelectCoin = ({
  isCoinModalVisible,
  handleCoinModalCancel,
  coinList,
  handleSearchCoin,
  handleSelectCoin,
}) => {
  return (
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
  );
};
export default ModalSelectCoin;
