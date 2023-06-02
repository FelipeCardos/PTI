import React, { useEffect, useState } from "react";

export default function ProductFilter({ productsList, updateFilteredProducts }) {
  const [priceInterval, setPriceInterval] = useState([]);
  const [selectedIntervals, setSelectedIntervals] = useState([]);

  useEffect(() => {
    getPriceInterval();
  }, [productsList]);

  const getPriceInterval = () => {
    if (productsList.length === 0) {
      setPriceInterval([]);
      return;
    }

    const maxPrice = Math.max(...productsList.map((product) => product.price));
    const intervalSize = maxPrice / 5;

    const intervals = [];
    let lowerBound = 0;

    for (let i = 0; i < 5; i++) {
      const upperBound = lowerBound + intervalSize;
      intervals.push({ lowerBound, upperBound });
      lowerBound = upperBound;
    }

    setPriceInterval(intervals);
  };

  const handleCheckboxChange = (interval) => {
    let updatedIntervals;
    if (selectedIntervals.includes(interval)) {
      updatedIntervals = selectedIntervals.filter((selected) => selected !== interval);
    } else {
      updatedIntervals = [...selectedIntervals, interval];
    }
    setSelectedIntervals(updatedIntervals);

    const noneSelected = updatedIntervals.length === 0;
    if (noneSelected) {
        console.log()
      updateFilteredProducts(productsList);
    } else {
      const filteredProducts = productsList.filter((product) =>
        updatedIntervals.some((interval) => product.price >= interval.lowerBound && product.price <= interval.upperBound)
      );
      updateFilteredProducts(filteredProducts);
    }
  };

  return (
    <div className="filter-container">
      <h3>Prices</h3>
      <hr />
      <div className="grid-prices">
        {priceInterval.map((interval, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedIntervals.includes(interval)}
              onChange={() => handleCheckboxChange(interval)}
            />
            {`${interval.lowerBound} - ${interval.upperBound}`}
          </div>
        ))}
      </div>
    </div>
  );
}
