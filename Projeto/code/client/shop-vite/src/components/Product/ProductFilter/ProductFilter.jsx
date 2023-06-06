import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ProductFilter({ productsList, updateFilteredProducts }) {
  const [priceInterval, setPriceInterval] = useState([]);
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [producers, setProducers] = useState([]);
  const [productsPerProducer, setProdutsPerProducer] = useState([]);
  const [selectedProducers, setSelectedProducers] = useState([]);

  useEffect(() => {
    getPriceInterval();
    getProducers();
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
      updateFilteredProducts(productsList);
    } else {
      const filteredProducts = productsList.filter((product) =>
        updatedIntervals.some((interval) => product.price >= interval.lowerBound && product.price <= interval.upperBound)
      );
      updateFilteredProducts(filteredProducts);
    }
  };

  function getProducers() {
    axios.get("http://localhost:3000/api/v1/users").then((response) => {
      const producersFromServer = response.data.users.filter(
        (producer) => producer.typeUser === "Producer"
      );
      setProducers(producersFromServer);
    });
  }

  const handleProducerCheckboxChange = (producerId) => {
    let updatedProducers;
    if (selectedProducers.includes(producerId)) {
      updatedProducers = selectedProducers.filter((selected) => selected !== producerId);
    } else {
      updatedProducers = [...selectedProducers, producerId];
    }
    setSelectedProducers(updatedProducers);


    const noneSelected = updatedProducers.length === 0;

    if (noneSelected) {
      updateFilteredProducts(productsList);
    } else {
      const filteredProducts = productsList.filter((product) =>
        updatedProducers.some((p) => p === product.producer_id)
      );
      console.log(filteredProducts)
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
      <div className="grid-producers">
        <h3>Producers</h3>
        {producers.map((producer) => (
          <div key={producer.id}>
            <input
              type="checkbox"
              checked={selectedProducers.includes(producer.id)}
              onChange={() => handleProducerCheckboxChange(producer.id)}
            />
            {producer.name}
          </div>
        ))}
      </div>
    </div>
  );
}
