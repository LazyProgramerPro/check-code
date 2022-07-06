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
        //   NotificationError('Operation đã tồn tại', '');
        //   return;
        // }
        const param = { ...values };
        createOperation(param);
        NotificationSuccess('Thành công', 'Tạo mới Operation thành công');
        onCancel();
      }
    });
  };
  const checkValidateOperation = (e: any, text: any, callback: any) => {
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên operation không hợp lệ');
    }
    let dts = props.operationState.operations || [];
    const rs = dts.some(e => e.name === text);
    if (rs) {
      return callback('Operation đã tồn tại');
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
      title: 'Tham số Query',
      dataIndex: 'name',
      key: 'nameQuery',
      ellipsis: true,
    },
    {
      title: 'Tham số Resource',
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
        title="Tạo mới Operation"
        onCancel={onCancel}
        onOk={handleSubmit}
        afterClose={afterModalClose}
        visible={props.show}
        maskClosable={false}
        style={{ top: 10 }}
        footer={
          <StyledButton>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </StyledButton>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên Operation">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Đây là trường bắt buộc nhập' },
                { validator: checkValidateOperation },
              ],
              initialValue: '',
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} />)}
          </Form.Item>

          <Form.Item label="Mô tả">
            {getFieldDecorator('description', {
              initialValue: '',
              rules: [{ validator: validateDescription }],
              validateTrigger: 'onBlur',
            })(<TextArea rows={4} maxLength={5000} onPaste={pasteDescription} />)}
          </Form.Item>

          <Form.Item label="Tên query">
            {getFieldDecorator('queryName', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              // initialValue: queryName || '',
            })(
              <Select onChange={onSelectQueryChange} placeholder="Chọn">
                {queryState.queries?.map((e, i) => (
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
            // locale={{emptyText: <h4>Không có dữ liệu</h4>}}
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
