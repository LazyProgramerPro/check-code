import { Button, Collapse, Modal, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteOperation, editOperation, openFormAddOperation } from '../redux/actions/create_operation';
import { CreateOperationParams } from '../redux/models';

const mapState = (rootState: RootState) => ({
  operationState: rootState.createDataService.createOperation,
});

const connector = connect(mapState, { openFormAddOperation, deleteOperation, editOperation });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function OperationCollapse({ openFormAddOperation, deleteOperation, editOperation, operationState }: IProps) {
  const { Panel } = Collapse;

  const [rowData, setRowData] = useState<CreateOperationParams[]>(operationState.operations);

  const columns: ColumnProps<CreateOperationParams>[] = [
    {
      title: 'Tên Operation',
      dataIndex: 'name',
      key: 'name',
      width: 180,
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
      width: 120,
      render: (text: any, record: CreateOperationParams) => (
        <>
          <Button className="btnIcon" icon="edit" onClick={() => handleEdit(record)}></Button>

          <Button className="btnIcon" icon="delete" onClick={() => handleDelete(record.name)}></Button>
        </>
      ),
    },
  ];

  const handleCreateOperation = () => {
    openFormAddOperation();
  };

  const handleDelete = (operationName: string) => {
    Modal.confirm({
      content: 'Bạn có xác nhận muốn xóa?',
      onOk() {
        deleteOperation(operationName);
      },
      onCancel() {},
    });
  };

  const handleEdit = (param: CreateOperationParams) => {
    editOperation(param);
  };

  useEffect(() => {
    setRowData(operationState.operations);
  }, [operationState.operations]);

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Operation" key="1">
          <Button icon="plus-circle" className="btnLink" onClick={handleCreateOperation}>
            Thêm Operation
          </Button>

          <Table
            rowKey="name"
            className="custom-table"
            columns={columns}
            dataSource={rowData}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            pagination={{
              current: 1,
              pageSize: 5,
              total: rowData.length,
              onChange: page => {
                console.log('onChangePage: ', page);
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
export default connector(OperationCollapse);
