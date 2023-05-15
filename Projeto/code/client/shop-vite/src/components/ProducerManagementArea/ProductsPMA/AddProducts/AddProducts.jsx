import axios from "axios";
import React, { useEffect, useState } from "react";
import categoryData from "../../../../assets/categories.json";
import "./AddProducts.css";

export default function AddProducts(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productImage: [],
    category: [],
    attributes: [],
    productionDate: "",
    price: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [attributes, setAttributes] = useState([]);

  console.log(selectedCategory);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(0);
    setAttributes([]);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        category: [event.target.value],
      };
    });
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    setAttributes(
      categoryData.categories
        .find((category) => category.id === parseInt(selectedCategory))
        .subcategories.find(
          (subcategory) => subcategory.id === parseInt(event.target.value)
        ).attributes
    );
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        category: [selectedCategory, event.target.value],
      };
    });
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
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {!!selectedCategory && (
              <div>
                <label htmlFor='subcategory'>Subcategory:</label>
                <select
                  id='subcategory'
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value=''>-- Please select a subcategory --</option>
                  {categoryData.categories
                    .find(
                      (category) => category.id === parseInt(selectedCategory)
                    )
                    .subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
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
        <div>
          <label htmlFor='productionDate'>Production Date:</label>
          <input type='date' name='productionDate' />
        </div>
        <div>
          <input
            type='file'
            onChange={handleChange}
            name='productImage'
            multiple={true}
          />
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input type='text' name='price' />
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
