import { Button, Col, Icon, Modal, Row, Table } from 'antd';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getDocument } from '../redux/actions/get_documents';
import { useParams } from 'react-router';
import { DetailParam, GetDocumentParams } from '../redux/models';
import Loading from 'src/components/Loading';
import { NotificationError } from 'src/components/Notification/Notification';
import { downloadDocument } from '../redux/service/apis';
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDocumentState: rootState.dataPublicDetail.getDocumentState,
});
const connector = connect(mapState, { getDocument });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {}
const initDetail: DetailParam = {
  filename: '',
  summary: '',
  visibility: '',
  name: '',
};

function Document(props: IProps) {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const { getDocumentState, getDocument } = props;
  const params: any = useParams();
  const [id] = useState<string>(params.id);
  console.log(params.id);
  // const [apiId] = useState<string>(params);
  const loadDataDocument = () => {
    window.scrollTo(0, 0);
    let param: GetDocumentParams = {
      id: id,
      page: page,
      size: size,
    };
    getDocument(param);
  };
  useEffect(() => {
    loadDataDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);
  // useEffect(() => {
  //   getDocument(params);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const [detail, setDetail] = useState(initDetail);

  //state = { visible: false };
  const [visible, setVisible] = useState(false);
  const showModal = (text: any, record: any) => {
    setDetail(record);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  const handleDownload = (e: any, record: any) => {
    downloadDocument(record.id, record.filename)
      .then(rs => {
        if (rs == undefined) {
          NotificationError('Th???t b???i', 'T???i t??i li???u th???t b???i');
        }
      })
      .catch(() => NotificationError('Th???t b???i', 'T???i t??i li???u th???t b???i'));
  };
  const columns = [
    {
      title: 'T??n',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Ng?????i t???o',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'active',
      key: 'active',
      width: 200,
      render: (text: any, record: any) => {
        return (
          <>
            <>
              <Button
                size="small"
                className="btnIcon"
                icon="download"
                onClick={event => handleDownload(event, record)}
              />
            </>
            <>
              <Button size="small" className="btnIcon" icon="eye" onClick={text => showModal(text, record)}></Button>
            </>
          </>
        );
      },
    },
  ];

  return (
    <ViewDocument>
      <Modal title="Chi ti???t t??i li???u" visible={visible} footer={null} onCancel={close}>
        <Row>
          <Col style={{ color: '#000000' }}>T??n t??i li???u: {detail.name}</Col>
        </Row>
        <p style={{ color: '#000000' }}>T??m t???t n???i dung:</p>
        <p style={{ color: '#000000', marginTop: '-10px' }}>{detail.summary}</p>
        <p style={{ color: '#000000', marginTop: '-10px' }}>File h?????ng d???n</p>
        <Icon type="file-text" style={{ fontSize: '38px', marginTop: '-10px' }} />
        <p>{detail.filename}.docx </p>
      </Modal>

      <h3 className="ContentTab">Danh s??ch t??i li???u h?????ng d???n s??? d???ng</h3>

      <Table
        rowKey="documentId"
        locale={{
          emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
        }}
        dataSource={getDocumentState.rows}
        columns={columns}
        className="custom-table-2"
        pagination={{
          total: getDocumentState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `??ang xem ${range[0]} ?????n ${range[1]} trong t???ng s??? ${total} m???c`,
          current: page,
          pageSize: size,
        }}
      />

      {props.getDocumentState.loading ? <Loading /> : null}
    </ViewDocument>
  );
}

export default connector(Document);
const ViewDocument = styled.div`
  width: 100%;
  .btnIcon {
    margin: 0px 4px;
  }
`;
const IconEye = styled.div`
  padding: 0px 23px;
`;
