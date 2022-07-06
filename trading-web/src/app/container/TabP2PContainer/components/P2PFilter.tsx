import { Col, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTabP2PSlice } from '../slice';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { tabP2PService } from '../../../../services/tabP2PServices';
const { Search } = Input;
const { Option } = Select;

function P2PFilter() {
  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const [listFiat, setListFiat] = useState<any>([]);
  const [listPayments, setListPayments] = useState<any>([]);

  const { getListFiat, getListPayments } = tabP2PService;
  if (TabP2PState.searchParam.fiat === '') {
    dispatch(actions.fiatTabP2P('USD'));
  }

  const handleFiat = (value: any) => {
    dispatch(actions.fiatTabP2P(value));
  };

  const handlePaymentMethod = (value: any) => {
    if (value) {
      dispatch(actions.paymentTabP2P(value));
    } else {
      dispatch(actions.paymentTabP2P('All payments'));
    }
  };

  const handleAmount = (value: any) => {
    dispatch(actions.amountTabP2P(value));
  };

  const findAllFiat = () => {
    getListFiat()
      .then(res => {
        if (res.data.rc === 0) {
          setListFiat(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllPayments = () => {
    getListPayments()
      .then(res => {
        if (res.data.rc === 0) {
          setListPayments(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const handleSearchAmount = (value: any) => {
    if (value && value >= 0) {
      handleAmount(Number(value));
    } else if (value) {
      handleAmount(Math.abs(value));
    } else {
      handleAmount(-1);
    }
  };

  useEffect(() => {
    findAllFiat();
    findAllPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Row gutter={[8, 8]} align="bottom">
        <Col lg={6}>
          <div className="title">Amount</div>
          <SearchStyled
            placeholder="Enter amount"
            enterButton="Search"
            allowClear
            onSearch={handleSearchAmount}
            min={0}
            type="number"
            size="large"
            suffix={TabP2PState.searchParam.fiat || ' '}
          />
        </Col>

        <Col lg={3}>
          <div className="title">Fiat</div>

          <SelectStyled
            showSearch
            onChange={handleFiat}
            value={TabP2PState.searchParam.fiat}
            defaultValue={TabP2PState.searchParam.fiat}
          >
            {listFiat.map((f, i) => (
              <Option value={f.name} key={i}>
                <img
                  style={{ maxWidth: '12px', marginRight: '8px' }}
                  src={f.icon}
                  alt={f.name}
                />
                {f.name}
              </Option>
            ))}
          </SelectStyled>
        </Col>

        <Col lg={4}>
          <div className="title">Payment</div>

          <SelectStyled
            showSearch
            onChange={handlePaymentMethod}
            value={TabP2PState.searchParam.payment}
            allowClear
          >
            {listPayments.map((p, i) => (
              <Option value={p.name} key={i}>
                <img
                  style={{ maxWidth: '12px', marginRight: '8px' }}
                  src={p.icon}
                  alt={p.name}
                />
                {p.name}
              </Option>
            ))}
          </SelectStyled>
        </Col>

        <Col lg={7} />

        <Col lg={4}>
          <SelectRefreshStyled loading={true} placeholder="Refesh">
            <Option value="Not now">Not now</Option>
            <Option value="5s">5s to refresh</Option>
            <Option value="10s">10s to refresh</Option>
            <Option value="20s">20s to refresh</Option>
          </SelectRefreshStyled>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default P2PFilter;

const Wrapper = styled(Container)`
  margin-top: 16px;

  .ant-select:hover .ant-select-selector,
  .ant-selected-focus .ant-select-selector,
  .ant-selected-focused.ant-select .ant-select-selector {
    border-color: ${({ theme }) => theme.primary} !important;
    box-shadow: none !important;
  }

  .ant-select-focused.ant-select .ant-select-selector {
    border-color: ${({ theme }) => theme.primary} !important;
    box-shadow: none !important;
  }

  /* checkbox */

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.primary};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SearchStyled = styled(Search)`
  .ant-input-affix-wrapper-lg {
    padding: 0px 10px;
    font-size: 12px;
    height: 32px;
  }

  .ant-input-affix-wrapper-lg:hover,
  .ant-input-affix-wrapper-lg:focus,
  .ant-input-affix-wrapper-focused {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: none;
  }

  span.ant-input-group-addon {
    left: 0px !important;
  }

  button.ant-btn.ant-btn-primary.ant-btn-lg.ant-input-search-button {
    height: 32px;
    margin-bottom: -1px;
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.p2pBorder};
    font-weight: bold;

    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
  }

  .ant-input-suffix {
    color: ${({ theme }) => theme.p2pGray};
  }
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;

const SelectRefreshStyled = styled(Select)`
  width: 100%;

  .ant-select-selector {
    text-align: center;
  }

  span.ant-select-arrow.ant-select-arrow-loading {
    color: red;
    font-size: 20px;
    top: 38%;
    right: 18px;
  }

  span.ant-select-selection-placeholder,
  span.ant-select-selection-item {
    color: ${({ theme }) => theme.primary} !important;
    font-weight: bold;
  }
`;
