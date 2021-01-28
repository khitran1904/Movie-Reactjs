import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
//style
import "./style.css";
// action
import { loginAction } from "../../Action/Auth";
export default function Login() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector(
    (state) => state.authReducer
  );
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
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
              <a className="" href="/">
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
      </div>
    </div>
  );
}
