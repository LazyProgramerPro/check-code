/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import { Div, StyledButton } from './style';
import { useDispatch } from 'react-redux';
import { useGetopenOrderSlice } from '../slice';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const OpenOrderList = ({ dataSource }: any) => {
  const dispatch = useDispatch();
  const { actions } = useGetopenOrderSlice();
  const { t } = useTranslation();
  const confirm = (e: any, record: any) => {
    const dataprops = {
      orderId: record.order_id,
      baseSymbol: record.baseSymbol,
      quoteSymbol: record.quoteSymbol,
      wallet: record.wallet,
    };
    dispatch(actions.cancelOrderRequest(dataprops));
  };
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
        return <span className="white-color">{text}</span>;
      },
    },
    {
      title: t('type'),
      dataIndex: 'type',
      align: 'center',
      key: 'type',
      render: (text: any) => {
        return <span className="white-color">{text}</span>;
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
      title: t('filled'),
      dataIndex: 'filled',
      align: 'center',
      key: 'filled',
      render: (text: any) => {
        return (
          <span className="white-color">{numeral(text).format('0,0.00')}%</span>
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
      title: t('cancel-all'),
      align: 'center',
      key: 'cancel',
      render: (record: any) => {
        return (
          <Space>
            <Popconfirm
              placement="topRight"
              title={`Are you sure to cancel this order?`}
              onConfirm={e => confirm(e, record)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButton>{t('cancel')}</StyledButton>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
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
export default OpenOrderList;
