import React, { useEffect, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import ScrollButton from "../../scroll/ScrollButton";
import Header from "./Header";

export default function HomeLayout({ children, category, title = "" }) {
  const [showExtend, setShowExtend] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (document.scrollingElement.scrollTop > 100) {
        setShowExtend(false);
      } else {
        setShowExtend(true);
      }
    };
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <BrowserView style={{}}>
        <Header
          className={showExtend && "extended"}
          title={title}
          category={category}
        />
        <div
          className="container"
          style={{
            paddingTop: showExtend ? 120 : 60,
            ...(isMobile && { paddingTop: 0 }),
          }}
        >
          {children}
        </div>
      </BrowserView>
      <MobileView>
        <Header
          className={showExtend && isMobile && "extended"}
          category={category}
        />
        <div className="containerMobile" style={{ paddingTop: 0 }}>
          {children}
        </div>
      </MobileView>
      <ScrollButton />
    </>
  );
}
