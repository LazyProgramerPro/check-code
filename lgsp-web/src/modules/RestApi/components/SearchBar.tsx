import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getAllRestApi } from '../redux/actions/get_rest_api';
import { GetRestApiParams } from '../redux/models';
import { useParams } from 'react-router-dom';

const SearchFormStyle = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.restApi.getState,
});

const connector = connect(mapStateToProps, { getAllRestApi });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

function SearchBar({ getState, getAllRestApi }: IProps) {
  const [keySearch, setKeySearch] = useState('');
  const params: any = useParams();

  const [groupId] = useState<string>(params.apiId);

  const handleSearch = (e: any) => {
    e.preventDefault();
    let params: GetRestApiParams = {
      ...getState.params,
      text: keySearch.trim(),
      groupId: groupId,
      type: type,
    };
    getAllRestApi(params);
  };

  const [type, setType] = useState('');

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleTypeChange = (value: any) => {
    if (value !== undefined) {
      const id = value.key;
      setType(id);
    } else {
      setType('');
    }
  };

  return (
    <SearchFormStyle>
      <Row className="row">
        <Col md={24}>
          <Form>
            <Row className="row">
              <Col xs={24} md={8} xl={5}>
                <Form.Item hasFeedback>
                  <Input onChange={handleTextChange} value={keySearch} placeholder="Nhập từ khóa tìm kiếm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8} xl={5}>
                <Form.Item>
                  <Select
                    showSearch
                    labelInValue
                    placeholder="Trạng thái"
                    optionFilterProp="children"
                    onChange={handleTypeChange}
                    allowClear={true}
                  >
                    <Select.Option value="">Tất cả</Select.Option>
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                    <Select.Option value="OPTION">OPTION</Select.Option>
                    <Select.Option value="HEAD">HEAD</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} xl={4}>
                <Form.Item>
                  <Row className="row">
                    <Col xs={12}>
                      <Button
                        htmlType="submit"
                        style={{ width: '100%' }}
                        className="create-btn"
                        onClick={(e: any) => handleSearch(e)}
                      >
                        Tìm kiếm
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </SearchFormStyle>
  );
}

export default connector(SearchBar);
