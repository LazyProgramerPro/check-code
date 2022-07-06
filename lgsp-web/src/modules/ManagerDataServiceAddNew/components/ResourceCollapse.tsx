import { Button, Collapse, Modal, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteResource, editResource, openFormAddResource } from '../redux/actions/create_resource';
import { CreateResourceParams } from '../redux/models';
import { v4 } from 'uuid';
const mapState = (rootState: RootState) => ({
  resourceState: rootState.createDataService.createResource,
});

const connector = connect(mapState, { openFormAddResource, deleteResource, editResource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}

function ResourceCollapse({ resourceState, openFormAddResource, deleteResource, editResource }: IProps) {
  const { Panel } = Collapse;

  const columns: ColumnProps<CreateResourceParams>[] = [
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      key: 'path',
      width: 180,
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
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
      render: (text: any, record: CreateResourceParams) => (
        <>
          <Button className="btnIcon" icon="eye" onClick={() => handleEdit(record)}></Button>

          <Button className="btnIcon" icon="delete" onClick={() => handleDelete(record.path, record.method)}></Button>
        </>
      ),
    },
  ];

  const handleCreateDataSource = () => {
    openFormAddResource();
  };

  const handleDelete = (resourcePath: string, resourceMethod: string) => {
    Modal.confirm({
      content: 'Bạn có xác nhận muốn xóa?',
      onOk() {
        deleteResource(resourcePath, resourceMethod);
      },
      onCancel() {},
    });
  };

  const handleEdit = (param: CreateResourceParams) => {
    editResource(param);
  };

  const [page, setPage] = useState(1);

  const handleChange = (value: any) => {
    setPage(value);
    console.log(resourceState.resources);
  };

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Resource" key="1">
          <Button icon="plus-circle" className="btnLink" onClick={handleCreateDataSource}>
            Thêm Resource
          </Button>

          <Table
            columns={columns}
            dataSource={resourceState.resources}
            className="custom-table"
            rowKey={'id'}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            pagination={{
              current: page,
              pageSize: 5,
              total: resourceState.resources.length,
              onChange: value => handleChange(value),
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
export default connector(ResourceCollapse);
