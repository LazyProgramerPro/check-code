import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import FormXMLEditor from './FormXMLEditor';
import { DeleteDataServiceParam } from 'src/modules/ManagerDataServiceList/redux/models';
import { deleteDataService } from 'src/modules/ManagerDataServiceList/redux/service/api';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import Loading from 'src/components/Loading';

interface HeaderProps {
  isUpdate: boolean;
}

interface Param {
  dataServiceId: string;
}

export default function Header(props: HeaderProps) {
  const { isUpdate } = props;
  const titleAdd = 'Tạo mới dịch vụ dữ liệu';
  const titleUpdate = 'Cập nhật dịch vụ dữ liệu';

  const [openForm, setOpenForm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const param: Param = useParams();
  const history = useHistory();

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      content: 'Bạn có xác nhận muốn xóa bản ghi này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        setLoadingDelete(true);
        const paramDelete: DeleteDataServiceParam = {
          id: param.dataServiceId,
        };

        deleteDataService(paramDelete)
          .then(res => {
            if (res.code === 0) {
              setLoadingDelete(false);
              NotificationSuccess('Thành công', 'Xóa thành công');
              history.replace('/manager-data-services/manager-data-services');
              return;
            }

            setLoadingDelete(false);
            NotificationError('Thất bại', res.message);
          })
          .catch(err => {
            setLoadingDelete(false);
            NotificationError('Thất bại', err.message);
          });
      },
      onCancel() {},
    });
  };

  return (
    <Wrapper>
      {isUpdate ? (
        <div className="update">
          <div>{titleUpdate}</div>

          <div className="containerButton">
            <Button onClick={handleOpen}>XML Editor</Button>
            <Button className="btnDelete" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </div>
      ) : (
        <p>{titleAdd}</p>
      )}

      <FormXMLEditor visible={openForm} dataServiceId={param.dataServiceId} onClose={handleClose}></FormXMLEditor>
      {loadingDelete && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 52px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;

  p {
    margin: 0px;
  }
  .update {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btnDelete {
      color: #ff6060;
      border: 1px solid #ff6060;
    }
  }
`;
