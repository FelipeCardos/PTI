import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import "../OrdersAO.css";
import OrdersAOModalItem from "./OrdersAOModalItem/OrdersAOModalItem";

export default function OrdersAOListItem(props) {
  const [cancelableDate, setCancelableDate] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const orderDate = new Date(props.order_date);
    const diffTime = Math.abs(currentDate - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setCancelableDate(diffDays);
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

  async function cancelOrder() {
    await axios.put(
      "http://localhost:3000/api/v1/carts/" + props.order_id,
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

  console.log(props);

  return (
    <>
      <div className='containerOrdersAOListItem'>
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
          disabled={props.order_status === "CANCELLED" || cancelableDate > 15}
          title={
            cancelableDate < 15
              ? `You still have more ${
                  15 - cancelableDate
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
      {props.isViewDetailsModalItemVisible && (
        <OrdersAOModalItem
          key={props.order_id}
          order_id={props.order_id}
          toggleViewDetailsModal={props.toggleViewDetailsModal}
          order_status={props.order_status}
          order_cart_lines={props.order_cart_lines}
          handleToast={props.handleToast}
          setCheckApi={props.setCheckApi}
        />
      )}
    </>
  );
}
