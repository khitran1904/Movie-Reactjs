/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import { loginAction } from "../../Action/Auth";
import { Formik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const dispatch = useDispatch();
  const form = { taiKhoan: "", matKhau: "" };
  const { currentUser, error, loading } = useSelector(
    (state) => state.authReducer
  );

  const validationSchema = Yup.object({
    taiKhoan: Yup.string()
      .required("Username is required")
      .min(5, "Username must have at least 5 characters")
      .max(10, "Username must have max 14 characters"),
    matKhau: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <div className="login__form mx-auto text-center">
        <span className="form__header">Login here</span>
        <Formik
          initialValues={form}
          validationSchema={validationSchema}
          onSubmit={(values) => dispatch(loginAction(values))}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="taiKhoan"
                  placeholder="USERNAME"
                  type="text"
                  value={values.taiKhoan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.taiKhoan && touched.taiKhoan && (
                  <div className="text-danger">{errors.taiKhoan}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  name="matKhau"
                  placeholder="PASSWORD"
                  type="password"
                  value={values.matKhau}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.matKhau && touched.matKhau && (
                  <div className="text-danger">{errors.matKhau}</div>
                )}
              </div>
              <div className="form-group">
                <button
                  disabled={!(isValid && dirty)}
                  className="btn btn-success"
                  type="submit"
                >
                  LOG IN
                </button>
                {loading && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
              </div>

              {error ? (
                <div className="alert alert-danger">
                  <span>{error}</span>
                </div>
              ) : null}
            </form>
          )}
        </Formik>
        <p>
          To register new account <span>→</span>
          <Link to="/signup">Click Here</Link>
        </p>
      </div>
    </div>
  );
}
