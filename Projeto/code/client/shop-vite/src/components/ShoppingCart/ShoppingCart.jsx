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
  const [cartId, setCartId] = useState(0);

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

    async function fetchData() {
      const shoppingCartData = await getShoppingCart();
      setCartId(shoppingCartData.id);
      const shoppingCartLines = await getCartLines(shoppingCartData.id);
      setShoppingCartLines(shoppingCartLines);
      setTotalPrice(shoppingCartData.price);
    }
    if (checkApi) {
      fetchData().then(() => setCheckApi(false));
    }
  }, [checkApi]);

  async function handleCheckout() {
    // const checkout = await axios.post(
    //   "http://localhost:3000/api/v1/payment/stripe/create-payment-intent",
    //   { cartId: cartId },
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     withCredentials: true,
    //   }
    // );
    window.location.href = `http://localhost:3000/api/v1/payment/stripe/create-payment-intent?cartId=${cartId}`;
    return;
  }

  return (
    <>
      <h1 className='shoppingCartTitle'>My shopping cart</h1>
      <div className='shoppingCartContainer'>
        <div className='shoppingCartCartLinesContainer'>
          {shoppingCartLines.map((data) => {
            return (
              <Cartline
                data={data}
                checkApi={checkApi}
                setCheckApi={setCheckApi}
              />
            );
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
            <button onClick={handleCheckout}>
              <i className='fas fa-cart-plus'></i> CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
