import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import productReducer, {
  getProductApi,
  getProductsFavoriteApi,
  getProfileAction,
  handleHeart,
  handleHeartApi,
  handleLikeHeartApi,
  handleUnLikeHeartApi,
  setArrNewProduct,
  setLike,
  setProductsFavorite,
} from "../redux/reducers/productReducer";
import BootStrapCarousel from "../components/BootStrapCarousel";
import { getProfileApi } from "../redux/reducers/userReducer";

export default function Index() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const { productsFavorite } = useSelector((state) => state.productReducer);
  // const { arrProductNew } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductApi());
    dispatch(getProductsFavoriteApi());
  }, []);

  const setProductsFv = (item) => {
    productsFavorite.map((sl) => {
      if (item.id === sl) {
        dispatch(setProductsFavorite(item.id));
      }
    });
  };

  const renderHeart = (item) => {
    if (item.productsFavorite === true) {
      return (
        <button
          onClick={(e) => {
            // debugger;
            document.getElementById("btn-unike").classList.remove("fa-solid");
            document.getElementById("btn-unike").classList.add("fa-regular");

            dispatch(handleUnLikeHeartApi(item));
          }}
          className="heart-btn"
        >
          <i id="btn-unike" class="fa-solid fa-heart"></i>{" "}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            // debugger;
            document.getElementById("btn-like").classList.remove("fa-regular");
            document.getElementById("btn-like").classList.add("fa-solid");
            dispatch(handleLikeHeartApi(item));
          }}
          className="heart-btn"
        >
          <i id="btn-like" class="fa-regular fa-heart"></i>
        </button>
      );
    }
  };
  //
  // }

  // }
  // console.log(arrProduct);
  const renderProduct = () => {
    return arrProduct?.map((item, index) => {
      return (
        <div className="col-lg-4  col-sm-12 col-md-6  mt-4" key={index}>
          <div className="card" style={{ backgroundColor: "#F8F8F8" }}>
            <div>
              <img src={item.image} alt={item.name} width={200} />
              {setProductsFv(item)}
              {renderHeart(item)}
            </div>
            <div
              className="card-body text-dark w-100"
              style={{ backgroundColor: "#F8F8F8" }}
            >
              <div className="show-name">{item.name}</div>
              <div className="short-desc">{item.shortDescription}</div>
            </div>
            <div className="w-100 d-flex">
              <button
                className="buy-now rounded-0 btn btn-warning"
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                Buy now
              </button>
              <button
                className="shoe-price"
                onClick={() => {
                  navigate(`/detail/${item.id}`);
                }}
              >
                {item.price}
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <BootStrapCarousel />
      <div className="product-future text-white">Product Future</div>
      <div className="container">
        <div className="row">{renderProduct()}</div>
      </div>
    </div>
  );
}
