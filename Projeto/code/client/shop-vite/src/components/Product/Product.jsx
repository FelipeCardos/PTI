import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../assets/UserContext";
import rubiks from "../Carrossel/images/rubiks.jpg";
import LoadingSpinner from "../Loadings/LoadingSpinner";
import AttributeRow from "./AttributeRow/AttributeRow";
import MapComponent from "./Map/Map";
import "./Product.css";

export default function Product() {
  let { product_id } = useParams();
  const { myUserVariable } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productionUnits, setProductionUnits] = useState([]);
  const [selectProductionUnit, setSelectProductionUnit] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({});
  const [formData, setFormData] = useState({
    amount: 0,
    product_id: product_id,
    production_unit_id: null,
  });

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" + product_id
      );
      return products.data;
    }

    async function getUserCoordinates() {
      console.log(myUserVariable.user_id);
      const userCoordinates = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/address"
      );
      return userCoordinates.data;
    }

    async function getProducer(producer_id) {
      const producer = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" + producer_id
      );
      return producer.data;
    }

    async function getProductAttributes(product_id) {
      const productAttributes = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          product_id +
          "/productAttributes"
      );
      return productAttributes.data;
    }

    async function getProductCategories(product_id) {
      const productCategories = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          product_id +
          "/productCategories"
      );
      return productCategories.data;
    }

    async function getProductImage(product_id) {
      const productImage = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          product_id +
          "/productImages"
      );
      return productImage.data[0];
    }

    async function getProductRating(product_id) {
      const productRating = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          product_id +
          "/ratings"
      );
      return productRating.data;
    }

    async function getProductProductionUnits(product_id) {
      const productProductionUnits = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          product_id +
          "/productionUnits"
      );
      return productProductionUnits.data;
    }

    async function getProductionUnitData(production_unit_id) {
      let response = await axios.get(
        `https://yourlocalshop.pt:3000/api/v1/productionUnits/${production_unit_id}`
      );
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
      const userCoordinates = await getUserCoordinates();
      for (let productionUnit of productProductionUnits) {
        productionUnit.production_unit = await getProductionUnitData(
          productionUnit.production_unit_id
        );
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
      setUserCoordinates(userCoordinates);
    }

    fetchData();
  }, []);

  function handleProductionUnitSelection(event) {
    if (event.target.value == "") {
      setSelectProductionUnit({});
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          ["production_unit_id"]: null,
        };
      });
      return;
    }
    setSelectProductionUnit(
      productionUnits.find(
        (productionUnit) =>
          productionUnit.production_unit_id == event.target.value
      )
    );
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ["production_unit_id"]: event.target.value,
      };
    });
  }

  async function handleAddtoCart() {
    // https://yourlocalshop.pt:3000/api/v1/users/1/shoppingCart
    const shoppingCart = await axios.get(
      "https://yourlocalshop.pt:3000/api/v1/users/" +
        myUserVariable.user_id +
        "/shoppingCart"
    );
    const shoppingCartId = shoppingCart.data.id;
    const response = await axios.post(
      "https://yourlocalshop.pt:3000/api/v1/users/" +
        myUserVariable.user_id +
        "/carts/" +
        shoppingCartId +
        "/cartLines",
      {
        amount: formData.amount,
        product_id: formData.product_id,
        production_unit_id: formData.production_unit_id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );
    console.log(response);
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

  function handleChangeAmount(event) {
    const value = Math.min(event.target.value, selectProductionUnit.amount);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ["amount"]: value,
      };
    });
  }

  console.log("FORM DATA: ");
  console.log(formData);

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
          <button
            onClick={handleAddtoCart}
            disabled={
              formData.production_unit_id === null ||
              formData.amount === null ||
              formData.amount === 0
            }
          >
            Add to cart
          </button>
          <p>
            *Must select the production unit you want to receive from and the
            desired amount
          </p>
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
              value={formData.amount}
              disabled={!selectProductionUnit.amount}
              onChange={handleChangeAmount}
            />
          </div>
        </div>
        {userCoordinates.coordinates ? (
          <MapComponent
            user={userCoordinates}
            productionUnits={productionUnits}
            selectProductionUnit={selectProductionUnit}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <div className='containerProductProductAttributes'>
        <div className='containerProductProductAttributesTitle'>
          Product Information
        </div>
        <div className='containerProductProductAttributesDescription'>
          {product.description ? product.description : "Loading..."}
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
