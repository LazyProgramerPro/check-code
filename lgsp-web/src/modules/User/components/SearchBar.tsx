import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { validateNormalString } from 'src/constants/common';
import styled from 'styled-components';
import { RootState } from '../../../redux/reducers';
import { getAllUsers } from '../redux/action/get_users';
import { GetUserParams } from '../redux/models';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.user.getState,
});

const connector = connect(mapStateToProps, { getAllUsers });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

function SearchBar(props: IProps) {
  const { getState, getAllUsers } = props;
  const [keySearch, setKeySearch] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(50);
  const handleSearch = (e: any) => {
    e.preventDefault();
    let params: GetUserParams = {
      ...getState.params,
      page: page,
      size: size,
      key: keySearch.trim(),
    };
    getAllUsers(params);
  };

  const handleReset = () => {
    let params: GetUserParams = {
      ...getState.params,
      key: '',
    };
    setPage(1);
    getAllUsers(params);
    setKeySearch(' ');
    props.form.resetFields(['name']);
  };

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const checkPaste = () => {
    props.form.setFields({
      name: {
        value: keySearch.trim(),
      },
    });
  };
  return (
    <SearchFormStyle>
      <Form>
        <Row gutter={[8, 8]}>
          <Col lg={18}>
            <Form.Item>
              {props.form.getFieldDecorator('name', { initialValue: keySearch, validateTrigger: 'onBlur' })(
                <Search placeholder="Tên tài khoản" onChange={handleTextChange} maxLength={255} onPaste={checkPaste} />,
              )}
            </Form.Item>
          </Col>

          <Col lg={3}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="btn minWidthBtn"
                onClick={(e: any) => handleSearch(e)}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>

          <Col lg={3}>
            <Form.Item>
              <Button className="btn minWidthBtn" onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SearchFormStyle>
  );
}

export default connector(Form.create<IProps>()(SearchBar));

const SearchFormStyle = styled.div``;
