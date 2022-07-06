/* eslint-disable no-undef */

import { useState, useEffect } from "react";
import { initFacebook } from "./initFacebook";

export default function Comment() {
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState(
    "https://trading-nonprod-mediablog.edsolabs.com/"
  );

  useEffect(() => {
    const loadFacebook = async () => {
      await initFacebook();
      setLoaded(true);
    };

    loadFacebook().catch(console.error);
    setData(window.location.href);
  });

  useEffect(() => {
    setLoaded(true);
  }, [data]);

  useEffect(() => {
    if (typeof FB !== "undefined") {
      FB.XFBML.parse();
    }
  });

  const skeletonComponent = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>Load comment...</h2>
    </div>
  );
  const facebookComponent = (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        borderRadius: "20px",
      }}
      className="fb-comments"
      data-href={data}
      data-max-width="1190"
      data-numposts="5"
    />
  );

  return (
    <main>
      <div>{loaded ? facebookComponent : skeletonComponent}</div>
    </main>
  );
}
