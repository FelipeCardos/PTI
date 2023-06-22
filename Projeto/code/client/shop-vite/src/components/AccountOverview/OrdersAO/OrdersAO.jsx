import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./OrdersAO.css";
import OrdersAOListItem from "./OrdersAOListItem/OrdersAOListItem";
import PreviewLocalImpactReport from "./PreviewLocalImpactReport/PreviewLocalImpactReport";

export default function OrdersAO(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [viewDetailsModalItems, setViewDetailsModalItems] = useState({});
  const [previewLocalImpactReport, setPreviewLocalImpactReport] =
    useState(false);
  const [orders, setOrders] = useState([]);
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
    async function getOrders() {
      const orders = await axios.get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/carts"
      );
      return orders;
    }
    async function fetchData() {
      const orders = await getOrders();
      let result = orders.data.filter((order) => order.status !== "OPEN");
      setOrders(result);
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
          />
        ))}
      </div>
      {previewLocalImpactReport && (
        <PreviewLocalImpactReport
          handlePreviewLocalImpactReport={handlePreviewLocalImpactReport}
        />
      )}
    </>
  );
}
