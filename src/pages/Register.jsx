import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {registerProfileApi} from '../redux/reducers/userReducer'

export default function Register() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      // Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
      // changepassword: "",
      phone: "",
      name: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng !"),
      password: Yup.string()
        .required("Password không được bỏ trống"),
        // .min(1, "pass từ 6 - 32 ký tự !!"),
      changepassword: Yup.string().required("Confirm Password không được bỏ trống").when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password không khớp, hãy kiểm tra lại !!"
        ),
      }),
      name: Yup.string().required("Name không được bỏ trống"),
      // .name("Name không đúng định dạng !"),
      phone: Yup.number().required("Phone không được bỏ trống"),
      gender: Yup.boolean().required("Bạn phải chọn giới tính"),
    }),

    onSubmit: (values) => {
      // console.log(values);
      dispatch(registerProfileApi(values));
    },
  });
  
  const { touched, errors, values, handleBlur, handleChange, handleSubmit } =
    frm;
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="row justify-content-around align-items-start mt-5"
      >
        <div className="from-group col-5 ">
          <h3>Email</h3>
          <input
            style={{ height: "54px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="form-control input-style mb-3"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <span className="text-danger">{errors.email}</span>
          ) : (
            ""
          )}
          <h3>Password</h3>
          <input
            style={{ height: "54px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control input-style mb-3"
            // value={values.password}
            // id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <span className="text-danger">{errors.password}</span>
          ) : (
            ""
          )}
          <h3>Password Confirm</h3>
          <input
            style={{ height: "54px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            // value={values.changepassword}
            className="form-control input-style mb-3"
            // id="password-confirm"
            name="changepassword"
            type="password"
            placeholder="Password Confirm"
          />
          {errors.changepassword && touched.changepassword ? (
            <span className="text-danger">{errors.changepassword}</span>
          ) : (
            ""
          )}
          
        </div>
        <div className="from-group col-5">
          <h3>Name</h3>
          <input
            style={{ height: "54px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="form-control input-style mb-3"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && touched.name ? (
            <span className="text-danger">{errors.name}</span>
          ) : (
            ""
          )}
          <h3>Phone</h3>
          <input
            style={{ height: "54px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            className="form-control input-style mb-3"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone"
          />
          {errors.phone && touched.phone ? (
            <span className="text-danger">{errors.phone}</span>
          ) : (
            ""
          )}
          {/* <h3>Password</h3>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control input-style"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <span className="text-danger">{errors.password}</span>
          ) : (
            ""
          )} */}
          <div className="my-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="gender-text mt-4">Gender</div>
                <div className="mx-3 align-sefl-center d-flex flex-column">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="gender"
                    type="radio"
                    value="true"
                  />
                  <label htmlFor="gender">Male</label>
                </div>
                <div className="mx-3 d-flex flex-column">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="gender"
                    type="radio"
                    value="false"
                  />
                  <label htmlFor="gender">Female</label>
                </div>
              </div>
              {/* <div>
                <button className="btn btn-update rounded-5" type="submit">
                  Update
                </button>
              </div> */}
            </div>
            <div>
              {errors.gender && touched.gender ? (
                <span className="text-danger">{errors.gender}</span>
              ) : (
                ""
              )}
            </div>
            <div>
              <button className="btn btn-update rounded-5" type="submit">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
