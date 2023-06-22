import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../assets/UserContext";
import AddProducts from "./AddProducts/AddProducts";
import "./ProductsPMA.css";
import ProductsPMACard from "./ProductsPMACard/ProductsPMACard";

export default function ProductsPMA() {
  const [checkApi, setCheckApi] = useState(true);
  const { myUserVariable } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const handleShowAddProducts = () => {
    event.preventDefault();
    setShowAddProducts(!showAddProducts);
    setModal(!modal);
  };

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        "http://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/products",
        { withCredentials: true }
      );
      return products.data;
    }

    async function getProductImage(productId) {
      const productImage = await axios.get(
        "http://yourlocalshop.pt:3000/api/v1/products/" +
          productId +
          "/productImages",
        { withCredentials: true }
      );
      return productImage.data;
    }

    async function getProductStock(productId) {
      let productStock = 0;
      const productProductionUnits = await axios.get(
        "http://yourlocalshop.pt:3000/api/v1/products/" +
          productId +
          "/productionUnits",
        { withCredentials: true }
      );
      for (const productProductionUnit of productProductionUnits.data) {
        productStock += productProductionUnit.amount;
      }
      return productStock;
    }

    async function fetchData() {
      let products = await getProducts();
      let productsV2 = [];
      for (let product of products) {
        const productImage = await getProductImage(product.id);
        const productStock = await getProductStock(product.id);
        product = {
          ...product,
          image: productImage[0]?.uri,
          stock: productStock,
        };
        productsV2.push(product);
      }
      return productsV2;
    }

    if (checkApi) {
      fetchData().then((products) => {
        setProducts(products);
      });
      setCheckApi(false);
    }
  }, [checkApi]);

  function handleToast(message) {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <div className='containerProductsPMA'>
      <ToastContainer />
      <div className='containerProductsPMAYourProducts'>
        <div className='productsPMAYourProductsTitle'>
          Your Products
          <button
            className='productsPMAAddProducts'
            onClick={handleShowAddProducts}
          >
            ADD
          </button>
        </div>
        <hr className='productsPMAYourProductsTitleHR' />
        <div className='containerProductsPMAYourProductsProducts'>
          {products.map((product) => (
            <ProductsPMACard
              key={product.id}
              product={product}
              setCheckApi={setCheckApi}
              handleToast={handleToast}
            />
          ))}
        </div>
      </div>
      {modal && <div className='modalPMA'></div>}
      {showAddProducts && (
        <div className='AddProducts'>
          <AddProducts
            handleShowAddProducts={handleShowAddProducts}
            handleToast={handleToast}
            setCheckApi={setCheckApi}
          />
        </div>
      )}
    </div>
  );
}
