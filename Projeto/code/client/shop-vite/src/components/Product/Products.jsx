import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductSimilar from "./ProductSimilar/ProductSimilar";
import './Products.css';
import axios from "axios";

export default function Products() {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');
  const stringSearch = queryParams.get('search');
  const [productsList, setProductsList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(productsList.length / itemsPerPage);

  useEffect(() => {
    loadProductsList();
  }, []);

  function loadProductsList() {
    if (categoryId) {
      axios.get("http://localhost:3000/api/v1/categories/" + categoryId + "/products")
        .then((response) => {
          setProductsList(response.data);
        });
    } else {
      // Array temporário para armazenar os produtos sem duplicatas
      const tempProductsList = [];

      axios.get("http://localhost:3000/api/v1/products/search/" + stringSearch)
        .then((response) => {
          tempProductsList.push(...response.data);

          axios.get("http://localhost:3000/api/v1/categories/search/" + stringSearch)
            .then((response) => {
              const categoryIds = response.data.map((catId) => catId.id);

              // Função auxiliar para carregar os produtos das categorias
              function loadCategoryProducts(index) {
                if (index >= categoryIds.length) {
                  // Todas as categorias foram carregadas, definir a lista de produtos sem duplicatas
                  setProductsList([...new Set(tempProductsList)]);
                  return;
                }

                axios.get("http://localhost:3000/api/v1/categories/" + categoryIds[index] + "/products")
                  .then((response) => {
                    tempProductsList.push(...response.data);
                    loadCategoryProducts(index + 1);
                  });
              }

              loadCategoryProducts(0);
            });
        });
    }
  }

  return (
    <div className="container-products">
      <div className="container-filter">
        <div className="filter-grid">
          {/* Conteúdo do filtro */}
        </div>
      </div>
      <div className="products-grid">
        {productsList
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <div key={product}>
              <ProductSimilar product={product} />
            </div>
          ))}
      </div>
      <div className="pagination-container">
        <button className="pagination-control" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
        <button className="pagination-control" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
