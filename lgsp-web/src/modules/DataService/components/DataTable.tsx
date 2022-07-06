import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Form, Col, Row } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { FormComponentProps } from 'antd/lib/form';
import { connect, ConnectedProps } from 'react-redux';
import env from 'src/configs/env';
import { getAllDataService } from '../redux/actions/get_data_services';
import { RootState } from 'src/redux/store';
import { ApproveParams, GetDataServiceParams, RejectParams } from '../redux/models';
import { statusService } from '../redux/actions/get_status_data_service';
import { showRequestServiceFrom } from '../redux/actions/get_status_reject';
import RejectService from './RejectService';
import Loading from 'src/components/Loading';
const { Search } = Input;
interface User {
  key: string;
  name: string;
  service: string;
  creator: string;
  time: string;
}
const ViewTable = styled.div`
  padding: 0px 15px;

  .container-page {
    background: #ffffff;
  }

  .btn {
    border-radius: 5px;
    margin-left: 44px;
  }

  .ant-input {
    font-style: normal;
    font-weight: normal;
    background: white;
  }
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
    }
  }
`;
const Data = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const StyledSearch = styled.div`
  /* margin-bottom: -25px;*/
  margin-top: -7px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

const Content = styled.div`
  color: rgba(0, 0, 0, 0.65);
  height: 62px;
  border-bottom: 0.5px solid #e0d6d6;
  padding: 20px 16px;
`;

const StyleSearch = styled(Search)`
  input {
    border: 1px solid #d9d9d9 !important;
    background: #f9f9f9;
    border-radius: 5px;
  }

  margin-left: 16px;
  margin-top: 17px;
`;
const size = env.pageSize;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getDataServiceState: rootState.dataService.getState,
  statusState: rootState.dataService.getStatusState,
  rejectState: rootState.dataService.getStatusReject,
});
const connector = connect(mapState, { getAllDataService, statusService, showRequestServiceFrom });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function DataTable(props: IProps) {
  const { getDataServiceState, getAllDataService, statusService, showRequestServiceFrom } = props;
  const { getFieldDecorator } = props.form;

  document.title = 'Danh sách dịch vụ chia sẻ cần phê duyệt';

  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const [valueSearch, setValueSearch] = useState('');

  const loadDataService = (search?: string) => {
    window.scrollTo(0, 0);
    const keySearch = search === undefined ? valueSearch : search;
    let params: GetDataServiceParams = {
      ...getDataServiceState.params,
      page: page,
      size: size,
      text: encodeURI(keySearch.trim()),
    };
    setValueSearch(keySearch.trim());
    props.form.resetFields(['text']);
    getAllDataService(params);
  };

  const loadSearch = () => {
    setPage(1);
    loadDataService();
  };

  const onChangeInput = (e: any) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    loadDataService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  useEffect(() => {
    loadDataService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handChange = (e: any, record: any) => {
    const param: ApproveParams = {
      requestId: record.requestId,
    };
    statusService(param);
    loadDataService();
  };

  const handleReset = () => {
    setPage(1);
    setValueSearch('');
    loadDataService('');
  };

  const handReject = (e: any, record: any) => {
    const param: RejectParams = {
      requestId: record.requestId,
      reason: record.reason,
    };
    showRequestServiceFrom(true, param);
  };
  const columns: ColumnProps<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'apiName',
      key: 'apiName',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Nhóm dịch vụ',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Người tạo',
      dataIndex: 'createBy',
      key: 'ccreateBy',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhdong',
      key: 'hanhdong',
      width: 250,

      render: (text: any, record: any) => (
        <span style={{ display: 'flex' }}>
          <Button style={{ width: '90px', textDecoration: 'underline' }} onClick={event => handChange(event, record)}>
            <span style={{ marginLeft: '-2px' }}>Công khai</span>
          </Button>
          <Button
            style={{ textDecoration: 'underline', width: '90px', marginLeft: '10px' }}
            onClick={event => handReject(event, record)}
          >
            Từ chối
          </Button>
        </span>
      ),
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

  const pasteSearch = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <ViewTable>
      <div className="header">
        <div className="header-title">Danh sách dịch vụ chia sẻ cần phê duyệt</div>
      </div>
      <StyledSearch>
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
                    placeholder="Tên dịch vụ"
                    // value={valueSearch}
                    onPaste={pasteSearch}
                    onChange={e => onChangeInput(e)}
                    maxLength={50}
                  ></Input.Search>,
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

      <Data>
        <Table
          columns={columns}
          dataSource={getDataServiceState.rows}
          className="custom-table-2"
          locale={{
            emptyText: 'Không tìm thấy kết quả tương ứng',
          }}
          pagination={{
            total: getDataServiceState.total,
            onChange: page => setPage(page),
            showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            current: page,
            pageSize: size,
          }}
        />
      </Data>
      <RejectService />
      {props.getDataServiceState.loading || props.statusState.loading || props.rejectState.loading ? <Loading /> : null}
    </ViewTable>
  );
}
export default connector(Form.create<IProps>()(DataTable));
