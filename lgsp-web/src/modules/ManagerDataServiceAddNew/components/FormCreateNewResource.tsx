import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { closeFormAddResource, createResource, saveEditResource } from '../redux/actions/create_resource';
import { CreateResourceParams } from '../redux/models';
import { v4 as uuidv4 } from 'uuid';
const { Option } = Select;

const mapState = (rootState: RootState) => ({
  resourceState: rootState.createDataService.createResource,
  queryState: rootState.createDataService.createQuery,
});
const connector = connect(mapState, { closeFormAddResource, createResource, saveEditResource });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function FormCreateNewResource(props: IProps) {
  const { resourceState, closeFormAddResource, createResource, saveEditResource, queryState } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const { TextArea } = Input;

  const [queryData, setQueryData] = useState<any>([]);
  const [queryName, setQueryName] = useState(queryState.queries[0]?.name);

  const onCancel = () => {
    closeFormAddResource();
    resetFields();

    if (queryState.queries[0]) {
      setQueryName(queryState.queries[0].name);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const isDuplicate = resourceState.resources.some(e => e.path === values.path && e.method === values.method);

        if (isDuplicate) {
          NotificationError('Thất bại', 'Resource đã tồn tại');
        } else {
          const param = { ...values, id: uuidv4() };
          createResource(param);
          NotificationSuccess('Thành công', 'Tạo mới resource thành công');
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
          resourceState.resources
            .filter(e => {
              return e.path !== resourceState.resourcesEdit?.path || e.method !== resourceState.resourcesEdit?.method;
            })
            .some(e => e.method === values.method && e.path === values.path)
        ) {
          NotificationError('Thất bại', 'Resource đã tồn tại');
        } else {
          const params: CreateResourceParams = {
            ...values,
          };
          NotificationSuccess('Thành công', 'Cập nhật resource thành công');

          // saveEditResource(params);
          onCancel();
        }
      }
    });
  };

  useEffect(() => {
    if (resourceState.isUpdate) {
      setQueryName(resourceState.resourcesEdit?.queryName || '');
    } else {
      if (queryState.queries[0]) {
        setQueryName(queryState.queries[0].name);
      }
    }
  }, [queryState.isUpdate, queryState.queries, resourceState.isUpdate, resourceState.resourcesEdit]);

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
  const columns: ColumnProps<any>[] = [
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
        title={resourceState.isUpdate ? 'Cập nhật Resource' : 'Tạo mới Resource'}
        onCancel={onCancel}
        onOk={resourceState.isUpdate ? handleUpdate : handleSubmit}
        visible={resourceState.show}
        style={{ top: 10 }}
        width={650}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>Hủy</Button>

            {resourceState.isUpdate ? (
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
          <Form.Item label="Path">
            {getFieldDecorator('path', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: resourceState.resourcesEdit?.path || '',
            })(<Input maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Mô tả">
            {getFieldDecorator('description', { initialValue: resourceState.resourcesEdit?.description || '' })(
              <TextArea rows={4} maxLength={5000} />,
            )}
          </Form.Item>

          <Form.Item label="Phương thức">
            {getFieldDecorator('method', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: resourceState.resourcesEdit?.method || 'GET',
            })(
              <Select>
                <Option value="GET">GET</Option>
                <Option value="PUT">PUT</Option>
                <Option value="POST">POST</Option>
                <Option value="DELETE">DELETE</Option>
              </Select>,
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
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            className="custom-table"
            rowKey="table"
            columns={columns}
            dataSource={queryData}
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
