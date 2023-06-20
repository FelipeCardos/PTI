import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductSimilar from "./ProductSimilar/ProductSimilar";
import "./Products.css";
import axios from "axios";
import ProductFilter from "./ProductFilter/ProductFilter";
import Pagination from '@mui/material/Pagination';

export default function Products() {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const stringSearch = queryParams.get("search");
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadProductsList();
  }, []);

  useEffect(() => {
    handlePageChange(1);
  }, [filteredProducts]);

  function loadProductsList() {
    if (categoryId) {
      axios.get("http://localhost:3000/api/v1/categories/" + categoryId + "/products").then((response) => {
        setProductsList(response.data);
        setFilteredProducts(response.data); // Inicialmente, a lista filtrada é igual à lista completa
      });
    } else {
      // Array temporário para armazenar os produtos sem duplicatas
      const tempProductsList = new Set(); // Usando um Set para evitar duplicatas

      axios.get("http://localhost:3000/api/v1/products/search/" + stringSearch).then((response) => {
        response.data.forEach((product) => {
          tempProductsList.add(product);
        });

        axios.get("http://localhost:3000/api/v1/categories/search/" + stringSearch).then((response) => {
          const categoryIds = response.data.map((catId) => catId.id);

          // Função auxiliar para carregar os produtos das categorias
          function loadCategoryProducts(index) {
            if (index >= categoryIds.length) {
              // Todas as categorias foram carregadas, definir a lista de produtos sem duplicatas
              setProductsList(Array.from(tempProductsList));
              setFilteredProducts(Array.from(tempProductsList)); // Inicialmente, a lista filtrada é igual à lista completa
              return;
            }

            axios.get("http://localhost:3000/api/v1/categories/" + categoryIds[index] + "/products").then((response) => {
              response.data.forEach((product) => {
                tempProductsList.add(product);
              });
              loadCategoryProducts(index + 1);
            });
          }

          loadCategoryProducts(0);
        });
      });
    }
  }

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
    <div className="container-products">
      <div className="container-filter">
        <div className="filter-grid">
          <ProductFilter
            productsList={productsList}
            updateFilteredProducts={handleFilteredProducts}
            clearFilteredProducts={() => setFilteredProducts([])} // Limpar a lista ao receber atualização do componente filho
          />
        </div>
      </div>
      <div className="products-grid">
        {displayedProducts.map((product, index) => (
          <div className="container-productsimilar" key={`${product.id}-${index}`}>
            <ProductSimilar product={product} />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
          shape="rounded"
          size="large"
          className="pagination"
        />
      </div>
    </div>
  );
}
