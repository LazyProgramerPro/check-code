import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { createOperation } from '../../redux/actions/create_operation';
import { CreateOperationParams } from '../../redux/models';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  operationState: rootState.createDataService.createOperation,
  queryState: rootState.createDataService.createQuery,
});

const mapDispatchToProps = {
  createOperation,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux, FormComponentProps {
  show: boolean;
  close: (value: boolean) => void;
}

function CFormCreateOperation(props: IProps) {
  const { createOperation, queryState, operationState } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const { TextArea } = Input;

  const [queryData, setQueryData] = useState<any>([]);
  const [queryName, setQueryName] = useState('');

  useEffect(() => {
    if (props.show && props.queryState.queries.length > 0) {
      onSelectQueryChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  const onSelectQueryChange = (name: string) => {
    setQueryName(name);
    if (props.queryState.queries && props.queryState.queries.length > 0) {
      for (let i = 0; i < props.queryState.queries.length; i++) {
        if (props.queryState.queries[i].name === name) {
          let p = props.queryState.queries[i]?.params || [];
          setQueryData(p);
          break;
        }
      }
    }
  };

  const onCancel = () => {
    props.close(false);
    // resetFields();
    // setQueryData([]);
    // setQueryName('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // const isDuplicate = operationState.operations.some(e => e.name === values.name);
        // if (isDuplicate) {
        //   NotificationError('Operation ???? t???n t???i', '');
        //   return;
        // }
        const param = { ...values };
        createOperation(param);
        NotificationSuccess('Th??nh c??ng', 'T???o m???i Operation th??nh c??ng');
        onCancel();
      }
    });
  };
  const checkValidateOperation = (e: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n operation kh??ng h???p l???');
    }
    let dts = props.operationState.operations || [];
    const rs = dts.some(e => e.name === text);
    if (rs) {
      return callback('Operation ???? t???n t???i');
    }
    return callback();
  };

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
      title: 'Tham s??? Query',
      dataIndex: 'name',
      key: 'nameQuery',
      ellipsis: true,
    },
    {
      title: 'Tham s??? Resource',
      dataIndex: 'name',
      key: 'nameResource',
      ellipsis: true,
    },
  ];

  const afterModalClose = () => {
    resetFields();
    setQueryData([]);
    setQueryName('');
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    const checkDescription = value.trim();
    props.form.setFields({
      description: {
        value: checkDescription,
      },
    });
    return true;
  };

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title="T???o m???i Operation"
        onCancel={onCancel}
        onOk={handleSubmit}
        afterClose={afterModalClose}
        visible={props.show}
        maskClosable={false}
        style={{ top: 10 }}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>H???y</Button>
            <Button type="primary" onClick={handleSubmit}>
              T???o m???i
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="T??n Operation">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                { validator: checkValidateOperation },
              ],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="M?? t???">
            {getFieldDecorator('description', {
              initialValue: '',
              rules: [{ validator: validateDescription }],
              validateTrigger: 'onBlur',
            })(<TextArea rows={4} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item label="T??n query">
            {getFieldDecorator('queryName', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
              // initialValue: queryName || '',
            })(
              <Select onChange={onSelectQueryChange} placeholder="Ch???n">
                {queryState.queries?.map((e, i) => (
                  <Option value={e.name} key={i}>
                    {e.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <h3>Danh s??ch tham s???</h3>

          <Table
            columns={columns}
            dataSource={queryData}
            locale={{
              emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
            }}
            // locale={{emptyText: <h4>Kh??ng c?? d??? li???u</h4>}}
            className="custom-table"
            rowKey="name"
            pagination={false}
          />
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(CFormCreateOperation));

const Wrapper = styled.div`
  color: #232323;
`;
const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
