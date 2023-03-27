import React from "react";
import "./Producer.css";
import ProducerInfo from "./ProducerInfo";
import Product from "./Product";
import ProductionUnit from "./ProductionUnit";

export default function Producer(props) {
  {
    /* query à base de dados para obter os dados do fornecedor
    nomeadamente obtenho o nome, as unidades de producao e os produtos por ele vendidos tenha em stock ou não */
  }
  const productionUnits = [
    {
      name: "Unidade de Produção 1",
      location: "Morada da Unidade de Produção 1",
    },
    {
      name: "Unidade de Produção 2",
      location: "Morada da Unidade de Produção 2",
    },
    {
      name: "Unidade de Produção 3",
      location: "Morada da Unidade de Produção 3",
    },
    {
      name: "Unidade de Produção 4",
      location: "Morada da Unidade de Produção 4",
    },
    {
      name: "Unidade de Produção 5",
      location: "Morada da Unidade de Produção 5",
    },
  ];

  const products = [
    {
      name: "Produto 1",
      price: "Preço do Produto 1",
      stock: "Stock do Produto 1",
      image: "https://picsum.photos/100/100",
      rating: 3,
    },
    {
      name: "Produto 2",
      price: "Preço do Produto 2",
      stock: "Stock do Produto 2",
      image: "https://picsum.photos/100/100",
      rating: 3,
    },
    {
      name: "Produto 3",
      price: "Preço do Produto 3",
      stock: "Stock do Produto 3",
      image: "https://picsum.photos/100/100",
      rating: 3,
    },
    {
      name: "Produto 4",
      price: "Preço do Produto 4",
      stock: "Stock do Produto 4",
      image: "https://picsum.photos/100/100",
      rating: 4,
    },
    {
      name: "Produto 5",
      price: "Preço do Produto 5",
      stock: "Stock do Produto 5",
      image: "https://picsum.photos/100/100",
      rating: 3,
    },
  ];

  return (
    <div className='producer'>
      <ProducerInfo
        producerName={"Nome do Fornecedor"}
        producerLocation={"Morada do Fornecedor"}
        producerRating={"Rating do Fornecedor"}
      ></ProducerInfo>
      <div className='productionUnitList'>
        {productionUnits.map((productionUnit) => (
          <ProductionUnit
            productionUnitName={productionUnit.name}
            productionUnitLocation={productionUnit.location}
          />
        ))}
      </div>
      <div className='productList'>
        {products.map((product) => (
          <Product
            productName={product.name}
            productPrice={product.price}
            productStock={product.stock}
            productImage={product.image}
            productRating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}
