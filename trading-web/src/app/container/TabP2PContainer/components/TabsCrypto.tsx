import { Select } from 'antd';
import openNotification from 'app/components/NotificationAntd';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { tabP2PService } from 'services/tabP2PServices';
import styled from 'styled-components';
import { useTabP2PSlice } from '../slice';

function TabsCrypto() {
  const [searchParams] = useSearchParams();
  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();
  const [listCrypto, setListCrypto] = useState<any>([]);
  const { getListToken } = tabP2PService;

  const P2PSearchParams = Object.fromEntries(searchParams);
  const [currentCrypto, setCurrentCrypto] = useState(
    P2PSearchParams.crypto ? P2PSearchParams.crypto : listCrypto[0]?.assetName,
  );

  const { Option } = Select;

  const onClickButton = (name: string) => {
    if (name === currentCrypto) {
      return;
    }

    dispatch(actions.cryptoTabP2P(name));
  };

  const getListCrypto = () => {
    getListToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListCrypto(res.data.rows);
        } else openNotification('Error', res.data.rd);
      })

      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  const handleChangeSelect = value => {
    console.log(value);
    onClickButton(value);
  };

  useEffect(() => {
    setCurrentCrypto(P2PSearchParams.crypto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    getListCrypto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {listCrypto
        .filter(c => c.allowBuySell === 1)
        .map((c, i) => (
          <TabsCryptoButton
            className={
              currentCrypto === c.assetName ? 'TabsCryptoButton-active' : ''
            }
            key={i}
            onClick={() => {
              onClickButton(c.assetName);
            }}
          >
            {c.assetName}
          </TabsCryptoButton>
        ))}
      <div className="tabCryptoRes">
        <Select
          style={{ width: 120 }}
          onChange={handleChangeSelect}
          value={P2PSearchParams?.crypto}
        >
          {listCrypto
            .filter(c => c.allowBuySell === 1)
            .map((c, i) => (
              <Option
                key={i}
                value={c.assetName}
                onClick={() => {
                  onClickButton(c.assetName);
                }}
              >
                <img
                  src={c.icon}
                  alt=""
                  style={{
                    height: '15px',
                    marginRight: '10px',
                    marginBottom: '2px',
                  }}
                />
                {c.assetName}
              </Option>
            ))}
        </Select>
      </div>
    </Wrapper>
  );
}

export default TabsCrypto;

const Wrapper = styled.div`
  margin-left: 20px;
  height: 60px;
  .tabCryptoRes {
    display: none;
    margin-top: 13px;

    .ant-select-selector {
      box-shadow: none !important;
    }
  }

  @media only screen and (max-width: 735px) {
    .tabCryptoRes {
      display: block;
    }
  }
`;

const TabsCryptoButton = styled.button`
  height: 100% !important;
  background: transparent;
  color: ${({ theme }) => theme.body};
  border: 2px solid transparent;
  font-size: 14px;
  box-shadow: none;

  margin-right: 18px;
  min-width: 60px;

  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }

  &.TabsCryptoButton-active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }

  @media only screen and (max-width: 735px) {
    /* margin-right: 0px;
    border-left: 0;
    border-right: 0;
    padding: 1px 0; */
    /* height: 50% !important; */
    display: none;
  }
`;
