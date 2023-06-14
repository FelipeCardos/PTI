import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rubiks from "../Carrossel/images/rubiks.jpg";
import LoadingSpinner from "../Loadings/LoadingSpinner";
import AttributeRow from "./AttributeRow/AttributeRow";
import "./Product.css";
import ProductSimilar from "./ProductSimilar/ProductSimilar";

export default function Product() {
  let { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        "http://localhost:3000/api/v1/products/" + product_id
      );
      return products.data;
      // setProduct(res.data);
      // setProductAttributes((prevProductAttributes) => {
      //   return {
      //     ...prevProductAttributes,
      //     ["Barcode"]: res.data.barcode_id,
      //     ["Production Date"]: res.data.production_date,
      //   };
      // });
    }

    async function getProducer(producer_id) {
      const producer = await axios.get(
        "http://localhost:3000/api/v1/users/" + producer_id
      );
      return producer.data;
    }

    async function getProductAttributes(product_id) {
      const productAttributes = await axios.get(
        "http://localhost:3000/api/v1/products/" +
          product_id +
          "/productAttributes"
      );
      return productAttributes.data;
    }

    async function getProductCategories(product_id) {
      const productCategories = await axios.get(
        "http://localhost:3000/api/v1/products/" +
          product_id +
          "/productCategories"
      );
      return productCategories.data;
    }

    async function fetchData() {
      const products = await getProducts();
      const producer = await getProducer(products.producer_id);
      const productAttributes = await getProductAttributes(product_id);
      const productCategories = await getProductCategories(product_id);

      setProduct((prevProducts) => {
        return {
          ...prevProducts,
          ...products,
          ["producer"]: producer,
        };
      });
      setProductAttributes(productAttributes);
      setProductCategories(productCategories);
    }

    fetchData();
  }, []);

  function handleAddtoCart() {
    console.log("add to cart");
  }

  console.log(product);
  return (
    <div className='containerProduct'>
      <div className='containerProductBreadcrumb'>
        <div>
          {productCategories.map((category) => {
            return (
              <span>
                <a href={"/products?category=" + category.id}>
                  {category.name}
                </a>
                <span> / </span>
              </span>
            );
          })}
        </div>
      </div>
      <div className='containerProductTitle'>
        <div>
          <div className='containerProductTitleTitle'>
            {product.name ? product.name : <LoadingSpinner />}
          </div>
          <div className='containerProductTitleRating'>
            <span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star checked'></span>
              <span className='fa fa-star'></span>
              <span className='fa fa-star'></span>
            </span>
            <span> 10K reviews</span>
          </div>
          <div className='containerProductTitleImage'>
            <img src={rubiks} />
          </div>
        </div>
      </div>
      <div className='containerProductPrice'>
        <div className='containerProductPriceInfo'>
          <div className='containerProductPriceInfoPrice'>
            {product.price ? (
              product.price
                .toString()
                .padStart(3, "0")
                .slice(
                  0,
                  product.price.toString().padStart(3, "0").length - 2
                ) +
              "," +
              product.price
                .toString()
                .slice(
                  product.price.toString().length - 2,
                  product.price.toString().length
                ) +
              "€"
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className='containerProductPriceInfoProducer'>
            {product.producer && (
              <span>
                Sold by:{" "}
                <a href={"/producer/" + product.producer.id}>
                  {product.producer.name}
                </a>
              </span>
            )}
          </div>
        </div>
        <div className='containerProductPriceAddToCartButton'>
          <button onClick={handleAddtoCart}>Add to cart</button>
          <i className='fa fa-heart'></i>
        </div>
        <div className='containerProductPriceCompareProduct'>
          <button>Compare product</button>
        </div>
      </div>
      <div className='containerProductSimilarProducts'>
        <div>
          {/* Falta renderizar os produtos similares*/}
          {/* <ProductSimilar image={"../" + rubiks} /> */}
        </div>
      </div>
      <div className='containerProductProductAttributes'>
        <div className='containerProductProductAttributesTitle'>
          Product Information
        </div>
        <div className='containerProductProductAttributesDescription'>
          {product.description ? product.description : <LoadingSpinner />}
        </div>
        <div className='containerProductProductAttributesInfo'>
          <table className='containerProductProductAttributesInfoTable'>
            {/* Falta renderizar os atributos na tabela*/}
            <thead></thead>
            <tbody>
              {productAttributes.map((attribute) => (
                <AttributeRow attribute={attribute} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='containerProductCommentSection'></div>
    </div>
  );
}
