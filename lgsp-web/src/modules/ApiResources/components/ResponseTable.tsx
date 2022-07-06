import React, { useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { IResponseObject } from '../../GroupApiResources/redux/models';
import { Button, Icon, Table } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { ApiResourceResponseEntity, DeleteResponseFromResourceParam, ResourceParam } from '../redux/models';
import { deleteResponseFromResource } from '../redux/actions/api_resource_data';
import DialogEditReponse from './DialogEditReponse';
import styled from 'styled-components';
import { NotificationSuccess } from 'src/components/Notification/Notification';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { deleteResponseFromResource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  data: ApiResourceResponseEntity[];
  resourceData: ResourceParam;
}

const View = styled.div`
  width: 100%;
  .btnIcon {
    margin: 0px 4px;
  }
  .ant-table-row-cell-break-word {
    .anticon svg {
      margin: 3px;
    }
  }
`;

const ResponseTable = (props: IProps) => {
  const [page, setPage] = useState(1);
  const [size] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);

  const [paramEdit, setParamEdit] = useState<any>({});

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onEdit = (record: any) => {
    setParamEdit(record);
    handleOpenDialog();
  };

  const onDelete = (record: any) => {
    const param: DeleteResponseFromResourceParam = {
      code: record.code,
      resource: {
        path: props.resourceData.path,
        method: props.resourceData.method,
      },
    };
    props.deleteResponseFromResource(param);
    NotificationSuccess('Thành công', 'Cập nhật Resource chia sẻ thành công');
  };

  const columns: ColumnProps<IResponseObject>[] = [
    {
      title: 'Mã code',
      dataIndex: 'code',
      key: 'code',
      width: '30%',
    },
    {
      title: 'Message trả về',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
    },
    {
      title: 'Hành động',
      width: '18%',
      key: 'action',
      render: (_text: string, record: IResponseObject) => (
        <div>
          <Button size="small" className="btnIcon" icon="eye" onClick={() => onEdit(record)}/>
          <Button size="small" className="btnIcon" icon="delete" onClick={() => onDelete(record)}/>
        </div>
      ),
    },
  ];

  return (
    <View>
      <DialogEditReponse
        visible={openDialog}
        onClose={handleCloseDialog}
        paramEdit={paramEdit}
        data={props.resourceData}
      />
      <Table
        rowKey="code"
        className="custom-table"
        columns={columns}
        dataSource={props.data}
        locale={{
          emptyText: 'Không tìm thấy kết quả tương ứng',
        }}
        pagination={{
          current: page,
          pageSize: size,
          total: props.data.length,
          onChange: page => setPage(page),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </View>
  );
};

export default connector(ResponseTable);
