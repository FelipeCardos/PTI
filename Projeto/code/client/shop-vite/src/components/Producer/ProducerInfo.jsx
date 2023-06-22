import React from "react";

export default function ProducerInfo(props) {
  return (
    <div className='producerInfo'>
      <div>Name: {props.producerName}</div>
      <div>Location: {props.producerLocation}</div>
    </div>
  );
}
