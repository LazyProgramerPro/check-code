import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { closeFormAddTask, createTask, getListDataService, getListOperation } from '../redux/actions/task';
import { GetListTaskParams, ListDataService } from '../redux/models';
const { Option } = Select;

const mapState = (rootState: RootState) => ({
  taskState: rootState.taskRunPeriodically.taskState,
});
const connector = connect(mapState, { closeFormAddTask, getListDataService, getListOperation, createTask });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

const initListDataService: ListDataService = {
  id: '',
  name: '',
  description: '',
  dataSources: [],
  dataSourceConfigs: [],
  multipartFileList: undefined,
  operations: [],
  queries: [],
  resources: [],
  file: [],
};

function FormCreateTaskRun(props: IProps) {
  const { taskState, closeFormAddTask, getListDataService, getListOperation, createTask } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [listDataService, setListDataService] = useState<ListDataService[]>([] as typeof initListDataService[]);
  const [dataServiceSelected, setDataServiceSelected] = useState<string>('');

  const [listOperation, setListOperation] = useState<string[]>([]);
  const [operationSelected, setOperationSelected] = useState<string>('');

  const onCancel = () => {
    closeFormAddTask();
    resetFields();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        createTask({ ...values, startTime: values['startTime'].format('YYYY-MM-DD HH:mm:ss') });
        onCancel();
      }
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  useEffect(() => {
    const params: GetListTaskParams = {
      page: 0,
      size: 100,
      text: '',
    };
    getListDataService(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectDataService = (value: any) => {
    setDataServiceSelected(value);
  };

  useEffect(() => {
    setListDataService(taskState.listDataService || []);

    if (listDataService.length > 0) {
      setDataServiceSelected(listDataService[0].id || '');
    }
  }, [listDataService, taskState.listDataService]);

  useEffect(() => {
    getListOperation(dataServiceSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceSelected]);

  useEffect(() => {
    setListOperation(taskState.listOperation || []);

    if (listOperation.length > 0) {
      setOperationSelected(listOperation[0]);
    } else {
      setOperationSelected('');
    }
  }, [listOperation, taskState.listOperation]);

  return (
    <Wrapper>
      <Modal
        title={taskState.isUpdate ? 'Cập nhật tác vụ định kì' : 'Tạo mới tác vụ định kì'}
        onCancel={onCancel}
        onOk={handleSubmit}
        visible={taskState.show}
        maskClosable={false}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>Hủy</Button>

            {taskState.isUpdate ? (
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
        <Form {...formItemLayout} layout="vertical">
          <Form.Item label="Tên tác vụ">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số lần chạy">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label={<LabelStyled>Thời gian chạy lần tiếp</LabelStyled>}>
            {getFieldDecorator('delayTime', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Thời gian chạy">
            {getFieldDecorator('startTime', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="" />)}
          </Form.Item>

          <Form.Item label="Dịch vụ dữ liệu">
            {getFieldDecorator('dataServiceId', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: dataServiceSelected,
            })(
              <Select onChange={selectDataService}>
                {listDataService.map((e: any) => (
                  <Option value={e.id} key={e.id}>
                    {e.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Tên Operation">
            {getFieldDecorator('operationName', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              initialValue: operationSelected,
            })(
              <Select>
                {listOperation.map((e: string, i: any) => (
                  <Option value={e} key={i}>
                    {e}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(FormCreateTaskRun));

const Wrapper = styled.div`
  color: #232323;
`;

const LabelStyled = styled.span`
  max-height: 30px;
`;
