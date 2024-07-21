import HomePageMain from "../assets/HomePageHead.png";
import "./HomePage.css";
import { BsCart3 } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GrDeliver } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";
import GovernmentSchemes from "./GovernmentSchemes";

function HomePage() {
  return (
    <>
      <div className="home-page-top">
        <img src={HomePageMain} className="card-img" alt=" " />
        <div className="card-img-overlay">
          <button className="button1" type="button">
            US
          </button>
          <button className="button2" type="button">
            Explore Features
          </button>

          <h2 className="card-title">Empowering farmers with technology</h2>
          <div className="searchbar">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your coordinates"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="icons">
                <TiWeatherPartlySunny />
              </h1>
              <h6 className="card-title">Enhancing crop</h6>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Real-time weather updates
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="icons">
                <BsCart3 />
              </h1>
              <h6 className="card-title">Market</h6>

              <div className="card-footer">
                <small className="text-body-secondary">
                  Efficiency gauranteed
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="icons">
                <GrDeliver />
              </h1>
              <h6 className="card-title">Timely Deliveries</h6>

              <div className="card-footer">
                <small className="text-body-secondary">Fast and Reliable</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="icons">
                <FaRegClock />
              </h1>
              <h6 className="card-title">Live Updates</h6>

              <div className="card-footer">
                <small className="text-body-secondary">
                  Stay Updates on orders
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GovernmentSchemes />
    </>
  );
}

export default HomePage;
