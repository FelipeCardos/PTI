import React from "react";
import { useParams } from "react-router-dom";
import Producer from "../components/Producer/Producer";
import MainLayout from "../layouts/MainLayout";

export default function ProducerPage() {
  const { id } = useParams(); // Gets the id of the producer from the url
  return (
    <MainLayout>
      <div id='producer-page'>
        <div id='producer-info'>
          <Producer id={id}></Producer>
        </div>
      </div>
    </MainLayout>
  );
}
