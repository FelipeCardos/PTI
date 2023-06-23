import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderExample.css";

export default function OrderExample({
  order,
  handleShowOrder,
  handleToast,
  setCheckApi,
}) {
  const [product, setProduct] = useState({});
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    async function getProduct() {
      const product = await axios.get(
        `https://yourlocalshop.pt:3000/api/v1/products/${order.product_id}`
      );
      return product.data;
    }

    async function getVehicle() {
      const vehicle = await axios.get(
        `https://yourlocalshop.pt:3000/api/v1/vehicles/${order.vehicle_id}`
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

  function isButtonDisabled(status) {
    let statusOfAnOrder = [
      "AWAITING_TRANSPORT",
      "TRANSPORT_IMMINENT",
      "IN_TRANSIT",
      "LAST_KM",
      "COMPLETED",
      "FAILURE",
    ];
    let index = statusOfAnOrder.indexOf(order.status);
    if (order.status === "AWAITING_TRANSPORT") {
      if (status === "AWAITING_TRANSPORT") return false;
      return true;
    }
    return index >= statusOfAnOrder.indexOf(status);
  }

  async function handleChangeStatus(status) {
    await axios.put(
      `https://yourlocalshop.pt:3000/api/v1/carts/${order.cart_id}/cartLines`,

      {
        productId: product.id,
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    handleToast("Order status changed successfully!");
    setCheckApi(true);
  }

  return (
    <div className='orderExample'>
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
        <button
          className='orderExampleStatusButton'
          onClick={() => {
            handleShowOrder(order);
          }}
          disabled={isButtonDisabled("AWAITING_TRANSPORT")}
        >
          ASSIGN VEHICLE
        </button>
        <button
          className='orderExampleStatusButton'
          disabled={isButtonDisabled("IN_TRANSIT")}
          onClick={() => {
            handleChangeStatus("IN_TRANSIT");
          }}
        >
          START DELIVERY
        </button>
        <button
          className='orderExampleStatusButton'
          disabled={isButtonDisabled("LAST_KM")}
          onClick={() => {
            handleChangeStatus("LAST_KM");
          }}
        >
          LAST KM
        </button>
        <button
          className='orderExampleStatusButton'
          disabled={isButtonDisabled("COMPLETED")}
          onClick={() => {
            handleChangeStatus("COMPLETED");
          }}
        >
          DELIVERED
        </button>
        <button className='orderExampleStatusButtonFailed'>FAILED</button>
      </div>
    </div>
  );
}
