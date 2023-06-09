import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import categoryData from "../../../../assets/categories.json";
import * as filestack from "filestack-js";
import { UserContext } from "../../../../assets/UserContext";
import "./AddProducts.css";

export default function AddProducts(props) {
  const { myUserVariable } = useContext(UserContext);
  const [formData, setFormData] = useState({
    producerId: myUserVariable.user_id,
    name: "",
    description: "",
    productImage: "",
    category: [],
    attributes: [],
    productionDate: "",
    price: "",
  });
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [attributes, setAttributes] = useState([]);

  const client = filestack.init("AtdGTk00Sqm7RnGtjj4dEz");
  const options = {
    accept: ["image/*"],
    maxFiles: 1,
    uploadInBackground: false,
    onOpen: () => console.log("opened!"),
    onUploadDone: (res) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        productImage: res.filesUploaded[0].url,
      }));
    },
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/categories"
      );
      return response.data;
    }

    async function fetchCategoryAttributes(category_id) {
      const response = await axios.get(
        `http://localhost:3000/api/v1/categories/${category_id}/categoryAttributes`
      );
      return response.data;
    }

    fetchCategories().then((categories) => {
      const categoriesWithAttributes = categories.map((category) => {
        return fetchCategoryAttributes(category.id).then((attributes) => {
          return {
            ...category,
            attributes: attributes,
          };
        });
      });
      Promise.all(categoriesWithAttributes).then((categoriesWithAttributes) => {
        setCategoryData(categoriesWithAttributes);
      });
    });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(0);
    if (event.target.value === "") {
      setAttributes([]);
    } else {
      setAttributes(
        categoryData.find(
          (category) => category.id === parseInt(event.target.value)
        ).attributes
      );
    }
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        category: [event.target.value],
      };
    });
  };

  const handleSubcategoryChange = (event) => {
    if (event.target.value === "") {
      setSelectedSubcategory(event.target.value);
      setAttributes(
        categoryData.find(
          (category) => category.id === parseInt(selectedCategory)
        ).attributes
      );
      setFormData((prevFormData) => {
        const newAttributes = Object.keys(prevFormData.attributes).filter(
          (attribute) => {
            categoryData
              .find((category) => category.id === parseInt(selectedCategory))
              .attributes.includes(attribute);
          }
        );
        return {
          ...prevFormData,
          attributes: newAttributes.reduce((acc, attribute) => {
            return {
              ...acc,
              [attribute]: prevFormData.attributes[attribute],
            };
          }, {}),
        };
      });
    } else {
      setSelectedSubcategory(event.target.value);
      setAttributes(
        categoryData
          .find((category) => category.id === parseInt(selectedCategory))
          .attributes.concat(
            categoryData.find(
              (category) => category.id === parseInt(event.target.value)
            ).attributes
          )
      );
      setFormData((prevFormData) => {
        const newAttributes = Object.keys(prevFormData.attributes).filter(
          (attribute) => {
            const categoriesAttributes = categoryData
              .find((category) => category.id === parseInt(selectedCategory))
              .attributes.concat(
                categoryData.find(
                  (category) => category.id === parseInt(event.target.value)
                ).attributes
              );
            return categoriesAttributes.includes(attribute);
          }
        );
        return {
          ...prevFormData,
          attributes: newAttributes.reduce((acc, attribute) => {
            return {
              ...acc,
              [attribute]: prevFormData.attributes[attribute],
            };
          }, {}),
        };
      });
    }
  };

  function handleShowFileStack() {
    client.picker(options).open();
  }

  function handleAttributeChange(event) {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        attributes: { ...prevFormData.attributes, [id]: value },
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name === "productImage") {
        return {
          ...prevFormData,
          [name]: event.target.files[0],
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handlePriceChange(event) {
    const enteredValue = event.target.value;

    // Remove any non-digit characters
    const cleanValue = enteredValue.replace(/[^0-9.]/g, "");

    // Get the integer and decimal parts
    const parts = cleanValue.split(".");
    const integerPart = parts[0];
    let decimalPart = parts[1] || "";

    // Limit the decimal part to two decimal places
    decimalPart = decimalPart.slice(0, 2);

    // Update the value in the state
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: integerPart + (decimalPart.length > 0 ? "." + decimalPart : ""),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleToast("Product added successfully!");
    props.handleShowAddProducts();
    props.setCheckApi(true);
    const attributesStringfied = JSON.stringify(formData.attributes);
    let formDataToSend = { ...formData };
    formDataToSend.attributes = attributesStringfied;
    axios
      .post("http://localhost:3000/api/v1/products/", formDataToSend, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data, 2));
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
            required={true}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Description'
            onChange={handleChange}
            name='description'
            value={formData.description}
            required={true}
          />
        </div>
        <div>
          <div className='addProductsCategoires'>
            <div>
              <label htmlFor='category'>Category:</label>
              <select
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                required={true}
              >
                <option value=''>-- Please select a category --</option>
                {categoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {!!selectedCategory && (
              <div>
                <label htmlFor='subcategory'>Subcategory:</label>
                <select
                  id='subcategory'
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value=''>-- Please select a subcategory --</option>
                  {categoryData
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
          <div>Attributes:</div>
          <div className='addProductsAttributes'>
            {attributes.map((attribute) => (
              <div key={attribute.id}>
                <label htmlFor={attribute.title}>{attribute.title}:</label>
                <input
                  type='text'
                  id={attribute.id}
                  onChange={handleAttributeChange}
                  value={formData.attributes[attribute.id] || ""}
                  required={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor='productionDate'>Production Date:</label>
          <input
            type='date'
            name='productionDate'
            onChange={handleChange}
            value={formData.productionDate}
          />
        </div>
        <div>
          {/* <input
            type='file'
            onChange={handleChange}
            name='productImage'
            accept='image/*'
          /> */}
          <button type='button' onClick={handleShowFileStack}>
            {" "}
            Upload Image{" "}
          </button>
          <a href={formData.productImage} target='_blank'>
            {" "}
            {formData.productImage}{" "}
          </a>
        </div>
        <div>
          <label htmlFor='price'>Price (€):</label>
          <input
            type='number'
            name='price'
            placeholder='XX.XX€'
            min={0}
            step={0.01}
            onChange={handlePriceChange}
            value={formData.price}
            required={true}
          />
        </div>
        <div className='buttonsAddProduct'>
          <button
            className='submitAddProduct'
            disabled={Object.values(formData).some((value) => value === "")}
            type='submit'
            onClick={handleSubmit}
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
