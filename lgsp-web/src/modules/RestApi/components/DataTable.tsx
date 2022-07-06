import env from '../../../configs/env';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getAllRestApi } from '../redux/actions/get_rest_api';
import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Button, Icon, Table } from 'antd';
import Loading from '../../../components/Loading';
import { Link, useParams } from 'react-router-dom';
import { GetRestApiParams } from '../redux/models';

const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getRestApiState: rootState.restApi.getState,
});

const connector = connect(mapState, { getAllRestApi });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function DataTable({ getRestApiState, getAllRestApi }: IProps) {
  const params: any = useParams();

  const [groupId] = useState<string>(params.apiId);

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
    let params: GetRestApiParams = {
      ...getRestApiState.params,
      page: page - 1,
      size: size,
      groupId: groupId,
    };
    getAllRestApi(params);
  }, [page, getRestApiState.flag_reload]);

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
      title: 'Đường dẫn',
      dataIndex: 'path',
      width: 100,
    },
    {
      title: 'Phương thức',
      dataIndex: 'type',
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
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm" onClick={event => handleShow(event, record)}>
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
            <Link to={`/group-rest-api`}>
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
        dataSource={getRestApiState.rows}
        columns={columns}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        rowKey="path"
        pagination={{
          current: page,
          pageSize: size,
          total: getRestApiState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      {getRestApiState.loading ? <Loading /> : null}
    </>
  );
}

export default connector(DataTable);
