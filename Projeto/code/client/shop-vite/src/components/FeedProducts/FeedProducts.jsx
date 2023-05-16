import React from "react";
import './FeedProducts.css';
import iphone from "../Carrossel/images/iphone.jpg";
import makeup from "../Carrossel/images/makeup.jpg";
import rubiks from "../Carrossel/images/rubiks.jpg";
import book from "../Carrossel/images/book.jpg";

const prod = [
    {

        id: 1,
        image: book,
        name: "Book",
        price: "20,00€",
        stock: "60",
        rating: "4",
    },
    {
        id: 2,
        image: iphone,
        name: "Iphone",
        price: "1000,00€",
        stock: "3",
        rating: "1",
    },
    {

        id: 3,
        image:makeup,
        name: "Makeup",
        price: "20,00€",
        stock: "3",
        rating: "1",
    },
    {

        id: 4,
        image:rubiks,
        name: "Rubiks",
        price: "5€",
        stock: "1000",
        rating: "3",
    },
    {
        id: 5,
        image:iphone,
        name: "Iphone",
        price: "800€",
        stock: "4",
        rating: "4",
    },

];

export default function FeedProducts() {
    return (
        <>
            <hr />
            <div className="container-feed-products">

                {prod.map((prod) => (
                    <div key={prod.id} className="grid-feed-products">
                        <div className="product-content">
                            <img src={prod.image}></img>
                            <p>{prod.name}</p>
                            <p>{prod.price}</p>
                            <p>Rate: {prod.rating}</p>
                            <p>{prod.stock} in stock</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};
