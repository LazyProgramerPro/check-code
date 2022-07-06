import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { PageHeader } from "../../components/common/page-header";
import AdminLayout from "../../components/layout/admin";
import request from "../../utils/request";
import withAuth from "../../utils/withAuth";

function Category() {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("vn");
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 20,
  });

  const form = {
    init: Form.useForm()[0],
    vn: Form.useForm()[0],
    en: Form.useForm()[0],
  };

  const { lang: currentLang } = useTranslation();

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
      title: t("category_name"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("parent_category"),
      dataIndex: "parent",
      key: "parent",
      render: (parent) => {
        return parent && parent.title;
      },
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

  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
  }, [currentLang]);

  useEffect(() => {
    fetchParentCategories();
  }, [editId]);

  const fetchCategories = async () => {
    try {
      const { data } = await request.get("categories/all", {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          lang: currentLang,
        },
      });

      setCategories(data.result);
      setPagination({
        ...pagination,
        total: data.total,
      });
    } catch (e) {
      //
    }
  };

  const fetchParentCategories = async () => {
    try {
      const { data } = await request.get("categories", {
        params: {
          page: 1,
          pageSize: 1000,
          lang: currentLang,
          exclude: editId,
        },
      });

      setParentCategories(data.result);
    } catch (e) {
      //
    }
  };

  const handleSubmit = async (values, lang) => {
    try {
      const parentId = form.init.getFieldValue("parentId");
      const { data } = await request.post(
        "categories",
        {
          ...values,
          parentId,
          id: editId,
        },
        {
          params: {
            lang: lang,
          },
        }
      );
      notification.success({
        message: t("success"),
        description: editId
          ? t("edit_category_success")
          : t("create_category_success"),
      });
      fetchCategories();
      fetchParentCategories();

      if (!editId) {
        setVisible(false);
        onReset();
      }

      setEditId(data.result?._id);
    } catch (error) {}
  };

  const handleEdit = async (item) => {
    try {
      const { data } = await request.get(`categories/${item._id}/contents`);
      if (data.result && data.result.contents) {
        data.result.contents.map((content) => {
          const ref = form[content.language.langKey];

          ref?.setFieldsValue({
            id: data.result._id,
            title: content.title,
          });
        });
        form.init.setFieldsValue({
          parentId: item.parentId,
        });
        setEditId(item._id);
        setVisible(true);
      }
    } catch (error) {}
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: t("confirm_delete_category"),
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
          await request.delete(`categories/${item._id}`);
          notification.success({
            message: t("success"),
            description: t("delete_category_success"),
          });
          fetchCategories();
          fetchParentCategories();
        } catch (error) {
          notification.error({
            message: t("failure"),
            description: t("delete_failed_category"),
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

  const onSubmit = () => {
    form[activeKey].submit();
    form.init.submit();
  };

  const onReset = () => {
    form.vn.resetFields();
    form.en.resetFields();
  };

  return (
    <AdminLayout>
      <PageHeader
        title={t("category")}
        breadcrumb={breadcrumbs}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            icon={<PlusOutlined />}
          >
            {t("create_new_category")}
          </Button>
        }
      />
      <Card title={t("category_list")}>
        <Table
          scroll={{
            x: "auto",
          }}
          columns={columns}
          dataSource={categories}
          pagination={{
            ...pagination,
            onChange: handlePaginate,
          }}
        />
      </Card>
      <Modal
        title={editId ? t("edit_category") : t("create_category")}
        visible={visible}
        cancelText="Hủy"
        okText="Lưu"
        forceRender
        onOk={onSubmit}
        onCancel={() => {
          setVisible(false);
          setEditId(null);
          onReset();
        }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          defaultActiveKey={currentLang}
        >
          <Tabs.TabPane
            forceRender
            tab="Tiếng việt"
            key="vn"
            disabled={!editId && currentLang !== "vn"}
          >
            <Form
              onFinish={(values) => handleSubmit(values, "vn")}
              form={form.vn}
              layout="vertical"
            >
              <Form.Item name="id" hidden />
              <Form.Item
                label={t("category_name")}
                name="title"
                rules={[
                  {
                    required: true,
                    message: t("input_categories_name"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane
            forceRender
            tab="English"
            key="en"
            disabled={!editId && currentLang !== "en"}
          >
            <Form
              onFinish={(values) => handleSubmit(values, "en")}
              form={form.en}
              layout="vertical"
            >
              <Form.Item name="id" hidden />
              <Form.Item
                label={t("category_name")}
                name="title"
                rules={[
                  {
                    required: true,
                    message: t("input_categories_name"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <Form layout="vertical" form={form.init}>
          <Form.Item label={t("parent_category")} name="parentId">
            <Select allowClear>
              {parentCategories.map((obj) => (
                <Select.Option key={obj._id}>{obj.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}

export default withAuth(Category);
