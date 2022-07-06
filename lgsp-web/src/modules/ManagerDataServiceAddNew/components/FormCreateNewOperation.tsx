import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { closeFormAddOperation, createOperation, saveEditOperation } from '../redux/actions/create_operation';
import { CreateOperationParams } from '../redux/models';
const { Option } = Select;

const mapState = (rootState: RootState) => ({
  operationState: rootState.createDataService.createOperation,
  queryState: rootState.createDataService.createQuery,
});
const connector = connect(mapState, { closeFormAddOperation, createOperation, saveEditOperation });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function FormCreateNewResource(props: IProps) {
  const { operationState, closeFormAddOperation, createOperation, saveEditOperation, queryState } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const { TextArea } = Input;

  const [queryData, setQueryData] = useState<any>([]);
  const [queryName, setQueryName] = useState(queryState.queries[0]?.name);

  const onCancel = () => {
    closeFormAddOperation();
    resetFields();

    if (queryState.queries[0]) {
      setQueryName(queryState.queries[0].name);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const isDuplicate = operationState.operations.some(e => e.name === values.name);

        if (isDuplicate) {
          NotificationError('Thất bại', 'Operation đã tồn tại');
        } else {
          const param = { ...values };
          createOperation(param);
          NotificationSuccess('Thành công', 'Tạo mới Operation thành công');
          onCancel();
        }
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (
          operationState.operations
            .filter(e => {
              return e.name !== operationState.operationsEdit?.name;
            })
            .some(e => e.name === values.name)
        ) {
          NotificationError('Thất bại', 'Resource đã tồn tại');
        } else {
          const params: CreateOperationParams = {
            ...values,
          };
          NotificationSuccess('Thành công', 'Cập nhật Operation thành công');

          saveEditOperation(params);
          onCancel();
        }
      }
    });
  };

  useEffect(() => {
    if (operationState.isUpdate) {
      setQueryName(operationState.operationsEdit?.queryName || '');
    } else {
      if (queryState.queries[0]) {
        setQueryName(queryState.queries[0].name);
      }
    }
  }, [operationState.isUpdate, operationState.operationsEdit, queryState.isUpdate, queryState.queries]);

  useEffect(() => {
    queryState.queries.map(e => {
      if (e.name === queryName) {
        setQueryData(e.params);
      }
    });
  }, [queryName, queryState.queries]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const columns: ColumnProps<CreateOperationParams>[] = [
    {
      title: 'Tham số Query',
      dataIndex: 'name',
      key: 'nameQuery',
    },
    {
      title: 'Tham số Resource',
      dataIndex: 'name',
      key: 'nameResource',
    },
  ];

  return (
    <Wrapper>
      <Modal
        title={operationState.isUpdate ? 'Cập nhật operation' : 'Tạo operation mới'}
        onCancel={onCancel}
        onOk={handleSubmit}
        visible={operationState.show}
        style={{ top: 10 }}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>Hủy</Button>

            {operationState.isUpdate ? (
              <Button type="primary" onClick={handleUpdate}>
                Lưu
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                Tạo mới
              </Button>
            )}
          </div>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên Operation">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: operationState.operationsEdit?.name || '',
            })(<Input maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Mô tả">
            {getFieldDecorator('description', { initialValue: operationState.operationsEdit?.description || '' })(
              <TextArea rows={4} maxLength={5000} />,
            )}
          </Form.Item>

          <Form.Item label="Tên query">
            {getFieldDecorator('queryName', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: queryName || '',
            })(
              <Select
                onChange={(value: string) => {
                  setQueryName(value);
                }}
              >
                {queryState.queries.map((e, i) => (
                  <Option value={e.name} key={i}>
                    {e.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <h3>Danh sách tham số</h3>

          <Table
            columns={columns}
            dataSource={queryData}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            className="custom-table"
            rowKey="name"
            pagination={false}
          />
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(FormCreateNewResource));

const Wrapper = styled.div`
  color: #232323;
`;
