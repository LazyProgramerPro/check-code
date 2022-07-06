import { Drawer } from "antd";
import { isEmpty } from "lodash";
import Link from "next/link";
import React, { useState } from "react";
const MobileMenuItems = ({ closeModalMenu, categories }) => {
  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
    closeModalMenu();
  };

  return (
    <>
      <Drawer
        title="Danh mục"
        placement="left"
        onClose={onClose}
        visible={visible}
        className="header-mobile-drawer"
        width="100%"
      >
        {categories.map((c) => {
          return (
            <>
              <h3 className="header-mobile-drawer__item__title">{c.title} </h3>

              {!isEmpty(c.childrens) ? (
                <div className="header-mobile-drawer__submenu">
                  {c.childrens.map((d) => {
                    return (
                      <div className="header-mobile-drawer__submenu__title">
                        <Link href={`/category/${d.slug}`}>
                          <a onClick={onClose}>{d.title}</a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          );
        })}
      </Drawer>
    </>
  );
};

export default MobileMenuItems;
