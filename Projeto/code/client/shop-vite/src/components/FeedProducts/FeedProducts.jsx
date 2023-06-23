import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductSimilar from "../Product/ProductSimilar/ProductSimilar";
import "./FeedProducts.css";

export default function FeedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadFeedProducts();
  }, []);

  function loadFeedProducts() {
    axios
      .get("https://yourlocalshop.pt:3000/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      });
  }

  function formatDate(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();

    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  }

  return (
    <>
      <div className='container-feed-products'>
        {products.map((prod) => (
          <div key={prod.id} className='grid-feed-products'>
            <ProductSimilar product={prod} />
          </div>
        ))}
      </div>
    </>
  );
}
