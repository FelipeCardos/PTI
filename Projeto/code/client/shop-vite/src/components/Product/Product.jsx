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
  const [productAttributes, setProductAttributes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/products/" + product_id)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setProductAttributes((prevProductAttributes) => {
          return {
            ...prevProductAttributes,
            ["Barcode"]: res.data.barcode_id,
            ["Production Date"]: res.data.production_date,
          };
        });
      });
  }, []);

  function handleAddtoCart() {
    console.log("add to cart");
  }
  return (
    <div className='containerProduct'>
      <div className='containerProductBreadcrumb'>
        <div>Categoria 1 / categoria 1.1 / categoria 1.1.1</div>
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
              product.price.toString()[product.price.toString().length - 1] +
              "," +
              product.price
                .toString()
                .slice(1, product.price.toString().length) +
              "€"
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className='containerProductPriceInfoProducer'>
            Sold by: Producer's name
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
          <ProductSimilar image={"../" + rubiks} />
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
              {Object.entries(productAttributes).map((attribute) => (
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
