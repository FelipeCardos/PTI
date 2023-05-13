import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className='dot-spinner'>
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
      <div className='dot-spinner__dot' />
    </div>
  );
}
