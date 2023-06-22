import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Cartline.css";

export default function Cartline({ data, setCheckApi, checkApi }) {
  const [cartline, setCartline] = useState({});
  const disabledStyles = {
    opacity: "0.5",
    pointerEvents: "none",
    userSelect: "none",
    cursor: "not-allowed",
  };

  useEffect(() => {
    async function fetchData() {
      async function getProduct(id) {
        const getProduct = await axios.get(
          `http://yourlocalshop.pt:3000/api/v1/products/${id}`,
          { withCredentials: true }
        );
        return getProduct.data;
      }

      async function getProducer(id) {
        const getProducer = await axios.get(
          `http://yourlocalshop.pt:3000/api/v1/users/${id}`,
          { withCredentials: true }
        );
        return getProducer.data;
      }

      async function getProductImage(id) {
        const getProductImage = await axios.get(
          `http://yourlocalshop.pt:3000/api/v1/products/${id}/productImages`,
          { withCredentials: true }
        );
        return getProductImage.data;
      }
      const product = await getProduct(data.product_id);
      const productImage = await getProductImage(data.product_id);
      const producer = await getProducer(product.producer_id);
      setCartline({
        ...cartline,
        cartId: data.cart_id,
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        producerId: producer.id,
        producerName: producer.name,
        productImage: productImage[0].uri,
      });
    }
    fetchData();
  }, [checkApi]);

  function handleDeleteCartline() {
    async function deleteCartline() {
      const response = await axios.delete(
        "http://yourlocalshop.pt:3000/api/v1/carts/" +
          cartline.cartId +
          "/cartLines",
        {
          data: { productId: cartline.productId },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      setCheckApi(true);
      return response.data;
    }
    deleteCartline().then((res) => console.log(res));
  }
  function handleControlAmount(operation) {
    async function updateCartLineAmount() {
      const response = await axios.put(
        "http://yourlocalshop.pt:3000/api/v1/carts/" +
          cartline.cartId +
          "/cartLines",
        {
          productId: cartline.productId,
          amount: operation === "+" ? data.amount + 1 : data.amount - 1,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      setCheckApi(true);
      return response.data;
    }
    updateCartLineAmount();
  }

  console.log(cartline);
  return (
    <div className='containerCartline'>
      <div className='containerCartlineImage'>
        <div
          className='containerCartlineProductImage'
          style={{
            backgroundImage: `url(${
              cartline.productImage || `https://i.imgur.com/1TYeM7X.png`
            })`,
          }}
        ></div>
      </div>
      <div className='containerCartlineProductInfo'>
        <div className='containerCartlineProductName'>
          <a href={`product/${cartline.productId}`}>{cartline.productName}</a>
        </div>
        <div className='containerCartlineProductDescription'>
          {cartline.productDescription}
        </div>
        <div className='containerCartlineProductPrice'>
          {cartline.productPrice
            ?.toString()
            .padStart(3, "0")
            .slice(
              0,
              cartline.productPrice.toString().padStart(3, "0").length - 2
            ) +
            "," +
            cartline.productPrice
              ?.toString()
              .slice(cartline.productPrice.toString().length - 2) +
            "€"}
        </div>
        <div className='containerCartlineProducerName'>
          Sold by:{" "}
          <a href={`/producer/${cartline.producerId}`}>
            {cartline.producerName}
          </a>
        </div>
      </div>
      <div className='containerCartlineActions'>
        <button
          className='containerCartlineRemoveProduct'
          onClick={handleDeleteCartline}
        >
          REMOVE
        </button>
        <div
          className='containerCartlineControlAmount'
          style={checkApi ? disabledStyles : {}}
        >
          <div
            className='containerCartlineSubtractAmount'
            onClick={() => {
              handleControlAmount("-");
            }}
            style={data.amount == 1 ? disabledStyles : {}}
          >
            <i className='fa fa-minus'></i>
          </div>
          <div className='containerCartlineAmount'>{data.amount}</div>
          <div
            className='containerCartlineAddAmount'
            onClick={() => {
              handleControlAmount("+");
            }}
          >
            <i className='fa fa-plus'></i>
          </div>
        </div>
      </div>
    </div>
  );
}
