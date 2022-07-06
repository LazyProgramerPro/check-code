import { Button, Table, Tooltip, Form, Modal, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Loading from 'src/components/Loading';
import { validateNormalString } from 'src/constants/common';
import { UserEntity } from 'src/modules/User/redux/models';
import { getUserByUsername } from 'src/modules/User/redux/service/apis';
import { RootState } from 'src/redux/store';
import styled from 'styled-components';
import { getUserActionsApi } from '../services/api';
import { ParamGetList } from '../services/models';

const mapState = (rootState: RootState) => ({
  serviceAccessLimit: rootState.serviceAccessLimit.servicesAccessLimits,
  authState: rootState.auth.auth,
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataTable(props: IProps) {
  const {} = props;

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'create_by',
      key: 'create_by',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Hành động',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      // width: 380,
    },
    {
      title: 'Thời gian tương tác',
      dataIndex: 'time',
      key: 'time',
      width: 250,
      // render: (time: any) => {
      //   return <>{moment(time).format('hh:mm DD-MM-YYYY')}</>;
      // },
    },
  ];

  const handleGetUserActions = (search: string, pageIn: number) => {
    window.scrollTo(0, 0);

    const text = search.trim();
    setLoading(true);
    const param: ParamGetList = {
      page: pageIn,
      size: size,
      username: encodeURI(text) || '',
    };
    setValueSearch(text);
    props.form.resetFields(['name']);
    getUserActionsApi(param)
      .then(res => {
        setData(res.rows);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    handleGetUserActions(valueSearch, page);
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch(' ');
    handleGetUserActions(' ', 1);
    props.form.resetFields(['name']);
  };

  useEffect(() => {
    handleGetUserActions(valueSearch, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      name: {
        value: checkText,
      },
    });
    return true;
  };
  const initUserData: UserEntity = {
    username: '',
    fullName: '',
    id: '',
    email: '',
    role: -1,
    address: '',
    department: '',
    organization: '',
    password: '',
    under: '',
    position: '',
    phoneNumber: '',
    status: 0,
  };
  const [userData, setUserData] = useState(initUserData);

  useEffect(() => {
    const username: string = props.authState.data?.username || '';
    setLoading(true);
    const param = {
      username: username,
    };
    getUserByUsername(param)
      .then(rs => {
        if (rs.code !== 0) {
          setLoading(false);
          return;
        }
        console.log('UserData : ' + JSON.stringify(rs.item));

        setUserData(rs.item);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pasteSearch = () => {
    props.form.setFields({
      name: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <div className="header">
        <p>Lịch sử tương tác</p>
      </div>
      <Container>
        {userData.role === 0 ? (
          <StyledSearch>
            <Form>
              <Row gutter={[8, 8]}>
                <Col lg={18}>
                  <Form.Item>
                    {props.form.getFieldDecorator('name', {
                      initialValue: valueSearch,
                      validateTrigger: 'onBlur',
                      rules: [{ validator: validateTextSearch }],
                    })(
                      <StyleSearch
                        placeholder="Tên tài khoản"
                        value={valueSearch}
                        onChange={e => onChangeInput(e)}
                        maxLength={255}
                        onPaste={pasteSearch}
                      />,
                    )}
                  </Form.Item>
                </Col>

                <Col lg={3}>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" className="minWidthBtn" onClick={handleSearch}>
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </Col>

                <Col lg={3}>
                  <Form.Item>
                    <Button className="minWidthBtn" onClick={handleReset}>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </StyledSearch>
        ) : (
          <></>
        )}
        <Table
          className="custom-table-2 table"
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            current: page,
            pageSize: size,
            total: total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
          }}
        />
      </Container>
      {loading && <Loading />}
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(DataTable));

const Wrapper = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }

  p {
    margin: 0px;
  }

  .button {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
`;

const Container = styled.div`
  .table {
    width: 100%;
    margin-top: 10px;
  }
`;

const StyleSearch = styled(Search)`
  input {
    border: 1px solid #d9d9d9 !important;
    border-radius: 5px;
  }
`;
const StyledSearch = styled.div`
  /* margin-bottom: -25px;*/
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
