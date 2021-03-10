import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
export default function Header() {
  let taiKhoan = "";
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
            <a href="#LichChieu">Lịch Chiếu</a>
          </li>
          <li>
            <a href="#filter">Mua vé nhanh</a>
          </li>
          <li>
            <a href="#new">Tin Tức</a>
          </li>
          <li>
            <a href="/">Ứng dụng</a>
          </li>
        </ul>
      </div>
      {taiKhoan === "" ? (
        <div className="d-flex ">
          <Link to="/login" className="btn header__btn ">
            Đăng nhập
          </Link>
          <Link to="/signup" className="btn header__btn ">
            Đăng Kí
          </Link>
        </div>
      ) : (
        <span className="btn header__btn">
          <i className="fa fa-user-tie"></i> &ensp; {taiKhoan}
        </span>
      )}
    </header>
  );
}
