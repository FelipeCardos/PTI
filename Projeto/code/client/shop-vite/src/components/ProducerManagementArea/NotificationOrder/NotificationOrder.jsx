import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./NotificationOrder.css";

export default function NotificationOrder({
  order,
  handleShowOrder,
  handleToast,
}) {
  const [product, setProduct] = useState({});
  const [cartline, setCartline] = useState({});
  const [productionUnit, setProductionUnit] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  useEffect(() => {
    async function getProductData(id) {
      let product = await axios.get(
        `http://localhost:3000/api/v1/products/${id}`
      );
      let image = await axios.get(
        `http://localhost:3000/api/v1/products/${id}/productImages`
      );
      product.data.image = image.data[0].uri;
      return product.data;
    }

    async function getCartlineData(cart_id, product_id) {
      const response = await axios.get(
        `http://localhost:3000/api/v1/carts/${cart_id}/cartlines`
      );
      const cartline = response.data.filter(
        (cartline) => cartline.product_id === product_id
      )[0];
      return cartline;
    }

    async function getProductionUnitData(id) {
      let response = await axios.get(
        `http://localhost:3000/api/v1/productionUnits/${id}`
      );
      const productionUnitAddress = await axios.get(
        `http://localhost:3000/api/v1/users/${response.data.productionUnit.producer_id}/productionUnits/${id}/address`
      );
      response.data.productionUnit.address = productionUnitAddress.data.address;
      return response.data.productionUnit;
    }

    async function getVehiclesFromProductionUnit(
      producer_id,
      production_unit_id
    ) {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${producer_id}/productionUnits/${production_unit_id}/vehicles`
      );
      return response.data;
    }

    async function fetchData() {
      const product = await getProductData(order.product_id);
      const cartline = await getCartlineData(order.cart_id, order.product_id);
      const productionUnit = await getProductionUnitData(
        order.production_unit_id
      );
      const vehicles = await getVehiclesFromProductionUnit(
        productionUnit.producer_id,
        order.production_unit_id
      );
      let availableVehicles = [];
      for (const vehicle of vehicles.vehicles) {
        if (
          await axios.get(
            `http://localhost:3000/api/v1/vehicles/${vehicle.id}/availability`
          )
        ) {
          availableVehicles.push(vehicle);
        }
      }
      setProduct(product);
      setCartline(cartline);
      setProductionUnit(productionUnit);
      setVehicles(availableVehicles);
    }

    fetchData();
  }, []);

  function handleVehicleSelection(event) {
    setSelectedVehicle(event.target.value);
  }

  async function handleConfirmationOfVehicleAssignment() {
    const updateVehicle = await axios.put(
      `http://localhost:3000/api/v1/carts/${order.cart_id}/cartLines`,

      {
        productId: product.id,
        vehicleId: selectedVehicle,
        status: "TRANSPORT_IMMINENT",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    handleToast("Vehicle assigned successfully");
    handleShowOrder();
    console.log(updateVehicle.data);
  }

  return (
    <div className='notificationOrder'>
      <div className='notificationOrderTitle'>Order ID: {order.cart_id}</div>
      <div className='notificationOrderProduct'>
        Desired Product: {order.product_id}
        <div className='notificationOrderQuantity'>
          Quantity: {cartline.amount}
        </div>
        <img src={product.image} alt='' />
      </div>
      <div className='notificationOrderVehicleSelection'>
        <div className='notificationOrderProductionUnitSelected'>
          Production Unit: {productionUnit?.address?.country},{" "}
          {productionUnit?.address?.state}, {productionUnit?.address?.street},{" "}
          {productionUnit?.address?.postal_code}
        </div>
        <div className='notificationOrderVehicleSelectionTitle'>
          Vehicle selection
        </div>
        <select name='vehicle' id='' onChange={handleVehicleSelection}>
          <option value=''>Select Vehicle</option>
          {vehicles.map((vehicle) => {
            return (
              <option value={vehicle.id}>
                License-plate: {vehicle.license_plate}
              </option>
            );
          })}
        </select>
      </div>
      <div className='notificationOrderProductInfo'>{product.description}</div>
      <div
        className='notificationOrderButton'
        onClick={handleConfirmationOfVehicleAssignment}
      >
        Confirm
      </div>
      <div className='notificationOrderXButton' onClick={handleShowOrder}>
        <i className='fa fa-times'></i>
      </div>
    </div>
  );
}
