import { UploadOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Dragger from "antd/lib/upload/Dragger";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const FormPost = React.forwardRef(({ user, lang, handleSubmit }: any, ref) => {
  const [fileList, setFileList] = useState([]);
  const [fileDeletedList, setFileDeletedList] = useState([]);
  const [form] = useForm();

  const initEditorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = initEditorRef.current || {};

  useEffect(() => {
    initEditorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@huylt/ckeditor5-build-with-htmlembed"),
    };
    setEditorLoaded(true);
  }, []);

  useImperativeHandle(ref, () => ({
    resetAll() {
      form.resetFields();
      setFileList([]);
      setFileDeletedList([]);
    },
    setFileList: setFileList,
    form,
  }));

  const onFileChange = (info) => {
    if (info?.file.status === "removed") {
      setFileDeletedList([...fileDeletedList, info?.file.name]);
    }
    setFileList(info.fileList);
  };

  const onFinish = (values) => {
    handleSubmit({
      ...values,
      fileList,
      fileDeletedList,
      lang,
    });
  };

  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Form.Item name="id" hidden />
      <Form.Item
        label="Tên bài viết (Tên bài viết nên có 50–60 ký tự)"
        name="title"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên bài viết",
          },
        ]}
      >
        <Input showCount />
      </Form.Item>
      <Form.Item label="Ảnh bìa">
        <Dragger listType="picture" fileList={fileList} onChange={onFileChange}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click hoặc kéo thả file vào đây</p>
        </Dragger>
      </Form.Item>
      <Form.Item
        name="content"
        label="Nội dung bài viết"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập nội dung bài viết",
          },
        ]}
      >
        {editorLoaded && (
          <CKEditor
            editor={ClassicEditor}
            data={form.getFieldValue("content") || ""}
            style={{ height: 500 }}
            onChange={(event, editor) => {
              const content = editor.getData();
              form.setFieldsValue({ content });
            }}
          />
        )}
      </Form.Item>
      <Form.Item
        label='Từ khóa (Từ khóa cách nhau bằng dấu ",", khoảng 100-150 ký tự)'
        name="keyword"
      >
        <Input showCount />
      </Form.Item>
      <Form.Item label="Mô tả (Mô tả nên có 50 - 160 ký tự)" name="description">
        <Input maxLength={160} showCount />
      </Form.Item>
    </Form>
  );
});

export default FormPost;
