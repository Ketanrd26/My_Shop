import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { UserContext } from "../../context";
const Home = () => {
  const { userData } = useContext(UserContext);
  const targetDate = "30 sep 2024 12:00 AM";
  const pastDate = new Date(targetDate);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const newDate = new Date();
      const difference = (pastDate - newDate) / 1000;

      const days = Math.floor(difference / (3600 * 24));
      const hours = Math.floor((difference % (3600 * 24)) / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = Math.floor(difference % 60);

      setTimeRemaining({
        days: days > 0 ? days : 0,
        hours: hours > 0 ? hours : 0,
        minutes: minutes > 0 ? minutes : 0,
        seconds: seconds > 0 ? seconds : 0,
      });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [pastDate]);

  const reportCartWIthoutLogin = () => {
    if (!userData) {
      alert("please login first ");
    }
  };
  const [productmapping, setProductMapping] = useState([]);
  const addProductItems = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/product/productList`
      );

      console.log(response.data.products);
      setProductMapping(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addProductItems();
  }, []);
  return (
    <>
      <div className="home-hero-parent parent">
        <div className="home-hero-cont cont">
          <div className="left">
            <ul>
              <li>Women's fashion</li>
              <li>Men's fashion</li>
              <li>Electronics</li>
              <li>Home & Lifestyle</li>
              <li>Medicine</li>
              <li>Sports & Outdoor</li>
              <li>Health & Beauty</li>
            </ul>
          </div>
          <div className="right">
            <div className="slider bg-img-contain">
              <div className="left-slider">
                <p>iPhone 14 Series</p>
                <h3>
                  Up to 10% <br />
                  off Voucher
                </h3>
              </div>
              <div className="right bg-img-contain"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-parent parent">
        <div className="product-cont cont">
          <h3>Today's</h3>
          <div className="list">
            <h4>Flash Sales</h4>
            <div className="countdown">
              <div className="days">
                <p>Days</p>
                <h5>{timeRemaining.days}</h5>
              </div>
              <span className="dots">:</span>
              <div className="Hours">
                <p>Hours</p>
                <h5>{timeRemaining.hours}</h5>
              </div>
              <span className="dots">:</span>
              <div className="minutes">
                <p>Minutes</p>
                <h5>{timeRemaining.minutes}</h5>
              </div>
              <span className="dots">:</span>
              <div className="seconds">
                <p>Seconds</p>
                <h5>{timeRemaining.seconds}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="product-list">
          {productmapping.map((item, index) => (
            <div className="card" key={index}>
              <div
                className="image bg-img-cover"
                style={{ backgroundImage: `url(${process.env.REACT_APP_PORT_BACKEND}/productImages/${item.img})` }}
              >
                <div className="addtocart"  onClick={reportCartWIthoutLogin} >
                  <h3>Add to Cart</h3>
                </div>
              </div>
              <div className="title">{item.title}</div>
              <div className="desc">
                <p>{item.desc}</p>
              </div>
              <div className="amount">
                <h4>$ {item.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
