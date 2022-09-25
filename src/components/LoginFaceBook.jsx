import React from "react";
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_TOKEN, http, setStore, USER_LOGIN } from "../util/tools";
export default function LoginFaceBook() {
    const responseFacebook =async (response)=>{
      console.log(response.accessToken)
      setStore(FACEBOOK_TOKEN,response.accessToken)
      try {
        const result = await http.post('/Users/facebooklogin',response.accessToken);
        setStore(USER_LOGIN,result.data.content)
        console.log(result.data.content)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
      <FacebookLogin
        appId="526234602835316"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
}
