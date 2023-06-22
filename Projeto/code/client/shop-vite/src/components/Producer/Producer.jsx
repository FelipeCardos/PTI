import {React, useState, useEffect} from "react";
import "./Producer.css";
import ProducerInfo from "./ProducerInfo";
import Product from "./Product";
import ProductionUnit from "./ProductionUnit";
import axios from "axios";

export default function Producer(props) {

  const [producerName, setProducerName] = useState("");
  const [producerAddress, setProducerAddress] = useState("");
  const [productionUnits, setProductionUnits] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    async function getProducer(id){
      try{
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}`
        );
        const address = await axios.get(
          `http://localhost:3000/api/v1/users/${id}/address/`
        );
        setProducerAddress(address.data.coordinates.formatted)
        setProducerName(response.data.name);
      }
      catch(error){
        console.error(error);
      }
    }
    async function getProductionUnits(id){
      try{
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}/productionUnits/`, {withCredentials:true}
        );

        setProductionUnits(response.data.productionUnits)

      }catch(error){
        console.error(error);
      }
    }
    async function getProducts(id){
      try{
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}/products/`, {withCredentials:true}
        );
        setProducts(response.data);

      }catch(error){
        console.log(error)
      }
    }

    getProducer(props.id);
    getProductionUnits(props.id);
    getProducts(props.id)
  },[])
  
  async function getImage(id){
    const response = await axios.get(
      `http://localhost:3000/api/v1/products/${id}/productImages/`
    );
      
    return response.data.uri
  };

  return (
    <div className='producer'>
      <ProducerInfo
        producerName={producerName}
        producerLocation={producerAddress}
      ></ProducerInfo>
      <div className='productionUnitList'>
        {productionUnits.map((productionUnit) => (
          <ProductionUnit
            productionUnitLocation={productionUnit.address.state + ", " + productionUnit.address.country + ", " + productionUnit.address.postal_code}
          />
        ))}
      </div>
      <div className='productList'>
        {products.map((product) => (
          <Product
            productName={product.name}
            productPrice={product.price}
            productStock={product.stock}
            productImage={getImage(product.id)}
            productRating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}
