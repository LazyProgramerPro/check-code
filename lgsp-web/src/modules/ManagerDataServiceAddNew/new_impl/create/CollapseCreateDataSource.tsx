import { Button, Collapse, Popconfirm, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationSuccess } from 'src/components/Notification/Notifications';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { deleteDataSource, setPageDataSourceTable } from '../../redux/actions/create_dataSource';
import { CreateDataSourceParams } from '../../redux/models';
import CFormCreateDataSource from './CFormCreateDataSource';
import UFormCreateDataSource from './UFormCreateDataSource';

const mapPropsState = (rootState: RootState) => ({
  dataSourceState: rootState.createDataService.createDataSource,
  dataServiceState: rootState.createDataService.createDataService,
});

const mapDispatchToState = {
  deleteDataSource,
  setPageDataSourceTable,
};

const connector = connect(mapPropsState, mapDispatchToState);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function CollapseCreateDataSource(props: IProps) {
  const { dataSourceState, deleteDataSource, setPageDataSourceTable } = props;

  const { Panel } = Collapse;
  const [pageIndex, setPageIndex] = useState(1);

  //
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [dataUpdateForm, setDataUpdateForm] = useState<any>({});
  const [updateFromServer, setUpdateFromServer] = useState<boolean>(false);

  const handleDeleteDataSource = (id: string) => {
    deleteDataSource(id);
  };

  const handleCreateDataSource = () => {
    setShowForm(true);
  };

  const handleUpdateDataSource = (record: any) => {
    if (record.hasOwnProperty('urlFile')) {
      setUpdateFromServer(true);
    } else {
      setUpdateFromServer(false);
    }
    setDataUpdateForm(record);
    setShowUpdateForm(true);
  };

  useEffect(() => {
    setPageIndex(dataSourceState.page);
    console.log('123');
  }, [dataSourceState.page]);
  const columns: ColumnProps<CreateDataSourceParams>[] = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Data Source',
      dataIndex: 'dbType',
      key: 'dbType',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      key: 'status',
      render: () => <p>Ho???t ?????ng</p>,
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text: any, record: CreateDataSourceParams) => (
        <>
          <Button size="small" className="btnIcon" icon="eye" onClick={() => handleUpdateDataSource(record)} />
          <Popconfirm
            placement="top"
            title="B???n c?? x??c nh???n mu???n x??a?"
            onConfirm={() => handleDeleteDataSource(record.name)}
            okText="X??c nh???n"
            cancelText="H???y"
          >
            <Button size="small" className="btnIcon" icon="delete"></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']} className="collapse">
        <Panel header="Data Source" key="1">
          <Button icon="plus" type="default" className="btnLink" onClick={handleCreateDataSource}>
            Th??m Data Source
          </Button>
          <Table
            className="custom-table-2"
            columns={columns}
            dataSource={dataSourceState.DataSourceConfigs}
            locale={{
              emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
            }}
            rowKey="id"
            // locale={{ emptyText: <h4>Kh??ng c?? d??? li???u</h4> }}
            pagination={{
              current: pageIndex,
              pageSize: 5,
              total: dataSourceState.DataSourceConfigs.length,
              onChange: page => {
                setPageIndex(page);
                setPageDataSourceTable(page);
              },
              showTotal: (total, range) => `??ang xem ${range[0]} ?????n ${range[1]} trong t???ng s??? ${total} m???c`,
            }}
          />
        </Panel>
      </Collapse>
      <CFormCreateDataSource
        show={showForm}
        close={() => {
          setShowForm(false);
        }}
      />
      <UFormCreateDataSource
        is_update_from_server={updateFromServer}
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

export default connector(CollapseCreateDataSource);
