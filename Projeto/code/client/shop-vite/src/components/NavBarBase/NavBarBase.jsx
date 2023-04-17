import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./NavBarBase.css";

export default function NavBarBase(props) {
  let navigate = useNavigate();
  return (
    <div className='containerNavBar'>
      <button
        className='logoButton'
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} className='logo' alt='Local Store' />
      </button>
      <hr />
    </div>
  );
}
