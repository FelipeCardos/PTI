import React from "react";
import "./Producer.css";
import ProducerInfo from "./ProducerInfo";
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

  return (
    <div className='producer'>
      <ProducerInfo
        producerName={"Nome do Fornecedor"}
        producerLocation={"Morada do Fornecedor"}
      ></ProducerInfo>
      <div className='productionUnitList'>
        {productionUnits.map((productionUnit) => (
          <ProductionUnit
            productionUnitName={productionUnit.name}
            productionUnitLocation={productionUnit.location}
          />
        ))}
      </div>
    </div>
  );
}
