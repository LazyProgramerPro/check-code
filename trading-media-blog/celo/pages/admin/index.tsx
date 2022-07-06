import Head from "next/head";
import React from "react";
import { PageHeader } from "../../components/common/page-header";
import AdminLayout from "../../components/layout/admin";
import withAuth from "../../utils/withAuth";
import useTranslation from "next-translate/useTranslation";

function index() {
  const { t } = useTranslation("common");
  const breadcrumbs = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: "Admin Cpanel",
    },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Admin Cpanel" breadcrumb={breadcrumbs} />
    </AdminLayout>
  );
}

export default withAuth(index);
