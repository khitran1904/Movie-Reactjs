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
            <a href="/bookingTickets">Ứng dụng</a>
          </li>
        </ul>
      </div>
      {taiKhoan === "" ? (
        <div className="d-flex user__action">
          <Link to="/login" className="btn header__btn action__user">
            Đăng nhập
          </Link>
          <Link to="/signup" className="btn header__btn action__user">
            Đăng Kí
          </Link>
        </div>
      ) : (
        <div className="d-flex user__action">
          <span className="btn header__btn">
          <Link to="/account" className="account__name" > <i className="fa fa-user-tie"></i> &ensp; {taiKhoan}</Link>
          </span>
        </div>
      )}
    </header>
  );
}
