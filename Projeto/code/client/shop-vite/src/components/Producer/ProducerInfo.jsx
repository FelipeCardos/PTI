import React from "react";

export default function ProducerInfo(props) {
  return (
    <div className='producerInfo'>
      <div>{props.producerName}</div>
      <div>{props.producerLocation}</div>
      <div>{props.producerRating}</div>
    </div>
  );
}
