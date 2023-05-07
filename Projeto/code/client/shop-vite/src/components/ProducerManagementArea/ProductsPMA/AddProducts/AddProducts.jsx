import axios from "axios";
import React, { useState } from "react";
import "./AddProducts.css";

export default function AddProducts(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productImage: null,
    category: "",
    attributes: [],
    productionDate: "",
    price: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name === "productImage") {
        return {
          ...prevFormData,
          [name]: event.target.files[0],
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
          <input
            type='file'
            onChange={handleChange}
            name='productImage'
            value={formData.productImage}
          />
        </div>
        <div>
          <input />
          {/* Fazer um dropdown (das categorias existentes) onde o fornecedor escolhe a categoria que mais se adequa ao produto que ele quer inserir */}
        </div>
        <div>
          <input />
          {/* Gerar os atributos que o fornecedor pode escolher para o seu produto após a escolha da categoria */}
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
