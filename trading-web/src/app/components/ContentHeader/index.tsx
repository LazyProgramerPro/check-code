import {
  Container,
  Div,
  Content,
  SpotTutorial,
  ContentLeft,
  ContentRight,
} from './style';
import IconSvg from 'app/assets/img/icon';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCurrentPairSlice } from './slice';
import { selectCurrentPair } from './slice/selectors';
import numeral from 'numeral';
import { isEmpty } from 'app/components/common/common';
import { Col, Row } from 'react-bootstrap';

const ContentHeader = ({ socketMess }) => {
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair: any = `${pair?.substring(
    0,
    findIndex,
  )}/${pair?.substring(findIndex + 1)}`;
  const cryptos = pair?.split('_');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useCurrentPairSlice();
  const dataCurrentPair: any = useSelector(selectCurrentPair);
  const [price, setPrice] = useState(0);
  const [isPriceUp, setIsPriceUp] = useState(0);
  const [changePrice24h, setChangePrice24h] = useState(0);
  const [changePercent24h, setChangePercent24h] = useState(0);
  const [high24h, setHigh24h] = useState(0);
  const [low24h, setLow24h] = useState(0);
  const [volumeBase24h, setVolumeBase24h] = useState(0);
  const [volumeQuote24h, setVolumeQuote24h] = useState(0);
  useEffect(() => {
    const data = {
      pair: changeFormatPair,
      ts: new Date().getTime(),
    };
    dispatch(actions.getCurrentPairRequest(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair]);
  useEffect(() => {
    if (!isEmpty(dataCurrentPair.data)) {
      if (dataCurrentPair.data.price > price) {
        setIsPriceUp(1);
      } else if (dataCurrentPair.data.price < price) {
        setIsPriceUp(2);
      } else if (dataCurrentPair.data.price === price) {
        setIsPriceUp(0);
      }
      setPrice(dataCurrentPair.data.price);
      setChangePrice24h(dataCurrentPair.data.change_price_24h);
      setChangePercent24h(dataCurrentPair.data.change_percent_24h);
      setHigh24h(dataCurrentPair.data.high_24h);
      setLow24h(dataCurrentPair.data.low_24h);
      setVolumeBase24h(dataCurrentPair.data.volume_base_24h);
      setVolumeQuote24h(dataCurrentPair.data.volume_quote_24h);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCurrentPair.data]);
  useEffect(() => {
    if (!isEmpty(socketMess) && socketMess.Key === 'PowExchange::TradeInfo') {
      setPrice(socketMess.Value.price);
      setChangePrice24h(socketMess.Value.change_price_24h);
      setChangePercent24h(socketMess.Value.change_percent_24h);
      setHigh24h(socketMess.Value.high_24h);
      setLow24h(socketMess.Value.low_24h);
    } else if (
      !isEmpty(socketMess) &&
      socketMess.Key === 'PowExchange::TradeVolumeInfo'
    ) {
      setVolumeBase24h(socketMess.Value.volume_base_24h);
      setVolumeQuote24h(socketMess.Value.volume_quote_24h);
    }
  }, [socketMess]);
  return (
    <Container>
      <Div>
        <Content>
          <Col xxl={3} xl={3} lg={3} md={4}>
            <Row>
              <ContentLeft xxl={7} lg={6} xl={7} md={6} sm={3} xs={6}>
                <div className="contentLeft-coin">
                  <div className="coin">{changeFormatPair}</div>
                  <div className="InformationCoin">
                    <IconSvg name="openIcon" />
                    <a href="/#" className="linkQuote">
                      {cryptos?.[0]}
                    </a>
                  </div>
                </div>
              </ContentLeft>
              <Col
                xxl={5}
                lg={6}
                xl={5}
                md={6}
                sm={3}
                xs={6}
                className="nowPrice d-flex flex-column"
              >
                <div
                  className="showPrice"
                  data-type={
                    isPriceUp === 0 ? 'normal' : isPriceUp === 1 ? 'up' : 'down'
                  }
                >
                  {numeral(price).format('0,0.00')}
                </div>
                <div className="subPrice">
                  ${numeral(price).format('0,0.00')}
                </div>
              </Col>
            </Row>
          </Col>
          <ContentRight>
            <div className="contentRightContainer d-flex">
              <div className="ticketList d-flex">
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('change')}</div>
                  <div className="tickerPriceText">
                    <span
                      className="tickerPriceText-value"
                      data-type={
                        changePercent24h === 0
                          ? 'normal'
                          : changePercent24h > 0
                          ? 'up'
                          : 'down'
                      }
                    >
                      {numeral(changePrice24h).format('0,0.00')}&nbsp;
                      {numeral(changePercent24h).format('0,0.00')}%
                    </span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('high')}</div>
                  <div className="tickerPriceText">
                    <span>{numeral(high24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('low')}</div>
                  <div className="tickerPriceText">
                    <span>{numeral(low24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(0, findIndex)})
                  </div>
                  <div className="tickerPriceText">
                    <span>{numeral(volumeBase24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(findIndex + 1)})
                  </div>
                  <div className="tickerPriceText">
                    <span>{numeral(volumeQuote24h).format('0,0.00')}</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentRight>
        </Content>
        <SpotTutorial>
          <IconSvg name="play" />
          <span>{t('spot-tutorial')}</span>
        </SpotTutorial>
      </Div>
    </Container>
  );
};
export default ContentHeader;
