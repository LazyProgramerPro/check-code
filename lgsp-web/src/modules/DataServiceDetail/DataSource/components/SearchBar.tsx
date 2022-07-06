import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { RootState } from '../../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllDataSource } from '../redux/actions/get_data_sources';
import { GetDataSourceParams } from '../redux/models';

const SearchFormStyle = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.dataSource.getState,
});

const connector = connect(mapStateToProps, { getAllDataSource });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {}

function SearchBar({ getState, getAllDataSource }: IProps) {
  const [keySearch, setKeySearch] = useState('');
  const params: any = useParams();

  const [dataServiceId] = useState<string>(params.dataServiceId);

  const handleSearch = (e: any) => {
    e.preventDefault();
    let params: GetDataSourceParams = {
      ...getState.params,
      text: encodeURI(keySearch.trim()),
      dataServiceId: dataServiceId,
      dbType: dbType,
    };
    getAllDataSource(params);
  };

  const [dbType, setDbType] = useState('');

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleTypeChange = (value: any) => {
    if (value !== undefined) {
      const id = value.key;
      setDbType(id);
    } else {
      setDbType('');
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
                    <Select.Option value="1">Mysql</Select.Option>
                    <Select.Option value="2">Sql Server</Select.Option>
                    <Select.Option value="3">MongoDB</Select.Option>
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
