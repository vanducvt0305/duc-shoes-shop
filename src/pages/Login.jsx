import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, LoginFacebookApi } from "../redux/reducers/userReducer";
import { ACCESS_TOKEN, getStore } from "../util/tools";
import { Navigate } from "react-router-dom";
import LoginFaceBook from "../components/LoginFaceBook";
import { Button } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_TOKEN, http, setStore, USER_LOGIN } from "../util/tools";
import userReducer from "../redux/reducers/userReducer";
import axios from "axios";

export default function Login() {
  const [response,setResponse] = useState({})
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      // Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng !"),
      password: Yup.string()
        .required("Password không được bỏ trống")
        .min(1, "pass từ 6 - 32 ký tự !!"),
    }),

    onSubmit: (values) => {
      dispatch(loginApi(values));
    },
  });

  const { touched, errors, values, handleBlur, handleChange, handleSubmit } =
    frm;
  // if (getStore(ACCESS_TOKEN) !== null) {
  //   return <Navigate to="/" />;
  // }
  const responseFacebook = async (response) => {
    setResponse(response)
  };
  return (
    <div className="container">
      <div className="login">Login</div>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 col-md-8 col-sm-8 col-10">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h3>Email</h3>
              <input
                type="text"
                className="form-control p-2 my-2 input-style w-100"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span className="text-danger">{errors.email}</span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <h3>Password</h3>
              <input
                className="form-control p-2 my-2 input-style w-100"
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <span className="text-danger">{errors.password}</span>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex justify-content-end form-group">
              <a className="register-text" href="/register">
                Register Now?
              </a>
              <button
                className="btn btn-primary login-text rounded-5"
                type="submit"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center my-3">
            <FacebookLogin
              appId="526234602835316"
              autoLoad={true}
              fields="name,email,picture"
              onClick={()=>{
                dispatch(LoginFacebookApi(response.accessToken));
              }}
              callback={responseFacebook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
