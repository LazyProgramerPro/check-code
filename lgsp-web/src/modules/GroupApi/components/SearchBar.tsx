import {Button, Col, DatePicker, Form, Row, Select} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import {FormComponentProps} from 'antd/lib/form';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import 'moment/locale/vi';
import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled from 'styled-components';
import {NotificationError} from '../../../components/Notification/Notification';
import {CommonSearchParam} from '../../../models/common';
import {RootState} from '../../../redux/reducers';
import {getCategories} from '../../ApiGeneralInformation/redux/services/apis';
import {getAllGroupRestApi} from '../redux/actions/group_api';
import {IGroupApiParams} from '../redux/models';

moment.locale('vi');

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.groupRestApi.getState,
});

const connector = connect(mapStateToProps, { getAllGroupRestApi });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

function SearchBar(props: IProps) {
  const [keySearch, setKeySearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);

  const { getState, getAllGroupRestApi } = props;
  const { getFieldDecorator, resetFields } = props.form;

  const [locale] = useState(viVN);
  const handleSearch = (e: any) => {
    e.preventDefault();
    let params: IGroupApiParams = {
      ...getState.params,
      text: keySearch.trim(),
      category: category,
      startDate: startDate,
      endDate: endDate,
      page: 1,
    };
    getAllGroupRestApi(params);
  };

  const handleReset = () => {
    setKeySearch('');
    setStartDate('');
    setEndDate('');
    setCategory('');
    resetFields();

    let params: IGroupApiParams = {
      text: '',
      category: '',
      startDate: '',
      endDate: '',
      page: 1,
    };
    getAllGroupRestApi(params);
  };

  useEffect(() => {
    const searchCategoryParam: CommonSearchParam = {
      text: '',
      page: 1,
      size: 10,
    };
    getCategories(searchCategoryParam)
      .then(rs => {
        if (rs.code === 0) {
          setCategoryOptions(rs.rows);
        }
      }).catch(() => NotificationError('Thất bại', 'Lỗi hệ thống'));
  }, []);

  const handleTextChange = (e: any) => {
    setKeySearch(e.target.value);
  };

  const handleCategoryChange = (value: any) => {
    if (value !== undefined) {
      setCategory(value);
    } else {
      setCategory('');
    }
  };

  const onChangeStartDate = (date: any, dateString: string) => {
    setStartDate(dateString);
  };

  const onChangeEndDate = (date: any, dateString: string) => {
    setEndDate(dateString);
  };

  return (
    <View>
      <div className="serach-table-wrapper">
        <Form>
          <Row gutter={8} type="flex" justify="space-between" align="middle">
            <Col sm={24} md={5}>
              <Form.Item>
                {getFieldDecorator('keySearch', {
                  initialValue: keySearch,
                })(<Search onChange={handleTextChange} placeholder="Tên dịch vụ" maxLength={255} />)}
              </Form.Item>
            </Col>

            <Col sm={24} md={5}>
              <Form.Item>
                {getFieldDecorator(
                  'category',
                  {},
                )(
                  <Select showSearch placeholder="Nhóm dịch vụ" onChange={handleCategoryChange} allowClear={true}>
                    {categoryOptions.map((item: any) => {
                      return (
                        <Select.Option key={item.name} value={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>

            <Col sm={24} md={5}>
              <Form.Item>
                {getFieldDecorator(
                  'startDate',
                  {},
                )(
                  <DatePicker
                    locale={locale}
                    style={{ width: '100%' }}
                    placeholder={'Ngày bắt đầu'}
                    format={'DD/MM/yyyy'}
                    onChange={onChangeStartDate}
                  />,
                )}
              </Form.Item>
            </Col>

            <Col sm={24} md={5}>
              <Form.Item>
                {getFieldDecorator(
                  'endDate',
                  {},
                )(
                  <DatePicker
                    locale={locale}
                    style={{ width: '100%' }}
                    placeholder={'Ngày kết thúc'}
                    format={'DD/MM/yyyy'}
                    onChange={onChangeEndDate}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={2}>
              <Form.Item>
                <Button htmlType="submit" type="primary" onClick={(e: any) => handleSearch(e)} className="minWidthBtn">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
            <Col sm={24} md={2}>
              <Form.Item>
                <Button style={{ width: '100%' }} onClick={handleReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </View>
  );
}

export default connector(Form.create<IProps>()(SearchBar));

const View = styled.div`
  margin-top: -5px;
`;
