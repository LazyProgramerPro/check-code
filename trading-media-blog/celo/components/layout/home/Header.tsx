import { MenuOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import { isEmpty } from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { FiChevronDown, FiSearch, FiSettings } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import VN from "../../../assets/vn.png";
import EN from "../../../assets/en.png";
import MobileMenuItems from "../../mobile/MobileMenuItems";
import SearchMenuItems from "../../mobile/SearchMenuItems";
import CategoryApi from "./../../../api/category/CategoryApi";
import useTranslation from "next-translate/useTranslation";

export default function Header({ className = "", title = "", category }) {
  const [visible, setVisible] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expandSearch, setExpandSearch] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleExpandSearchBar = () => {
    setExpandSearch(!expandSearch);
  };

  useEffect(() => {
    CategoryApi.getAllCategory(1, 20, router.locale).then((data) => {
      setCategories(data.result);
    });
  }, [currentLanguage]);

  useEffect(() => {
    setCurrentLanguage(false);
  }, [router.locale]);

  const openModalMenu = () => {
    setVisible(true);
  };

  const closeModalMenu = () => {
    setVisible(false);
  };
  const openModalMenuSearch = () => {
    setVisibleSearch(true);
  };

  const closeModalMenuSearch = () => {
    setVisibleSearch(false);
  };

  const handleSearch = (e) => {
    router.push({
      pathname: "/search",
      query: { searchParams: e.target.value },
    });
  };

  if (isEmpty(categories)) {
    return <Spin />;
  }

  return (
    <>
      <Head>
        <title>{title ? title + " - " : null} ByteBuffer News</title>
      </Head>

      <BrowserView>
        <header className={className + " header"}>
          <div className="header-content">
            <div className="header-logo">
              <Link href="/">
                <Image src={logo} alt="" />
              </Link>
            </div>
            <div className="header-navbar">
              {categories.map((c) => {
                return (
                  <div
                    className={`header-navbar__item ${
                      category && category.parentId === c._id ? "active" : ""
                    } `}
                  >
                    <Link href={`/category/${c.slug}`}>
                      <a className="header-navbar__item__title">{c.title} </a>
                    </Link>

                    {!isEmpty(c.childrens) ? (
                      <>
                        <span className="header-navbar__item__icon">
                          <FiChevronDown size={16} />
                        </span>
                        <div className="header-navbar__submenu">
                          {c.childrens.map((d) => {
                            return (
                              <>
                                <Link href={`/category/${d.slug}`}>
                                  <a className="header-navbar__submenu__title">
                                    {d.title}
                                  </a>
                                </Link>
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="header-action">
              {expandSearch && (
                <Input
                  className="inputSearch"
                  placeholder="Tìm kiếm"
                  onPressEnter={handleSearch}
                />
              )}
              <div className="header-action__search">
                <button
                  className="header-action__btn"
                  onClick={handleExpandSearchBar}
                >
                  <FiSearch size={20} />
                </button>
              </div>
              <div className="header-action__setting">
                <div className="header-action__btn">
                  <FiSettings size={20} />
                </div>
                <div className="header-action__setting__menu">
                  <div className="language">
                    <div className="language--title">{t("language")} </div>
                    <div className="language-flag">
                      <Button
                        onClick={() => {
                          setCurrentLanguage(true);
                        }}
                        className="language-flag-button"
                      >
                        {currentLanguage == false ? (
                          router.locale == "vn" ? (
                            <Image
                              src={VN}
                              alt=""
                              className="language-flag-icon"
                            />
                          ) : (
                            <Image
                              src={EN}
                              alt=""
                              className="language-flag-icon"
                            />
                          )
                        ) : (
                          <div className="language-flag-button-wrapper">
                            {router.locales.map((locale) =>
                              locale == "vn" ? (
                                <Link href={router.asPath} locale={locale}>
                                  <Image
                                    src={VN}
                                    alt=""
                                    className="language-flag-button-setting-icon"
                                  />
                                </Link>
                              ) : (
                                <Link href={router.asPath} locale={locale}>
                                  <Image
                                    src={EN}
                                    alt=""
                                    className="language-flag-button-setting-icon"
                                  />
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-divider" />
        </header>
      </BrowserView>
      <MobileView>
        <div className="header-mobile-content">
          <div className="header-mobile-content--left">
            <div className="icon">
              <MenuOutlined size={20} onClick={openModalMenu} />
            </div>

            <div className="logo">
              <Link href="/">
                <Image src={logo} alt="" />
              </Link>
            </div>
          </div>

          <div className="header-mobile-action">
            <div className="header-mobile-action__search">
              <button className="header-mobile-action__btn">
                <FiSearch size={20} onClick={openModalMenuSearch} />
              </button>
            </div>
            <button className="header-mobile-action__btn">
              <FiSettings size={20} />
            </button>
          </div>
          {visible && (
            <>
              <MobileMenuItems
                closeModalMenu={closeModalMenu}
                categories={categories}
              />
            </>
          )}
          {visibleSearch && (
            <>
              <SearchMenuItems closeModalMenuSearch={closeModalMenuSearch} />
            </>
          )}
        </div>
      </MobileView>
    </>
  );
}
