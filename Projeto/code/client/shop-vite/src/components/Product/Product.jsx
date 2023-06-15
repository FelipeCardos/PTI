import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rubiks from "../Carrossel/images/rubiks.jpg";
import LoadingSpinner from "../Loadings/LoadingSpinner";
import AttributeRow from "./AttributeRow/AttributeRow";
import MapComponent from "./Map/Map";
import "./Product.css";
import ProductSimilar from "./ProductSimilar/ProductSimilar";

export default function Product() {
  let { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productionUnits, setProductionUnits] = useState([]);
  const [selectProductionUnit, setSelectProductionUnit] = useState({});

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        "http://localhost:3000/api/v1/products/" + product_id
      );
      return products.data;
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

    async function getProductImage(product_id) {
      const productImage = await axios.get(
        "http://localhost:3000/api/v1/products/" + product_id + "/productImages"
      );
      return productImage.data[0];
    }

    async function getProductRating(product_id) {
      const productRating = await axios.get(
        "http://localhost:3000/api/v1/products/" + product_id + "/ratings"
      );
      return productRating.data;
    }

    async function getProductProductionUnits(product_id) {
      const productProductionUnits = await axios.get(
        "http://localhost:3000/api/v1/products/" +
          product_id +
          "/productionUnits"
      );
      return productProductionUnits.data;
    }

    async function getProductionUnitData(production_unit_id) {
      let response = await axios.get(
        `http://localhost:3000/api/v1/productionUnits/${production_unit_id}`
      );
      const productionUnitAddress = await axios.get(
        `http://localhost:3000/api/v1/users/${response.data.productionUnit.producer_id}/productionUnits/${production_unit_id}/address`
      );
      response.data.productionUnit.address = productionUnitAddress.data.address;
      return response.data.productionUnit;
    }

    async function fetchData() {
      const products = await getProducts();
      const productImage = await getProductImage(product_id);
      const productRating = await getProductRating(product_id);
      const producer = await getProducer(products.producer_id);
      const productAttributes = await getProductAttributes(product_id);
      const productCategories = await getProductCategories(product_id);
      const productProductionUnits = await getProductProductionUnits(
        product_id
      );
      for (let productionUnit of productProductionUnits) {
        productionUnit.production_unit = await getProductionUnitData(
          productionUnit.production_unit_id
        );
        console.log(productionUnit);
      }
      setProduct((prevProducts) => {
        return {
          ...prevProducts,
          ...products,
          ["producer"]: producer,
          ["image"]: productImage,
          ["rating"]: productRating,
        };
      });
      setProductAttributes(productAttributes);
      setProductCategories(productCategories);
      setProductionUnits(productProductionUnits);
    }

    fetchData();
  }, []);

  function handleProductionUnitSelection(event) {
    setSelectProductionUnit(
      productionUnits.find(
        (productionUnit) =>
          productionUnit.production_unit_id == event.target.value
      )
    );
  }

  function handleAddtoCart() {
    console.log("add to cart");
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
            {product.name ? product.name : "Loading..."}
          </div>
          <div className='containerProductTitleRating'>
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
          <div className='containerProductTitleImage'>
            <img
              src={
                product.image
                  ? product.image.uri
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWWw7YGFwtRifylKXzcSmjxVge-1NbfCaCw&usqp=CAU"
              }
            />
          </div>
        </div>
      </div>
      <div className='containerProductPrice'>
        <div className='containerProductPriceInfo'>
          <div className='containerProductPriceInfoPrice'>
            {product.price
              ? product.price
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
              : "999999,99€"}
          </div>
          <div className='containerProductPriceInfoProducer'>
            <span>
              Sold by:{" "}
              {product.producer ? (
                <a href={"/producer/" + product.producer.id}>
                  {product.producer.name}
                </a>
              ) : (
                "Loading..."
              )}
            </span>
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
      <div className='containerProductsMap'>
        <div className='containerProductsMapProductionUnits'>
          <div className='containerProductsMapProductionUnitsTitle'>
            Choose the production unit you which the product to come from:
          </div>
          <select
            name='productionUnit'
            id=''
            onChange={handleProductionUnitSelection}
          >
            <option value=''>Select a production unit</option>
            {productionUnits.map((productionUnit) => {
              return (
                <option value={productionUnit.production_unit_id}>
                  {productionUnit.production_unit.address.country},{" "}
                  {productionUnit.production_unit.address.state},{" "}
                  {productionUnit.production_unit.address.street},{" "}
                  {productionUnit.production_unit.address.postal_code}
                </option>
              );
            })}
          </select>
          <div className='containerProductsMapProductionUnitsAmount'>
            <span>Amount:</span>
            <input
              type='number'
              name='amount'
              id=''
              max={selectProductionUnit.amount}
            />
          </div>
        </div>
        <MapComponent />
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
