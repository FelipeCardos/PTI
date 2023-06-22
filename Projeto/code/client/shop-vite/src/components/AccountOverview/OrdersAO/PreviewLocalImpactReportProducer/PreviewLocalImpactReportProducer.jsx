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
  console.log(cartlines);
  const [pusCoordinatesRadius, setPusCoordinatesRadius] = useState([]);
  useEffect(() => {
    async function getProductionUnitCoordinates(productionUnitId) {
      const response = await axios.get(
        "http://localhost:3000/api/v1/productionUnits/" + productionUnitId
      );
      return {
        lat: response.data.productionUnit.coordinates.lat,
        lon: response.data.productionUnit.coordinates.lon,
      };
    }

    async function getUserCoordinates(cartId) {
      const cart = await axios.get(
        "http://localhost:3000/api/v1/carts/" + cartId
      );
      const userId = cart.data.consumer_id;
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/" + userId + "/address"
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
        "http://localhost:3000/api/v1/distance/?lat1=" +
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
    fetchData();
  }, []);
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
          {/* <table className='containerPreviewLocalImpactReportCartlinesTable'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Producer</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {cartlines.map((cartline, index) => {
                return (
                  <tr
                    key={index}
                    className='containerPreviewLocalImpactReportCartline'
                  >
                    <td className='containerPreviewLocalImpactReportCartlineName'>
                      {cartline.product.name}
                    </td>
                    <td title={cartline.product.description}>
                      {cartline.product.description}
                    </td>
                    <td>
                      {cartline.product.price
                        .toString()
                        .padStart(3, "0")
                        .slice(
                          0,
                          cartline.product.price.toString().padStart(3, "0")
                            .length - 2
                        ) +
                        "," +
                        cartline.product.price
                          .toString()
                          .slice(
                            cartline.product.price.toString().length - 2,
                            cartline.product.price.toString().length
                          ) +
                        "€"}
                    </td>
                    <td>{cartline.product.producer.name}</td>
                    <td className='containerPreviewLocalImpactReportCartlineDistance'>
                      {(distancias[index] / 1000).toFixed(2)} kms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
