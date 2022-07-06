import React, { useState } from 'react';
import { Button, Icon, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IParamObject } from '../../GroupApiResources/redux/models';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import {
  AddParameterToResourceParam,
  ApiResourceParamEntity,
  DeleteParameterFromResourceParam,
  ResourceParam,
} from '../redux/models';
import { deleteParameterFromResource } from '../redux/actions/api_resource_data';
import DialogEditParam from './DialogEditParam';
import styled from 'styled-components';
import { NotificationSuccess } from 'src/components/Notification/Notification';

const mapStateToProps = (rootState: RootState) => ({
  dataState: rootState.apiResource.dataState,
});

const connector = connect(mapStateToProps, { deleteParameterFromResource });
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
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  data: ApiResourceParamEntity[];
  resourceData: ResourceParam;
}

const ParamTable = (props: IProps) => {
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
    const param: DeleteParameterFromResourceParam = {
      name: record.name,
      in: record.in,
      resource: {
        path: props.resourceData.path,
        method: props.resourceData.method,
      },
    };
    props.deleteParameterFromResource(param);
    NotificationSuccess('Thành công', 'Cập nhật Resource chia sẻ thành công');
  };

  const columns: ColumnProps<IParamObject>[] = [
    {
      title: 'Loại tham số',
      dataIndex: 'in',
      key: 'in',
      render: (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      },
    },
    {
      title: 'Tên tham số/Định dạng dữ liệu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        if (text == '') {
          return '';
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
      },
    },
    {
      title: 'Bắt buộc',
      dataIndex: 'required',
      key: 'required',
      render: (_text: boolean) => <span>{_text ? 'Bắt buộc' : 'Không bắt buộc'}</span>,
    },
    {
      title: 'Hành động',
      width: '18.5%',
      key: 'action',
      render: (_text: string, record: IParamObject, index: number) => {
        if (record.in == 'body') {
          return (
            <div>
              <Button size="small" className="btnIcon" icon="eye" disabled={true} />
              <Button size="small" className="btnIcon" icon="delete" onClick={() => onDelete(record)} />
            </div>
          );
        } else {
          return (
            <div>
              <Button size="small" className="btnIcon" icon="eye" onClick={() => onEdit(record)} />
              <Button size="small" className="btnIcon" icon="delete" onClick={() => onDelete(record)} />
            </div>
          );
        }
      },
    },
  ];

  return (
    <View>
      <DialogEditParam
        visible={openDialog}
        onClose={handleCloseDialog}
        paramEdit={paramEdit}
        data={props.resourceData}
      />
      <Table
        rowKey="name"
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

export default connector(ParamTable);
