import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { signUpAction, closeAction } from "../../Action/Auth";
import { Formik } from "formik";
import * as Yup from "yup";
export default function Signup() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const {
    userSignUp,
    errorSignUp,
    loadingSignUp,
    successMessage,
  } = useSelector((state) => state.SignUpReducer);

  const form = {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV",
    hoTen: "",
  };

  const toggle = () => {
    setModal(!modal);
    // dispatch(closeAction());
  };

  const toggleClose = (isDirty, isValid) => {
    if (isDirty && !isValid) {
      var r = window.confirm(
        "Ban co chac ban muon thoat khong. Neu thoat cac o thong tin se bi mat"
      );
      if (r) {
        dispatch(closeAction());
      }
    }
    setModal(!modal);
  };
  const validationSchema = Yup.object({
    taiKhoan: Yup.string()
      .required("Username is required")
      .min(5, "Username must have at least 5 characters")
      .max(10, "Username must have max 14 characters"),
    matKhau: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
    soDt: Yup.string()
      .required("Phone number is required")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Invalid phone number"
      ),
    hoTen: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname and Lastname is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email"),
  });

  if (userSignUp) {
    <Redirect to="/" />;
  }
  const dirty = {};
  return (
    <div>
      <p>
        To register new account <span>→</span>
        <a className="" onClick={toggle}>
          Click Here
        </a>
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="header__SignUp">
          Sign Up
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={form}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(signUpAction(values));
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              dirty,
              values,
              errors,
              isValid,
            }) => (
              <form className="signUp mx-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="hoTen" className="floatLabel">
                    Họ Tên
                  </label>
                  <input
                    type="text"
                    name="hoTen"
                    className="col-11 m-1"
                    value={values.hoTen}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.hoTen && touched.hoTen && (
                    <div className="text-danger">{errors.hoTen}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="taiKhoan" className="floatLabel">
                    Tài Khoản
                  </label>
                  <input
                    type="text"
                    name="taiKhoan"
                    className="col-11 m-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taiKhoan}
                  />
                  {errors.taiKhoan && touched.taiKhoan && (
                    <div className="text-danger">{errors.taiKhoan}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="matKhau" className="floatLabel">
                    Mật Khẩu
                  </label>
                  <input
                    name="matKhau"
                    className="col-11 m-1"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.matKhau}
                  />
                  {errors.matKhau && touched.matKhau && (
                    <div className="text-danger">{errors.matKhau}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="floatLabel">
                    Email
                  </label>
                  <input
                    name="email"
                    className="col-11 m-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="soDt" className="floatLabel">
                    Số Điện Thoại
                  </label>
                  <input
                    name="soDt"
                    className="col-11 m-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.soDt}
                  />
                  {errors.soDt && touched.soDt && (
                    <div className="text-danger">{errors.soDt}</div>
                  )}
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!(dirty && isValid)}
                  >
                    Đăng Kí
                  </Button>
                  {loadingSignUp && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleClose(dirty, isValid);
                    }}
                  >
                    Thoát
                  </Button>
                  {errorSignUp && (
                    <span
                      id="notify"
                      className="text-danger text-center m-4 fs-5"
                    >
                      {errorSignUp}
                    </span>
                  )}
                  {successMessage && (
                    <span
                      id="notify"
                      className="text-success text-center m-4 fs-5"
                    >
                      {successMessage}
                    </span>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter className="container"></ModalFooter>
      </Modal>
    </div>
  );
}
