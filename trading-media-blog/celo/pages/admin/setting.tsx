import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { PageHeader } from "../../components/common/page-header";
import AdminLayout from "../../components/layout/admin";
import request from "../../utils/request";
import withAuth from "../../utils/withAuth";

function Setting() {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 20,
  });
  const [form] = useForm();

  const { lang: currentLang } = useTranslation();

  useEffect(() => {
    fetchSetting();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await request.get("categories/all", {
        params: {
          page: 1,
          pageSize: 1000,
        },
      });

      setCategories(data.result);
    } catch (e) {
      //
    }
  };

  const fetchSetting = async () => {
    try {
      const { data } = await request.get("setting", {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          lang: currentLang,
        },
      });

      setSettings(data.result);
      setPagination({
        ...pagination,
        total: data.total,
      });
    } catch (e) {
      //
    }
  };

  const breadcrumbs = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: "Admin Cpanel",
      path: "/admin",
    },
    {
      name: t("category"),
    },
  ];

  const columns: any = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: t("key"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("type"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("categories"),
      dataIndex: "categories",
      key: "category",
      render: (categories) => {
        return categories && categories.map((item) => item.title).join(", ");
      },
    },
    {
      title: t("display"),
      dataIndex: "enable",
      key: "enable",
      render: (val) => <Checkbox checked={val} />,
    },
    {
      title: t("action"),
      dataIndex: "_id",
      key: "_id",
      width: 100,
      fixed: "right",
      render: (id, row) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(row)}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row)}
            type="link"
            danger
          />
        </Space>
      ),
    },
  ];

  const handleSubmit = async (values) => {
    try {
      await request.post("setting", {
        ...values,
        id: editId,
      });

      notification.success({
        message: t("success"),
        description: editId
          ? t("edit_config_success")
          : t("create_config_success"),
      });
      fetchSetting();

      if (!editId) {
        setVisible(false);
        form.resetFields();
      }
    } catch (error) {}
  };

  const handleEdit = async (item) => {
    form.setFieldsValue({
      ...item,
      categories:
        item.categories && item.categories.length
          ? item.categories.map((obj) => obj.categoryId)
          : [],
    });
    setVisible(true);
    setEditId(item._id);
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Xác nhận xóa cấu hình",
      content: (
        <>
          {t("category")} <b>{item.title}</b> {t("will_be_delete")}
        </>
      ),
      type: "confirm",
      okText: t("delete"),
      okButtonProps: {
        danger: true,
      },
      cancelText: t("cancel"),
      onOk: async () => {
        try {
          await request.delete(`setting/${item._id}`);
          notification.success({
            message: t("success"),
            description: t("delete_config_success"),
          });
          fetchSetting();
        } catch (error) {
          notification.error({
            message: t("failure"),
            description: t("delete_config_fail"),
          });
        }
      },
    });
  };

  const handlePaginate = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
    });
  };

  return (
    <AdminLayout>
      <PageHeader title={t("configuration")} breadcrumb={breadcrumbs} />
      <Card
        title={t("homepage_section_settings")}
        extra={
          <Button
            type="primary"
            onClick={() => setVisible(true)}
            icon={<PlusOutlined />}
          >
            {t("add")}
          </Button>
        }
      >
        <Table
          scroll={{
            x: "auto",
          }}
          columns={columns}
          dataSource={settings}
          pagination={{
            ...pagination,
            onChange: handlePaginate,
          }}
        />
      </Card>
      <Modal
        title={editId ? t("edit_category") : t("create_category")}
        visible={visible}
        cancelText={t("cancel")}
        okText={t("save")}
        forceRender
        onOk={form.submit}
        onCancel={() => {
          setVisible(false);
          setEditId(null);
          form.resetFields();
        }}
      >
        <Form
          onFinish={handleSubmit}
          initialValues={{ enable: true }}
          layout="vertical"
          form={form}
        >
          <Form.Item name="key" label={t("key")}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label={t("name")}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label={t("type")}>
            <Select>
              <Select.Option key="SECTION">SECTION</Select.Option>
              <Select.Option key="HEADER">HEADER</Select.Option>
              <Select.Option key="FOOTER">FOOTER</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="value" label={`${t("value")} (url/text)`}>
            <Input />
          </Form.Item>
          <Form.Item label={t("category")} name="categories">
            <Select mode="multiple" allowClear>
              {categories.map((obj) => (
                <Select.Option key={obj._id}>{obj.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="enable" valuePropName="checked">
            <Checkbox>{t("display")}</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}

export default withAuth(Setting);
