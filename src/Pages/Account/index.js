/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { getAccountInfo, ChangeAccountInfo } from "../../Action/Account";
import { Link } from "react-router-dom";

export default function Account() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const userStorage = JSON.parse(localStorage.getItem("user"));
  const { currentUser } = useSelector((state) => state.accountReducer);
  const [UserCurrent, setUserCurrent] = useState(currentUser);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setUserCurrent(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const handleChange = () => {
    let email = document.getElementById("email").value
      ? document.getElementById("email").value
      : currentUser.email;
    let password = document.getElementById("password").value
      ? document.getElementById("password").value
      : currentUser.matKhau;
    let phone = document.getElementById("phone").value
      ? document.getElementById("phone").value
      : currentUser.soDT;
    let Username = document.getElementById("Username").value
      ? document.getElementById("Username").value
      : currentUser.hoTen;

    const userChange = {
      taiKhoan: currentUser.taiKhoan,
      matKhau: password,
      email: email,
      soDt: phone,
      maNhom: currentUser.maNhom,
      maLoaiNguoiDung: "KhachHang",
      hoTen: Username,
    };
    console.log(userChange);
    dispatch(ChangeAccountInfo(userChange));
    setShow(false);
  };

  return (
    <div className="account my-5 row">
      <div className="col-3 account__left">
        <p>TÀI KHOẢN CINEMA</p>
        <ul>
          <li className="current">
            <Link to="/account">Thông tin chung</Link>
          </li>
          <li className="">
            <Link to="/ticketInfo">Lịch sử giao dịch</Link>
          </li>
        </ul>
      </div>
      <div className="account__right col-9">
        <p className="w-100 title__right">Thông tin tài khoản</p>
        <img src="./img/logo.jpg" alt="Avatar Profile"></img>
        <span className="account__name">Xin Chào {UserCurrent.hoTen}</span>
        <ul>
          <li>
            <div className="col__title"> Họ tên :</div>
            <div className="col__value">{UserCurrent.hoTen}</div>
          </li>
          <li>
            <div className="col__title">Điện thoại:</div>
            <div className="col__value">{UserCurrent.soDT}</div>
          </li>
          <li>
            <div className="col__title">Tên đăng nhập:</div>
            <div className="col__value">{UserCurrent.taiKhoan}</div>
          </li>
          <li>
            <div className="col__title">Mật khẩu:</div>
            <div className="col__value">{UserCurrent.matKhau}</div>
          </li>
          <li>
            <div className="col__title">Email:</div>
            <div className="col__value">{UserCurrent.email}</div>
          </li>
        </ul>

        <a className="modify-user" onClick={handleShow}>
          Thay đổi thông tin
        </a>
      </div>

      <Modal className="modal__change" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Chỉnh sửa thông tin cá nhân
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
            <input
              type="text"
              id="password"
              className="form-control"
              placeholder="Mật khẩu"
              aria-label="Password"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Email
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Phone
            </span>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="Số điện thoại"
              aria-label="Phone"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              UserName
            </span>
            <input
              type="text"
              id="Username"
              className="form-control"
              placeholder="Họ tên"
              aria-label="Username"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
