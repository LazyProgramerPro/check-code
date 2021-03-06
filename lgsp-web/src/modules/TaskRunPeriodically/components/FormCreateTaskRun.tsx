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
        title={taskState.isUpdate ? 'C???p nh???t t??c v??? ?????nh k??' : 'T???o m???i t??c v??? ?????nh k??'}
        onCancel={onCancel}
        onOk={handleSubmit}
        visible={taskState.show}
        maskClosable={false}
        footer={
          <div className="footer">
            <Button onClick={onCancel}>H???y</Button>

            {taskState.isUpdate ? (
              <Button type="primary" onClick={handleUpdate}>
                L??u
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                T???o m???i
              </Button>
            )}
          </div>
        }
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item label="T??n t??c v???">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="S??? l???n ch???y">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label={<LabelStyled>Th???i gian ch???y l???n ti???p</LabelStyled>}>
            {getFieldDecorator('delayTime', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Th???i gian ch???y">
            {getFieldDecorator('startTime', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="" />)}
          </Form.Item>

          <Form.Item label="D???ch v??? d??? li???u">
            {getFieldDecorator('dataServiceId', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
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

          <Form.Item label="T??n Operation">
            {getFieldDecorator('operationName', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
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
