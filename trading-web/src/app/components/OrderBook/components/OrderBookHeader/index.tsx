import { THeader } from './style';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const OrderBookHeader = () => {
  const { t } = useTranslation();
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  return (
    <>
      <THeader>
        <Col>
          {t('price')}({pair?.substring(findIndex + 1)})
        </Col>
        <Col className="text-end px-0">
          {t('amount')}({pair?.substring(0, findIndex)})
        </Col>
        <Col className="text-end">{t('total')}</Col>
      </THeader>
    </>
  );
};
export default OrderBookHeader;
