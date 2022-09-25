import React from "react";
import FacebookLogin from 'react-facebook-login';
export default function LoginFaceBook() {
    const responseFacebook = (response)=>{

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
