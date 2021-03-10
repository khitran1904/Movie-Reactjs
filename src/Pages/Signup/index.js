import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUpAction } from "../../Action/Auth";
import { Formik, useFormikContext } from "formik";
import { Prompt } from "react-router-dom";
import * as Yup from "yup";
import "./style.css";
export default function Signup() {
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

  var seconds = 2;
  var foo;

  function redirect() {
    document.location.href = "/";
  }

  function updateSecs() {
    seconds--;
    if (seconds === -1) {
      clearInterval(foo);
      redirect();
    }
  }

  function countdownTimer() {
    foo = setInterval(function () {
      updateSecs();
    }, 1000);
  }

  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };

  const validationSchema = Yup.object({
    taiKhoan: Yup.string()
      .required("Username is required")
      .min(4, "Username must have at least 4 characters")
      .max(10, "Username must have max 10 characters"),
    matKhau: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
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
    countdownTimer();
  }
  return (
    <div>
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
          <div className="signup">
            <div className="container">
              <div className="signup-content">
                <form
                  id="signup-form"
                  className="signup-form"
                  onSubmit={handleSubmit}
                >
                  <h2 className="form-title">Create account</h2>
                  <PromptIfDirty />
                  <div className="form-group">
                    <input
                      className="form-input"
                      placeholder="Your Name"
                      type="text"
                      name="hoTen"
                      value={values.hoTen}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.hoTen && touched.hoTen && (
                      <div className="text-danger">{errors.hoTen}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your Username"
                      name="taiKhoan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.taiKhoan}
                    />
                    {errors.taiKhoan && touched.taiKhoan && (
                      <div className="text-danger">{errors.taiKhoan}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Password"
                      name="matKhau"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.matKhau}
                    />
                    {errors.matKhau && touched.matKhau && (
                      <div className="text-danger">{errors.matKhau}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Your Email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your Phone number"
                      name="soDt"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.soDt}
                    />
                    {errors.soDt && touched.soDt && (
                      <div className="text-danger">{errors.soDt}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      disabled={!(dirty && isValid)}
                      type="submit"
                      className="form-submit"
                      value="Sign up"
                    />
                    {loadingSignUp && (
                      <img
                        alt="#"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                  </div>
                  <div className="form-group">
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
                <p className="loginhere">
                  Have already an account ?
                  <Link to="/login">
                    <span href="#" className="loginhere-link">
                      Login here
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
