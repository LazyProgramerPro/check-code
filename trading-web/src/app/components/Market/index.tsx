import { SampleNextArrow, SamplePrevArrow } from './components/arrow';
import IconSvg from 'app/assets/img/icon';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import {
  Container,
  SearchBox,
  StyledSlick,
  Pair,
  Price,
  Change,
  Table,
} from './style';
import { useGlobalContext } from '../common/context';
import numeral from 'numeral';
import { isEmpty } from 'app/components/common/common';
import { useDispatch } from 'react-redux';
import { useGetallpairSlice } from './slice';
import { useParams, Link } from 'react-router-dom';

const Market = ({ dataSocket, dataApi, socket }) => {
  const [active, setActive] = useState('USDT');
  const [allPair, setAllPair]: any[] = useState([]);
  const dispatch = useDispatch();
  const { actions } = useGetallpairSlice();
  const { activeChangeColumnMarket } = useGlobalContext();
  let { pair } = useParams();

  useEffect(() => {
    if (dataApi.data.rows) {
      setAllPair(dataApi.data.rows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataApi.data.rows]);
  useEffect(() => {
    if (!isEmpty(dataSocket) && dataSocket.Key === 'RobinhoodPair') {
      if (allPair.length === 0) {
        setAllPair([dataSocket.Value]);
      } else {
        const index = allPair?.findIndex((item: any) => {
          return item.symbol === dataSocket.Value?.symbol;
        });
        if (index !== -1 && allPair !== undefined) {
          const copyData = [...JSON.parse(JSON.stringify(allPair))];
          copyData[index].latestPrice = dataSocket.Value?.latestPrice;
          copyData[index].changes = dataSocket.Value?.change24h;
          copyData[index].volume = dataSocket.Value?.volume24h;
          setAllPair(copyData);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);

  const MenuSlick = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <StyledSlick {...settings}>
        <IconSvg
          name="star"
          className={
            active === 'Favor' ? 'star-icon slickItem-active' : 'star-icon'
          }
          onClick={() => setActive('Favor')}
        />
        <span
          className={active === 'B2' ? 'slickItem-active' : ''}
          onClick={() => setActive('B2')}
        >
          B2
        </span>
        <span
          className={active === 'USDT' ? 'slickItem-active' : ''}
          onClick={() => setActive('USDT')}
        >
          USDT
        </span>
        <span
          className={active === 'BNB' ? 'slickItem-active' : ''}
          onClick={() => setActive('BNB')}
        >
          BNB
        </span>
        <span
          className={active === 'BTC' ? 'slickItem-active' : ''}
          onClick={() => setActive('BTC')}
        >
          BTC
        </span>
        {/* <span
          className={active === 'ALTS' ? 'slickItem-active' : ''}
          onClick={() => setActive('ALTS')}
        >
          ALTS
        </span>
        <span
          className={active === 'ZONE' ? 'slickItem-active' : ''}
          onClick={() => setActive('ZONE')}
        >
          ZONE
        </span> */}
      </StyledSlick>
    );
  };
  const setPair = data => {
    if (pair !== data.symbol) {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          pair: data?.symbol,
        }),
      );
      socket.send(
        JSON.stringify({
          method: 'UNSUBSCRIBE',
          pair: localStorage?.getItem('pair'),
        }),
      );
    }
    localStorage.setItem('pair', data?.symbol);
    dispatch(actions.reselectPair());
  };
  return (
    <Container>
      <SearchBox>
        <div className="search-icon">
          <IconSvg name="search" />
        </div>
        <input placeholder="Search" />
      </SearchBox>
      <MenuSlick />
      <Header />
      <Table>
        {allPair !== undefined &&
          allPair?.map((item, index) => {
            const findIndex = item.symbol.indexOf('/');
            return (
              <Link
                className="d-flex justify-content-between table-item align-items-center"
                key={index}
                to={`/trade/${item.symbol.substring(
                  0,
                  findIndex,
                )}_${item.symbol.substring(findIndex + 1)}`}
                onClick={() => setPair(item)}
              >
                <Pair className="d-flex align-items-center">
                  <IconSvg name="star" className="tableItem-star" />
                  {item.symbol && item.symbol.toUpperCase()}
                </Pair>
                <Price data-type={item.isPriceUp ? 'up' : 'down'}>
                  {numeral(item.latestPrice).format('0,0.00000000')}
                </Price>
                {activeChangeColumnMarket ? (
                  <Change data-type={item.changes < 0 ? 'down' : 'up'}>
                    {numeral(item.changes).format('0,0.00')}%
                  </Change>
                ) : (
                  <Change>{item.volume}M</Change>
                )}
              </Link>
            );
          })}
      </Table>
    </Container>
  );
};
export default Market;
