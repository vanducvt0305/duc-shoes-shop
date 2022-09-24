import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams, useNavigate} from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import {getProductByKeyword} from '../redux/reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux';
import productReducer from '../redux/reducers/productReducer';

export default function DemoUseSearchParam(props) {
    const keywordRef = useRef("");
    let [searchParams, setSearchParams] = useSearchParams();
    const { arrProduct } = useSelector((state) => state.productReducer);
    let timeOutRef = useRef({});
    const navigate =useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
      let keyword = searchParams.get('keyword');
        if(keywordRef.current!==''){
            dispatch(getProductByKeyword(keyword));
        }
    },[keywordRef.current])

    const handleChange = (e)=>{
        keywordRef.current = e.target.value;
        timeOutRef.current = setTimeout(()=>{
            setSearchParams({keyword:keywordRef.current})
        },1000)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSearchParams({keyword:keywordRef.current})
    }
    const renderProductKeyword =()=>{
      return arrProduct?.map((item, index) => {
        return (
          <div className="col-lg-4  col-sm-12 col-md-6  mt-4" key={index}>
            <div className="card" style={{ backgroundColor: "#F8F8F8" }}>
              <img src={item.image} alt={item.name} width={200} />
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
        // return arrProduct.map((item,index)=>{
        //     return <div className='col-3' key={index} >
        //         <img src={item.image} className='w-100'/>
        //         <div className="card-body">
        //             <p>{item.name}</p>
        //             <p>{item.price}</p>
        //             <NavLink className='btn btn-success' to={`/detail/${item.id}`}>View Detail</NavLink>
        //         </div>
        //     </div>
        // })
    }
  return (
    <form className="container" onSubmit={handleSubmit}>
      <h3>Search</h3>
      <div className="form-group">
        <p>Nhập từ khoá</p>
        <div className="input-group-prepend">
          <input
            className="form-control"
            id="keywordRef"
            onChange={handleChange}
          />
          <button className="btn bg-dark text-white">Search</button>
        </div>
      </div>
      <div className="mt-2">
        <p>Kết quả tìm kiếm</p>
        <div className='fontSize-4'>Có {arrProduct?.length} kết quả phù hợp với tìm kiếm của bạn</div>
    
        {/* <span>Có {arrProduct?.length} kết quả phù hợp với tìm kiếm của bạn</span> */}
        <div className="row">
          {renderProductKeyword()}
        </div>
      </div>
    </form>
  )
}


