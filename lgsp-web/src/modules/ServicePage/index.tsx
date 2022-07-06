import { Button, Col, Form, Icon, Input, Row, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { validateNormalString } from 'src/constants/common';
import styled from 'styled-components';
import { GET } from '../../services';
import SwaggerComponents from './components/SwaggerComponents';
import { getCategoriesApi, getDeploymentUnitApi } from './redux/api';
import { getServices } from './redux/types';

interface IProps extends FormComponentProps {}

const ServicePage = (props: IProps) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(0);

  const [categories, setCategories] = useState<string[]>([]);
  const [deploymentUnits, setDeploymentUnits] = useState<string[]>([]);

  const [valueSearch, setValueSearch] = useState('');
  const [category, setCategory] = useState('');
  const [deploymentUnit, setDeploymentUnit] = useState('');
  const [departmentLevel, setDepartmentLevel] = useState('');

  const handleChangeCategories = (value: any) => {
    setCategory(value);
  };

  const handleChangeDepartmentLevel = (value: any) => {
    setDepartmentLevel(value);
  };

  const handleChangeDeploymentUnit = (value: any) => {
    setDeploymentUnit(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setValueSearch(valueSearch.trim());
    props.form.resetFields(['text']);

    setLoading(true);
    const param: getServices = {
      category: category || '',
      departmentLevel: departmentLevel || '',
      departmentUnit: deploymentUnit || '',
      text: encodeURI(valueSearch.trim()),
      size: 10,
      page: 1,
    };
    GET(`core-svc/public-api/no-auth/search`, param)
      .then((data: any) => {
        if (data && data.rows) {
          setRows(data.rows);
          setTotal(data.total);
          setLoading(false);
          setPage(page);
        }
      })
      .catch(e => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    setValueSearch('');
    setDepartmentLevel('');
    setDeploymentUnit('');
    setCategory('');
    setPage(1);

    props.form.resetFields(['text', 'category', 'departmentLevel', 'departmentUnit']);

    setLoading(true);
    const param: getServices = {
      category: '',
      departmentLevel: '',
      departmentUnit: '',
      text: '',
      page: 1,
      size: 10,
    };

    setLoading(true);
    GET(`core-svc/public-api/no-auth/search`, param)
      .then((data: any) => {
        if (data && data.rows) {
          setRows(data.rows);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getServices = () => {
    setLoading(true);
    const textSearch = valueSearch.trim();
    const param: getServices = {
      category: category || '',
      departmentLevel: departmentLevel || '',
      departmentUnit: deploymentUnit || '',
      text: textSearch || '',
      size: 10,
      page: page,
    };
    setLoading(true);

    setLoading(true);
    GET(`core-svc/public-api/no-auth/search`, param)
      .then((data: any) => {
        if (data && data.rows) {
          setRows(data.rows);
          setTotal(data.total);
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategories = () => {
    getCategoriesApi()
      .then(res => {
        setCategories(res.rows);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };

  const getDeploymentUnits = () => {
    getDeploymentUnitApi()
      .then(res => {
        setDeploymentUnits(res.rows);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };

  useEffect(() => {
    getServices();
    getCategories();
    getDeploymentUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const columns: any = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Nhóm dịch vụ',
      dataIndex: 'category',
      key: 'category',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: 'Cấp triển khai',
      dataIndex: 'deployment_level',
      key: 'deployment_level',

      render: (text: any) => <span>{text === 'local' ? 'Địa phương' : text === 'central' ? 'Trung ương' : ''}</span>,
    },
    {
      title: 'Đơn vị triển khai',
      dataIndex: 'deployment_unit',
      key: 'deployment_unit',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      key: 'action',
      width: 50,
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

  const checkPaste = () => {
    props.form.setFields({
      text: {
        value: valueSearch.trim() + ' ',
      },
    });
  };
  return (
    <View>
      <div className="service-page-container flex flex-col items-center justify-center">
        <div className="service-table ">
          <div className="title">Danh sách dịch vụ</div>
          <div className="container-filter">
            <Form>
              <Row gutter={[8, 8]}>
                <Col lg={5}>
                  <Form.Item>
                    {props.form.getFieldDecorator('text', {
                      initialValue: valueSearch,
                      validateTrigger: 'onBlur',
                      rules: [{ validator: validateTextSearch }],
                    })(
                      <StyledInput
                        placeholder="Tên dịch vụ"
                        onChange={e => {
                          setValueSearch(e.target.value);
                        }}
                        maxLength={50}
                        onPaste={checkPaste}
                      />,
                    )}
                  </Form.Item>
                </Col>

                <Col lg={5}>
                  <Form.Item>
                    {props.form.getFieldDecorator('category')(
                      <StyledSelect allowClear={true} placeholder="Nhóm dịch vụ" onChange={handleChangeCategories}>
                        {categories.map((e: any, index: any) => (
                          <Select.Option key={index} value={e}>
                            {e}
                          </Select.Option>
                        ))}
                      </StyledSelect>,
                    )}
                  </Form.Item>
                </Col>

                <Col lg={5}>
                  <Form.Item>
                    {props.form.getFieldDecorator(
                      'departmentLevel',
                      {},
                    )(
                      <StyledSelect
                        allowClear={true}
                        placeholder="Cấp triển khai"
                        onChange={handleChangeDepartmentLevel}
                      >
                        <Select.Option value="local">Địa phương</Select.Option>
                        <Select.Option value="central">Trung ương</Select.Option>
                      </StyledSelect>,
                    )}
                  </Form.Item>
                </Col>

                <Col lg={5}>
                  <Form.Item>
                    {props.form.getFieldDecorator(
                      'departmentUnit',
                      {},
                    )(
                      <StyledSelect
                        allowClear={true}
                        placeholder="Đơn vị triển khai"
                        onChange={handleChangeDeploymentUnit}
                      >
                        {deploymentUnits.map((e: any, index: any) => (
                          <Select.Option value={e} key={index}>
                            {e}
                          </Select.Option>
                        ))}
                      </StyledSelect>,
                    )}
                  </Form.Item>
                </Col>

                <Col lg={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="minWidthBtn"
                      onClick={(e: any) => handleSubmit(e)}
                    >
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </Col>

                <Col lg={2}>
                  <Form.Item>
                    <Button className="minWidthBtn" onClick={handleReset}>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            className="custom-table-2"
            rowKey={'id'}
            loading={loading}
            columns={columns}
            locale={{
              emptyText: 'Không tìm thấy kết quả tương ứng',
            }}
            dataSource={rows}
            pagination={{
              current: page,
              pageSize: 10,
              total: total,
              onChange: page => setPage(page),
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
            expandRowByClick
            expandedRowRender={record => {
              return (
                <>
                  <SwaggerComponents id={record.id} description={record.description} />
                </>
              );
            }}
            expandIconColumnIndex={4}
            expandIconAsCell={false}
            expandIcon={record => {
              if (record.expanded) {
                return <Icon type="down" />;
              } else {
                return <Icon type="up" />;
              }
            }}
          />
        </div>
      </div>
    </View>
  );
};
const View = styled.div`
  /* font-size: 18px; */
`;
const StyledSelect = styled(Select)`
  .ant-select-selection .ant-select-selection__placeholder {
    /* font-size: 18px; */
  }

  .ant-select-selection {
    /* font-size: 18px; */
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #e8e8e8;
  }

  .ant-select-open {
    border: 1px solid red !important;
  }

  .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active {
    box-shadow: none;
  }
  .ant-select-dropdown-hidden {
    width: 245px !important;
  }
`;
const StyledInput = styled(Input)`
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #e8e8e8;
`;
export default Form.create<IProps>()(ServicePage);
