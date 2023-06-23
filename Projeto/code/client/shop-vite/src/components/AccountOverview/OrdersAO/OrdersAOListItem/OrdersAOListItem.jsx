import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "../OrdersAO.css";
import OrdersAOModalItem from "./OrdersAOModalItem/OrdersAOModalItem";

export default function OrdersAOListItem(props) {
  const { myUserVariable } = useContext(UserContext);
  const [cancelableDays, setCancelableDays] = useState(0);
  const [cartLines, setCartLines] = useState(props.order_cart_lines);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getCoordinates() {
      let coordinates = [];
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/address"
      );
      coordinates.push([
        response.data.coordinates.lat,
        response.data.coordinates.lon,
      ]);
      for (let cartline of props.order_cart_lines) {
        const response = await axios.get(
          "https://yourlocalshop.pt:3000/api/v1/productionUnits/" +
            cartline.production_unit_id
        );
        coordinates.push([
          response.data.productionUnit.coordinates.lat,
          response.data.productionUnit.coordinates.lon,
        ]);
      }
      return coordinates;
    }

    async function getDistance(lat1, lon1, lat2, lon2) {
      // in metres
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/distance/?lat1=" +
          lat1 +
          "&lon1=" +
          lon1 +
          "&lat2=" +
          lat2 +
          "&lon2=" +
          lon2
      );
      return response.data;
    }
    async function getProduct() {
      const response = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/products/" +
          props.order_cartline.product_id
      );
      return response.data;
    }

    async function fetchData() {
      if (props.typeUser === "Producer") {
        const responseProduct = await getProduct();
        return setProduct(responseProduct);
      }
      const coordinates = await getCoordinates();
      let minDaysToCancel = 10000;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const distance = await getDistance(
          coordinates[i][0],
          coordinates[i][1],
          coordinates[i + 1][0],
          coordinates[i + 1][1]
        );
        // 300km é o valor base para o cálculo da data de cancelamento da encomenda 7 dias + (nKms / 300km)
        const distanceInKm = distance.distance / 1000;
        const distanceInDays = Math.ceil(distanceInKm / 300 + 7);

        setCartLines((cartLines) => {
          const newCartLines = [...cartLines];
          newCartLines[i].daysToCancel = distanceInDays;
          return newCartLines;
        });

        if (distanceInDays < minDaysToCancel) {
          minDaysToCancel = distanceInDays;
        }
      }
      return minDaysToCancel;
    }

    fetchData().then((minDaysToCancel) => {
      setCancelableDays(minDaysToCancel);
    });
  }, []);

  function formatDate(date) {
    const sqlDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat(undefined, options).format(sqlDate);
  }

  function getDiffDays() {
    const currentDate = new Date();
    const orderDate = new Date(props.order_date);
    const diffTime = Math.abs(currentDate - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  async function cancelOrder() {
    await axios.put(
      "https://yourlocalshop.pt:3000/api/v1/carts/" + props.order_id,
      {
        status: "CANCELLED",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );
    props.handleToast("Order cancelled successfully!");
    props.setCheckApi(true);
  }

  return (
    <>
      {props.typeUser === "Consumer" && (
        <div className='containerOrdersAOListItem'>
          {/* Consumer */}
          <div className='containerOrdersAOListItemOrderID'>
            <strong>OrderID:</strong> {props.order_id}
          </div>
          <div className='containerOrdersAOListItemDate'>
            <strong>Date:</strong> {formatDate(props.order_date)}
          </div>
          <div className='containerOrdersAOListItemPrice'>
            <strong>Price:</strong>{" "}
            {props.order_price
              .toString()
              .padStart(3, "0")
              .slice(
                0,
                props.order_price.toString().padStart(3, "0").length - 2
              ) +
              "," +
              props.order_price
                .toString()
                .slice(
                  props.order_price.toString().length - 2,
                  props.order_price.toString().length
                ) +
              "€"}
          </div>
          <div className='containerOrdersAOListItemStatus'>
            <strong>Status:</strong> {props.order_status}
          </div>
          <button
            className='containerOrdersAOListItemButtonCancel'
            onClick={() => {
              cancelOrder();
            }}
            disabled={
              props.order_status === "CANCELLED" ||
              getDiffDays() > cancelableDays
            }
            title={
              getDiffDays() < cancelableDays
                ? `You still have more ${
                    cancelableDays - getDiffDays()
                  } days to cancel this order.`
                : "You can't cancel this order anymore."
            }
          >
            CANCEL
          </button>
          <div className='containerOrdersAOListItemButton'>
            <button
              className='ordersAOViewDetails'
              onClick={() => props.toggleViewDetailsModal(props.order_id)}
            >
              View Details
            </button>
          </div>
        </div>
      )}
      {/* Producer */}
      {props.typeUser === "Producer" && (
        <div className='containerOrdersAOListItem'>
          <div className='containerOrdersAOListItemOrderID'>
            <strong>OrderID:</strong> {props.order_cartline.cart_id}
          </div>
          <div className='containerOrdersAOListItemDate'>
            <strong>Date:</strong>{" "}
            {props.order_cartline.delivery_date
              ? formatDate(props.order_cartline.delivery_date)
              : "Not delivered"}
          </div>
          <div>
            <strong>Product:</strong> {product.name}
          </div>
          <div className='containerOrdersAOListItemPrice'>
            <strong>Price:</strong>{" "}
            {(product.price * props.order_cartline.amount)
              .toString()
              .padStart(3, "0")
              .slice(
                0,
                (product.price * props.order_cartline.amount)
                  .toString()
                  .padStart(3, "0").length - 2
              ) +
              "," +
              (product.price * props.order_cartline.amount)
                .toString()
                .slice(
                  (product.price * props.order_cartline.amount).toString()
                    .length - 2,
                  (product.price * props.order_cartline.amount).toString()
                    .length
                ) +
              "€"}
          </div>
          <div className='containerOrdersAOListItemStatus'>
            <strong>Status:</strong> {props.order_status}
          </div>
        </div>
      )}
      {props.isViewDetailsModalItemVisible && (
        <OrdersAOModalItem
          key={props.order_id}
          order_id={props.order_id}
          toggleViewDetailsModal={props.toggleViewDetailsModal}
          order_status={props.order_status}
          order_cart_lines={cartLines}
          order_date={props.order_date}
          handleToast={props.handleToast}
          setCheckApi={props.setCheckApi}
        />
      )}
    </>
  );
}
