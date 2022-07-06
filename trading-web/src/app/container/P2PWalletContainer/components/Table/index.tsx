import { Container } from 'react-bootstrap';
import {
  App,
  Head,
  SearchBox,
  StyledCheckbox,
  Subfilter,
  ConvertButton,
} from './style';
import IconSvg from 'app/assets/img/icon';
import { Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

export interface Dataprops {
  key: number;
  assetName: string;
  total: number;
  available: number;
  frozen: number;
  btcValue: number;
  action: Array<string>;
}

const FiatSpotTable = ({ dataSource }) => {
  const { t } = useTranslation();
  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };
  const columns: ColumnsType<Dataprops> = [
    {
      title: t('coin'),
      dataIndex: 'assetName',
      sorter: (a, b) => a.assetName.localeCompare(b.assetName),
      render: (text: any, record: any) => {
        return (
          <Space size="middle" className="colCoin">
            <div>
              <img className="coin-icon" src={record.icon} alt="coin" />
            </div>
            <div className="d-flex flex-column">
              <div>{text}</div>
              <a className="coin-url" href={record.url}>
                {record.tokenName}
              </a>
            </div>
          </Space>
        );
      },
    },
    {
      title: t('total'),
      dataIndex: 'total',
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 3,
      },
      render: (text: any, record: any) => {
        return (
          <Space
            size="middle"
            style={{ display: 'flex', flexDirection: 'column' }}
            className="spaceTotal"
          >
            <div className="spanTotal">
              {numeral(text).format('0,0.000000')}
            </div>
            <div className="avaiOrderRes">
              <p>Avai: {numeral(record?.available).format('0,0.000000')}</p>
              <p>In order: {numeral(record?.inOrder).format('0,0.000000')}</p>
            </div>
          </Space>
        );
      },
    },
    {
      title: t('available'),
      dataIndex: 'available',
      sorter: {
        compare: (a, b) => a.available - b.available,
        multiple: 2,
      },
      render: (text: any, record: any) => {
        return (
          <Space size="middle">{numeral(text).format('0,0.000000')}</Space>
        );
      },
      responsive: ['md'],
    },
    {
      title: t('frozen'),
      dataIndex: 'frozen',
      sorter: {
        compare: (a, b) => a.frozen - b.frozen,
        multiple: 1,
      },
      render: (text: any, record: any) => {
        return (
          <Space size="middle">{numeral(text).format('0,0.000000')}</Space>
        );
      },
      responsive: ['md'],
    },
    {
      title: t('action'),
      key: 'action',
      dataIndex: 'action',
      render: (record: any) => {
        return (
          <Space size="middle" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <span className="coin-action">{t('deposit')}</span>
            <span className="coin-action">{t('withdraw')}</span>
            <span className="coin-action">{t('convert')}</span>
          </Space>
        );
      },
    },
  ];
  return (
    <App>
      <Container>
        <Header />
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          rowKey="tokenId"
        />
      </Container>
    </App>
  );
};
export default FiatSpotTable;
const Header = () => {
  const { t } = useTranslation();
  return (
    <Head>
      <SearchBox>
        <label htmlFor="search-input" className="bn-input-prefix">
          <div className="prefix-icon">
            <IconSvg name="search" className="search-icon" />
          </div>
        </label>
        <input
          id="search-input"
          placeholder="Search Coin"
          className="search-input"
        />
      </SearchBox>
      <Subfilter>
        <StyledCheckbox>
          <label htmlFor="hideSmallBalances" className="labelView">
            <input id="hideSmallBalances" type="checkbox" />
            <span className="checkmark"></span>
            <span className="label-text">{t('hide-small-balances')}</span>
          </label>
        </StyledCheckbox>
        <ConvertButton href="#" rel="noopener noreferrer">
          {t('convert-small-balances')}
        </ConvertButton>
      </Subfilter>
    </Head>
  );
};
