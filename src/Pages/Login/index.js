/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";
import { loginAction } from "../../Action/Auth";
import Signup from "../Signup";
export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const [submittedSignin, setSubmittedSignin] = useState(false);
  const { currentUser, error, loading } = useSelector(
    (state) => state.authReducer
  );

  const handleLoginInputs = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setSubmittedSignin(true);
    if (form.taiKhoan && form.matKhau) {
      dispatch(loginAction(form));
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <div className="login__form mx-auto text-center">
        <span className="form__header">Login here</span>
        <form onSubmit={handleSubmitLogin}>
          <div
            className={
              "form-group" + (submittedSignin && !form.taiKhoan)
                ? "has-error"
                : ""
            }
          >
            <input
              name="taiKhoan"
              placeholder="USERNAME"
              onChange={handleLoginInputs}
              type="text"
            />
            {submittedSignin && !form.taiKhoan && (
              <div className="text-danger">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submittedSignin && !form.taiKhoan)
                ? "has-error"
                : ""
            }
          >
            <input
              name="matKhau"
              placeholder="PASSWORD"
              onChange={handleLoginInputs}
              type="password"
            />
            {submittedSignin && !form.matKhau && (
              <div className="text-danger">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button
              disabled={loading}
              className="btn btn-success"
              type="submit"
            >
              LOG IN
            </button>
            {loading && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>

          {error ? (
            <div className="alert alert-danger">
              <span>{error}</span>
            </div>
          ) : null}
        </form>
        <Signup />
      </div>
    </div>
  );
}
