import React from "react";
import { IS_SERVER, STORAGE } from "../constants/common";

function useAuth() {
  if (!IS_SERVER) {
    const token = localStorage.getItem(STORAGE.TOKEN);
    const isLoggedIn = !!token;
    let user;

    try {
      user = JSON.parse(localStorage.getItem(STORAGE.USER));
    } catch (e) {
      user = null;
    }

    return { isLoggedIn, token, user };
  }

  return {};
}
export default useAuth;
