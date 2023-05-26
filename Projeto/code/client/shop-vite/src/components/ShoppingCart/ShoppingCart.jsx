import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../assets/UserContext";
import Cartline from "./Cartline/Cartline";
import "./ShoppingCart.css";

export default function ShoppingCart() {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [shoppingCartLines, setShoppingCartLines] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkApi, setCheckApi] = useState(true);

  // use effect that calls the api to get the shopping carts with the user id using axios
  useEffect(() => {
    async function getShoppingCart() {
      const getShoppingCart = await axios.get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/shoppingCart",
        {
          withCredentials: true,
        }
      );
      return getShoppingCart.data;
    }
    async function getCartLines(id) {
      const getCartLines = await axios.get(
        `http://localhost:3000/api/v1/carts/${id}/cartLines`,
        { withCredentials: true }
      );
      return getCartLines.data;
    }

    async function getProducts(id) {
      const getProducts = await axios.get(
        `http://localhost:3000/api/v1/products/${id}`,
        { withCredentials: true }
      );
      return getProducts.data;
    }

    async function getProducer(id) {
      const getProducer = await axios.get(
        `http://localhost:3000/api/v1/users/${id}`,
        { withCredentials: true }
      );
      return getProducer.data;
    }

    async function getProductImage(id) {
      const getProductImage = await axios.get(
        `http://localhost:3000/api/v1/products/${id}/productImages`,
        { withCredentials: true }
      );
      return getProductImage.data;
    }

    async function fetchData() {
      let cartlines = [];
      const shoppingCartData = await getShoppingCart();
      const shoppingCartLines = await getCartLines(shoppingCartData.id);
      let totalPrice = 0;
      for (let shoppingCartLine of shoppingCartLines) {
        const product = await getProducts(shoppingCartLine.product_id);
        const productImage = await getProductImage(shoppingCartLine.product_id);
        const producer = await getProducer(product.producer_id);
        const cartline = {
          cartId: shoppingCartData.id,
          productId: product.id,
          productName: product.name,
          productImage: productImage.uri,
          productDescription: product.description,
          productPrice: product.price,
          producerName: producer.name,
          producerId: producer.id,
          amount: shoppingCartLine.amount,
        };
        cartlines.push(cartline);
        totalPrice = totalPrice + product.price * shoppingCartLine.amount;
      }
      setShoppingCartLines(cartlines);
      setTotalPrice(totalPrice);
    }

    if (checkApi) {
      fetchData();
      setCheckApi(false);
    }
  }, [checkApi]);

  return (
    <>
      <h1 className='shoppingCartTitle'>My shopping cart</h1>
      <div className='shoppingCartContainer'>
        <div className='shoppingCartCartLinesContainer'>
          {shoppingCartLines.map((cartline) => {
            return <Cartline cartline={cartline} setCheckApi={setCheckApi} />;
          })}
        </div>
        <div className='shoppingCartInfoContainer'>
          <div className='shoppingCartInfoPriceContainer'>
            <span>Total: </span>
            <span>
              {totalPrice
                .toString()
                .padStart(3, "0")
                .slice(0, totalPrice.toString().padStart(3, "0").length - 2) +
                "," +
                totalPrice.toString().slice(totalPrice.toString().length - 2) +
                "€"}
            </span>
          </div>
          <div className='shoppingCartInfoButtonContainer'>
            <button>
              <i className='fas fa-cart-plus'></i> CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
