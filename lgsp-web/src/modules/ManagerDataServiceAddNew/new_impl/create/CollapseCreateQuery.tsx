import { Button, Collapse, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { setQueryParams } from '../../redux/actions/create_query';
import { QueryEntity } from '../../redux/models';
import CFormCreateQuery from './CFormCreateQuery';
import UFormCreateQuery from './UFormCreateQuery';
import { setPageQueryTable } from '../../redux/actions/create_query';

const mapState = (rootState: RootState) => ({
  queryState: rootState.createDataService.createQuery,
  dataSourceState: rootState.createDataService.createDataSource,
});

const connector = connect(mapState, { setQueryParams, setPageQueryTable });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function CollapseCreateQuery({ queryState, dataSourceState, setQueryParams, setPageQueryTable }: IProps) {
  const { Panel } = Collapse;
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(queryState.page);
  }, [queryState.page]);

  const columns: ColumnProps<QueryEntity>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Query1',
      dataIndex: 'query',
      render: (text: any, record: any) => {
        console.log('AA', record.expression);
        console.log('AA', record.query);
        if (record.expression == undefined && record.query != undefined) {
          console.log('object');
          return <>{`${record.query}`}</>;
        }
        if (record.expression == undefined && record.query == undefined) {
          console.log('object1');
          return <></>;
        }
        if (record.expression != ' ') {
          console.log('object2');
          return <>{`${record.expression}`}</>;
        }
        return <>{`${record.query}`}</>;
      },
      ellipsis: true,
    },
    {
      title: 'Tên Data Source',
      dataIndex: 'dataSourceName',
      key: 'dataSourceName',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: QueryEntity) => (
        <>
          <Button size="small" className="btnIcon" icon="eye" onClick={() => handleEdit(record)} />
          <Popconfirm
            placement="top"
            title="Bạn muốn xóa Query này chứ ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button size="small" className="btnIcon" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // form create
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [dataUpdateForm, setDataUpdateForm] = useState<any>({});

  const handleCreateQuery = () => {
    let ok = dataSourceState.DataSourceConfigs && dataSourceState.DataSourceConfigs.length > 0;
    if (!ok) {
      NotificationError('Thất bại', 'Vui lòng tạo data source trước');
      return;
    }
    setShowCreateForm(true);
  };

  const _setQueries = (queries: any[]) => {
    NotificationSuccess('Thành công', 'Xóa Query thành công');
    setQueryParams(queries);
  };

  const handleDelete = (id: string) => {
    let q = [...queryState.queries];
    for (let i = 0; i < q.length; i++) {
      if (q[i].id === id) {
        q.splice(i, 1);
        break;
      }
    }
    _setQueries(q);
  };

  const handleEdit = (param: QueryEntity) => {
    console.log('editParams1: ' + JSON.stringify(param));
    setDataUpdateForm(param);
    setShowUpdateForm(true);
  };

  console.log('first', queryState.queries);
  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Query" key="1">
          <Button icon="plus" type="default" className="btnLink" onClick={handleCreateQuery}>
            Thêm Query
          </Button>
          <Table
            columns={columns}
            dataSource={queryState.queries}
            className="custom-table-2"
            rowKey="id"
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            // locale={{ emptyText: <h4>Không có dữ liệu</h4> }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: queryState.queries.length,
              onChange: page => {
                setPageIndex(page);
                setPageQueryTable(page);
              },
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
          />
        </Panel>
      </Collapse>

      <CFormCreateQuery
        show={showCreateForm}
        close={() => {
          setShowCreateForm(false);
        }}
      />

      <UFormCreateQuery
        show={showUpdateForm}
        item={dataUpdateForm}
        close={() => {
          setShowUpdateForm(false);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .collapse {
    margin-bottom: 20px;

    table {
      margin-top: 10px;
    }
    .ant-collapse-header {
      background: #ff6060;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .btnIcon {
      margin: 0px 4px;
    }
  }
`;

export default connector(CollapseCreateQuery);
