import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  http,
  setStoreJson,
  getStoreJson,
  CART,
  ORDER_DETAIL,
} from "../../util/tools";

const initialState = {
  arrProduct: getStoreJson('arrProduct'),
  productDetail: {},
  productAddtoCart: {},
  arrProductAddtoCart: getStoreJson(CART),
  orderDetail: getStoreJson(ORDER_DETAIL),
  productsFavorite: [],
};
const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.arrProduct = action.payload;
      // console.log(state.arrProduct[0])
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    addProductAddtocartAction: (state, action) => {
      let ProductAddtoCart = action.payload;
      if (state.productAddtoCart.size === "") {
        alert("Vui lòng chọn Size giày");
      } else if (
        state.arrProductAddtoCart === null ||
        state.arrProductAddtoCart === undefined
      ) {
        state.arrProductAddtoCart = [ProductAddtoCart];
        let orderDetailItem = {
          quantity: ProductAddtoCart.quantity,
          productId: ProductAddtoCart.id,
        };
        state.orderDetail = [orderDetailItem];
        setStoreJson(CART, state.arrProductAddtoCart);
        setStoreJson(ORDER_DETAIL, state.orderDetail);
        alert("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        {
          state.arrProductAddtoCart = [
            ...state.arrProductAddtoCart,
            ProductAddtoCart,
          ];
          let orderDetailItem = {
            quantity: ProductAddtoCart.quantity,
            productId: ProductAddtoCart.id,
          };
          state.orderDetail = [...state.orderDetail, orderDetailItem];
          setStoreJson(CART, state.arrProductAddtoCart);
          setStoreJson(ORDER_DETAIL, state.orderDetail);
          alert("Sản phẩm đã được thêm vào giỏ hàng");
        }
      }
    },
    inscreaseQuantity: (state, action) => {
      let quantity = action.payload + 1;
      state.productAddtoCart = { ...state.productAddtoCart, quantity };
    },
    descreaseQuantity: (state, action) => {
      let quantity = action.payload - 1;
      state.productAddtoCart = { ...state.productAddtoCart, quantity };
    },
    handleSize: (state, action) => {
      let size = action.payload;
      state.productAddtoCart = { ...state.productAddtoCart, size };
    },
    cloneProductAction: (state, action) => {
      let quantity = 1;
      let size = "";
      let productClone = action.payload;
      state.productAddtoCart = { ...productClone, quantity, size };
    },
    increaseBtnArr: (state, action) => {
      let index = action.payload;
      state.arrProductAddtoCart[index].quantity =
        state.arrProductAddtoCart[index].quantity + 1;
      setStoreJson(CART, state.arrProductAddtoCart);
    },
    decreaseBtnArr: (state, action) => {
      let index = action.payload;
      // state.arrProductAddtoCart[index].quantity = state.arrProductAddtoCart[index].quantity-1
      if (state.arrProductAddtoCart[index].quantity === 1) {
        state.arrProductAddtoCart[index].quantity = 1;
        alert("Số lượng tối thiểu là 1");
        setStoreJson(CART, state.arrProductAddtoCart);
      } else {
        state.arrProductAddtoCart[index].quantity =
          state.arrProductAddtoCart[index].quantity - 1;
        setStoreJson(CART, state.arrProductAddtoCart);
      }
    },
    deleteOrder: (state, action) => {
      let index = action.payload;
      state.arrProductAddtoCart.splice(index, 1);
      setStoreJson(CART, state.arrProductAddtoCart);
      if (state.arrProductAddtoCart.length === 0) {
        localStorage.removeItem("cart");
        localStorage.removeItem("orderDetail");
        window.location.reload();
      }
    },
    ProductsFavoriteAction: (state, action) => {
      action.payload.map((prodF)=>{
        state.productsFavorite.push(prodF.id);       
      })
    },
    setProductsFavorite:(state,action)=>{
      state.arrProduct[action.payload-1].productsFavorite = true
      // setStoreJson('arrProduct',state.arrProduct)
    },
    handleHeart:(state,action)=>{
    //  if(state.arrProduct[action.payload-1].productsFavorite = false){
    //   state.arrProduct[action.payload-1].productsFavorite = true
    //   console.log(state.arrProduct[action.payload-1].productsFavorite )
    //  }else{
    //   state.arrProduct[action.payload-1].productsFavorite = false
    //  }
  
    // console.log(state.arrProduct)
     
    }
  },
});

export const {
  handleHeart,
  setProductsFavorite,
  setArrNewProduct,
  ProductsFavoriteAction,
  decreaseBtnArr,
  deleteOrder,
  increaseBtnArr,
  cloneProductAction,
  getProfileAction,
  getProductDetailAction,
  addProductAddtocartAction,
  inscreaseQuantity,
  descreaseQuantity,
  handleSize,
} = productReducer.actions;

export default productReducer.reducer;


export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get("/Product");
      let newarr =[]
       result.data.content.map((prod)=>{
        prod = {...prod,productsFavorite:false}
        newarr.push(prod);
        
      })
      dispatch(getProfileAction(newarr));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/Product/getbyid?id=${id}`);
      dispatch(getProductDetailAction(result.data.content));
      dispatch(cloneProductAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByKeyword = (keyword) => {
  return async (dispatch) => {
    try {
      //Lấy keyword từ url
      if (keyword.trim() !== "" && keyword != null) {
        let result = await http.get(`/Product?keyword=${keyword}`);
        // let result =await axios({
        //     url:'https://shop.cyberlearn.vn/api/Product?keyword='+keyword,
        //     method:'GET'
        // })
        console.log(result.data.content);
        dispatch(getProfileAction(result.data.content));
      } else {
        dispatch(getProfileAction(""));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const orderApi = createAsyncThunk(
  "productReducer/order",
  async (carts, thunkAPI) => {
    const response = await http.post("/Users/order", carts);
    // console.log(response);
    alert("Bạn đã Order Thành Công !!");
    localStorage.removeItem(CART);
    localStorage.removeItem(ORDER_DETAIL);
    window.location.reload();
    return response.data;
  }
);

export const deleteOrderApi = (orderId) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/deleteorder", orderId);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductsFavoriteApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get("/Users/getproductfavorite");
      // console.log(result.data.content.productsFavorite)
      dispatch(ProductsFavoriteAction(result.data.content.productsFavorite));

    } catch (error) {
      console.log(error);
    }
  };
};


export const handleLikeHeartApi = (id)=>{
  return async (dispatch) =>{
    try {
      const result = await http.get(`/Users/like?productId=${id.id}`)
      // console.log(id)
      dispatch(handleHeart(id))
      // window.location.reload;
    } catch (error) {
      console.log(error)
    }
  }
}

export const handleUnLikeHeartApi = (id)=>{
  return async (dispatch) =>{
    try {
      const result = await http.get(`/Users/unlike?productId=${id.id}`)
      console.log(id)
      dispatch((handleHeart(id)))
      // window.location.reload;
    } catch (error) {
      console.log(error)
    }
  }
}