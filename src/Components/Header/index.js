import React from "react";
import "./style.css";
export default function Header(props) {
  let taiKhoan = null;
  if (localStorage.getItem("user") !== null) {
    taiKhoan = JSON.parse(localStorage.getItem("user")).taiKhoan;
  }
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
      {!taiKhoan ? (
        <a href="/login" className="btn header__btn ">
          <i className="fa fa-user-tie"></i> &ensp; Đăng nhập / Đăng Kí
        </a>
      ) : (
        <a href="/" className="btn header__btn">
          <i className="fa fa-user-tie"></i> &ensp; {taiKhoan}
        </a>
      )}
    </header>
  );
}
