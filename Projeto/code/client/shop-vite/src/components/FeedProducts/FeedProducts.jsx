import React from "react";
import './FeedProducts.css';


const prod = [
    {
        id: 1,
        name: "Book",
        price: "20,00€",
        stock: "60",
        rating: "4",
    },
    {
        id: 2,
        name: "Iphone",
        price: "1000,00€",
        stock: "3",
        rating: "1",
    },
    {
        id: 3,
        name: "Makeup",
        price: "20,00€",
        stock: "3",
        rating: "1",
    },
    {

        id: 4,
        name: "Rubiks",
        price: "5€",
        stock: "1000",
        rating: "3",
    },
    {
        id: 5,
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
                            <p>{prod.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};
