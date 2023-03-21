import React, { useState } from "react";
import logo from "../../assets/logo.png";
import './NavBar.css'

export default function NavBar(props){
    return(
        <div className="containerNavBar">
            <button className="logoButton">
                <img src={logo} className="logo" alt="Button Image" />
            </button>
            <hr/>
        </div>
        
    )
}