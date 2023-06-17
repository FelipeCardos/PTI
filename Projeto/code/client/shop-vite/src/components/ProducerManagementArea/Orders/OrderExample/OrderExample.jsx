import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderExample.css";

export default function OrderExample({ order }) {
  const [product, setProduct] = useState({});
  const [vehicle, setVehicle] = useState({});
  console.log(order);

  useEffect(() => {
    async function getProduct() {
      const product = await axios.get(
        `http://localhost:3000/api/v1/products/${order.product_id}`
      );
      return product.data;
    }

    async function getVehicle() {
      const vehicle = await axios.get(
        `http://localhost:3000/api/v1/vehicles/${order.vehicle_id}`
      );
      return vehicle.data;
    }

    async function fetchData() {
      const product = await getProduct();
      setProduct(product);
      if (order.vehicle_id) {
        const vehicle = await getVehicle();
        setVehicle(vehicle);
      }
    }

    fetchData();
  }, []);
  function handleNotificationClick() {}

  return (
    <div className='orderExample' onClick={handleNotificationClick}>
      <div className='orderExampleCartId'>Order ID: {order.cart_id}</div>
      <hr />
      <div className='orderExampleProduct'>Product: {product.name}</div>
      <div className='orderExampleAmount'>Amount: {order.amount}</div>
      <div className='orderExampleProductionUnit'>
        Production Unit: {order.production_unit_id}
      </div>
      <div className='orderExampleVehicleAssigned'>
        Vehicle: {order.vehicle_id ? vehicle.license_plate : "Not assigned"}
      </div>
      <div className='orderExampleStatus'>Status: {order.status}</div>
      <div className='orderExampleStatusButtons'>
        <button className='orderExampleStatusButton'>ASSIGN VEHICLE</button>
        <button className='orderExampleStatusButton'>START DELIVERY</button>
        <button className='orderExampleStatusButton'>IN THE MIDDLE</button>
        <button className='orderExampleStatusButton'>LAST KM</button>
        <button className='orderExampleStatusButton'>DELIVERED</button>
        <button className='orderExampleStatusButtonFailed'>FAILED</button>
      </div>
    </div>
  );
}
