import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "../redux/reducers/userReducer";
import * as Yup from "yup";
import { getProfileApi } from "../redux/reducers/userReducer";
import { updateProfileApi } from "../redux/reducers/userReducer";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, getStore } from "../util/tools";
import { deleteOrderApi } from "../redux/reducers/productReducer";

export default function Profile() {
  const { userLogin } = useSelector((state) => state.userReducer);
  // const {newPassword} =useSelector(state=>state.userReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileApi());
  }, []);

  const frm = useFormik({
    initialValues: {
      // Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
      phone: "",
      name: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng !"),
      password: Yup.string()
        .required("Password không được bỏ trống")
        .min(1, "pass từ 6 - 32 ký tự !!"),

      name: Yup.string().required("Name không được bỏ trống"),
      // .name("Name không đúng định dạng !"),
      phone: Yup.number().required("Phone không được bỏ trống"),
      gender: Yup.boolean().required("Bạn phải chọn giới tính"),
    }),

    onSubmit: (values) => {
      // const action = loginApi(values);
      dispatch(updateProfileApi(values));
    },
  });
  if (!getStore(ACCESS_TOKEN)) {
    alert("Đăng nhập để vào trang này!");
    return <Navigate to="/login" />;
  }
  const { touched, errors, values, handleBlur, handleChange, handleSubmit } =
    frm;

  return (
    <div>
      <div className="product-future text-white">Profile</div>
      <div className="container-fluid">
        <form
          onSubmit={handleSubmit}
          className="row justify-content-around mt-1 align-items-center"
        >
          <div className=" block-center col-6  col-sm-6 col-lg-4">
            <img
              className="block-center margin-top"
              src="./assets/img/profile.png"
              alt="..."
            />
          </div>
          <div className="col-10 col-sm-10 col-lg-8 d-flex d-flex align-items-start justify-content-around mt-3 row">
            <div className="from-group col-sm-10 col-lg-6">
              <h3>Email</h3>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control input-style"
                id="email"
                name="email"
                type="email"
                placeholder={userLogin?.email}
              />
              {errors.email && touched.email ? (
                <span className="text-danger">{errors.email}</span>
              ) : (
                ""
              )}
              <h3>Phone</h3>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                className="form-control input-style"
                id="phone"
                name="phone"
                type="text"
                placeholder={userLogin?.phone}
              />
              {errors.phone && touched.phone ? (
                <span className="text-danger">{errors.phone}</span>
              ) : (
                ""
              )}
            </div>
            <div className="from-group col-sm-10 col-lg-6">
              <h3>Name</h3>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="form-control input-style"
                id="name"
                name="name"
                type="text"
                placeholder={userLogin?.name}
              />
              {errors.name && touched.name ? (
                <span className="text-danger">{errors.name}</span>
              ) : (
                ""
              )}
              <h3>Password</h3>
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
              )}
              <div className="from-group d-flex justify-content-between">
                <div className="d-flex">
                  <div className="gender-text mt-5">Gender</div>
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
                  <div>
                    {errors.gender && touched.gender ? (
                      <span className="text-danger">{errors.gender}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-update rounded-5 my-3 block-right"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className="d-flex">
          <button className="border-misstop color-pink bg-white">
            Order History
          </button>
          <button className="border-misstop bg-white">Favourite</button>
        </div>

        {userLogin?.ordersHistory?.map((orderItem, index) => {
          return (
            <div className="mb-5" key={index}>
              <span className="order-text">
                + Orders have been placed on {orderItem.date}
              </span>
              <h3>Order Detail</h3>
              <table className="table border-0">
                <thead className="thead-color">
                  <tr className="text-center">
                    <th>Id</th>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody className="">
                  {orderItem.orderDetail?.map((item, index) => {
                    return (
                      <tr className="text-center" key={index}>
                        <td>{orderItem.id}</td>
                        <td>
                          <img
                            src={item.image}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                            alt="..."
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity * item.price}</td>
                        {/* <td>
                          <button onClick={()=>{
                            dispatch(deleteOrderApi(userLogin?.ordersHistory?.id))
                          }}>Delete Order</button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
