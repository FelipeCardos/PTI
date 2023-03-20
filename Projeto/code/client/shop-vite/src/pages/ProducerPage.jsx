import React from "react";

export default function ProducerPage() {
  const { id } = useParams(); // Gets the id of the producer from the url
  return (
    <div id='producer-page'>
      {/* If its a producer, shows the name of the producer, options like the local report, their sales, what products have been sold the most, how much revenue they had the past week/month, theirProductionUnits and its products */}
      <div id='producer-info'>
        <div>Producer's Name</div>
        <div>Production Unit</div>
        <div>Products</div>
      </div>
    </div>
  );
}
