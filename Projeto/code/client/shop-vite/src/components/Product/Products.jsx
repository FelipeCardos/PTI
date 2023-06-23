import Pagination from "@mui/material/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductSimilar from "./ProductSimilar/ProductSimilar";
import "./Products.css";

export default function Products() {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const stringSearch = queryParams.get("search");
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    async function loadProductsList() {
      try {
        let response;

        if (categoryId) {
          response = await axios.get(
            "https://yourlocalshop.pt:3000/api/v1/categories/" +
              categoryId +
              "/products"
          );
        } else {
          response = await axios.get(
            "https://yourlocalshop.pt:3000/api/v1/products/search/" +
              stringSearch
          );
        }

        const products = response.data;
        setProductsList(products);
        setFilteredProducts(products);
      } catch (error) {
        console.log(error);
      }
    }

    loadProductsList();
  }, [categoryId, stringSearch]);

  useEffect(() => {
    handlePageChange(1);
  }, [filteredProducts]);

  const filterProducts = (allProducts) => {
    if (categoryId) {
      const filtered = allProducts.filter(
        (product) => product.categoryId === categoryId
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  const handleFilteredProducts = (filteredProducts) => {
    setCurrentPage(1);
    setFilteredProducts(filteredProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className='container-products'>
      <div className='container-filter'>
        <div className='filter-grid'>
          <ProductFilter
            productsList={productsList}
            updateFilteredProducts={handleFilteredProducts}
            clearFilteredProducts={() => setFilteredProducts(productsList)}
          />
        </div>
      </div>
      <div className='products-grid'>
        {displayedProducts.map((product, index) => (
          <div
            className='container-productsimilar'
            key={`${product.id}-${index}`}
          >
            <ProductSimilar product={product} />
          </div>
        ))}
      </div>
      <div className='pagination-container'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color='primary'
          shape='rounded'
          className='pagination'
        />
      </div>
    </div>
  );
}
