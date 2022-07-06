import { Button, Collapse, Modal, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteQuery, editQuery, openFormAddQuery } from '../redux/actions/create_query';
import { QueryEntity } from '../redux/models';

const mapState = (rootState: RootState) => ({
  queryState: rootState.createDataService.createQuery,
});

const connector = connect(mapState, { openFormAddQuery, deleteQuery, editQuery });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function QueryCollapse({ queryState, openFormAddQuery, deleteQuery, editQuery }: IProps) {
  const { Panel } = Collapse;
  const [pageIndex, setPageIndex] = useState(1);

  const columns: ColumnProps<QueryEntity>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'Query',
      dataIndex: 'query',
      key: 'query',
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
      width: 120,
      render: (text: any, record: QueryEntity) => (
        <>
          <Button className="btnIcon" icon="eye" onClick={() => handleEdit(record)}></Button>

          <Button className="btnIcon" icon="delete" onClick={() => handleDelete(record.name)}></Button>
        </>
      ),
    },
  ];

  const handleCreateQuery = () => {
    openFormAddQuery();
  };

  const handleDelete = (queryName: string) => {
    Modal.confirm({
      content: 'Bạn có xác nhận muốn xóa?',
      onOk() {
        deleteQuery(queryName);
      },
      onCancel() {},
    });
  };

  const handleEdit = (param: QueryEntity) => {
    editQuery(param);
  };

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Query" key="1">
          <Button icon="plus-circle" type="default" className="btnLink" onClick={handleCreateQuery}>
            Thêm Query
          </Button>

          <Table
            columns={columns}
            dataSource={queryState.queries}
            className="custom-table"
            rowKey="name"
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: queryState.queries.length,
              onChange: page => {
                setPageIndex(page);
              },
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
          />
        </Panel>
      </Collapse>
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
export default connector(QueryCollapse);
