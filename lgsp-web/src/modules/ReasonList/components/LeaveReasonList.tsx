import React, { useEffect, useState } from 'react';
import { Button, Icon, Popconfirm, Table } from 'antd';
import env from 'src/configs/env';
import moment from 'moment';
import { ColumnProps } from 'antd/lib/table';
import { emptyText } from 'src/configs/locales';
import { RootState } from 'src/redux/reducers';
import { connect, ConnectedProps } from 'react-redux';

import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notifications';
import { deleteReason, getLeaveReasonList } from '../redux/services/apis';
import CreateReasonForm from './CreateNewReasonForm';

const mapState = ({ auth: { auth } }: RootState) => ({
  auth,
});
const connector = connect(mapState, {});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  updateList: String;
}

function LeaveReasonList(props: IProps) {
  const canDelete = props.auth.data?.permission?.includes('delete-reason');
  const canEdit = props.auth.data?.permission?.includes('update-reason');
  const [listReason, setListReason] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getLeaveReasonListAsync(currentPage);
  }, [props.updateList]);

  const updateListAsync = () => {
    getLeaveReasonListAsync(currentPage);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Ngày tạo',
      dataIndex: 'create_time',
      width: 200,
      render: (value: number) => {
        return <div style={{ textAlign: 'center' }}> {moment(value).format('DD/MM/YYYY HH:mm:ss')} </div>;
      },
    },
    {
      title: 'Tên lý do',
      dataIndex: 'name',
      render: (value: string) => {
        return <div style={{ textAlign: 'center' }}> {value} </div>;
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      width: 150,
      render: (record: any) => {
        return (
          <div className="action-btn">
            {canEdit && (
              <Button
                disabled={true}
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => handleEdit(event, record)}
              >
                <Icon type="edit" theme="filled" />
              </Button>
            )}
            {canDelete && (
              // <Popconfirm disabled={true}
              //   title="Chắc chắn để xóa?"
              //   onCancel={event => {
              //     event?.stopPropagation();
              //   }}
              //   onConfirm={event => handleDelete(event, record.id)}
              // >
              //   <Button disabled={true}
              //     size="small"
              //     type="danger"
              //     className="ant-btn ml-1 mr-1 ant-btn-sm"
              //     onClick={event => {
              //       event.stopPropagation();
              //     }}
              //   >
              //     <Icon type="delete" theme="filled"/>
              //   </Button>
              // </Popconfirm>
              <Button
                disabled={true}
                size="small"
                type="danger"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="delete" theme="filled" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const handleDelete = async (e: any, id: any) => {
    deleteReason(id).then(res => {
      if (res && res.rc.code === 0) {
        getLeaveReasonListAsync(currentPage);
        NotificationSuccess('Thành công', res.rc.desc);
      } else {
        NotificationError('Thất bại', res.rc.desc);
      }
    });
  };

  const handleEdit = (e: any, record: any) => {
    setOpenModal(true);
    setEditData(record);
  };

  let screenWidth = document.documentElement.clientWidth;
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? { x: 'fit-content' } : { x: false });

  useEffect(() => {
    getLeaveReasonListAsync(0);

    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setScroll({ x: 'fit-content' });
      else setScroll({ x: false });
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getLeaveReasonListAsync = async (page: any) => {
    const data = await getLeaveReasonList({ pageIndex: page, size: 10, reason_type_code: 'LEAVE_REQUEST_REASON' });
    setTotal(data.total);
    setListReason(data.rows as []);
  };

  const handleTableChange = async (e: any) => {
    getLeaveReasonListAsync(e.current);
    setCurrentPage(e.current);
  };
  return (
    <div className="list-reason">
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={listReason}
        columns={columns}
        rowKey="id"
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        pagination={{
          hideOnSinglePage: false,
          current: currentPage,
          pageSize: 10,
          total: total,
          onChange: value => {
            setCurrentPage(value);
          },
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
        onChange={e => handleTableChange(e)}
        rowClassName={() => {
          return 'cursor-pointer';
        }}
      />

      <CreateReasonForm
        isOpenModal={isOpenModal}
        reloadList={updateListAsync}
        setOpenModal={setOpenModal}
        editData={editData}
      />
    </div>
  );
}

export default connector(LeaveReasonList);
