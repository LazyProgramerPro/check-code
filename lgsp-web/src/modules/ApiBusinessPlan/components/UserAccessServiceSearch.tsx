import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import styled from 'styled-components';
import { GetApiSubscriptionUserParam } from '../redux/models';
import { useParams } from 'react-router';
import { getApiSubscriptionUser } from '../redux/actions/get_api_subscription_user';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FormComponentProps } from 'antd/lib/form';

const SearchFormStyle = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;
const mapStateToProps = (rootState: RootState) => ({
  getSubscriptionState: rootState.apiBusinessPlan.getApiSubscriptionUserState,
});

const connector = connect(mapStateToProps, { getApiSubscriptionUser });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const UserAccessServiceSearch = (props: IProps) => {
  const params: any = useParams();
  const { getSubscriptionState, getApiSubscriptionUser } = props;
  const [apiId] = useState<string>(params.apiId);
  const { getFieldDecorator } = props.form;
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
        value: keySearch.trim(),
      },
    });
  };

  return (
    <Row>
      <Col xs={24} md={10}>
        <h3>Quản lý người dùng sử dụng dịch vụ</h3>
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
                          placeholder="Tên tài khoản"
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
                        Tìm kiếm
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
  );
};

export default connector(Form.create<IProps>()(UserAccessServiceSearch));
