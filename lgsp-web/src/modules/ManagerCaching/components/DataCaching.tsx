import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import AddCaching from './AddCaching';
import { getCaching } from '../redux/actions/get_caching';
import { GetCachingParams } from '../redux/models';
import Loading from 'src/components/Loading';
interface Data {
  key: string;
  name: string;
  organization: string;
  time: string;
}
const View = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 20px;
    line-height: 26px;
    color: #043bff;
  }

  .button {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const Content = styled.div`
  font-size: 20px;
`;
const Data = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getCachingState: rootState.dataCaching.getState,
});
const connector = connect(mapState, { getCaching });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataCaching(props: IProps) {
  const { getCachingState, getCaching } = props;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);

  document.title = 'Danh sách thông tin caching';

  const loadDataCaching = () => {
    window.scrollTo(0, 0);
    let params: GetCachingParams = {
      ...getCachingState.params,
      page: page,
      size: size,
    };
    getCaching(params);
  };
  useEffect(() => {
    loadDataCaching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên dịch vụ chia sẻ',
      dataIndex: 'apiName',
      key: 'apiName',
      width: 300,
      ellipsis: true,
    },

    {
      title: 'Đơn vị cung cấp',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Thời gian caching ',
      dataIndex: 'cachingTime',
      key: 'cachingTime',
      width: 150,
      render: cachingTime => {
        return <>{`${cachingTime}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}s</>;
      },
    },
  ];

  return (
    <View>
      <div className={'header'}>
        <Content>Danh sách thông tin caching của dịch vụ chia sẻ công khai</Content>
        <AddCaching />
      </div>
      <Data>
        <Table
          className="custom-table-2"
          columns={columns}
          dataSource={getCachingState.rows}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getCachingState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      {props.getCachingState.loading ? <Loading /> : null}
    </View>
  );
}
export default connector(Form.create<IProps>()(DataCaching));
