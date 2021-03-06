import React, { useEffect, useState } from 'react';
import { RootState } from '../../../redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getApiSubscriptionUser, reloadApiSubscriptionData } from '../redux/actions/get_api_subscription_user';
import { Button, Col, Input, Row, Table, Form } from 'antd';
import { useParams } from 'react-router';
import { GetApiSubscriptionUserParam, UpdateApiStatusSubscriptionParam } from '../redux/models';
import env from '../../../configs/env';
import { ColumnProps } from 'antd/es/table';
import Loading from '../../../components/Loading';
import { policyMap } from '../../../models/common';
import ChangePolicyAccessForm from './ChangePolicyAccessServiceForm';
import { showUpdateSubscriptionForm, updateApiPolicySubscription } from '../redux/actions/update_api_subscription';
import { blockSubscription, unblockSubscription } from '../redux/services/apis';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';

const size = env.pageSize;
const mapStateToProps = (rootState: RootState) => ({
  getSubscriptionState: rootState.apiBusinessPlan.getApiSubscriptionUserState,
  updateSubscriptionState: rootState.apiBusinessPlan.updateApiSubscriptionUserState,
});
const SearchFormStyle = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;
const connector = connect(mapStateToProps, {
  getApiSubscriptionUser,
  showUpdateSubscriptionForm,
  reloadApiSubscriptionData,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const UserAccessServiceDataTable = (props: IProps) => {
  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);
  const [page, setPage] = useState<number>(1);
  const { getFieldDecorator } = props.form;
  const {
    getSubscriptionState,
    updateSubscriptionState,
    getApiSubscriptionUser,
    showUpdateSubscriptionForm,
    reloadApiSubscriptionData,
  } = props;

  const [keySearch, setKeySearch] = useState('');
  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    let param: GetApiSubscriptionUserParam = {
      ...getSubscriptionState.params,
      text: encodeURI(keySearch.trim()),
      apiId: apiId,
      page: 1,
    };

    setKeySearch(keySearch.trim());
    props.form.resetFields(['keySearch']);
    getApiSubscriptionUser(param);
    setPage(1);
  };
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      keySearch: {
        value: checkText,
      },
    });
    return callback();
  };
  const pasteSearch = () => {
    props.form.setFields({
      keySearch: {
        value: keySearch.trim() + ' ',
      },
    });
  };

  const [loadingVar, setLoadingVar] = useState(false);

  useEffect(() => {
    let params: GetApiSubscriptionUserParam = {
      ...getSubscriptionState.params,
      apiId: apiId,
      page: page,
      size: size,
    };
    getApiSubscriptionUser(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, getSubscriptionState.flag_reload]);

  const handleLockBtn = (e: any, record: any) => {
    setLoadingVar(true);
    const param: UpdateApiStatusSubscriptionParam = {
      apiId: apiId,
      username: record.username,
    };
    blockSubscription(param)
      .then(rs => {
        if (rs.code == 0) {
          reloadApiSubscriptionData();
          NotificationSuccess('Th??nh c??ng', 'Kh??a quy???n s??? d???ng d???ch v??? c???a ng?????i d??ng th??nh c??ng');
        } else {
          NotificationError('Th???t b???i', rs.message);
        }
        setLoadingVar(false);
      })
      .catch(() => {
        setLoadingVar(false);
        NotificationError('Th???t b???i', 'H??? th???ng x???y ra l???i');
      });
  };

  const handleUnlockBtn = (e: any, record: any) => {
    setLoadingVar(true);
    const param: UpdateApiStatusSubscriptionParam = {
      apiId: apiId,
      username: record.username,
    };
    unblockSubscription(param)
      .then(rs => {
        if (rs.code == 0) {
          reloadApiSubscriptionData();
          NotificationSuccess('Th??nh c??ng', 'M??? kh??a quy???n s??? d???ng d???ch v??? c???a ng?????i d??ng th??nh c??ng');
        } else {
          NotificationError('Th???t b???i', rs.message);
        }
        setLoadingVar(false);
      })
      .catch(rs => {
        setLoadingVar(false);
        NotificationError('Th???t b???i', rs.message);
      });
  };

  const handleChangePolicy = (e: any, record: any) => {
    showUpdateSubscriptionForm(true, record.username, record.policy);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: 'T??n t??i kho???n',
      dataIndex: 'username',
      width: 200,
    },
    {
      title: 'Gi???i h???n truy c???p',
      dataIndex: 'policy',
      width: 200,
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      width: 150,
      render: (text: string) => {
        switch (text) {
          case 'UNBLOCKED':
            return '??ang ho???t ?????ng';
          case 'BLOCKED':
            return 'D???ng ho???t ?????ng';
          default:
            return 'Kh??ng x??c ?????nh';
        }
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: 'nowrap' }}>Thao t??c</div>;
      },
      dataIndex: 'blocked',
      width: 400,
      render: (text: string, record: any) => {
        let blocked;
        if (text === 'true') {
          blocked = true;
        } else {
          blocked = false;
        }
        return (
          <>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              disabled={blocked}
              onClick={event => handleLockBtn(event, record)}
            >
              Kh??a
            </Button>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              disabled={!blocked}
              onClick={event => handleUnlockBtn(event, record)}
            >
              M??? kh??a
            </Button>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => handleChangePolicy(event, record)}
            >
              Thay ?????i gi???i h???n truy c???p
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row>
        <Col xs={24} md={10}>
          <h3>Qu???n l?? ng?????i d??ng s??? d???ng d???ch v???</h3>
        </Col>

        <Col xs={24} md={14}>
          <SearchFormStyle>
            <Row className="row">
              <Col md={24}>
                <Form>
                  <Row className="row">
                    <Col xs={24} md={8} xl={10}>
                      <Form.Item hasFeedback>
                        {getFieldDecorator('keySearch', {
                          initialValue: keySearch,
                          validateTrigger: 'onBlur',
                          rules: [{ validator: validateTextSearch }],
                        })(
                          <Input
                            onChange={handleTextChange}
                            placeholder="T??n t??i kho???n"
                            maxLength={255}
                            onPaste={pasteSearch}
                          />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} xl={6}>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          style={{ width: '60%', marginLeft: '20px' }}
                          type="primary"
                          onClick={(e: any) => handleSearch(e)}
                        >
                          T??m ki???m
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </SearchFormStyle>
        </Col>
      </Row>
      <Table
        className="custom-table-2"
        dataSource={getSubscriptionState.rows}
        columns={columns}
        rowKey="username"
        pagination={{
          current: page,
          pageSize: size,
          total: getSubscriptionState.total,
          onChange: page => setPage(page),
          showTotal: (total, range) => `??ang xem ${range[0]} ?????n ${range[1]} trong t???ng s??? ${total} m???c`,
        }}
        locale={{
          emptyText: 'Kh??ng t??m th???y k???t qu??? t????ng ???ng',
        }}
      />
      <ChangePolicyAccessForm />
      {getSubscriptionState.loading || loadingVar || updateSubscriptionState.loading ? <Loading /> : null}
    </>
  );
};

export default connector(Form.create<IProps>()(UserAccessServiceDataTable));
