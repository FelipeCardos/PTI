import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rubiks from "../Carrossel/images/rubiks.jpg";
import "./Product.css";
import ProductSimilar from "./ProductSimilar/ProductSimilar";

export default function Product() {
  let { product_id } = useParams();
  return (
    <div className='containerProduct'>
      <div className='containerProductBreadcrumb'>
        <div>Categoria 1 / categoria 1.1 / categoria 1.1.1</div>
      </div>
      <div className='containerProductTitle'>
        <div>
          <div className='containerProductTitleTitle'>
            Jogo de Lógica RUBIK's Cubo Mini 3x3 (Idade Mínima: 7 Anos -
            Dificuldade: Intermédio)
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
          <div className='containerProductPriceInfoPrice'>100€</div>
          <div className='containerProductPriceInfoProducer'>
            Sold by: Producer's name
          </div>
        </div>
        <div className='containerProductPriceAddToCartButton'>
          <button>Add to cart</button>
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
      <div className='containerProductProductAttributes'></div>
      <div className='containerProductCommentSection'></div>
    </div>
  );
}
