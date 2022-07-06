import { Button, Form, Modal, Popconfirm, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { showData } from '../SystemInfoManager/redux/actions/update_content';
import { deleteInfor } from './redux/actions/delete_infor';
import { getSystemInfo } from './redux/actions/get_systeminfo';
import { DataSystemInfo, DeleteInforParam, GetSystemInfoParams } from './redux/models';
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getSystemInfoState: rootState.systemInforManager.getSystemInfoState,
  updateState: rootState.systemInforManager.updateState,
  deleteState: rootState.systemInforManager.deleteState,
});
const Content = styled.div`
  font-size: 20px;
`;
const View = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -5px;
  }

  .btnIcon {
    margin: 0px 4px;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
`;

const Data = styled.div`
  width: 100%;

  margin-top: 15px;
`;

const connector = connect(mapState, { getSystemInfo, deleteInfor, showData });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}
const SystemInfoManager = (props: IProps) => {

  document.title = 'Giới thiệu hệ thống';

  //Code mới
  const { getSystemInfoState, getSystemInfo, deleteState, deleteInfor, showData } = props;
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const loadDataSystemInfo = () => {
    window.scrollTo(0, 0);
    let params: GetSystemInfoParams = {
      ...getSystemInfoState.params,
      page: page,
      size: size,
    };
    getSystemInfo(params);
  };
  useEffect(() => {
    loadDataSystemInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const checkStatus = (status: string) => {
    if (status === 'create') {
      return 'Tạo mới';
    } else if (status === 'published') {
      return 'Công khai';
    }
  };

  const handleDelete = (event: any, record: DataSystemInfo) => {
    const param: DeleteInforParam = {
      id: record.id,
    };
    deleteInfor(param);
    setPage(1);
    loadDataSystemInfo();
  };

  const handleEdit = (e: any, record: any) => {
    const data: DataSystemInfo = {
      id: record.id,
      content: record.content,
      status: record.status,
    };
    props.showData(true, data);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'content',
      ellipsis: true,
      // width: 300,
      render: (text: any, record: any) => {
        return (
          // <Tooltip placement="topLeft" title={row.type === 3 ? 'Nội dung giới thiệu' : text}>
          //   <span className="content-infor column-item">
          //     {row.type === 3 ? 'Nội dung giới thiệu' : <div dangerouslySetInnerHTML={{ __html: text as string }} />}
          //   </span>
          // </Tooltip>
          <>
            {record.type === 2 && <>Slide mô hình ảnh LGSP</>}
            {record.type === 1 && <>Thông tin liên hệ</>}
            {record.type === 3 && <>Nội dung giới thiệu</>}
          </>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      ellipsis: true,
      // width: 200,
      render: (text: string) => {
        return (
          <>
            <span>{checkStatus(text)}</span>
          </>
        );
      },
    },
    {
      title: 'Người tạo mới',
      dataIndex: 'create_by',
      ellipsis: true,
      // width: 200,
      // render: (text: string) => (
      //   <>
      //     <span className="address column-item">{text}</span>
      //   </Tooltip>
      // ),
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'create_at',
      ellipsis: true,
      // width: 200,
      render: (text, current: any) => {
        return <div>{`${moment(current.create_at).format('DD/MM/YYYY')}`}</div>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 150,
      render: (text: any, record: any) => (
        <>
          {record.type === 2 && (
            <Link to={`/system-infor-manager/system-infor-manager/slides/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye"></Button>
            </Link>
          )}

          {record.type === 1 && (
            <Link to={`/system-infor-manager/system-infor-manager/contact/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye"></Button>
            </Link>
          )}

          {record.type === 3 && (
            <Link to={`/system-infor-manager/system-infor-manager/update-infor/${record.id}`}>
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleEdit(event, record)}></Button>
            </Link>
          )}
          <Popconfirm
            placement="top"
            title="Bạn có xác nhận muốn xóa?"
            onConfirm={event => handleDelete(event, record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button
              size="small"
              className="btnIcon"
              icon="delete"
              // onClick={event => handleDelete(event, record)}
              disabled={record.status === 'published'}
            ></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <View>
      <div>
        <div className="header">
          <Content>Thông tin giới thiệu hệ thống</Content>

          <Link to="/system-infor-manager/system-infor-manager/infor">
            <Button icon="plus">Tạo mới</Button>
          </Link>
        </div>
      </div>
      <Data>
        <Table
          className="custom-table-2"
          columns={columns}
          dataSource={getSystemInfoState.rows || []}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getSystemInfoState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>

      {props.getSystemInfoState.loading ? <Loading /> : null}
    </View>
  );
};

export default connector(Form.create<IProps>()(SystemInfoManager));
