import env from '../../../../configs/env';
import { RootState } from '../../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllQuery } from '../redux/actions/get_query';
import React, { useEffect, useState } from 'react';
import { GetQueryParams } from '../redux/models';
import { ColumnProps } from 'antd/lib/table';
import { Button, Icon, Table } from 'antd';
import Loading from '../../../../components/Loading';
import ViewQueryDetail from './ViewQueryDetail';
import { showQueryDetail } from '../redux/actions/get_query_detail';

const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getQueryState: rootState.query.getState,
  getQueryDetailState: rootState.query.getDetailState,
  getSingleDataServiceState: rootState.dataService.getSingleState,
});

const connector = connect(mapState, { getAllQuery, showQueryDetail });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function DataTable({
  getQueryState,
  getAllQuery,
  getSingleDataServiceState,
  getQueryDetailState,
  showQueryDetail,
}: IProps) {
  const params: any = useParams();

  const [dataSourceId] = useState<string>(params.dataSourceId);

  let screenWidth = document.documentElement.clientWidth;
  const [scroll, setScroll] = useState<any>(screenWidth < env.desktopWidth ? { x: 'fit-content' } : { x: false });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setScroll({ x: 'fit-content' });
      else setScroll({ x: false });
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let params: GetQueryParams = {
      ...getQueryState.params,
      page: page - 1,
      size: size,
      dataSourceId: dataSourceId,
    };
    getAllQuery(params);
  }, [page, getQueryState.flag_reload]);

  const handleView = (e: any, record: any) => {
    showQueryDetail(true, record.id);
  };

  const handleEdit = (e: any, record: any) => {};

  const handleDelete = (e: any, record: any) => {};

  const columns: ColumnProps<any>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
      render: (index: number) => {
        return index + 1;
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 80,
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'response_type',
      width: 60,
    },
    {
      title: 'Cấu trúc dữ liệu',
      dataIndex: 'json_response',
      width: 200,
    },
    {
      title: 'Câu lệnh truy vấn',
      dataIndex: 'query',
      width: 200,
    },
    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 150,
      render: (_text: string, record: any) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm" onClick={event => handleView(event, record)}>
              <Icon type="info" />
            </Button>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm" onClick={event => handleEdit(event, record)}>
              <Icon type="edit" />
            </Button>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => handleDelete(event, record)}
            >
              <Icon type="delete" />
            </Button>
            <Link to={`/data-service-detail/${getSingleDataServiceState?.dataServiceId}`}>
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm">
                <Icon type="rollback" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        className="custom-table"
        scroll={scroll}
        dataSource={getQueryState.rows}
        columns={columns}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        rowKey="name"
        pagination={{
          current: page,
          pageSize: size,
          total: getQueryState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      {getQueryState.loading || getQueryDetailState.loading ? <Loading /> : null}
      <ViewQueryDetail />
    </>
  );
}
export default connector(DataTable);
