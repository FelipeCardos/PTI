import { React, useState, useEffect, useRef } from "react";
import './ProductionUnits.css'
import { motion } from 'framer-motion';
import book from '../Carrossel/images/book.jpg';
import makeup from '../Carrossel/images/makeup.jpg';
import iphone from '../Carrossel/images/iphone.jpg';
import rubiks from '../Carrossel/images/rubiks.jpg';

const productionUnits = [rubiks, rubiks, rubiks, book, iphone, makeup, rubiks, rubiks, rubiks, book, iphone, makeup, rubiks, rubiks, rubiks, book.rubiks, rubiks, rubiks, book, iphone, makeup, rubiks, rubiks, rubiks, book, iphone, makeup, rubiks, rubiks, rubiks, book

    // {
    //     id:1,
    //     capacity:2,
    //     address:
    //     {
    //         country:"Portugal",
    //         state:"Lisboa",
    //         street:"Campo Grande",
    //         postal_code:"1749-016"
    //     }
    // },
    // {
    //     id:2,
    //     capacity:20,
    //     address:
    //     {
    //         country:"Portugal",
    //         state:"Lisboa",
    //         street:"Campo Grande",
    //         postal_code:"1749-016"
    //     }

    // }    
]

export default function ProductionUnits() {

    return (
        <div className="grid-container">
            {productionUnits.map((productionUnit) => (

                <div key={productionUnit} className="productionUnit" >
                    <p>here</p>
                    <i
                        className="fa fa-remove togglePassword"
                    ></i>
                </div>
            ))}
        </div>
    );
}
