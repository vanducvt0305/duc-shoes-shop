import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import productReducer from "../redux/reducers/productReducer";
import { getProductDetailApi } from "../redux/reducers/productReducer";
import { config } from "../util/tools";
import { addProductAddtocartAction } from "../redux/reducers/productReducer";
import { inscreaseQuantity } from "../redux/reducers/productReducer";
import { descreaseQuantity } from "../redux/reducers/productReducer";
import { handleSize } from "../redux/reducers/productReducer";
import { cloneProductAction } from "../redux/reducers/productReducer";

export default function Detail() {
  // const [quantity,setQuantity] = useState(1)
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productAddtoCart } = useSelector((state) => state.productReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductDetail = () => {
    let { id } = params;
    dispatch(getProductDetailApi(id));
  };
  useEffect(() => {
    getProductDetail();
  }, [params?.id]);

  const renderSize = () => {
    return productDetail.size?.map((size) => {
      return (
        <button
          onClick={(e) => {
            const elems = document.querySelectorAll(".btn-size");
            for (const el of elems) {
              el.classList.remove("btn-choice");
            }
            e.target.className = "btn-choice btn-size";
            dispatch(handleSize(size));
          }}
          style={{ marginRight: "12px" }}
          className="btn-size"
          key={size}
        >
          {size}
        </button>
      );
    });
  };

  const renderProductDetail = () => {
    // console.log(productDetail);
    return productDetail.relatedProducts?.map((item, index) => {
      return (
        <div className="col-lg-4  col-sm-12 col-md-6 mt-4" key={index}>
          <div className="card" style={{ backgroundColor: "#F8F8F8" }}>
            <img src={item.image} alt={item.name} width={200} />
            <div
              className="card-body text-dark"
              style={{ backgroundColor: "#F8F8F8" }}
            >
              <div className="show-name">{item.name}</div>
              <div className="short-desc">{item.shortDescription}</div>
            </div>
            <div className="w-100 d-flex">
              <button
                className="buy-now btn btn-warning rounded-0"
                onClick={() => {
                  const elems = document.querySelectorAll(".btn-size");
                  for (const el of elems) {
                    el.classList.remove("btn-choice");
                  }
                  navigate(`/detail/${item.id}`);
                }}
              >
                Buy now
              </button>
              <button
                className="shoe-price"
                onClick={() => {
                  const elems = document.querySelectorAll(".btn-size");
                  for (const el of elems) {
                    el.classList.remove("btn-choice");
                  }
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
    <div className="container">
      <div className="row flex-wrap marginBlock">
        <div
          className="col-lg-6 col-md-6 width-100"
          style={{
            backgroundColor: "#F8F8F8",
          }}
        >
          <img
            src={productDetail.image}
            alt={productDetail.name}
            className="w-100 margin-shoe"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-12  margin-blockB">
          <span className="product-title">{productDetail.name}</span>
          <p>{productDetail.description}</p>
          <p className="text-success my-3">Available Size</p>
          <div className="btn-wrapper">{renderSize()}</div>
          <p className="text-danger my-3">{productDetail.price}$</p>
          <button
            className="btnCong"
            onClick={() => {
              dispatch(inscreaseQuantity(productAddtoCart.quantity));
            }}
          >
            +
          </button>
          {productAddtoCart.quantity}
          <button
            className="btnTru"
            onClick={() => {
              dispatch(descreaseQuantity(productAddtoCart.quantity));
            }}
          >
            -
          </button>
          <button
            className="addtocart"
            onClick={() => {
              const elems = document.querySelectorAll(".btn-size");
              for (const el of elems) {
                el.classList.remove("btn-choice");
              }
              dispatch(addProductAddtocartAction(productAddtoCart));
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="relate-product">
        <div className="container">
          <div className="row">
            <span className="my-5 text-center">-RELATED PRODUCT-</span>
            {renderProductDetail()}
          </div>
        </div>
      </div>
    </div>
  );
}
