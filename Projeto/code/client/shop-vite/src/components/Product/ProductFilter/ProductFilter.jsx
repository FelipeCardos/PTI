import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductFilter({ productsList, updateFilteredProducts, clearFilteredProducts }) {
  const [priceInterval, setPriceInterval] = useState([]);
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [producers, setProducers] = useState([]);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const [selectedRates, setSelectedRates] = useState([]);
  const [prodRates, setProdRates] = useState([]);
  const rating = [1, 2, 3, 4, 5];

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
    let filteredProducts = productsList;

    if (!noneSelected) {
      filteredProducts = productsList.filter((product) =>
        updatedIntervals.some(
          (interval) => product.price >= interval.lowerBound && product.price <= interval.upperBound
        )
      );
    }

    if (selectedProducers.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedProducers.includes(product.producer_id)
      );
    }

    if (selectedRates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedRates.includes(calculateAverageRate(prodRates[product.id]))
      );
    }

    updateFilteredProducts(filteredProducts);
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
    let filteredProducts = productsList;

    if (!noneSelected) {
      filteredProducts = productsList.filter((product) =>
        updatedProducers.includes(product.producer_id)
      );
    }

    if (selectedIntervals.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedIntervals.some(
          (interval) => product.price >= interval.lowerBound && product.price <= interval.upperBound
        )
      );
    }

    if (selectedRates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedRates.includes(calculateAverageRate(prodRates[product.id]))
      );
    }

    updateFilteredProducts(filteredProducts);
  };

  function handleRateCheckboxChange(rate) {
    let updatedRates;
    if (selectedRates.includes(rate)) {
      updatedRates = selectedRates.filter((selected) => selected !== rate);
    } else {
      updatedRates = [...selectedRates, rate];
    }
    setSelectedRates(updatedRates);

    let filteredProducts = [];
    if (updatedRates.length > 0) {
      for (let product of productsList) {
        if (prodRates[product.id] && updatedRates.includes(calculateAverageRate(prodRates[product.id]))) {
          filteredProducts.push(product);
        }
      }
    } else {
      filteredProducts = productsList;
    }

    if (selectedIntervals.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedIntervals.some(
          (interval) => product.price >= interval.lowerBound && product.price <= interval.upperBound
        )
      );
    }

    if (selectedProducers.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedProducers.includes(product.producer_id)
      );
    }

    updateFilteredProducts(filteredProducts);
  }

  function getRates(productId) {
    return axios
      .get(`http://localhost:3000/api/v1/products/rates/${productId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log("Error fetching rates:", error);
        return [];
      });
  }

  function calculateAverageRate(rates) {
    if (rates.length === 0) {
      return 0;
    }

    const sum = rates.reduce((total, rate) => total + rate.rating, 0);
    return sum / rates.length;
  }

  useEffect(() => {
    const productIds = productsList.map((product) => product.id);
    const ratesRequests = productIds.map((productId) => getRates(productId));
    Promise.all(ratesRequests)
      .then((responses) => {
        const ratesByProduct = responses.reduce((acc, response, index) => {
          acc[productIds[index]] = response;
          return acc;
        }, {});
        setProdRates(ratesByProduct);
      })
      .catch((error) => {
        console.log("Error fetching rates:", error);
      });
  }, [productsList]);

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
        <hr />
        <h3>Producers</h3>
        <hr />
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
      <hr />
      <h3>Rating</h3>
      <hr />
      <div className="grid-rating">
        {rating.map((rate) => (
          <div key={rate}>
            <div className="">
              <input
                type="checkbox"
                checked={selectedRates.includes(rate)}
                onChange={() => handleRateCheckboxChange(rate)}
              />
              {rate}
            </div>
          </div>
        ))}
      </div>
      <button onClick={clearFilteredProducts}>Clear Filters</button>
    </div>
  );
}
