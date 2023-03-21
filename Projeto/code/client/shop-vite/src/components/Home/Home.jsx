import React from "react";

export default function Home(props){
    const products = [
        {
            name: "Toy",
            price: "12€",
        },
        {
            name: "Selfcare",
            price: "150€",
        },
        {
            
        }
    ]

    return (
        <div className='homeContainer'>
        <div className='productList'>
          {productionUnits.map((productionUnit) => (
            <ProductionUnit
              productionUnitName={productionUnit.name}
              productionUnitLocation={productionUnit.location}
            />
          ))}
        </div>
      </div>
    );
}