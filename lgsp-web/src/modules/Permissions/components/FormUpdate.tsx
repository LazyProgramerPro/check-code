import { Button, Checkbox, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import {
  createPermission,
  getListDeploymentUnit,
  getListUsers,
  selectAll,
  updatePermission,
} from '../redux/service/api';
import { paramsCreatePermission, paramsGetList, Permission } from '../redux/service/models';
import { validateNormalString } from 'src/constants/common';

const { Option } = Select;

interface FormUpdateProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  reload: Function;
  setLoading: Function;
  paramsUpdate: Permission;
  loading?: Boolean;
}

interface Account {
  id: string;
  username: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 19 },
  },
};

function FormUpdate(props: FormUpdateProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose, reload, setLoading, paramsUpdate, loading } = props;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [valueSearch, setValueSearch] = useState('');

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [users, setUsers] = useState<any>([]);
  const [deploymentUnit, setDeploymentUnit] = useState<string[]>([]);

  const [loadingUser, setLoadingUser] = useState(false);

  const [usersOld, setUsersOld] = useState<any>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const params: paramsCreatePermission = {
          ...values,
          users: users,
          permissionId: paramsUpdate.id,
        };

        updatePermission(params)
          .then(res => {
            setLoading(false);

            if (res.code === 0) {
              NotificationSuccess('Th??nh c??ng', 'C???p nh???t quy???n th??nh c??ng');
              handleClose();
              reload();
              return;
            }

            NotificationError('Th???t b???i', res.message);
          })
          .catch(err => {
            // handleClose();
            // reload();

            setLoading(false);
            NotificationError('Th???t b???i', err.message);
            console.log('err: ', err);
          });
      }
    });
  };

  const handleClose = () => {
    onClose();
    resetFields();
    // setUsers([]);

    // setPage(1);
    // setValueSearch('');
  };

  const afterModalClose = () => {
    resetFields();
    // setUsers([]);
    setPage(1);
    setValueSearch('');
    try {
      setLoadingUser(true);
      const params: paramsGetList = {
        page: page,
        size: size,
        text: '',
      };

      const response = getListUsers(params);
      response
        .then(res => {
          setAccounts(res.rows);
          setTotalAccounts(res.total);
          setLoadingUser(false);
        })
        .catch(err => {
          setLoadingUser(false);
          console.log('err: ', err);
        });
    } catch (error) {
      setLoadingUser(false);
      console.log('error: ', error);
    }
  };

  const onClickRowCheckList = (text: any, params: any) => {
    const newArr = [...users];
    const isChecked = newArr.some((e: any) => e === params.id);
    if (isChecked) {
      const newUsers = newArr.filter((e: any) => e !== params.id);
      setUsers(newUsers);
      setUsersOld(newUsers);

      return;
    }

    newArr.push(params.id);
    setUsers(newArr);
    setUsersOld(newArr);
  };

  const checkAll = () => {
    recursiveCheckAll(1, 1, []);
  };

  const recursiveCheckAll = (length: number, pageIndex: number, rs: any) => {
    setLoadingUser(true);

    if (length > 0) {
      try {
        const params: paramsGetList = {
          page: pageIndex,
          size: 100,
          text: '',
        };
        const response = getListUsers(params);
        response
          .then(res => {
            if (res.rows.length > 0) {
              const ids = res.rows.map((e: any) => e.id);
              const newRs = [...rs, ...ids];

              setUsers(newRs);
              recursiveCheckAll(res.rows.length, pageIndex + 1, newRs);
            } else {
              setLoadingUser(false);

              return rs;
            }
          })
          .catch(err => {
            console.log('err: ', err);
          });
      } catch (error) {
        setLoadingUser(false);
        console.log('error: ', error);
      }
    }

    return rs;
  };

  const cancelCheckAll = () => {
    setUsersOld([]);
    setUsers([]);
  };

  const onChangeSearchInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    handleGetPermissionListComponents();
  };

  const handleGetPermissionListComponents = () => {
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['text']);
    try {
      setLoadingUser(true);
      const params: paramsGetList = {
        page: page,
        size: size,
        text: encodeURI(valueSearch.trim()),
      };

      const response = getListUsers(params);
      response
        .then(res => {
          setAccounts(res.rows);
          setTotalAccounts(res.total);
          setLoadingUser(false);
        })
        .catch(err => {
          setLoadingUser(false);
          console.log('err: ', err);
        });
    } catch (error) {
      setLoadingUser(false);
      console.log('error: ', error);
    }
  };

  const checkBoxAll = (e: any) => {
    e.preventDefault();
    const response = selectAll(encodeURI(valueSearch.trim()));
    response
      .then(res => {
        if (res.rows.length > 0) {
          const ids = res.rows.map((e: any) => e.id);
          const newRs = [...Array.from(new Set([...users, ...ids]))];
          console.log('LINH ~ checkBoxAll ~ newRs', newRs);
          setUsers(newRs);
        } else {
          setLoadingUser(false);
        }
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };

  useEffect(() => {
    // setUsersOld(users);
    handleGetPermissionListComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // list users checked
  useEffect(() => {
    // if (usersOld.length === 0) {
    //   setUsers([]);
    //   return;
    // }

    let newArr: any = [];
    accounts.filter(e => {
      if (usersOld.includes(e.username)) {
        newArr = [...newArr, e.id];
      }
    });

    setUsers(Array.from(new Set([...users, ...newArr])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, usersOld]);

  useEffect(() => {
    setUsersOld(paramsUpdate.users);
  }, [paramsUpdate.users]);

  // get list deployment unit
  useEffect(() => {
    getListDeploymentUnit()
      .then(res => {
        setDeploymentUnit(res.rows);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }, []);

  const validateName = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0 || text == '') {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('T??n quy???n kh??ng h???p l???');
    }
    return callback();
  };

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => {
        return (
          <Checkbox className="rowItem" onClick={() => onClickRowCheckList(text, record)} value={record.id}>
            {record.username}
          </Checkbox>
        );
      },
    },
  ];
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      text: {
        value: checkText,
      },
    });
    return true;
  };

  const pasteSearchName = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim(),
      },
    });
  };

  return (
    <Wrapper>
      <Modal
        title="C???p nh???t quy???n"
        visible={visible}
        onCancel={handleClose}
        afterClose={afterModalClose}
        maskClosable={false}
        footer={
          <ButtonFooter>
            <Button onClick={handleClose}>H???y</Button>

            <Button type="primary" onClick={handleSubmit}>
              C???p nh???t
            </Button>
          </ButtonFooter>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="T??n quy???n">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateName }],
              initialValue: paramsUpdate.name,
            })(<Input maxLength={255} disabled={true} />)}
          </Form.Item>

          <Form.Item label="????n v??? d??ng">
            {getFieldDecorator('organization', {
              initialValue: paramsUpdate.organization,
            })(
              <Select showSearch allowClear={true} placeholder="Ch???n">
                {deploymentUnit?.map((e: any, i: any) => (
                  <Select.Option key={i} value={e}>
                    {e}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Form>

        <div className="title" style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          G??n quy???n cho ng?????i d??ng
        </div>
        <Container>
          <Form>
            <Form.Item>
              {props.form.getFieldDecorator('text', {
                initialValue: valueSearch,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateTextSearch }],
              })(
                <Input
                  className="inputSearch"
                  placeholder="T??n t??i kho???n"
                  onChange={onChangeSearchInput}
                  value={valueSearch}
                  maxLength={255}
                  onPaste={pasteSearchName}
                ></Input>,
              )}

              <Button htmlType="submit" shape="circle" icon="search" className="icon" onClick={handleSearch} />
            </Form.Item>
          </Form>

          <div className="containerButton">
            <Button onClick={checkBoxAll} className="clickAllOption">
              Ch???n t???t c???
            </Button>

            <Button onClick={cancelCheckAll}>B??? ch???n</Button>
          </div>
        </Container>

        <Checkbox.Group value={users} style={{ width: '100%' }}>
          <StyledTable
            loading={loadingUser}
            className="custom-table"
            columns={columns}
            dataSource={accounts}
            locale={{
              emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
            }}
            pagination={{
              current: page,
              pageSize: size,
              total: totalAccounts,
              size: 'small',
              onChange: page => setPage(page),
              showTotal: (total, range) => `??ang xem ${range[0]} ?????n ${range[1]} / ${total} m???c`,
            }}
          />
        </Checkbox.Group>

        {loading && <Loading />}
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormUpdateProps>()(FormUpdate);

const Wrapper = styled.div`
  .title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const ButtonFooter = styled.div`
  margin-top: -35px;
  padding-bottom: 20px;
  margin-right: 10px;
`;
const StyledTable = styled(Table)`
  margin-top: 4px;
  table th {
    display: none;
  }

  td {
    padding: 0px !important;
  }

  .rowItem {
    width: 100%;
    padding: 8px;
    cursor: pointer;
  }
  .custom-table-2 .ant-pagination-total-text {
    margin-right: -4px !important;
    padding-left: 0px;
  }
  .ant-pagination.mini .ant-pagination-total-text {
    margin-right: -4px !important;
    padding-left: 0px;
  }
`;

const Container = styled.div`
  display: flex;

  .inputSearch {
    width: 250px;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #ccc;
  }

  .icon {
    border: none;
    margin-left: -28px;
    background: transparent;
  }

  .containerButton {
    width: 49%;
    .clickAllOption {
      margin-left: 44px;
      margin-right: 14px;
    }
  }
`;
