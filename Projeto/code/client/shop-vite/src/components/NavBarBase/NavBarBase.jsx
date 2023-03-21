import React, { useState } from "react";
import logo from "../../assets/logo.png";
import './NavBarBase.css'

export default function NavBarBase(props){
    return(
        <div className="containerNavBar">
            <button className="logoButton">
                <img src={logo} className="logo" alt="Local Store" />
            </button>
            <hr/>
        </div>
        
    );
}