import React from "react";
import "./style.css";
export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img className="logo" src="./img/logo.jpg" alt="" />
      </a>
      <div className="header__center">
        <ul className="center__item">
          <li>
            <a href="/">Lịch Chiếu</a>
          </li>
          <li>
            <a href="/">Cụm rạp</a>
          </li>
          <li>
            <a href="#movie">Tin Tức</a>
          </li>
          <li>
            <a href="/">Ứng dụng</a>
          </li>
        </ul>
      </div>
      <a href="/login" className="btn header__btn">
        <i className="fa fa-user-tie"></i> &ensp; Đăng nhập / Đăng Kí
      </a>
    </header>
  );
}
