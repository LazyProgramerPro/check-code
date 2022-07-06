/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import { Div } from './style';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useOrderhistorySlice } from '../../slice';

const OrderHistoryList = ({ dataSource }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useOrderhistorySlice();

  const columns: ColumnsType<any> = [
    {
      title: t('date'),
      dataIndex: 'ts',
      align: 'center',
      key: 'ts',
      render: (text: any) => moment(text).format('MM-DD HH:mm:ss'),
    },
    {
      title: t('pair'),
      dataIndex: 'pair',
      align: 'center',
      key: 'pair',
      render: (text: any) => {
        return <span className="white-color">{text.toUpperCase()}</span>;
      },
    },
    {
      title: t('type'),
      dataIndex: 'type',
      align: 'center',
      key: 'type',
      render: (text: any) => {
        return <span className="white-color">{text.toUpperCase()}</span>;
      },
    },
    {
      title: t('side'),
      dataIndex: 'side',
      align: 'center',
      key: 'side',
      render: (text: any) => {
        return (
          <span
            className="typeof-side"
            data-type={text === 'SELL' ? 'sell' : 'buy'}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: t('average'),
      dataIndex: 'average',
      align: 'center',
      key: 'average',
      render: (text: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')}
          </span>
        );
      },
    },
    {
      title: t('price'),
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      render: (text: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')}
          </span>
        );
      },
    },
    {
      title: t('executed'),
      dataIndex: 'executed',
      align: 'center',
      key: 'executed',
      render: (text: any) => {
        return (
          <span className="white-color">{numeral(text).format('0,0.000')}</span>
        );
      },
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      align: 'center',
      key: 'amount',
      render: (text: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')}
          </span>
        );
      },
    },
    {
      title: t('total'),
      dataIndex: 'total',
      align: 'center',
      key: 'total',
      render: (text: any, record: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')} {record.quoteSymbol}
          </span>
        );
      },
    },
    {
      title: t('trigger-condition'),
      dataIndex: 'triggerCondition',
      align: 'center',
      key: 'triggerConditions',
      render: (text: any) => {
        return <span className="white-color">{text}</span>;
      },
    },
    {
      title: t('all'),
      align: 'center',
      key: 'status',
      dataIndex: 'status',
      render: (text: any, record: any) => {
        return <Space>{text}</Space>;
      },
    },
  ];
  useEffect(() => {
    const node = document.querySelector<HTMLElement>('.table .ant-table-body');
    if (node) {
      node.addEventListener('scroll', () => {
        const perc =
          (node.scrollTop / (node.scrollHeight - node.clientHeight)) * 100;
        if (perc >= 100) {
          console.log('load more');
          dispatch(actions.setPageSize());
        }
      });
    }
  }, []);
  return (
    <Div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="order_id"
        pagination={false}
        scroll={{ scrollToFirstRowOnChange: false, y: 260, x: 900 }}
        className="table"
      />
    </Div>
  );
};
export default OrderHistoryList;
