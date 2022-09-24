import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/reducers/userReducer";
import { ACCESS_TOKEN, getStore } from "../util/tools";
import { Navigate } from "react-router-dom";


export default function Login() {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      // Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng !"),
      password: Yup.string()
        .required("Password không được bỏ trống")
        .min(1, "pass từ 6 - 32 ký tự !!"),
    }),
    
    onSubmit: (values) => {
      console.log({values})
      // const action = loginApi(values);
      dispatch(loginApi(values));
    },
  });

  const {touched,errors,values,handleBlur,handleChange,handleSubmit} = frm;
  if (getStore(ACCESS_TOKEN) !== null ) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <div className="login">Login</div>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-4 col-md-5 col-sm-8 col-xl-4 col-8">
          <form  onSubmit={handleSubmit} >
            <div  className="form-group">
              <h3>Email</h3>
              <input
                type="text"
                className="form-control p-2 my-2 input-style"
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
                className="form-control p-2 my-2 input-style"
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
                Register Now ?
              </a>
              <button
                className="btn btn-primary login-text rounded-5"
                type="submit"
              >LOGIN
              </button>
            </div>
          </form>
          <a
            className="d-flex justify-content-center my-4 facebook-block"
            href="https://www.facebook.com/"
          >
            <i className="fa-brands fa-facebook"></i>
            <span className="facebook-text">Continue with Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
