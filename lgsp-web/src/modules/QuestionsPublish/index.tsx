import { Button, Col, Input, Popconfirm, Row, Table, Form } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailQuestionsPublish from './components/DetailQuestionsPublish';
import FormCreateQuestionPublish from './components/FormCreateQuestionPublish';
import { deleteQuestion, searchQuesiton } from './redux/services/apis';
import { NotificationError, NotificationSuccess } from '../../components/Notification/Notification';
import Loading from '../../components/Loading';
import { DeleteQuestionParam, SearchQuestionParam } from './redux/models';
import { RootState } from '../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { createResource, showCreateResourceForm } from '../ConnectResource/redux/actions/create_resource';
import { getResource } from '../ConnectResource/redux/actions/get_resource';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
});

const conn = connect(mapStateToProps, { createResource, showCreateResourceForm, getResource });
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps {}

const QuestionsPublish = (props: IProps) => {
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [total, setTotal] = useState(100);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [currQuestion, setCurrQuestion] = useState('');
  const [currQuestionId, setCurrQuestionId] = useState('');
  const [currAnswer, setCurrAnswer] = useState('');

  const [refresh, setRefresh] = useState(false);

  document.title = 'Danh sách câu hỏi thường gặp công khai';

  const searchText = (param: SearchQuestionParam) => {
    window.scrollTo(0, 0);
    setLoading(true);
    searchQuesiton(param)
      .then(rs => {
        setLoading(false);
        if (rs.code == 0) {
          setData(rs.rows);
          setTotal(rs.total);
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        NotificationError('Thất bại', 'Hệ thống xảy ra lỗi');
        setLoading(false);
      });
  };

  useEffect(() => {
    const param: SearchQuestionParam = {
      text: valueSearch,
      page: page,
      size: size,
    };
    searchText(param);
  }, [page, refresh]);

  const handleReset = () => {
    setPage(1);
    const param: SearchQuestionParam = {
      text: '',
      page: page,
      size: size,
    };
    setValueSearch('');
    props.form.resetFields(['text']);
    searchText(param);
  };

  const onChangeSearch = (e: any) => {
    setValueSearch(e.target.value);
  };
  const handleGetListAfterCreate = () => {
    setPage(1);
  };

  const handleDelete = (event: any, record: any) => {
    setLoading(true);
    const param: DeleteQuestionParam = {
      questionId: record.id,
    };
    deleteQuestion(param)
      .then(rs => {
        if (rs.code == 0) {
          NotificationSuccess('Thành công', 'Xóa câu hỏi thường gặp thành công ');
          setRefresh(!refresh);
        } else {
          NotificationError('Thất bại', rs.message);
        }
      })
      .catch(() => {
        setLoading(false);
        NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
      });
  };

  // Create
  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
    setCurrQuestion('');
    setCurrAnswer('');
  };

  const handleOnCreateSuccess = () => {
    setOpenFormCreate(false);
    setCurrQuestion('');
    setCurrAnswer('');
    setRefresh(!refresh);
  };

  const onClickSearch = (search?: string) => {
    window.scrollTo(0, 0);
    const keySearch = search === undefined ? valueSearch : search;
    const param: SearchQuestionParam = {
      text: encodeURI(keySearch.trim()),
      page: page,
      size: size,
    };
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['text']);
    searchText(param);
  };
  const loadSearch = () => {
    setPage(1);
    onClickSearch();
  };

  // Detail
  const handleOpenDetail = (e: any, record: any) => {
    setCurrQuestion(record.question || '');
    setCurrQuestionId(record.id || '');
    setCurrAnswer(record.answer || '');
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setCurrQuestion('');
    setCurrQuestionId('');
    setCurrAnswer('');
  };

  const handleUpdateDetail = () => {
    setOpenDetail(false);
    setCurrQuestion('');
    setCurrQuestionId('');
    setCurrAnswer('');
    setRefresh(!refresh);
  };
  const validateTextSearch = (rule: any, value: any, callback: any) => {
    const checkText = value.trim();
    props.form.setFields({
      text: {
        value: checkText,
      },
    });
    return true;
  };

  const checkString = (question: string) => {
    return question.split('\n')[0];
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Câu hỏi thường gặp',
      dataIndex: 'question',
      ellipsis: true,
      render: (text: any, record: any) => {
        return <>{checkString(`${record.question}`)}</>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 150,
      render: (text: any, record: any) => {
        return (
          <>
            <Button size="small" className="btnIcon" icon="eye" onClick={e => handleOpenDetail(e, record)} />

            <Popconfirm
              placement="top"
              title="Bạn có xác nhận muốn xóa?"
              onConfirm={event => handleDelete(event, record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button size="small" className="btnIcon" icon="delete" />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const pasteSearch = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <div className="header">
        <div className="header-title">Danh sách câu hỏi thường gặp công khai</div>
        <Button icon="plus" onClick={handleOpenFormCreate}>
          Tạo mới
        </Button>
      </div>

      <StyledSearch>
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={18}>
              <Form.Item>
                {props.form.getFieldDecorator('text', {
                  initialValue: valueSearch,
                  rules: [{ validator: validateTextSearch }],
                  validateTrigger: 'onBlur',
                })(
                  <Search
                    placeholder="Tìm kiếm"
                    // value={valueSearch}
                    onChange={e => onChangeSearch(e)}
                    maxLength={255}
                    onPaste={pasteSearch}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button htmlType="submit" type="primary" className="minWidthBtn" onClick={loadSearch}>
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

      <div className="table">
        <Table
          columns={columns}
          dataSource={data}
          className="custom-table-2"
          rowKey="id"
          // style={{ whiteSpace: 'pre' }}
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </div>

      <FormCreateQuestionPublish
        visible={openFormCreate}
        onClose={handleCloseFormCreate}
        onSuccess={handleOnCreateSuccess}
        refreshList={handleGetListAfterCreate}
      />

      <DetailQuestionsPublish
        questionId={currQuestionId}
        question={currQuestion}
        answer={currAnswer}
        visible={openDetail}
        onClose={handleCloseDetail}
        onSuccess={handleUpdateDetail}
      />
      {loading ? <Loading /> : null}
    </Wrapper>
  );
};
export default conn(Form.create<IProps>()(QuestionsPublish));

const Wrapper = styled.div`
  padding: 0px 15px;

  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
    }
  }
  .search {
    /* height: 55px; */

    margin-bottom: 15px;
  }

  .btnIcon {
    margin: 0px 4px;
  }

  .table {
    margin-top: 10px;
    .ant-table-tbody > tr > td {
      white-space: pre;
    }
  }
`;
const StyledSearch = styled.div`
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
