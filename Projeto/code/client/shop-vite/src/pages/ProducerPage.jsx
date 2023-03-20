import React from "react";
import { useParams } from "react-router-dom";
import Producer from "../components/Producer/Producer";

export default function ProducerPage() {
  const { id } = useParams(); // Gets the id of the producer from the url
  return (
    <div id='producer-page'>
      <div id='producer-info'>
        <div>Producer's Name</div>
        <div>Production Unit</div>
        <div>Products</div>
      </div>
      <Producer id={id}></Producer>
    </div>
  );
}
