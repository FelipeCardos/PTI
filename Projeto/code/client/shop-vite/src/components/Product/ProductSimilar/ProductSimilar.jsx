import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSimilar.css";

export default function ProductSimilar(props) {
  const [product, setProduct] = useState(props.product);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductImage(product_id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${product_id}/productImages`
        );
        const productImage = response.data[0];
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: productImage,
        }));
      } catch (error) {
        console.error(error);
      }
    }
    async function getProductRating(product_id) {
      const productRating = await axios.get(
        "http://localhost:3000/api/v1/products/" + product_id + "/ratings"
      );
      const productRatingList = productRating.data;
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: productRatingList,
      }));
    }

    getProductImage(product.id);
    getProductRating(product.id);
  }, [product.id]);

  function handleClick(id) {
    navigate(`/product/${id}`);
  }

  function renderStarts(ratingList) {
    let sum = 0;
    ratingList.forEach((rating) => {
      sum += rating.rating;
    });
    let avgRating = Math.floor(sum / ratingList.length + 0.5);
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= avgRating) {
        stars.push(<span className='fa fa-star checked'></span>);
      } else {
        stars.push(<span className='fa fa-star'></span>);
      }
    }
    return stars;
  }

  return (
    <div
      className='containerProductSimilarProduct'
      onClick={() => handleClick(product.id)}
    >
      <div className='containerProductSimilarProductTitle' id={product.id}>
        <div className='containerProductTitleImage'>
          <img
            className='img-thumbnail'
            src={
              product.image
                ? product.image.uri
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWWw7YGFwtRifylKXzcSmjxVge-1NbfCaCw&usqp=CAU"
            }
            alt={product.name}
          />
        </div>
        <span className='containerProductSimilarProductTitleTitle'>
          {product.name}
        </span>
        <div className='containerProductSimilarProductTitleRating'>
          {product.rating ? (
            <span>{renderStarts(product.rating)}</span>
          ) : (
            <span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
            </span>
          )}
          <span>
            {" "}
            {product.rating ? product.rating.length : "99999999"} reviews
          </span>
        </div>
        <span className='containerProductSimilarProductTitlePrice'>
          {product.price
            ? `${product.price
                .toString()
                .padStart(3, "0")
                .slice(0, -2)},${product.price.toString().slice(-2)}€`
            : "999999,99€"}
        </span>
      </div>
    </div>
  );
}
