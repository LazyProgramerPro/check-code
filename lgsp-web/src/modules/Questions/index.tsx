import { Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormCreateQuestion from './components/FormCreateQuestion';
import FormDetailQuestion from './components/FormDetailQuestion';
import { NotificationError } from '../../components/Notification/Notification';
import { SearchQuestionParam } from './redux/models';
import { searchQuesiton } from './redux/services/apis';
import Loading from '../../components/Loading';
import { FormComponentProps } from 'antd/lib/form';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/redux/store';

const mapState = (rootState: RootState) => ({});
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}
function Questions(props: IProps) {
  const { getFieldDecorator } = props.form;
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [total, setTotal] = useState(100);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [currQuestion, setCurrQuestion] = useState('');
  const [currAnswer, setCurrAnswer] = useState('');

  const [refresh, setRefresh] = useState(false);

  const handleReset = () => {
    setPage(1);
    const param: SearchQuestionParam = {
      text: '',
      page: 0,
      size: size,
    };
    setValueSearch('');
    props.form.resetFields(['text']);
    search(param);
  };

  const onChangeSearch = (e: any) => {
    setValueSearch(e.target.value);
  };

  const search = (param: SearchQuestionParam) => {
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
    search(param);
  }, [page, refresh]);

  // Create
  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
  };

  const handleOnCreateSuccess = () => {
    setOpenFormCreate(false);
    setCurrQuestion('');
    setCurrAnswer('');
    setRefresh(!refresh);
  };

  // Detail
  const handleOpenDetail = (e: any, record: any) => {
    setCurrQuestion(record.question || '');
    setCurrAnswer(record.answer || '');
    setOpenDetail(true);
  };

  const onClickSearch = (e: any) => {
    window.scrollTo(0, 0);
    const param: SearchQuestionParam = {
      text: valueSearch.trim(),
      page: 1,
      size: size,
    };
    search(param);
    setPage(1);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
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
          </>
        );
      },
    },
  ];

  const handleGetListAfterCreate = () => {
    setPage(1);
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
        <div className="header-title">Danh sách câu hỏi thường gặp</div>
        <Button icon="plus" onClick={handleOpenFormCreate}>
          Tạo mới
        </Button>
      </div>

      <div className="search">
        <Form>
          <Row gutter={[8, 8]}>
            <Col lg={18}>
              <Form.Item>
                {props.form.getFieldDecorator('text', {
                  validateTrigger: 'onBlur',
                  initialValue: valueSearch,
                  rules: [{ validator: validateTextSearch }],
                })(
                  <Input.Search
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
      </div>

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

      <FormCreateQuestion
        visible={openFormCreate}
        onClose={handleCloseFormCreate}
        onSuccess={handleOnCreateSuccess}
        refreshList={handleGetListAfterCreate}
      />
      <FormDetailQuestion
        question={currQuestion}
        answer={currAnswer}
        visible={openDetail}
        onClose={handleCloseDetail}
      />
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}
export default connector(Form.create<IProps>()(Questions));
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
    .ant-form-item {
      margin-bottom: 0px;
    }
  }

  .btnIcon {
    margin: 0px 4px;
  }

  .table {
    margin-top: 15px;
    .ant-table-tbody > tr > td {
      white-space: pre;
    }
  }
`;
