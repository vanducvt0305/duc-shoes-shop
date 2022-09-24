import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="menu d-flex ">
        <a className="mx-2 text-decoration-none text-dark" href="#" onClick={()=>{
          navigate('/');
        }}>
          Home
        </a>
        <a className="mx-2 text-decoration-none text-dark" href="#">
          Men
        </a>
        <a className="mx-2 text-decoration-none text-dark" href="#">
          Women
        </a>
        <a className="mx-2 text-decoration-none text-dark" href="#">
          Kid
        </a>
        <a className="mx-2 text-decoration-none text-dark" href="#">
          Sport
        </a>
      </div>
    </div>
  );
}
