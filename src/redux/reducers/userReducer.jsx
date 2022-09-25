import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  // FACEBOOK_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/tools";
import { history } from "../../index";
import { Navigate } from "react-router-dom";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN), // có thể null hoặc object
  // facebookToken:getStore(FACEBOOK_TOKEN)
};
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/signin", userLogin);
      // const result = await axios({
      //     url:'https://shop.cyberlearn.vn/api/users/signin',
      //     method:'POST',
      //     data:userLogin
      // });
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      dispatch(getProfileApi());
      // Chuyển hướng về profile
      history.push("/profile");
      // Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (error) {
      console.log("Lỗi", error);
      alert("Email hoặc password không đúng");
      history.push("/login");
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post("/users/getProfile");
      const action = getProfileAction(result.data.content);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (error) {
      // console.log(error);
    }
  };
};

export const updateProfileApi = (values) => {
  return async (dispatch) => {
    try {
      let newPassword = {
        newPassword: values.password,
      };
      const result = await http.post("/Users/updateProfile", values);
      alert("Bạn đã thay đổi thông tin thành công");
      dispatch(changePassApi(newPassword));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePassApi = (newPassword) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/changePassword", newPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerProfileApi = (values) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/signup", values);
      // console.log(result);
      alert("Đăng kí thành công! Mời bạn đăng nhập");
      history.push("/login");
      console.log(result)
    } catch (error) {}
  };
};

export const LoginFacebookApi = (facebookToken) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/facebooklogin",
        method: "post",
        data: {
          facebookToken: facebookToken,
        },
      });
      setStore(ACCESS_TOKEN, result.data.content.accessToken);     
      history.push('/profile');
      alert('Bạn đã đăng nhập qua FaceBook Thành Công !!')
    } catch (error) {
      console.log(error);
    }
  };
};


