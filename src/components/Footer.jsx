import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="container my-4">
      <div className="row">
        <div className="col-lg-4  col-sm-12 ">
          <div className="text-center mt-2" style={{fontSize:'20px',fontWeight:'700'}}>GET HELP</div>
          <div className="d-flex flex-column  text-center">
            <NavLink className="text-decoration-none text-dark my-1" to="/">
              Home
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Nike
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Adidas
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Contact
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4  col-sm-12">
          <div className="text-center mt-2" style={{fontSize:'20px',fontWeight:'700'}}>SUPPORT</div>
          <div className=" d-flex flex-column  text-center">
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              About
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Contact
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Help
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="#">
              Phone
            </NavLink>
          </div>
        </div>
        <div className="col-lg-4  col-sm-12" style={{height:'152px'}}>
          <div className="text-center mt-2" style={{fontSize:'20px',fontWeight:'700'}}>REGISTER</div>
          <div className="d-flex flex-column text-center ">
            <NavLink className="text-decoration-none text-dark my-1" to="/register">
              Register
            </NavLink>
            <NavLink className="text-decoration-none text-dark my-1" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    <div>
        <div className="cybersoft-footer">
          <div className="cybersoft-content text-center text-justify-center">
            © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
            Khải.
          </div>
        </div>
      </div>
    </div>
  );
}
