/* eslint-disable no-undef */

const FACEBOOK_APP_ID = "482373960096597";

export function initFacebook() {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: FACEBOOK_APP_ID,
        xfbml: true,
        version: "v11.0",
      });
      resolve();
    };

    // load facebook sdk asynchronously
    (function (d, s, id) {
      if (d.getElementById(id)) {
        return;
      }

      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
