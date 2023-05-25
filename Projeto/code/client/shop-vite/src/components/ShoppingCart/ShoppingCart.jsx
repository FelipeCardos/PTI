import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../assets/UserContext";

export default function ShoppingCart() {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);

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

    async function fetchData() {
      const shoppingCartData = await getShoppingCart();
      const shoppingCartLines = await getCartLines(shoppingCartData.id);
      for (let shoppingCartLine of shoppingCartLines) {
        const product = await getProducts(shoppingCartLine.product_id);
        console.log(product);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>My shopping cart</h1>
      <div className='shoppingCart'></div>
    </>
  );
}
