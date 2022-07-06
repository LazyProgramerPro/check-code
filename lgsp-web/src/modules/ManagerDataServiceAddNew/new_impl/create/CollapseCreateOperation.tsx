import { Button, Collapse, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteOperation, openFormAddOperation } from '../../redux/actions/create_operation';
import { CreateOperationParams } from '../../redux/models';
import CFormCreateOperation from './CFormCreateOperation';
import UFormCreateOperation from './UFormCreateOperation';
import { setPageOperationTable } from '../../redux/actions/create_operation';

const mapState = (rootState: RootState) => ({
  operationState: rootState.createDataService.createOperation,
  queryState: rootState.createDataService.createQuery,
  resourceState: rootState.createDataService.createResource,
});

const connector = connect(mapState, { openFormAddOperation, deleteOperation, setPageOperationTable });
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function CollapseCreateOperation({
  queryState,
  deleteOperation,
  operationState,
  resourceState,
  setPageOperationTable,
}: IProps) {
  const { Panel } = Collapse;

  const [rowData, setRowData] = useState<CreateOperationParams[]>(operationState.operations);
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    setPageIndex(operationState.page);
  }, [operationState.page]);
  const columns: ColumnProps<CreateOperationParams>[] = [
    {
      title: 'Tên Operation',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Tên Query',
      dataIndex: 'queryName',
      key: 'queryName',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: CreateOperationParams) => (
        <>
          <Button size="small" className="btnIcon" icon="eye" onClick={() => handleEdit(record)} />
          <Popconfirm
            placement="top"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={() => handleDelete(record.name)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button size="small" className="btnIcon" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [dataUpdateForm, setDataUpdateForm] = useState<any>({});

  const handleCreateOperation = () => {
    let ok = resourceState.resources && resourceState.resources.length > 0;
    if (!ok) {
      NotificationError('Thất bại', 'Vui lòng tạo resource trước');
      return;
    }
    setShowCreateForm(true);
  };

  const handleDelete = (operationName: string) => {
    deleteOperation(operationName);
  };

  const handleEdit = (param: CreateOperationParams) => {
    setDataUpdateForm(param);
    setShowUpdateForm(true);
  };

  useEffect(() => {
    setRowData(operationState.operations);
  }, [operationState.operations]);

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Operation" key="1">
          <Button icon="plus" className="btnLink" onClick={handleCreateOperation}>
            Thêm Operation
          </Button>

          <Table
            rowKey="name"
            className="custom-table-2"
            columns={columns}
            dataSource={rowData}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            // locale={{ emptyText: <h4>Không có dữ liệu</h4> }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: rowData.length,
              onChange: page => {
                setPageIndex(page);
                setPageOperationTable(page);
              },
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
          />
        </Panel>
      </Collapse>
      <CFormCreateOperation
        show={showCreateForm}
        close={() => {
          setShowCreateForm(false);
        }}
      />
      <UFormCreateOperation
        show={showUpdateForm}
        close={() => {
          setShowUpdateForm(false);
        }}
        item={dataUpdateForm}
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
export default connector(CollapseCreateOperation);
