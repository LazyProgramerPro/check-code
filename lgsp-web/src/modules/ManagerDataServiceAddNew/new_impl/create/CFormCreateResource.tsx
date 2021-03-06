import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NotificationError } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import { createResource } from '../../redux/actions/create_resource';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';
import { v4 as uuidv4 } from 'uuid';
const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  queryState: rootState.createDataService.createQuery,
  resourceState: rootState.createDataService.createResource,
});

const mapDispatchToProps = {
  createResource,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  close: (value: boolean) => void;
}

function CFormCreateResource(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;

  const { TextArea } = Input;

  const [queryData, setQueryData] = useState<any>([]);
  const [queryName, setQueryName] = useState('');

  const [valueMethod, setValueMethod] = useState('GET');
  const onChangeMethod = (value: any) => {
    setValueMethod(value);
  };

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
        const param = { ...values, id: uuidv4() };
        props.createResource(param);
        NotificationSuccess('Th??nh c??ng', 'T???o m???i resource th??nh c??ng');
        console.log('id', param.id);
        onCancel();
      }
    });
  };

  const checkValidateResource = (e: any, text: any, callback: any) => {
    let dts = props.resourceState.resources || [];
    const path = props.form.getFieldValue('path');
    const isValid: boolean = validateNormalString(path);
    if (!isValid) {
      // return callback('T??n Resource kh??ng h???p l???');
      props.form.setFields({
        path: {
          value: path,
          errors: [new Error('T??n Resource kh??ng h???p l???')],
        },
        method: {},
      });
      return;
    }

    const method = props.form.getFieldValue('method');
    const rs = dts.some(e => e.path === path && e.method === method);
    if (rs) {
      return callback('Resource ???? t???n t???i');
    }

    props.form.setFields({
      path: {
        value: path,
      },
      method: {
        value: method,
      },
    });

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

  const columns: ColumnProps<any>[] = [
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
        title="T???o m???i Resource"
        onCancel={onCancel}
        onOk={handleSubmit}
        afterClose={afterModalClose}
        visible={props.show}
        maskClosable={false}
        style={{ top: 10 }}
        width={650}
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
          <Form.Item label="Path">
            {getFieldDecorator('path', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                { validator: checkValidateResource },
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

          <Form.Item label="Ph????ng th???c">
            {getFieldDecorator('method', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
                { validator: checkValidateResource },
              ],
              initialValue: 'GET',
            })(
              <Select optionFilterProp="children" allowClear={true} onChange={onChangeMethod}>
                <Option value="GET">GET</Option>
                <Option value="PUT">PUT</Option>
                <Option value="POST">POST</Option>
                <Option value="DELETE">DELETE</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="T??n query">
            {getFieldDecorator('queryName', {
              rules: [
                {
                  required: true,
                  message: '????y l?? tr?????ng b???t bu???c nh???p',
                },
              ],
              // initialValue: queryName || '',
            })(
              <Select onChange={onSelectQueryChange} placeholder="Ch???n">
                {props.queryState.queries?.map((e, i) => (
                  <Option value={e.name} key={i}>
                    {e.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <h3>Danh s??ch tham s???</h3>

          <Table
            locale={{
              emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
            }}
            // locale={{emptyText: <h4>Kh??ng c?? d??? li???u</h4>}}
            className="custom-table"
            rowKey="name"
            columns={columns}
            dataSource={queryData}
            pagination={false}
          />
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(CFormCreateResource));

const Wrapper = styled.div`
  color: #232323;
`;

const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
