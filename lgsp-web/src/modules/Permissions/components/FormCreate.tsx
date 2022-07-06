import { Button, Checkbox, Form, Input, Modal, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import styled from 'styled-components';
import {
  createPermission,
  getListDeploymentUnit,
  getListUsers,
  selectAll,
  validateNamePermission,
} from '../redux/service/api';
import { paramsCreatePermission, ParamSearch, paramsGetList } from '../redux/service/models';
import Loading from 'src/components/Loading';
import { validateNormalString } from 'src/constants/common';

interface FormCreateProps extends FormComponentProps {
  visible: boolean;
  onClose: Function;
  reload: Function;
  setLoading: Function;
  loading?: Boolean;
  refreshList: Function;
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

function FormCreate(props: FormCreateProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { visible, onClose, reload, setLoading, loading, refreshList } = props;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [valueSearch, setValueSearch] = useState('');
  const [checkClickAll, setCheckClickAll] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [users, setUsers] = useState<any>([]);
  const [deploymentUnit, setDeploymentUnit] = useState<string[]>([]);

  const [loadingUser, setLoadingUser] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);

        const params: paramsCreatePermission = {
          ...values,
          users: users,
        };

        createPermission(params)
          .then(res => {
            setLoading(false);

            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Tạo mới quyền thành công');
              refreshList();
              handleClose();
              reload();
              return;
            }

            NotificationError('Thất bại', res.message);
          })
          .catch(err => {
            // handleClose();
            // reload();

            setLoading(false);
            NotificationError('Thất bại', err.message);
            console.log('err: ', err);
          });
      }
    });
  };

  const handleClose = () => {
    onClose();
    resetFields();
    setUsers([]);
    setValueSearch('');
  };

  const afterModalClose = () => {
    resetFields();
    setUsers([]);
    setValueSearch('');
    setPage(1);
    handleGetPermissionListComponents();
  };

  const onChangeChecklist = (value: any) => {
    // console.log('value: ', value);
    // setUsers(value);
  };

  const onClickRowCheckList = (text: any, params: any) => {
    const newArr = [...users];
    const isChecked = newArr.some((e: any) => e === params.id);
    if (isChecked) {
      const newUsers = newArr.filter((e: any) => e !== params.id);
      setUsers(newUsers);
      return;
    }

    newArr.push(params.id);
    setUsers(newArr);
  };

  const checkAll = () => {
    recursiveCheckAll(1, 1, []);
    // setCheckClickAll(1);
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
    setUsers([]);
  };

  const onChangeSearchInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    // if (checkClickAll === 1) {

    // }
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
          // setUsers([]);
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

  useEffect(() => {
    handleGetPermissionListComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      return callback('Tên quyền không hợp lệ');
    }
    validateNamePermission(text).then(rs => {
      if (rs.code != 0) {
        callback('Quyền đã tồn tại');
      } else {
        callback();
      }
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => {
        return (
          <Checkbox className="rowItem" value={record.id} onClick={() => onClickRowCheckList(text, record)}>
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

  const checkBoxAll = (e: any) => {
    e.preventDefault();
    // const params: ParamSearch = {
    //   key: encodeURI(valueSearch.trim()),
    // };
    // console.log('LINH ~ checkBoxAll ~ params', params);
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

  return (
    <Wrapper>
      <Modal
        title="Tạo mới quyền"
        visible={visible}
        onCancel={handleClose}
        afterClose={afterModalClose}
        maskClosable={false}
        footer={
          <ButtonFooter>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Tạo mới
            </Button>
          </ButtonFooter>
        }
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tên quyền">
            {getFieldDecorator('name', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
              initialValue: '',
            })(<Input maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Đơn vị dùng">
            {getFieldDecorator('organization', {
              // initialValue: '',
            })(
              <Select showSearch placeholder="Chọn" allowClear={true}>
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
          Gán quyền cho người dùng
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
                  placeholder="Tên tài khoản"
                  onChange={onChangeSearchInput}
                  value={valueSearch}
                  maxLength={255}
                  onPaste={pasteSearchName}
                />,
              )}
              <Button htmlType="submit" shape="circle" icon="search" className="icon" onClick={handleSearch} />
            </Form.Item>
          </Form>

          <div className="containerButton">
            <Button onClick={checkBoxAll} className="clickAllOption">
              Chọn tất cả
            </Button>

            <Button onClick={cancelCheckAll}>Bỏ chọn</Button>
          </div>
        </Container>

        <Checkbox.Group value={users} onChange={onChangeChecklist} style={{ width: '100%' }}>
          <StyledTable
            loading={loadingUser}
            className="custom-table-2"
            columns={columns}
            dataSource={accounts}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            pagination={{
              current: page,
              pageSize: size,
              total: totalAccounts,
              size: 'small',
              onChange: page => setPage(page),
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} / ${total} mục`,
            }}
          />
        </Checkbox.Group>

        {loading && <Loading />}
      </Modal>
    </Wrapper>
  );
}

export default Form.create<FormCreateProps>()(FormCreate);

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
