import React from "react";

export default function ProducerInfo(props) {
  return (
    <div>
      <div>{props.producerName}</div>
      <div>{props.producerLocation}</div>
    </div>
  );
}
