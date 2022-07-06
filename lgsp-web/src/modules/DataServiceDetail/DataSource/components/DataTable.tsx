import env from '../../../../configs/env';
import { RootState } from '../../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getAllDataSource } from '../redux/actions/get_data_sources';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GetDataSourceParams } from '../redux/models';
import { ColumnProps } from 'antd/lib/table';
import { Button, Icon, Table } from 'antd';
import Loading from '../../../../components/Loading';

const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDataSourceState: rootState.dataSource.getState,
});

const connector = connect(mapState, { getAllDataSource });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function DataTable({ getDataSourceState, getAllDataSource }: IProps) {
  const params: any = useParams();

  const [dataServiceId] = useState<string>(params.dataServiceId);

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
    let params: GetDataSourceParams = {
      ...getDataSourceState.params,
      page: page - 1,
      size: size,
      dataServiceId: dataServiceId,
    };
    getAllDataSource(params);
  }, [page, getDataSourceState.flag_reload]);

  const handleShow = (e: any, record: any) => {};

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
      width: 100,
    },
    {
      title: 'Kiểu database',
      dataIndex: 'db_type',
      width: 100,
      render: (value: number) => {
        switch (value) {
          case 1:
            return 'Mysql';
          case 2:
            return 'Sql Server';
          case 3:
            return 'MongoDB';
          default:
            return 'Không xác định';
        }
      },
    },
    {
      title: 'Server',
      dataIndex: 'server',
      width: 100,
    },
    {
      title: 'Port',
      dataIndex: 'port',
      width: 100,
    },
    {
      title: 'Database',
      dataIndex: 'database',
      width: 100,
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
            <Link to={`/data-source-detail/${record.id}`}>
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm">
                <Icon type="info" />
              </Button>
            </Link>
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
            <Link to={`/data-service`}>
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
        dataSource={getDataSourceState.rows}
        columns={columns}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        rowKey="name"
        pagination={{
          current: page,
          pageSize: size,
          total: getDataSourceState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      {getDataSourceState.loading ? <Loading /> : null}
    </>
  );
}

export default connector(DataTable);
