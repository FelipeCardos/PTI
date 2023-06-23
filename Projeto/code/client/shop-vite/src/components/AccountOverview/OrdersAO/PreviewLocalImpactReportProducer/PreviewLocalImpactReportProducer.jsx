import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import LoadingSpinner from "../../../Loadings/LoadingSpinner";
import MapLocalImpact from "./MapLocalImpact/MapLocalImpact.jsx";
import "./PreviewLocalImpactReportProducer.css";

export default function PreviewLocalImpactReport({
  handlePreviewLocalImpactReport,
  cartlines,
}) {
  const [pusCoordinatesRadius, setPusCoordinatesRadius] = useState([]);
  const [tableData, setTableData] = useState([...cartlines]);
  useEffect(() => {
    async function getProductionUnitCoordinates(productionUnitId) {
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/productionUnits/" +
          productionUnitId
      );
      return {
        lat: response.data.productionUnit.coordinates.lat,
        lon: response.data.productionUnit.coordinates.lon,
      };
    }

    async function getUserCoordinates(cartId) {
      const cart = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/carts/" + cartId
      );
      const userId = cart.data.consumer_id;
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" + userId + "/address"
      );
      return {
        lat: response.data.coordinates.lat,
        lon: response.data.coordinates.lon,
      };
    }

    async function getDistanceBetweenUserAndProductionUnit(
      userCoordinates,
      productionUnitCoordinates
    ) {
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/distance/?lat1=" +
          userCoordinates.lat +
          "&lon1=" +
          userCoordinates.lon +
          "&lat2=" +
          productionUnitCoordinates.lat +
          "&lon2=" +
          productionUnitCoordinates.lon
      );
      return response.data.distance;
    }

    async function fetchData() {
      for (const cartline of cartlines) {
        const productionUnitId = cartline.production_unit_id;
        const productionUnitCoordinates = await getProductionUnitCoordinates(
          productionUnitId
        );
        const userCoordinates = await getUserCoordinates(cartline.cart_id);
        const distance = await getDistanceBetweenUserAndProductionUnit(
          userCoordinates,
          productionUnitCoordinates
        );
        setPusCoordinatesRadius((pusCoordinatesRadius) => {
          return {
            ...pusCoordinatesRadius,
            [productionUnitId]: {
              coordinates: productionUnitCoordinates,
              radius: distance,
            },
          };
        });
      }
    }

    async function getTableData() {
      const tableData = [];
      for (const cartline of cartlines) {
        const cart = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/carts/" + cartline.cart_id
        );
        const productionUnit = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/productionUnits/" +
            cartline.production_unit_id
        );
        const product = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/products/" + cartline.product_id
        );
        const vehicle = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/vehicles/" + cartline.vehicle_id
        );
        const user = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/users/" + cart.data.consumer_id
        );
        const distance = await getDistanceBetweenUserAndProductionUnit(
          await getUserCoordinates(cartline.cart_id),
          await getProductionUnitCoordinates(cartline.production_unit_id)
        );
        tableData.push({
          cart: cartline.cart_id || "No cart",
          product: product.data.name || "No name",
          amount: cartline.amount || "No amount",
          productionUnit:
            productionUnit.data.productionUnit.coordinates.formatted ||
            "No production unit",
          vehicle: vehicle.data.license_plate || "No license plate",
          consumer: user.data.name || "No name",
          distance: distance || "No distance",
        });
      }
      setTableData(tableData);
    }
    fetchData();
    getTableData();
  }, []);

  console.log(tableData);
  return (
    <div className='containerPreviewLocalImpactReport'>
      <div className='containerPreviewLocalImpactReportTitle'>
        Preview Local Impact Report
      </div>
      <div className='containerPreviewLocalImpactReportCloseButton'>
        <button onClick={handlePreviewLocalImpactReport}>
          <i className='fa fa-times'></i>
        </button>
      </div>
      <div className='containerPreviewLocalImpactReportPrintButton'>
        <button onClick={() => window.print()}>
          <i className='fa fa-print'></i>
        </button>
      </div>
      <hr className='containerPreviewLocalImpactReportHr' />
      <div className='containerPreviewLocalImpactReportContent'>
        <div className='containerPreviewLocalImpactReportMap'>
          {Object.keys(pusCoordinatesRadius).length !== 0 ? (
            <MapLocalImpact pusCoordinatesRadius={pusCoordinatesRadius} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className='containerPreviewLocalImpactReportCartlines'>
          <table className='containerPreviewLocalImpactReportCartlinesTable'>
            <thead>
              <tr>
                <th>Cart</th>
                <th>Consumer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Production Unit</th>
                <th>Vehicle</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tableData, index) => {
                return (
                  <tr
                    key={index}
                    className='containerPreviewLocalImpactReportCartline'
                  >
                    <td>{tableData.cart}</td>
                    <td className='containerPreviewLocalImpactReportCartlineName'>
                      {tableData.consumer}
                    </td>
                    <td>{tableData.product}</td>
                    <td>{tableData.amount}</td>
                    <td>{tableData.productionUnit}</td>
                    <td>{tableData.vehicle}</td>
                    <td className='containerPreviewLocalImpactReportCartlineDistance'>
                      {(tableData.distance / 1000).toFixed(2)} kms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
