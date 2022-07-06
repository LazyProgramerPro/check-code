import { Button, Collapse, Modal, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteDataSource, editDataSource, openFormAdd } from '../redux/actions/create_dataSource';
import { CreateDataSourceParams } from '../redux/models';

const mapState = (rootState: RootState) => ({
  getDataSource: rootState.createDataService.createDataSource,
  dataServiceState: rootState.createDataService.createDataService,
});

const connector = connect(mapState, { openFormAdd, deleteDataSource, editDataSource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function DataSourceCollapse({
  openFormAdd,
  getDataSource,
  deleteDataSource,
  editDataSource,
  dataServiceState,
}: IProps) {
  const { Panel } = Collapse;
  const [pageIndex, setPageIndex] = useState(1);

  const [rowData, setRowData] = useState<CreateDataSourceParams[]>(getDataSource.DataSourceConfigs);

  const handleDeleteDataSource = (value: string) => {
    Modal.confirm({
      content: 'Bạn có xác nhận muốn xóa?',
      onOk() {
        deleteDataSource(value);
      },
      onCancel() {},
    });
  };

  const columns: ColumnProps<CreateDataSourceParams>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'Data Source',
      dataIndex: 'dbType',
      key: 'dbType',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: () => <p>Hoạt động</p>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (text: any, record: CreateDataSourceParams) => (
        <>
          <Button className="btnIcon" icon="edit" onClick={() => handleUpdateDataSource(record)}></Button>

          <Button className="btnIcon" icon="delete" onClick={() => handleDeleteDataSource(record.name)}></Button>
        </>
      ),
    },
  ];

  const handleCreateDataSource = () => {
    openFormAdd();
  };

  const handleUpdateDataSource = (record: CreateDataSourceParams) => {
    editDataSource(record);
  };

  useEffect(() => {
    setRowData(getDataSource.DataSourceConfigs);
  }, [getDataSource.DataSourceConfigs]);

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Data Source" key="1">
          <Button icon="plus-circle" type="default" className="btnLink" onClick={handleCreateDataSource}>
            Thêm Data Source
          </Button>

          <Table
            className="custom-table"
            columns={columns}
            dataSource={rowData}
            rowKey="name"
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: rowData.length,
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
      font-weight: 500;
      border: none;
      background-color: transparent;
    }
  }
`;
export default connector(DataSourceCollapse);
