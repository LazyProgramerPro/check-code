import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NotificationError } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import { saveEditResource } from '../../redux/actions/create_resource';
import { connect, ConnectedProps } from 'react-redux';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;

const mapStateToProps = (rootState: RootState) => ({
  queryState: rootState.createDataService.createQuery,
  resourceState: rootState.createDataService.createResource,
});

const mapDispatchToProps = {
  saveEditResource,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, PropsFromRedux {
  show: boolean;
  close: (value: boolean) => void;
  item: any;
}

function UFormCreateResource(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;

  const { TextArea } = Input;

  const [queryData, setQueryData] = useState<any>([]);
  const [queryName, setQueryName] = useState('');

  useEffect(() => {
    if (props.show && props.queryState.queries.length > 0) {
      onSelectQueryChange(props.item.queryName);
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
        // let oldPath = props.item.path;
        // if (values.path !== oldPath) {
        //   NotificationError('Th???t b???i', 'Vui l??ng kh??ng s???a path resource');
        //   return;
        // }
        // const param = { ...values };
        props.saveEditResource({ ...values, id: props.item.id });
        // NotificationSuccess('Th???t b???i', 'C???p nh???t resource th??nh c??ng');
        onCancel();
      }
    });
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
  const checkValidateResource = (e: any, text: any, callback: any) => {
    let dts = props.resourceState.resources || [];
    const path = props.form.getFieldValue('path');
    const isValid: boolean = validateNormalString(path);
    if (!isValid) {
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
    if (props.item.path === path && props.item.method === method) {
      return true;
    } else {
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
    }

    return callback();
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
        title="C???p nh???t Resource"
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
              L??u
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
              initialValue: props.item.path || '',
              validateTrigger: 'onBlur',
            })(<Input maxLength={50} disabled={true} />)}
          </Form.Item>

          <Form.Item label="M?? t???">
            {getFieldDecorator('description', {
              initialValue: props.item.description || '',
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
              initialValue: props.item.method || 'GET',
            })(
              <Select>
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
              initialValue: queryName || '',
            })(
              <Select onChange={onSelectQueryChange}>
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
            // locale={{emptyText: <h4>Kh??ng c?? d??? li???u</h4>}}
            locale={{
              emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
            }}
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

export default connector(Form.create<IProps>()(UFormCreateResource));

const Wrapper = styled.div`
  color: #232323;
`;
const StyledButton = styled.div`
  margin-top: -15px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
