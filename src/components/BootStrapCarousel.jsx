import Carousel from "react-bootstrap/Carousel";
import { NavLink, useNavigate } from "react-router-dom";

function BootStrapCarousel() {
  const navigate = useNavigate();
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <div className="container">
          <NavLink className="row" to="detail/11" style={{ textDecoration: "none" }}>
            <div className="col-7 img-full">
              
                <img
                  style={{ margin: "-80px" }}
                  className="d-block w-100"
                  src="../assets/img/carousel2.png"
                  alt="Second slide"
                />
             
            </div>
            <div className="col-5 hide-info text-dark">
              <div className="display-4">Nike Air Max 97 Blue</div>
              <p>
                Nike shoe is the rare high-percentage shooter who's also a
                coach's dream on D.
              </p>
              <button
                className="btn btn-warning rounded-0 px-4"
                onClick={() => {
                  navigate(`/detail/11`);
                }}
              >
                Buy Now
              </button>
            </div>
          </NavLink>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <NavLink className="row" to="detail/12" style={{ textDecoration: "none" }}>
            <div className="col-7 img-full">
              <img
                style={{ margin: "-80px" }}
                className="d-block w-100"
                src="../assets/img/carousel3.png"
                alt="Second slide"
              />
            </div>
            <div className="col-5 hide-info text-dark">
              <div className="display-4">Nike Air Max 270</div>
              <p>
                Nike shoe is the rare high-percentage shooter who's also a
                coach's dream on D.
              </p>
              <button
                className="btn btn-warning rounded-0 px-4"
                onClick={() => {
                  navigate(`/detail/12`);
                }}
              >
                Buy Now
              </button>
            </div>
          </NavLink>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <NavLink
            className="row"
            to="/detail/15"
            style={{ textDecoration: "none" }}
          >
            <div className="col-7 img-full">
              <img
                style={{ margin: "-80px" }}
                className="d-block w-100"
                src="../assets/img/carousel4.png"
                alt="Second slide"
              />
            </div>
            <div className="col-5 hide-info text-dark">
              <div className="display-4">Nike Shox TL</div>
              <p>
                Nike shoe is the rare high-percentage shooter who's also a
                coach's dream on D.
              </p>
              <button
                className="btn btn-warning rounded-0 px-4"
                onClick={() => {
                  navigate(`/detail/15`);
                }}
              >
                Buy Now
              </button>
            </div>
          </NavLink>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default BootStrapCarousel;
