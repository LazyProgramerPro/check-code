import { useState } from 'react';
import OrderBookAsk from './components/OrderBookAsk';
import OrderBookBid from './components/OrderBookBid';
import OrderBookTHeader from './components/OrderBookHeader';
import {
  Container,
  Header,
  GroupButton,
  MoreButton,
  StyledDropdown,
  StyledRow,
} from './style';
import IconSvg from 'app/assets/img/icon';
import OrderBookIcon from 'app/assets/img/Orderbook';
// import Select from 'react-select';
import { Select } from 'antd';
import { Dropdown } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { useOrderbookSlice } from './slice';
// import { selectOrderbook } from './slice/selectors';
// import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderBook = ({ socketMess }) => {
  const [Layout, setLayout] = useState(1);
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();
  // let { pair } = useParams();
  const { t } = useTranslation();
  // const { actions } = useOrderbookSlice();
  // const dataOrderbook: any = useSelector(selectOrderbook);
  // const limit = 100;
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const options = [
    { value: '1', label: '0.01' },
    { value: '2', label: '0.1' },
    { value: '3', label: '1' },
    { value: '4', label: '10' },
    { value: '5', label: '50' },
    { value: '6', label: '100' },
  ];
  // useEffect(() => {
  //   const findIndex: any = pair?.indexOf('_');
  //   if (pair !== '') {
  //     dispatch(
  //       actions.getOrderbookRequest({
  //         pair: `${pair?.substring(0, findIndex)}/${pair?.substring(
  //           findIndex + 1,
  //         )}`,
  //         limit: limit,
  //       }),
  //     );
  //   }
  // }, [actions, dispatch, pair, Layout]);
  return (
    <Container>
      <Header>
        <GroupButton>
          <button onClick={() => setLayout(1)}>
            <OrderBookIcon
              name="orderbook"
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 1 ? 1 : 0.5,
              }}
            />
          </button>
          <button onClick={() => setLayout(2)}>
            <OrderBookIcon
              name="buyorder"
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 2 ? 1 : 0.5,
              }}
            />
          </button>
          <button onClick={() => setLayout(3)}>
            <OrderBookIcon
              name="sellorder"
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 3 ? 1 : 0.5,
              }}
            />
          </button>
        </GroupButton>
        <div className="d-flex align-items-center">
          <Select
            className="react-select-container"
            dropdownClassName="react-select-dropdown"
            options={options}
            defaultValue={options[0]}
          />
          <MoreButton>
            <StyledDropdown
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <IconSvg name="more" className="more-icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="label">
                  <label htmlFor="AVGsum" className="labelView">
                    <input id="AVGsum" type="checkbox" />
                    <span className="checkmark"></span>
                    {t('display-avg-sum')}
                  </label>
                </div>
              </Dropdown.Menu>
            </StyledDropdown>
          </MoreButton>
        </div>
      </Header>
      {Layout === 1 ? (
        <>
          <OrderBookTHeader />
          <StyledRow>
            <OrderBookAsk
              // dataApi={dataOrderbook?.data?.data?.asks}
              dataSocket={socketMess}
              miniTable
            />
          </StyledRow>
          <StyledRow>
            <OrderBookBid
              // dataApi={dataOrderbook?.data?.data?.bids}
              dataSocket={socketMess}
              miniTable
            />
          </StyledRow>
        </>
      ) : Layout === 2 ? (
        <>
          <OrderBookTHeader />
          <OrderBookBid
            // dataApi={dataOrderbook?.data?.data?.bids}
            dataSocket={socketMess}
            miniTable={false}
          />
        </>
      ) : (
        <div style={{ height: '100%' }}>
          <OrderBookTHeader />
          <OrderBookAsk
            // dataApi={dataOrderbook?.data?.data?.asks}
            dataSocket={socketMess}
            miniTable={false}
          />
        </div>
      )}
    </Container>
  );
};
export default OrderBook;
