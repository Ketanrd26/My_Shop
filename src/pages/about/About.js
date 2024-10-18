import React from "react";
import "./about.scss";
import shopIcon from "../../assest/icons/shop.png";
import shopBlackIcon from "../../assest/icons/black_shop.png";
import founderImage from "../../assest/imag1.png";
import CountUp from "react-countup";
import { BsHandIndex } from "react-icons/bs";
const About = () => {
  const counterData = [
    {
      count: 10.5,
      data: "sellers active our site",
    },
    {
      count: 33,
      data: "monthly product sale",
    },
    {
      count: 45.5,
      data: "customers active in our site",
    },
    {
      count: 25,
      data: "annual gross sale in our site",
    },
  ];

  const founderData = [
    {
      image: founderImage,
      name: "Tom Cruise",
      desgination: "founder",
    },
    {
      image: founderImage,
      name: "Tom Cruise",
      desgination: "founder",
    },
    {
      image: founderImage,
      name: "Tom Cruise",
      desgination: "founder",
    },
  ];
  return (
    <>
      <div className="about-parent parent">
        <div className="about-cont cont">
          <div className="right bg-img-cover"></div>

          <div className="left">
            <h5 className="out-story-heading">Our Story</h5>
            <p className="out-story-para">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
              <br />
              <br />
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
      </div>

      <div className="counters-parent parent">
        <div className="counter-cont cont">
          {counterData.map((item, index) => (
            <div className="card" key={index}>
              <div className="icon">
                <img
                  src={shopIcon}
                  alt="shopicon"
                  className="iconimg whiteicon"
                />
                <img
                  src={shopBlackIcon}
                  alt="shopicon"
                  className="iconimg blackicon"
                />
              </div>
              <h3>
                <span className="count">
                  <CountUp end={item.count} />
                </span>
                <span>k</span>
              </h3>
              <p>{item.data}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="founders-parent parent">
        <div className="founder-cont cont">
          {founderData.map((item, index) => (
            <div className="founder" key={index} >
              <div className="founder-img">
                <img src={item.image} alt="" />
              </div>
             <div className="content">
             <h3>
                {item.name}
              </h3>
              <p>
                {item.desgination}
              </p>
             </div>
            </div>
          ))}
        </div>
      </div>


  
    </>
  );
};

export default About;
