import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";

import FormPost from "../../components/admin/FormPost";
import { PageHeader } from "../../components/common/page-header";
import AdminLayout from "../../components/layout/admin";
import { API_URL } from "../../constants/common";
import useAuth from "../../hooks/useAuth";
import request from "../../utils/request";
import withAuth from "../../utils/withAuth";

function Post() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const { lang: currentLang } = useTranslation();
  const { t } = useTranslation("common");
  const [activeKey, setActiveKey] = useState(currentLang);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 20,
  });
  const [form] = useForm();
  const formPostRef = {
    vn: useRef(null),
    en: useRef(null),
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
      name: t("post"),
    },
  ];

  const columns: any = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: t("post_name"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("categories"),
      dataIndex: "categories",
      key: "categories",
      render: (categories) => {
        return categories && categories.map((item) => item.title).join(", ");
      },
    },
    {
      title: t("author"),
      dataIndex: "author",
      key: "author",
    },
    {
      title: t("action"),
      width: 100,
      fixed: "right",
      dataIndex: "_id",
      key: "_id",
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
    fetchPosts();
  }, [pagination.current, currentLang]);

  useEffect(() => {
    fetchCategories();
    setActiveKey(currentLang);
  }, [currentLang]);

  const fetchPosts = async () => {
    try {
      const { data } = await request.get("posts", {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          lang: currentLang,
        },
      });

      setPosts(data.result);
      setPagination({
        ...pagination,
        total: data.total,
      });
    } catch (e) {
      //
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await request.get("categories/all", {
        params: {
          page: 1,
          pageSize: 1000,
          lang: currentLang,
        },
      });

      setCategories(data.result);
    } catch (e) {
      //
    }
  };

  const handleSubmit = async ({
    title,
    content,
    keyword,
    description,
    fileList = [],
    fileDeletedList = [],
    lang,
  }) => {
    try {
      if (form.getFieldError("categories").length) return;

      const formData = new FormData();
      formData.append("id", editId || "");
      formData.append("title", title);
      formData.append("content", content);
      formData.append("keyword", keyword || "");
      formData.append("description", description || "");

      const author = form.getFieldValue("author");
      const categories = form.getFieldValue("categories");

      formData.append("author", author || "");

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      if (categories && categories.length) {
        categories.map((id) => formData.append("categories", id));
      }

      if (fileDeletedList && fileDeletedList.length) {
        fileDeletedList.forEach((name) =>
          formData.append("deletedFiles", name)
        );
      }

      const { data } = await request.post("posts", formData, {
        params: {
          lang,
        },
      });
      notification.success({
        message: t("success"),
        description: editId ? t("edit_post_success") : t("create_post_success"),
      });
      fetchPosts();
      if (!editId) {
        setVisible(false);
        onReset();
      } else {
        setEditId(data?.result?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (item) => {
    try {
      const { data } = await request.get(`posts/${item._id}/contents`);
      if (data.result && data.result.contents) {
        form.setFieldsValue({
          categories:
            data.result.categories && data.result.categories.length
              ? data.result.categories.map((obj) => obj._id)
              : [],
          author: data.result.author,
        });
        data.result.contents.map((content) => {
          const ref = formPostRef[content.language.langKey];

          ref.current?.form?.setFieldsValue({
            id: data.result._id,
            title: content.title,
            content: content.content,
            keyword: content.keyword,
            description: content.description,
          });
          if (content.thumbnails && content.thumbnails.length) {
            ref.current?.setFileList(
              content.thumbnails.map((fileName, index) => ({
                uid: index,
                name: fileName,
                status: "done",
                url: API_URL + `/posts/files/upload/${fileName}`,
                thumbUrl: API_URL + `/posts/files/upload/${fileName}`,
              }))
            );
          }
        });
        setEditId(item._id);
        setVisible(true);
      }
    } catch (e) {
      console.log(e);
      //
    }
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: t("confirm_delete_post"),
      content: (
        <>
          {t("the_post")} <b>{item.title}</b> {t("will_be_delete")}
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
          await request.delete(`posts/${item._id}`);
          notification.success({
            message: t("success"),
            description: t("delete_post_success"),
          });
          fetchPosts();
        } catch (error) {
          notification.error({
            message: t("failure"),
            description: t("delete_failed_post"),
          });
        }
      },
    });
  };

  const onSubmit = () => {
    formPostRef[activeKey].current?.form?.submit();
    form.submit();
  };

  const onReset = () => {
    formPostRef.vn.current?.resetAll();
    formPostRef.en.current?.resetAll();
    form.resetFields();
    setEditId(null);
  };

  const handlePaginate = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
    });
  };

  return (
    <AdminLayout>
      <PageHeader
        title={t("post")}
        breadcrumb={breadcrumbs}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            icon={<PlusOutlined />}
          >
            {t("create_new_post")}
          </Button>
        }
      />
      <Card title={t("post_list")}>
        <Table
          scroll={{
            x: "auto",
          }}
          columns={columns}
          dataSource={posts}
          pagination={{
            ...pagination,
            onChange: handlePaginate,
          }}
        />
      </Card>
      <Drawer
        title={editId ? t("edit_post") : t("create_post")}
        width="100%"
        visible={visible}
        forceRender
        zIndex={1002}
        onClose={() => {
          setVisible(false);
          onReset();
        }}
        footer={
          <Space>
            <Button
              onClick={() => {
                setVisible(false);
                onReset();
              }}
            >
              {t("cancel")}
            </Button>
            <Button type="primary" onClick={onSubmit}>
              {t("save_post")}
            </Button>
          </Space>
        }
      >
        <Tabs
          onChange={setActiveKey}
          activeKey={activeKey}
          defaultActiveKey={currentLang}
        >
          <Tabs.TabPane
            forceRender
            key="vn"
            tab="Tiếng Việt"
            disabled={!editId && currentLang !== "vn"}
          >
            <FormPost
              ref={formPostRef.vn}
              lang="vn"
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            forceRender
            key="en"
            tab="English"
            disabled={!editId && currentLang !== "en"}
          >
            <FormPost
              lang="en"
              ref={formPostRef.en}
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>
        </Tabs>
        <Form
          layout="vertical"
          form={form}
          initialValues={{ author: user?.username }}
        >
          <Form.Item
            label={t("post_categories")}
            name="categories"
            rules={[
              {
                required: true,
                message: t("choose_categories"),
              },
            ]}
          >
            <Select mode="multiple" showSearch allowClear>
              {categories.map((item, key) => (
                <Select.Option key={item._id}>{item.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label={t("author")} name="author">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </AdminLayout>
  );
}

export default withAuth(Post);
