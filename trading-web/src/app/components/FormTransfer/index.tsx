import { Button, InputNumber, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { RiCopperCoinFill, RiMoneyDollarBoxFill } from 'react-icons/ri';
import Select from 'react-select';
import styled from 'styled-components';
import { SpotWalletServices } from 'services/spotWalletService';
import { useLocation } from 'react-router-dom';

const FormTransfer = ({ finishForm }) => {
  const { Text } = Typography;
  const [validateText, setValidateText] = useState('');
  const [validateAmount, setValidateAmount] = useState('');
  const [amount, setAmount] = useState(0);

  const { getAllSpotWallet } = SpotWalletServices;

  const location = useLocation();

  const [optionCoins, setOptionCoins] = useState([]);
  const [available, setAvailable] = useState(0);
  const [inOrder, setInOrder] = useState(0);
  const [tokenId, setTokenId] = useState(0);

  const option1 = [{ value: 'spot', label: 'Spot and fiat' }];
  const option2 = [{ value: 'p2p', label: 'P2P' }];

  const handleChangeAmount = value => {
    console.log(value);
    if (value && value >= 0) {
      setAmount(value);
    } else {
      setAmount(0);
    }
    if (value > available && tokenId) {
      setValidateAmount('Transfer amount exceeds available balance.');
    } else setValidateAmount('');
  };

  const handleChangeCoin = value => {
    if (value) {
      setTokenId(value?.key?.tokenId);
      setAvailable(value?.key?.available);
      setInOrder(value?.key?.inOrder);
      if (value?.key?.available === 0) {
        setValidateText(
          'No amount available to transfer, please select another coin.',
        );
      } else {
        setValidateText('');
      }

      if (amount > value?.key?.available) {
        setValidateAmount('Transfer amount exceeds available balance.');
      } else setValidateAmount('');
    } else {
      setValidateText('');
      setAvailable(0);
      setInOrder(0);
      setTokenId(0);
    }
  };

  const findAllSpotWallet = () => {
    getAllSpotWallet().then(res => {
      if (res.data.rc === 0) {
        setOptionCoins(
          res.data.rows.map(token => ({
            value: token?.assetName,
            label: (
              <SelectOption>
                <img
                  src={token?.icon}
                  alt={token?.assetName}
                  className="imgCoin"
                />

                <span className="title">{token?.assetName}</span>
              </SelectOption>
            ),
            key: token,
          })),
        );
      }
    });
  };

  const findAllP2PWallet = () => {};

  const handleTransfer = () => {
    if (amount && tokenId) {
      finishForm(amount, tokenId);
    } else {
      if (!amount) {
        setValidateAmount('Please enter a valid amount');
      }
      if (!tokenId) {
        setValidateText('Please choose a valid coin');
      }
    }
  };

  useEffect(() => {
    findAllSpotWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <Text>Internal transfers are free on Byte Buffer</Text>
      <div className="selectWalletBlock">
        <div className="contentLeft">
          <Text>
            <RiCopperCoinFill className="coinIcon" /> From
          </Text>
          <AiOutlineArrowDown className="coinIcon arrowIcon" />
          <Text>
            <RiMoneyDollarBoxFill className="coinIcon" /> To
          </Text>
        </div>
        <div className="contentRight">
          {location?.pathname === '/wallet/spot' ? (
            <>
              <Select
                className="fromSelect"
                classNamePrefix="select"
                name="color"
                isSearchable
                defaultValue={option1[0]}
                options={option1}
              />
              <Select
                className="toSelect"
                classNamePrefix="select"
                name="color"
                isSearchable
                defaultValue={option2[0]}
                options={option2}
              />
            </>
          ) : (
            <>
              <Select
                className="toSelect"
                classNamePrefix="select"
                name="color"
                isSearchable
                defaultValue={option2[0]}
                options={option2}
              />
              <Select
                className="fromSelect"
                classNamePrefix="select"
                name="color"
                isSearchable
                defaultValue={option1[0]}
                options={option1}
              />
            </>
          )}
        </div>
      </div>
      <Text>Coin</Text>
      <Select
        className="coinSelect"
        classNamePrefix="select"
        name="color"
        isSearchable
        isClearable
        options={optionCoins}
        onChange={handleChangeCoin}
      />

      <Text className="validateAvaiCoin">{validateText}</Text>
      <div className="amount">
        <Text>Amount</Text>
        <Text>
          {available.toFixed(5)} available / {inOrder.toFixed(5)} in order
        </Text>
      </div>
      <InputNumber
        type="number"
        value={amount}
        onChange={handleChangeAmount}
        className="inputAmount"
      />
      <Text className="validateAmount">{validateAmount}</Text>

      <Button
        type="primary"
        className="btnConfirm"
        onClick={handleTransfer}
        disabled={!amount || !tokenId}
      >
        Confirm
      </Button>
    </Wrapper>
  );
};

export default FormTransfer;

const Wrapper = styled.div`
  .selectWalletBlock {
    margin-top: 20px;
    display: flex;
    background-color: ${({ theme }) => theme.whiteSmokeColor};
    padding: 12px;
    border-radius: 5px;
    margin-bottom: 40px;
  }

  .contentLeft {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.grayColor};
    width: 15%;
    justify-content: space-between;

    .ant-typography {
      padding: 9px 0;
    }
    .coinIcon {
      font-size: 22px;
      color: ${({ theme }) => theme.grayColor};
    }

    .arrowIcon {
      margin: 15px 0;
    }
  }

  .contentRight {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.p2pText};
    width: 85%;
    justify-content: space-between;
    margin-left: 20px;
  }
  .fromSelect {
    .select__control {
      background-color: inherit;
      border: none;
      box-shadow: none;
      cursor: pointer;

      &:focus {
        border: none;

        .select__value-container {
          border: none;
        }
      }
    }

    .select__indicator {
      color: ${({ theme }) => theme.grayColor};

      &-separator {
        display: none;
      }
    }

    .select {
      &__option {
        transition: all 0.25s linear;
        cursor: pointer;
      }

      &__option--is-selected {
        background-color: ${({ theme }) => theme.primaryBlur} !important;
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
      }

      &__option--is-focused {
        background-color: inherit;
      }
    }
  }

  .toSelect {
    .select__control {
      background-color: inherit;
      border: none;
      box-shadow: none;
      cursor: pointer;

      &:focus {
        border: none;

        .select__value-container {
          border: none;
        }
      }
    }

    .select__indicator {
      color: ${({ theme }) => theme.grayColor};

      &-separator {
        display: none;
      }
    }

    .select {
      &__option {
        transition: all 0.25s linear;
        cursor: pointer;
      }

      &__option--is-selected {
        background-color: ${({ theme }) => theme.primaryBlur} !important;
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
      }

      &__option--is-focused {
        background-color: inherit;
      }
    }
  }

  .coinSelect {
    margin-top: 10px;
    color: ${({ theme }) => theme.darkGrayColor};
    .select__control {
      padding: 3px 0;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      border: none;
      box-shadow: none;
      cursor: pointer;

      &:focus {
        border: none;

        .select__value-container {
          border: none;
        }
      }
    }

    .select__indicator {
      color: ${({ theme }) => theme.grayColor};

      &-separator {
        display: none;
      }
    }

    .select {
      &__option {
        transition: all 0.25s linear;
        cursor: pointer;
      }

      &__option--is-selected {
        background-color: ${({ theme }) => theme.primaryBlur} !important;
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
      }

      &__option--is-focused {
        background-color: inherit;
      }
    }
  }

  .validateAvaiCoin {
    display: block;
    color: ${({ theme }) => theme.redColor};
  }

  .amount {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .inputAmount {
    width: 100%;
    height: 40px;
    padding: 3px 2px;
    box-shadow: none;
    margin-top: 5px;

    .ant-input-number-handler-wrap {
      display: none;
    }
  }

  .validateAmount {
    color: ${({ theme }) => theme.redColor};
  }
  .btnConfirm {
    width: 100%;
    margin-top: 20px;
    height: 40px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const SelectOption = styled.div`
  display: flex;
  align-items: center;
  .imgCoin {
    height: 25px;
    width: 25px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;
