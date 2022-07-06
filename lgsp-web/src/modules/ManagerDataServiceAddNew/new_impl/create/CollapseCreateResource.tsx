import { Button, Collapse, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError } from 'src/components/Notification/Notification';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteResource, openFormAddResource, setPageResourceTable } from '../../redux/actions/create_resource';
import { CreateResourceParams } from '../../redux/models';
import CFormCreateResource from './CFormCreateResource';
import UFormCreateResource from './UFormCreateResource';

const mapState = (rootState: RootState) => ({
  resourceState: rootState.createDataService.createResource,
  queryState: rootState.createDataService.createQuery,
});

const mapDispatchToProps = {
  openFormAddResource,
  deleteResource,
  setPageResourceTable,
};

const connector = connect(mapState, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function CollapseCreateResource({ resourceState, queryState, deleteResource, setPageResourceTable }: IProps) {
  const { Panel } = Collapse;

  const columns: ColumnProps<CreateResourceParams>[] = [
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      key: 'path',
      width: 300,
      ellipsis: true,
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
      width: 150,
      render: (text: any, record: CreateResourceParams) => (
        <>
          <Button size="small" className="btnIcon" icon="eye" onClick={() => handleEdit(record)} />

          <Popconfirm
            placement="top"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={() => handleDelete(record.path, record.method)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button size="small" className="btnIcon" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [pageIndex, setPageIndex] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [dataUpdateForm, setDataUpdateForm] = useState<any>({});

  useEffect(() => {
    setPageIndex(resourceState.page);
  }, [resourceState.page]);

  const handleCreateDataSource = () => {
    let ok = queryState.queries && queryState.queries.length > 0;
    if (!ok) {
      NotificationError('Thất bại', 'Vui lòng tạo query trước');
      return;
    }
    setShowCreateForm(true);
  };

  const handleDelete = (resourcePath: string, resourceMethod: string) => {
    deleteResource(resourcePath, resourceMethod);
  };

  const handleEdit = (param: CreateResourceParams) => {
    setDataUpdateForm(param);
    setShowUpdateForm(true);
  };

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Resource" key="1">
          <Button icon="plus" className="btnLink" onClick={handleCreateDataSource}>
            Thêm Resource
          </Button>

          <Table
            columns={columns}
            dataSource={resourceState.resources}
            className="custom-table-2"
            rowKey="id"
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            // locale={{ emptyText: <h4>Không có dữ liệu</h4> }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: resourceState.resources.length,
              onChange: page => {
                setPageIndex(page);
                setPageResourceTable(page);
              },
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
          />
        </Panel>
      </Collapse>
      <CFormCreateResource
        show={showCreateForm}
        close={() => {
          setShowCreateForm(false);
        }}
      />
      <UFormCreateResource
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
export default connector(CollapseCreateResource);
