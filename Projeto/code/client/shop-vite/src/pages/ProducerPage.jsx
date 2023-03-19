import React from "react";

export default function ProducerPage() {
  let client = true; // If the logged in user is a client or a producer (teste)
  const { id } = useParams(); // Gets the id of the producer
  return (
    <div id='producer-page'>
      {/* If its a client, shows the name of the producer and their products
      If its a producer, shows the name of the producer, options like the local report, their sales, what products have been sold the most, how much revenue they had the past week/month, theirProductionUnits and its products */}
      {client} && (<div>Producers name</div>
      <div>Producers products</div>){!client} && (<div>Producers name</div>
      <div>Producers options</div>
      <div>Producers sales</div>
      <div>Producers products</div>
      <div>Producers ProductionUnits</div>
      <div>Producers ProductionUnits products</div>
      <div>Producers ProductionUnits products</div>
      <div>Producers ProductionUnits products</div>
      <div>Producers ProductionUnits products</div>)
    </div>
  );
}
