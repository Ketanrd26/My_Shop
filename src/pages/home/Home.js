import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
const Home = () => {
  const [productData, setProductData] = useState([]);

  const productList = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/product/productList`
      );

      setProductData(response.data.products);
    } catch (error) {}
  };

  useEffect(() => {
    productList();
  }, []);

  const addCartItem = async (item) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/cart/addCart`,{
          productId:item._id,
          title:item.title,
          img:item.img,
          size:item.size,
          color:item.color,
          price:item.price,
          desc:item.desc
        },{
          headers:{
            "sessionobject": `${localStorage.getItem("sessionobject")}`
          }
        }
      );

      console.log("data", response)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="homepage">
        {productData.map((item, index) => (
          <div className="card" key={index}>
            <div
              className="image"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <h5> {item.title} </h5>
            </div>
            <div className="middle">
              <div className="size">{item.size}</div>
              <div className="color">{item.color}</div>
              <div className="price">{item.price}</div>
            </div>
            <div className="bottom">
              <p>{item.desc}</p>
            </div>
            <div className="btn" onClick={()=>addCartItem(item)}  >Add to Cart</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
