import { Drawer, Input } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";



const SearchMenuItems = ({ closeModalMenuSearch }) => {

  const router = useRouter();

  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
    closeModalMenuSearch();
  };

  const handleSearch = (e) => {
    closeModalMenuSearch();

    router.push({
      pathname: '/search',
      query: {searchParams: e.target.value},
    })
    
  };

  return (
    <>
      <Drawer
        placement="right"
        onClose={onClose}
        visible={visible}
        className="header-mobile-drawer"
        width="100%"
      >
        <Input
          className="searchData"
          placeholder="Tìm kiếm"
          onPressEnter={(e) => handleSearch(e)}
        />
      </Drawer>
    </>
  );
};

export default SearchMenuItems;
