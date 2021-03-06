import MSFormItem from '@/components/Form/Item';
import { filterOption, normalizeOptions } from '@/components/select/CustomSelect';
import AddressApi from '@/services/addressApi';
import ModuleApi from '@/services/module-api/ModuleApi';
import { CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Space } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import { StyledDrawer } from '../../style';

const { TextArea } = Input;

export const DATA_FAKE_ZONE = {
  provinces: [{ name: '', provinceId: '' }],
  campoxy: [{ name: '', uuid: '' }],
  nvr: [{ name: '', uuid: '' }],
  playback: [{ name: '', uuid: '' }],
};

const AddEditZone = ({
  onClose,
  selectedRecord,
  dispatch,
  openDrawer,
  resetForm,
  searchParam,
  setSearchParam,
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [filterOptions, setFilterOptions] = useState(DATA_FAKE_ZONE);

  const [provinceId, setProvinceId] = useState(selectedRecord?.provinceId || null);
  const [districts, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(selectedRecord?.districtId || null);
  const [wards, setWard] = useState([]);

  const handleSubmit = async (value) => {
    const payload = {
      ...value,
    };
    if (isEmpty(selectedRecord)) {
      await dispatch({
        type: 'zone/addZone',
        payload: payload,
      });
    } else {
      await dispatch({
        type: 'zone/editZone',
        payload: { id: selectedRecord?.uuid, values: { ...payload } },
      });
    }
    dispatch({
      type: 'globalstore/fetchAllZones',
      payload: { size: 1000 },
    });
    setSearchParam({ ...searchParam, name: '' });
    onClose();
    resetForm();
  };

  async function fetchSelectOptions() {
    const values = await Promise.all([
      AddressApi.getAllProvinces(),
      ModuleApi.getAllPlayback(),
      ModuleApi.getAllNVR(),
      ModuleApi.getAllCamproxy(),
    ]);
    const [provinces, playback, nvr, camproxy] = values.map((value) => value.payload);

    return {
      provinces,
      playback,
      nvr,
      camproxy,
    };
  }

  useEffect(() => {
    fetchSelectOptions().then(setFilterOptions);
  }, []);

  useEffect(() => {
    if (provinceId) {
      AddressApi.getDistrictByProvinceId(provinceId).then((data) => setDistrict(data.payload));
      setDistrictId(null);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      AddressApi.getWardByDistrictId(districtId).then((data) => setWard(data.payload));
    } else {
      setWard([]);
    }
  }, [districtId]);

  const { provinces, playback, nvr, camproxy } = filterOptions;

  const onChangeCity = async (cityId) => {
    setProvinceId(cityId);

    await resetDistrictAndWardData();
  };

  function resetDistrictAndWardData() {
    form.setFieldsValue({ districtId: null, wardId: null });
  }

  const onChangeDistrict = async (districtId) => {
    setDistrictId(districtId);
    await resetWardData();
  };

  function resetWardData() {
    form.setFieldsValue({ wardId: null });
  }

  const onDeleteRecord = async () => {
    await dispatch({
      type: 'zone/deleteZone',
      payload: { id: selectedRecord?.uuid },
    });
    dispatch({
      type: 'globalstore/fetchAllZones',
      payload: { size: 1000 },
    });

    setSearchParam({ ...searchParam, name: '' });
    onClose();
    resetForm();
  };

  return (
    <StyledDrawer
      openDrawer={openDrawer}
      onClose={onClose}
      width={'30%'}
      zIndex={1001}
      placement="right"
      extra={
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              form.submit();
            }}
          >
            <SaveOutlined />
            {intl.formatMessage({ id: 'view.map.button_save' })}
          </Button>
          <Button onClick={onClose}>
            <CloseOutlined />
            {intl.formatMessage({ id: 'view.map.cancel' })}
          </Button>
          {!isEmpty(selectedRecord) && (
            <Popconfirm
              placement="bottom"
              title={intl.formatMessage({ id: 'noti.delete' })}
              onConfirm={onDeleteRecord}
              okText={intl.formatMessage({ id: 'view.map.button_accept' })}
              cancelText={intl.formatMessage({ id: 'view.map.button_cancel' })}
            >
              <Button type="primary" danger>
                <DeleteOutlined />
                {intl.formatMessage({ id: 'delete' })}
              </Button>
            </Popconfirm>
          )}
        </Space>
      }
    >
      <Card
        title={
          isEmpty(selectedRecord)
            ? intl.formatMessage(
                { id: 'view.common_device.add_zone' },
                {
                  add: intl.formatMessage({
                    id: 'add',
                  }),
                },
              )
            : intl.formatMessage({ id: 'view.common_device.edit_zone' })
        }
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={selectedRecord ?? {}}
        >
          <Row gutter={24}>
            <Col span={24}>
              <MSFormItem
                label={`${intl.formatMessage({
                  id: 'view.common_device.zone_name',
                })}`}
                type="input"
                name="name"
                maxLength={255}
                required={true}
              >
                <Input
                  onBlur={(e) => {
                    form.setFieldsValue({
                      name: e.target.value.trim(),
                    });
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    form.setFieldsValue({
                      name: e.clipboardData.getData('text').trim(),
                    });
                  }}
                />
              </MSFormItem>
            </Col>

            <Col span={8}>
              <MSFormItem
                type="select"
                name="provinceId"
                label={`${intl.formatMessage({
                  id: 'view.map.province_id',
                })}`}
                required={true}
              >
                <Select
                  showSearch
                  dataSource={provinces}
                  onChange={(cityId) => onChangeCity(cityId)}
                  filterOption={filterOption}
                  options={normalizeOptions('name', 'provinceId', provinces)}
                />
              </MSFormItem>
            </Col>

            <Col span={8}>
              <MSFormItem
                type="select"
                name="districtId"
                label={`${intl.formatMessage({
                  id: 'view.map.district_id',
                })}`}
                required={true}
              >
                <Select
                  showSearch
                  dataSource={districts}
                  onChange={(districtId) => onChangeDistrict(districtId)}
                  filterOption={filterOption}
                  options={normalizeOptions('name', 'districtId', districts)}
                />
              </MSFormItem>
            </Col>

            <Col span={8}>
              <MSFormItem
                type="select"
                name="wardId"
                label={`${intl.formatMessage({
                  id: 'view.map.ward_id',
                })}`}
              >
                <Select
                  showSearch
                  dataSource={wards}
                  filterOption={filterOption}
                  options={normalizeOptions('name', 'id', wards)}
                />
              </MSFormItem>
            </Col>
            <Col span={24}>
              <MSFormItem
                type="input"
                label={`${intl.formatMessage({
                  id: 'view.map.address',
                })}`}
                name="address"
                maxLength={255}
                required={true}
              >
                <Input
                  onBlur={(e) => {
                    form.setFieldsValue({
                      address: e.target.value.trim(),
                    });
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    form.setFieldsValue({
                      address: e.clipboardData.getData('text').trim(),
                    });
                  }}
                />
              </MSFormItem>
            </Col>

            <Col span={24}>
              <MSFormItem
                type="input"
                label={`${intl.formatMessage({
                  id: 'view.user.detail_list.desc',
                })}`}
                name="description"
                maxLength={255}
                required={true}
              >
                <TextArea
                  onBlur={(e) => {
                    form.setFieldsValue({
                      description: e.target.value.trim(),
                    });
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    form.setFieldsValue({
                      description: e.clipboardData.getData('text').trim(),
                    });
                  }}
                />
              </MSFormItem>
            </Col>
            <Col span={24}>
              <MSFormItem
                type="select"
                label={`${intl.formatMessage({
                  id: 'view.common_device.choose_nvr',
                })}`}
                name="nvrUuidList"
              >
                <Select
                  mode="multiple"
                  showArrow
                  options={nvr?.map((r) => ({
                    value: r.uuid,
                    label: r.name,
                  }))}
                />
              </MSFormItem>
            </Col>
            <Col span={24}>
              <MSFormItem
                type="select"
                label={`${intl.formatMessage({
                  id: 'view.common_device.choose_playback',
                })}`}
                name="playbackUuidList"
              >
                <Select
                  mode="multiple"
                  showArrow
                  options={playback?.map((s) => ({
                    value: s.uuid,
                    label: s.name,
                  }))}
                />
              </MSFormItem>
            </Col>
            <Col span={24}>
              <MSFormItem
                type="select"
                label={`${intl.formatMessage({
                  id: 'view.common_device.choose_camproxy',
                })}`}
                name="campUuidList"
              >
                <Select
                  mode="multiple"
                  showArrow
                  options={camproxy?.map((c) => ({
                    value: c.uuid,
                    label: c.name,
                  }))}
                />
              </MSFormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </StyledDrawer>
  );
};

export default AddEditZone;
