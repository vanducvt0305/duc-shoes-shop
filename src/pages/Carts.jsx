import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userReducer, { getProfileApi } from "../redux/reducers/userReducer";
import productReducer, {
  decreaseBtnArr,
  deleteOrder,
  fetchUserById,
  handleSize,
  orderApi,
} from "../redux/reducers/productReducer";
import {increaseBtnArr} from "../redux/reducers/productReducer"
import userLogin from "../redux/reducers/userReducer";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, getStore, CART, getStoreJson } from "../util/tools";

export default function Carts() {
  // const { userLogin } = useSelector((state) => state.userReducer);
  const { arrProductAddtoCart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.productReducer);

// useEffect(()=>{
//   dispatch(getProfileApi());
// },[])

  if (!getStore(ACCESS_TOKEN)) {
    alert("Đăng nhập để vào trang này!");
    return <Navigate to="/login" />;
  }
  const carts = {
    orderDetail: orderDetail,
    email: userLogin.email,
  };
  const renderCart = () => {
    return arrProductAddtoCart?.map((item, index) => {
      return (
        <tr className="text-center" key={index}>
          <td>{item.id}</td>
          <td>
            <img src={item.image} alt={item.name} width={50} />
          </td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td className="text-center">
            <button className="btn-cart text-white" onClick={()=>{
              dispatch(increaseBtnArr(index))
            }}>+</button>
            <span className="quantity-color px-5 py-1">{item.quantity}</span>
            <button className="btn-cart text-white" onClick={()=>{
              dispatch(decreaseBtnArr(index))
            }}>-</button>
          </td>
          <td>{item.quantity * item.price}</td>
          <td>
            <button className="btn-cart edit">Edit</button>

            <button className="delete" onClick={()=>{
              dispatch(deleteOrder(index))
            //  console.log(arrProductAddtoCart[index])

            //  arrProductAddtoCart?.splice(index,1)
            // arrProductAddtoCart?.filter((value,index)=>{
            // return value !== arrProductAddtoCart[index]
            // })
            }}>Delete</button>
          </td>
        </tr>
      );
    });
  };

  const handleSubmit = () => {
    
    dispatch(orderApi(carts));
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h3 className="mb-4">Carts</h3>
        <table>
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Img</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderCart()}</tbody>
        </table>
      </div>
      <div className="wrapper-btn d-flex">
        <button className="text-white btn-submit" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
}
