import axios from "axios";
import React, { useEffect, useState } from "react";
import categoryData from "../../../../assets/categories.json";
import "./AddProducts.css";

export default function AddProducts(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productImage: [],
    category: "",
    attributes: [],
    productionDate: "",
    price: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [attributes, setAttributes] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory("");
    setAttributes([]);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    setAttributes(
      categoryData.categories
        .find((category) => category.name === selectedCategory)
        .subcategories.find(
          (subcategory) => subcategory.name === event.target.value
        ).attributes
    );
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name === "productImage") {
        return {
          ...prevFormData,
          [name]: event.target.files,
        };
      }
      if (name === "attributes") {
        return {
          ...prevFormData,
          [name]: value.split(","),
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("product: " + JSON.stringify(formData));
    axios
      .post("http://localhost:5000/product/", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='containerAddProduct'>
      <div className='containerAddProductTitle'>New Product</div>
      <hr className='containerAddProductTitleHR' />
      <form onSubmit={handleSubmit} className='containerAddProductForm'>
        <div>
          <input
            type='text'
            placeholder='Name'
            onChange={handleChange}
            name='name'
            value={formData.name}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Description'
            onChange={handleChange}
            name='description'
            value={formData.description}
          />
        </div>
        <div>
          <div>
            <label htmlFor='category'>Category:</label>
            <select
              id='category'
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>-- Please select a category --</option>
              {categoryData.categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <div>
                <label htmlFor='subcategory'>Subcategory:</label>
                <select
                  id='subcategory'
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value=''>-- Please select a subcategory --</option>
                  {categoryData.categories
                    .find((category) => category.name === selectedCategory)
                    .subcategories.map((subcategory) => (
                      <option key={subcategory.name} value={subcategory.name}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3>Attributes:</h3>
          <ul>
            {attributes.map((attribute) => (
              <li key={attribute.name}>
                <label htmlFor={attribute.name}>{attribute.name}:</label>
                {attribute.type === "text" && (
                  <input type='text' id={attribute.name} />
                )}
                {attribute.type === "number" && (
                  <input type='number' id={attribute.name} />
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Gerar os atributos que o fornecedor pode escolher para o seu produto após a escolha da categoria */}
        <div>
          <input
            type='file'
            onChange={handleChange}
            name='productImage'
            multiple={true}
          />
        </div>
        <div className='buttonsAddProduct'>
          <button
            className='submitAddProduct'
            disabled={Object.values(formData).some((value) => value === "")}
            type='submit'
          >
            ADD
          </button>
          <button
            className='cancelAddProduct'
            onClick={props.handleShowAddProducts}
            type='button'
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
