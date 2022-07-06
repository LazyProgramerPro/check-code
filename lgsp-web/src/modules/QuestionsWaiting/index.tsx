import { Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailQuestionsWaiting from './components/DetailQuestionsWaiting';
import { SearchQuestionParam } from './redux/models';
import { deleteQuestion, searchQuesiton } from './redux/services/apis';
import { NotificationError, NotificationSuccess } from '../../components/Notification/Notification';
import Loading from '../../components/Loading';
import { DeleteQuestionParam } from '../QuestionsPublish/redux/models';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
const conn = connect();
type ReduxProps = ConnectedProps<typeof conn>;
interface IProps extends ReduxProps, FormComponentProps {}
const QuestionsWaiting = (props: IProps) => {
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [total, setTotal] = useState(100);

  const [openDetail, setOpenDetail] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [currQuestion, setCurrentQuestion] = useState('');
  const [currQuestionId, setCurrentQuestionId] = useState('');
  const [currAnswer, setCurrentAnswer] = useState('');

  document.title = 'Danh sách câu hỏi yêu cầu';

  const search = (param: SearchQuestionParam) => {
    window.scrollTo(0, 0);
    setLoading(true);
    searchQuesiton(param)
      .then(rs => {
        setLoading(false);
        if (rs.code === 0) {
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
    search(param);
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
    search(param);
  };

  const onChangeSearch = (e: any) => {
    setValueSearch(e.target.value);
  };

  const onClickSearch = (e: any) => {
    const param: SearchQuestionParam = {
      text: encodeURI(valueSearch.trim()),
      page: 1,
      size: size,
    };
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['text']);
    search(param);
    setPage(1);
  };

  // Detail
  const handleOpenDetail = (e: any, record: any) => {
    setOpenDetail(true);
    setCurrentQuestion(record.question);
    setCurrentAnswer(record.answer);
    setCurrentQuestionId(record.id);
  };

  const handleDelete = (e: any, record: any) => {
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

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setCurrentQuestion('');
    setCurrentAnswer('');
    setCurrentQuestionId('');
  };

  const handleOnSuccess = () => {
    setOpenDetail(false);
    setCurrentQuestion('');
    setCurrentAnswer('');
    setCurrentQuestionId('');
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

  const parseStatus = (value: number) => {
    if (value == undefined) {
      return '';
    }
    switch (value) {
      case 1:
        return 'Chưa trả lời';
      case 2:
      case 3:
        return 'Đã trả lời';
      // case 3:
      //   return 'Công khai';
      default:
        return 'Không xác định';
    }
  };
  const checkString = (question: string) => {
    return question.split('\n')[0];
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Câu hỏi thường gặp',
      dataIndex: 'question',
      width: 500,
      ellipsis: true,
      render: (text: any, record: any) => {
        return <>{checkString(`${record.question}`)}</>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: any, record: any) => {
        return <>{parseStatus(text)}</>;
      },
    },
    {
      title: 'Người gửi',
      dataIndex: 'createBy',
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'createAt',
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
        <div className="header-title">Danh sách câu hỏi yêu cầu</div>
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
                  <Input.Search
                    placeholder="Tìm kiếm"
                    value={valueSearch}
                    onChange={e => onChangeSearch(e)}
                    maxLength={255}
                    onPaste={pasteSearch}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col lg={3}>
              <Form.Item>
                <Button htmlType="submit" type="primary" className="minWidthBtn" onClick={onClickSearch}>
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
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          rowKey="id"
          pagination={{
            total: total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </div>

      <DetailQuestionsWaiting
        id={currQuestionId}
        question={currQuestion}
        answer={currAnswer}
        visible={openDetail}
        onClose={handleCloseDetail}
        onSuccess={handleOnSuccess}
      />

      {loading ? <Loading /> : null}
    </Wrapper>
  );
};
export default conn(Form.create<IProps>()(QuestionsWaiting));

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
