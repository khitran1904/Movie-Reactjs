/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//style
import "./style.css";
// action
import { loginAction, signUpAction, closeAction } from "../../Action/Auth";

export default function Login() {
  const dispatch = useDispatch();

  const { currentUser, error, loading } = useSelector(
    (state) => state.authReducer
  );
  const { errorSignUp, loadingSignUp, userSignUp } = useSelector(
    (state) => state.SignUpReducer
  );
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV",
    hoTen: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const toggleClose = () => {
    setModal(false);
    dispatch(closeAction());
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <div className="login__form mx-auto text-center">
        <span className="form__header">Login here</span>
        <form>
          <input
            name="taiKhoan"
            placeholder="USERNAME"
            onChange={handleChange}
            type="text"
          />
          <input
            name="matKhau"
            placeholder="PASSWORD"
            onChange={handleChange}
            type="password"
          />
          <div className="">
            <input
              disabled={loading}
              onClick={() => dispatch(loginAction(form))}
              className="btn__login"
              type="button"
              defaultValue="LOGIN"
            />
            <p>
              {" "}
              To register new account <span>→</span>
              <a className="" onClick={toggle}>
                {" "}
                Click Here
              </a>
            </p>
          </div>
          {error ? (
            <div className="alert alert-danger">
              <span>{error}</span>
            </div>
          ) : null}
        </form>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} className="header__SignUp">
              Sign Up
            </ModalHeader>
            <ModalBody>
              <form className="signUp mx-3 ">
                <p>
                  <label for="hoTen" class="floatLabel">
                    Họ Tên
                  </label>
                  <input
                    id="hoTen"
                    name="hoTen"
                    className="col-11 m-1"
                    onChange={handleUser}
                  />
                </p>
                <p>
                  <label for="taiKhoan" class="floatLabel">
                    Tài Khoản
                  </label>
                  <input
                    id="taiKhoan"
                    name="taiKhoan"
                    className="col-11 m-1"
                    onChange={handleUser}
                  />
                </p>
                <p>
                  <label for="matKhau" class="floatLabel">
                    Mật Khẩu
                  </label>
                  <input
                    id="matKhau"
                    name="matKhau"
                    className="col-11 m-1"
                    onChange={handleUser}
                    placeholder=""
                    type="password"
                  />
                </p>
                <p>
                  <label for="email" class="floatLabel">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="col-11 m-1"
                    onChange={handleUser}
                    placeholder=""
                  />
                </p>
                <p>
                  <label for="soDt" class="floatLabel">
                    Số Điện Thoại
                  </label>
                  <input
                    id="soDt"
                    name="soDt"
                    className="col-11 m-1"
                    onChange={handleUser}
                    placeholder=""
                  />
                </p>
              </form>
              {/* <span id="notify" className="text-danger text-center m-4 fs-5" >{errorSignUp ? errorSignUp : "Đăng kí tài khoản thành công"}</span> */}
              {/* {errorSignUp && (
                <span id="notify" className="text-danger text-center m-4 fs-5">
                  {errorSignUp}
                </span>
              )} */}
            </ModalBody>
            <ModalFooter className="container">
              <Button
                color="primary"
                onClick={() => dispatch(signUpAction(user))}
                disabled={loadingSignUp}
              >
                Đăng Kí
              </Button>
              <Button color="danger" onClick={toggleClose}>
                Thoát
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}
