import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import logo from "../../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

import React from "react";

export default function Footer1() {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-wrapper-button">
          <div className="footer-wrapper-button-logo">
            <Link href="/">
              <Image src={logo} alt="" />
            </Link>
          </div>
          <div className="footer-wrapper-button-icons">
            <div className="footer-wrapper-button-icons--item">
              <Link href="https://www.facebook.com/">
                <BsFacebook />
              </Link>
            </div>
            <div className="footer-wrapper-button-icons--item">
              <Link href="https://www.youtube.com/">
                <BsYoutube />
              </Link>
            </div>
            <div className="footer-wrapper-button-icons--item">
              <Link href="https://twitter.com/">
                <AiOutlineTwitter />
              </Link>
            </div>
            <div className="footer-wrapper-button-icons--item">
              <Link href="https://web.telegram.org/k/">
                <FaTelegramPlane />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-wrapper-layout">
          <div className="footer-wrapper-layout-columns">
            <div className="footer-wrapper-layout-columns--title">About</div>
            <div className="footer-wrapper-layout-columns--info">About Us</div>
            <div className="footer-wrapper-layout-columns--info">Careers</div>
          </div>
          <div className="footer-wrapper-layout-columns">
            <div className="footer-wrapper-layout-columns--title">Product</div>
            <div className="footer-wrapper-layout-columns--info">Wallet</div>
            <div className="footer-wrapper-layout-columns--info">Exchange</div>
            <div className="footer-wrapper-layout-columns--info">Market</div>
            <div className="footer-wrapper-layout-columns--info">Portfolio</div>
          </div>
          <div className="footer-wrapper-layout-columns">
            <div className="footer-wrapper-layout-columns--title">Support</div>
            <div className="footer-wrapper-layout-columns--info">Email</div>
            <div className="footer-wrapper-layout-columns--info">Live Chat</div>
          </div>
          <div className="footer-wrapper-layout-columns">
            <div className="footer-wrapper-layout-columns--title">Community</div>
            <div className="footer-wrapper-layout-columns--info">Telegram</div>
            <div className="footer-wrapper-layout-columns--info">Discord</div>
          </div>
        </div>
      </div>
    </div>
  );
}
