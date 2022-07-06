import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function NotFound() {
  const { t } = useTranslation("common");
  return (
    <div className="notfound-page">
      <div className="notfound-page-logo">
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </div>
      <div className="notfound-page-divider"/>
      <div className="notfound-page-title">{t("page_not_found")}</div>
    </div>
  );
}
