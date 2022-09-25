import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { history } from "../index";
import { LoginFacebookApi } from "../redux/reducers/userReducer";
import {
  ACCESS_TOKEN,
  FACEBOOK_TOKEN,
  http,
  setStore,
  USER_LOGIN,
} from "../util/tools";
export default function LoginFaceBook() {
  const dispatch = useDispatch();
  const responseFacebook = async (response) => {
    await axios({
      url: "https://shop.cyberlearn.vn/api/Users/facebooklogin",
      method: "post",
      data: {
        facebookToken: response.accessToken,
      },
    }).then((res) => {
      setStore(ACCESS_TOKEN, res.data.content.accessToken);
      console.log(
        `Đăng nhập thành công accessToken là : ${res.data.content.accessToken}`
      );
    });
  };
  return (
    <div>
      <FacebookLogin
        appId="526234602835316"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        onClick={console.log('123')}
        callback={responseFacebook}
      />
    </div>
  );
}
