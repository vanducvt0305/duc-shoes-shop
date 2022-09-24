import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, getStore } from "../util/tools";

export default function Header() {
  const navigate = useNavigate()
  const { arrProductAddtoCart } = useSelector((state) => state.productReducer);

  const renderLogout = ()=>{
    if (getStore(ACCESS_TOKEN)) {
      return (<a href={'./login'} className="mx-2 text-decoration-none dis-play" onClick={()=>{
        localStorage.clear();
      }}>Log Out</a>)     
    }else if(!getStore(ACCESS_TOKEN)){
      return (<NavLink to={'./login'} className="mx-2 text-decoration-none dis-play-none">Log Out</NavLink>) 
    }
  }

// const  renderCart = ()=>{
//     if(arrProductAddtoCart?.length >0){
//       return ((arrProductAddtoCart?.length))
//     }else if(arrProductAddtoCart?.length === 0){
//       return null
//     }
//   }

  return (
    <div className="header">
        <div className="container">
        <div className="d-flex justify-content-between text-light">
          <div className='mt-2'>
            <a href="#" onClick={()=>{
              navigate('/');
            }}>
            <img src="../assets/img/logo.png" alt="logo" />
            </a>
          </div>
          <div>
            <div className="d-flex justify-content-around mt-2">
                <NavLink to={'./search'} className="mx-2 text-decoration-none text-light dis-play">
                    <img src="../assets/img/search.png" alt="search" width={33} height={32}/>
                    <span>Search</span>
                </NavLink>
                <NavLink to={'./carts'} className="mx-2 text-decoration-none dis-play">
                    <img src="../assets/img/cart.png" alt="cart" />
                    <div className='quantity-cart dis-play'>[{arrProductAddtoCart?.length}]</div>
                </NavLink>
                <NavLink to={'./login'} className="mx-1 text-decoration-none  dis-play">Log in</NavLink>
                <NavLink to={'./register'} className="mx-2 text-decoration-none  dis-play">Register</NavLink>
                {renderLogout()}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
