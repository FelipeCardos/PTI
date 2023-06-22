import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./OrdersAO.css";
import OrdersAOListItem from "./OrdersAOListItem/OrdersAOListItem";
import PreviewLocalImpactReport from "./PreviewLocalImpactReport/PreviewLocalImpactReport";
import PreviewLocalImpactReportProducer from "./PreviewLocalImpactReportProducer/PreviewLocalImpactReportProducer.jsx";

export default function OrdersAO(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [viewDetailsModalItems, setViewDetailsModalItems] = useState({});
  const [previewLocalImpactReport, setPreviewLocalImpactReport] =
    useState(false);
  const [orders, setOrders] = useState([]);
  const [typeUser, setTypeUser] = useState("");
  const [checkApi, setCheckApi] = useState(true);

  function toggleViewDetailsModal(id) {
    props.toggleModal();
    setViewDetailsModal(!viewDetailsModal);
    setViewDetailsModalItems({
      ...viewDetailsModalItems,
      [id]: !viewDetailsModalItems[id],
    });
  }

  function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function handlePreviewLocalImpactReport() {
    setPreviewLocalImpactReport(!previewLocalImpactReport);
    props.toggleModal();
  }

  useEffect(() => {
    async function getUsersType() {
      const user = await axios.get(
        "http://localhost:3000/api/v1/users/" + myUserVariable.user_id
      );
      return user.data.typeUser;
    }

    async function getCartlinesOfProducer() {
      const allCartlines = await axios.get(
        "http://localhost:3000/api/v1/cartLines/"
      );
      const producerProducts = await axios.get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/products"
      );
      let producerProductsIds = [];
      for (let producerProduct of producerProducts.data) {
        producerProductsIds.push(producerProduct.id);
      }
      let cartlines = [];
      for (let cartline of allCartlines.data) {
        if (producerProductsIds.includes(cartline.product_id)) {
          cartlines.push(cartline);
        }
      }
      return cartlines;
    }

    async function getOrders() {
      const orders = await axios.get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/carts"
      );
      return orders;
    }
    async function fetchData() {
      const userType = await getUsersType();
      setTypeUser(userType);
      if (userType === "Consumer") {
        const orders = await getOrders();
        let result = orders.data.filter((order) => order.status !== "OPEN");
        return setOrders(result);
      }
      if (userType === "Producer") {
        const cartlines = await getCartlinesOfProducer();
        const allowedStatus = ["COMPLETE", "CANCELED", "FAILURE"];
        let result = cartlines.filter((cartline) =>
          allowedStatus.includes(cartline.status)
        );
        return setOrders(result);
      }
    }
    if (checkApi) {
      fetchData();
      setCheckApi(false);
    }
  }, [checkApi]);

  return (
    <>
      <div className='containerOrdersAOHeader'>
        <div className='containerOrdersAOHeaderTitle'>Orders</div>
        <div className='containerOrdersAOHeaderButtons'>
          <button
            className='containerOrdersAOHeaderLocalImpactReport'
            onClick={handlePreviewLocalImpactReport}
          >
            View Local Impact Report
          </button>
          <button
            className='containerOrdersAOHeaderExportJSON'
            onClick={() => {
              props.handleToast("Exporting JSON...");
              downloadObjectAsJson(
                orders,
                "orders_" + Date.now() + "_" + myUserVariable.id
              );
            }}
          >
            Export to JSON
          </button>
        </div>
      </div>
      <hr className='containerOrdersAOHr' />
      <div className='containerOrdersAOList'>
        {orders.map((order) => (
          <OrdersAOListItem
            key={order.id}
            viewDetailsModal={viewDetailsModal}
            toggleViewDetailsModal={toggleViewDetailsModal}
            order_id={order.id}
            order_date={order.order_date}
            order_price={order.price}
            order_status={order.status}
            isViewDetailsModalItemVisible={viewDetailsModalItems[order.id]}
            order_cart_lines={order.cart_lines}
            handleToast={props.handleToast}
            setCheckApi={setCheckApi}
            typeUser={typeUser}
            order_cartline={order}
          />
        ))}
      </div>
      {previewLocalImpactReport && typeUser === "Consumer" && (
        <PreviewLocalImpactReport
          handlePreviewLocalImpactReport={handlePreviewLocalImpactReport}
        />
      )}
      {previewLocalImpactReport && typeUser === "Producer" && (
        <PreviewLocalImpactReportProducer
          handlePreviewLocalImpactReport={handlePreviewLocalImpactReport}
          cartlines={orders}
        />
      )}
    </>
  );
}
