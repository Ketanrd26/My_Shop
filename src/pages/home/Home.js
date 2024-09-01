import React, { useState } from "react";
import "./Home.scss";
import axios from "axios";
const Home = () => {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: null,
    categories: "",
    size: "",
    color: "",
    price: "",
  });

  const addProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}/product/addProduct`,
        {
          ...product,
            headers:{
              "sessionobject" : localStorage.getItem("sessionobject")
            }
          
        }
      );
      console.log(response, "respoonse");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product)
  return (
    <>
      <div className="homepage">
        <form action=""   onSubmit={addProduct}>
          <input
            type="text"
            placeholder="title"
            value={product.title}
            onChange={(e) =>
              setProduct({
                ...product,
                title: e.target.value,
              })
            }
          />
          <input type="text" placeholder="desc"  
           value={product.desc}
           onChange={(e) =>
             setProduct({
               ...product,
               desc: e.target.value,
             })
           }
          />
          <input type="file" placeholder="image" 
          //  value={product.img}
           onChange={(e) =>
             setProduct({
               ...product,
               img: e.target.files[0],
             })
           }
          />
          <input type="text" placeholder="categories" 
           value={product.categories}
           onChange={(e) =>
             setProduct({
               ...product,
               categories: e.target.value,
             })
           }
          />
          <input type="text" placeholder="size" 
           value={product.size}
           onChange={(e) =>
             setProduct({
               ...product,
               size: e.target.value,
             })
           }
          />
          <input type="text" placeholder="color" 
           value={product.color}
           onChange={(e) =>
             setProduct({
               ...product,
               color: e.target.value,
             })
           }
          />
          <input type="text" placeholder="price" 
           value={product.price}
           onChange={(e) =>
             setProduct({
               ...product,
               price: e.target.value,
             })
           }
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Home;
