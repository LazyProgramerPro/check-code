import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TopContent from '../../../components/groupApi/TopContent';
import { Button, Form, Input, Select } from 'antd';
import { RootState } from '../../../redux/reducers';
import { FormComponentProps } from 'antd/es/form';
import { connect, ConnectedProps } from 'react-redux';
import { getApiGeneralInformation, reloadData } from '../redux/actions/get_api_general_information';
import { updateApiGeneralInformation } from '../redux/actions/update_general_information';
import { CommonSearchParam } from '../../../models/common';
import { NotificationError } from '../../../components/Notification/Notification';
import { getCategories, getPermissions } from '../redux/services/apis';
import TextArea from 'antd/es/input/TextArea';
import { set } from 'immer/dist/utils/common';
import { UpdateApiGeneralInformationParam } from '../redux/models';
import Loading from '../../../components/Loading';
import styled from 'styled-components';

const mapStateToProps = (rootState: RootState) => ({
  getState: rootState.apiGeneralInformation.getState,
  updateState: rootState.apiGeneralInformation.updateState,
});
const connector = connect(mapStateToProps, { getApiGeneralInformation, updateApiGeneralInformation, reloadData });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const { Option } = Select;
const ApiGeneralInformationPage = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  document.title = 'Cấu hình thông tin chung dịch vụ chia sẻ';

  const params: any = useParams();
  const [apiId] = useState<string>(params.apiId);

  const [publicAccess, setPublicAccess] = useState(false);

  const [categoryOption, setCategoryOption] = useState<JSX.Element[]>();
  const [permissionOption, setPermissionOption] = useState<JSX.Element[]>();
  const [valueText, setValueText] = useState(props.getState.item.description);
  const onChangePermission = (value: any) => {
    // console.log(JSON.stringify(value))
  };

  const onChangeAccess = (value: any) => {
    if (value === undefined) {
      return;
    }
    if (value === 'PUBLIC') {
      setPublicAccess(true);
    } else if (value === 'PRIVATE') {
      setPublicAccess(false);
    }
  };

  const onBtnSubmitClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const param: UpdateApiGeneralInformationParam = {
          apiId: apiId,
          description: values.description,
          categories: values.categories,
          deploymentUnit: values.deploymentUnit,
          isPublic: values.grantedAccess === 'PUBLIC',
          permissions: values.permissions,
        };
        props.updateApiGeneralInformation(param);
      }
    });
  };

  const onBtnCancelClicked = (e: any) => {
    resetFields();
    props.reloadData();
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    props.form.setFields({
      description: {
        value: value.trim(),
      },
    });
    return true;
  };

  const validateDeploymentUnit = (rule: any, value: any, callback: any) => {
    props.form.setFields({
      deploymentUnit: {
        value: value.trim(),
      },
    });
    return true;
  };

  const pasteDescription = (e: any) => {
    const valueDescription = props.form.getFieldValue('description').trim();
    console.log('TEXT2', props.form.getFieldValue('description'));
    const value = e.clipboardData.getData('text').trim();
    console.log('TEXT3', value);
    const StringDescription = valueDescription + ' ' + value;
    console.log('TEXT4', StringDescription);
    // return setValueText(StringDescription);
    //Done

    props.form.setFields({
      description: {
        value: valueDescription + ' ',
      },
    });
  };

  const changeText = (e: any) => {
    pasteDescription(e);
  };

  const pasteDeploymentUnit = () => {
    const valueDeploymentUnit = props.form.getFieldValue('deploymentUnit');
    props.form.setFields({
      deploymentUnit: {
        value: valueDeploymentUnit.trim() + ' ',
      },
    });
  };

  useEffect(() => {
    props.getApiGeneralInformation(apiId);
    setPublicAccess(props.getState.item.isPublic);
    const searchCategoryParam: CommonSearchParam = {
      text: '',
      page: 0,
      size: 10,
    };
    getCategories(searchCategoryParam)
      .then(rs => {
        if (rs.code != 0) {
          return;
        }
        let optionList = rs.rows.map((item: any) => {
          return (
            <Option key={item.name} value={item.name}>
              {item.name}
            </Option>
          );
        });
        setCategoryOption(optionList);
      })
      .catch(() => NotificationError('Thất bại', 'Xảy ra lỗi hệ thống'));

    getPermissions(searchCategoryParam)
      .then(rs => {
        if (rs.code != 0) {
          return;
        }
        let optionList = rs.rows.map((item: any) => {
          return (
            <Option key={item.name} value={item.name}>
              {item.name}
            </Option>
          );
        });
        setPermissionOption(optionList);
      })
      .catch(() => NotificationError('Thất bại', 'Lỗi hệ thống'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getState.flag_reload]);

  useEffect(() => {
    setPublicAccess(props.getState.item.isPublic);
  }, [props.getState.item.isPublic]);

  return (
    <Wrapper>
      <ContentTab>
        <TopContent title="Cấu hình thông tin chung" time={props.getState.item.lastUpdate} />
        <h4>Thời gian chỉnh sửa lần cuối: {props.getState.item.lastUpdate}</h4>
      </ContentTab>

      <div className="api-general-information-form-div">
        <Form layout="horizontal">
          <Form.Item label="Mô tả chung" className=" row-item">
            {getFieldDecorator('description', {
              initialValue: props.getState.item.description,
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDescription }],
            })(
              <TextArea
                placeholder="Mô tả"
                rows={4}
                // value={valueText}
                style={{ marginTop: '3px' }}
                maxLength={5000}
                onPaste={changeText}
              />,
            )}
          </Form.Item>

          <div className="container-grantedAccess">
            <Form.Item label="Quyền truy cập dịch vụ chia sẻ" className=" row-item">
              {getFieldDecorator('grantedAccess', {
                initialValue: props.getState.item.isPublic ? 'PUBLIC' : 'PRIVATE',
                rules: [{ required: true, message: 'Vui lòng chọn quyền truy cập' }],
              })(
                <Select
                  placeholder="Chọn quyền truy cập"
                  optionFilterProp="children"
                  allowClear={true}
                  onChange={onChangeAccess}
                >
                  <Option value="PUBLIC">Công khai</Option>
                  <Option value="PRIVATE">Tùy chọn</Option>
                </Select>,
              )}
            </Form.Item>
            {publicAccess ? null : (
              <Form.Item label="Vai trò" className=" row-item">
                {getFieldDecorator('permissions', {
                  initialValue: props.getState.item.permissions === [''] ? [] : props.getState.item.permissions,
                })(
                  // (<Input placeholder="Nhập vai trò" style={{width: '50%', marginTop: "30px"}}/>)
                  <Select
                    mode="multiple"
                    placeholder="Chọn vai trò"
                    optionFilterProp="children"
                    allowClear={true}
                    onChange={onChangePermission}
                  >
                    {permissionOption}
                  </Select>,
                )}
              </Form.Item>
            )}
          </div>

          <Form.Item label="Nhóm dịch vụ" className=" row-item">
            {getFieldDecorator('categories', {
              initialValue: props.getState.item.categories === [''] ? [] : props.getState.item.categories,
            })(
              <Select showSearch placeholder="Chọn nhóm dịch vụ" optionFilterProp="children" allowClear={true}>
                {categoryOption}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="Đơn vị triển khai" className=" row-item">
            {getFieldDecorator('deploymentUnit', {
              initialValue: props.getState.item.deploymentUnit,
              validateTrigger: 'onBlur',
              rules: [{ validator: validateDeploymentUnit }],
            })(<Input placeholder="Nhập đơn vị triển khai" maxLength={255} onPaste={pasteDeploymentUnit} />)}
          </Form.Item>

          <div>
            <Button className="mr-3 " onClick={onBtnCancelClicked}>
              Hủy
            </Button>

            <Button htmlType="submit" type="primary" onClick={onBtnSubmitClicked}>
              Lưu
            </Button>
          </div>
        </Form>
      </div>
      {props.getState.loading || props.updateState.loading ? <Loading /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-form .ant-form-item-label {
    height: 28px;
  }
  .api-general-information-form-div {
    margin-top: -15px;
  }

  .row-item {
    margin: 20px 0px;
  }

  .container-grantedAccess {
    padding: 10px;
    padding-top: 0px;
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default connector(Form.create<IProps>()(ApiGeneralInformationPage));
const ContentTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ViewTime = styled.div`
  color: rgba(0, 0, 0, 0.85);
`;
