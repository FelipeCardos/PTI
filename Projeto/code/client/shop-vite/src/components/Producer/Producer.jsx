import React from "react";
import "./Producer.css";
import ProducerInfo from "./ProducerInfo";

export default function Producer(props) {
  {
    /* query à base de dados para obter os dados do fornecedor
    nomeadamente obtenho o nome, as unidades de producao e os produtos por ele vendidos tenha em stock ou não */
  }

  return (
    <div className='producer'>
      <ProducerInfo
        producerName={"Nome do Fornecedor"}
        producerLocation={"Morada do Fornecedor"}
      ></ProducerInfo>
    </div>
  );
}
