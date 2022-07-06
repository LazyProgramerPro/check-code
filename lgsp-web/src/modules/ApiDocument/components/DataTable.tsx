import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getAllApiDocuments } from '../redux/actions/get_api_document';
import { useParams } from 'react-router';
import { ApiDocumentEntity, DeleteApiDocumentParam, GetApiDocumentParams } from '../redux/models';
import env from '../../../configs/env';
import { ColumnProps } from 'antd/es/table';
import { Button, Icon, Popconfirm, Table } from 'antd';
import Loading from '../../../components/Loading';
import CreateApiDocumentForm from './CreateApiDocumentForm';
import { showUpdateApiDocumentForm } from '../redux/actions/update_document';
import UpdateApiDocumentForm from './UpdateApiDocumentForm';
import { downloadApiDocumentService } from '../redux/services/apis';
import { showDeleteApiDocumentConfirm } from '../redux/actions/delete_document';
import DeleteApiDocumentConfirm from './DeleteApiDocumentConfirm';
import { NotificationError } from '../../../components/Notification/Notification';
import { deleteApiDocument } from '../redux/actions/delete_document';
import styled from 'styled-components';

const size = env.pageSize;

const mapState = (rootState: RootState) => ({
  getState: rootState.apiDocument.getState,
  createState: rootState.apiDocument.createState,
  updateState: rootState.apiDocument.updateState,
  deleteState: rootState.apiDocument.deleteState,
});
const connector = connect(mapState, {
  getAllApiDocuments,
  showUpdateApiDocumentForm,
  showDeleteApiDocumentConfirm,
  deleteApiDocument,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const DataTable = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  let screenWidth = document.documentElement.clientWidth;
  const [scroll, setScroll] = useState<any>(screenWidth < env.desktopWidth ? { x: 'fit-content' } : { x: false });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setScroll({ x: 'fit-content' });
      else setScroll({ x: false });
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const param: GetApiDocumentParams = {
      apiId: apiId,
      page: page,
      size: size,
    };
    props.getAllApiDocuments(param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.getState.flag_reload]);

  useEffect(() => {
    setPage(props.getState.params?.page || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getState.params?.page]);

  const handleEdit = (e: any, record: any) => {
    const data: ApiDocumentEntity = {
      id: record.id,
      name: record.name,
      docType: record.docType,
      summary: record.summary,
      url: record.sourceUrl,
      originFilename: record.originFilename,
      fileName: record.fileName,
    };
    props.showUpdateApiDocumentForm(true, data);
  };

  const handleDelete = (e: any, record: any) => {
    const param: DeleteApiDocumentParam = {
      id: record.id || '',
    };
    props.deleteApiDocument(param);
    setPage(1);
  };

  // const onBtnDeleteClicked = (e: any) => {
  //   const param = props.deleteState.params;
  //   props.deleteApiDocument(param);
  // };

  const handleDownload = (e: any, record: any) => {
    downloadApiDocumentService(record.id, record.fileName)
      .then(rs => {
        if (rs == undefined) {
          NotificationError('Thất bại', 'Tải tài liệu thất bại');
        }
      })
      .catch(() => NotificationError('Thất bại', 'Tải tài liệu thất bại'));
  };

  const handleOpenUrl = (e: any, record: any) => {
    window.open(record.sourceUrl);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },

    {
      title: 'Người tạo',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Hành động',
      dataIndex: 'docType',
      width: 200,
      render: (text: string, record: any) => {
        return (
          <>
            {text === 'url' ? (
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => handleOpenUrl(event, record)}
              >
                <Icon type="select" />
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  className="btnIcon"
                  icon="download"
                  onClick={event => handleDownload(event, record)}
                />
              </>
            )}
            <>
              <Button size="small" className="btnIcon" icon="eye" onClick={event => handleEdit(event, record)} />
            </>

            <>
              <Popconfirm
                placement="top"
                title="Bạn có xác nhận muốn xóa?"
                onConfirm={event => handleDelete(event, record)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button size="small" className="btnIcon" icon="delete" />
              </Popconfirm>
            </>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Data>
        <Table
          columns={columns}
          dataSource={props.getState.rows}
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng1             ',
          }}
          rowKey="id"
          pagination={{
            total: props.getState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>

      <CreateApiDocumentForm />
      <UpdateApiDocumentForm />
      <DeleteApiDocumentConfirm />
      {props.getState.loading || props.createState.loading || props.updateState.loading || props.deleteState.loading ? (
        <Loading />
      ) : null}
    </>
  );
};

export default connector(DataTable);
const Data = styled.div`
  width: 100%;
  margin-bottom: -2px;
  .btnIcon {
    margin: 0px 4px;
  }
`;
