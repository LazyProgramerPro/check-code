import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { getAllQuery } from '../redux/actions/get_query';
import { useParams } from 'react-router-dom';
import { GetDataSourceParams } from '../../DataSource/redux/models';
import { GetQueryParams } from '../redux/models';
import { Button, Col, Form, Input, Row, Select } from 'antd';

const SearchFormStyle = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.query.getState,
});

const connector = connect(mapStateToProps, { getAllQuery });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

function SearchBar({ getState, getAllQuery }: IProps) {
  const [keySearch, setKeySearch] = useState('');
  const params: any = useParams();
  const [dataSourceId] = useState<string>(params.dataSourceId);

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    let params: GetQueryParams = {
      ...getState.params,
      text: keySearch.trim(),
      dataSourceId: dataSourceId,
    };
    getAllQuery(params);
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
              <Col xs={24} sm={12} xl={5}>
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
