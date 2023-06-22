import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
  const adminOptions = ["PRODUCER", "CONSUMER", "ORDER", "PRODUCT"];
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getData("PRODUCER");
  }, []);

  function getData(option) {
    setCurrentPage(1); // Redefine a página atual para 1
    setChosenOption(option);
    switch (option) {
      case "PRODUCER":
        setTableHeaders([
          "Id",
          "Name",
          "Email",
          "Fiscal Identifier",
          "Phone",
          "Status",
        ]);
        handleUser("PRODUCER");
        break;
      case "CONSUMER":
        setTableHeaders([
          "Id",
          "Name",
          "Email",
          "Fiscal Identifier",
          "Phone",
          "Status",
        ]);
        handleUser("CONSUMER");
        break;
      case "ORDER":
        setTableHeaders([
          "Order ID",
          "Consumer ID",
          "Order Date",
          "Delivery Date",
          "Status",
        ]);
        handleOrder();
        break;
      case "PRODUCT":
        setTableHeaders([
          "Id",
          "Name",
          "Description",
          "Price",
          "Production Date",
        ]);
        handleProduct();
        break;
      default:
        break;
    }
  }

  function handleUser(userType) {
    axios.get("http://yourlocalshop.pt:3000/api/v1/users/").then((response) => {
      const users = response.data.users.filter(
        (user) => user.typeUser.toUpperCase() === userType
      );
      setTableData(users);
    });
  }

  function handleOrder() {
    axios.get("http://yourlocalshop.pt:3000/api/v1/carts/").then((response) => {
      setTableData(response.data);
    });
  }

  function handleProduct() {
    axios
      .get("http://yourlocalshop.pt:3000/api/v1/products/")
      .then((response) => {
        const products = response.data;
        console.log(response.data);
        setTableData(products);
      });
  }

  const pageCount = Math.ceil(tableData.length / itemsPerPage);

  function handlePageChange(event, page) {
    setCurrentPage(page);
  }

  function handleActivateDeactivateUser(idUser) {
    axios
      .put(`http://yourlocalshop.pt:3000/api/v1/users/${idUser}/status`)
      .then(() => {
        // Atualize a tabela buscando os dados atualizados
        switch (chosenOption) {
          case "PRODUCER":
            handleUser("PRODUCER");
            break;
          case "CONSUMER":
            handleUser("CONSUMER");
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleLogout() {
    await axios.get("http://yourlocalshop.pt:3000/api/v1/auth/logout", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });
    console.log("logout");
    return (window.location.href = "https://yourlocalshop.pt/");
  }

  return (
    <div className='container-main'>
      <div className='menu-column'>
        <div className='grid-admin-column'>
          <div className='admin'>
            <AccountCircleIcon
              style={{ fontSize: "100px" }}
            ></AccountCircleIcon>
          </div>
          {adminOptions.map((option) => (
            <div key={option} className='container-options'>
              <button
                onClick={() => {
                  getData(option);
                }}
                className='options'
              >
                {option}
              </button>
            </div>
          ))}
          <button
            className='btn btn-danger '
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className='table-column'>
        <div className='container-table'>
          <div className='table'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th className='table-header' key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chosenOption === "PRODUCER" && (
                  <>
                    {currentItems.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.fiscal_identifier}</td>
                        <td>{data.phone}</td>
                        <td>
                          <button
                            className={
                              data.active ? "btn btn-danger" : "btn btn-success"
                            }
                            onClick={() =>
                              handleActivateDeactivateUser(data.id)
                            }
                          >
                            {data.active ? "DEACTIVATE" : "ACTIVATE"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {chosenOption === "CONSUMER" && (
                  <>
                    {currentItems.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.fiscal_identifier}</td>
                        <td>{data.phone}</td>
                        <td>
                          <button
                            className={
                              data.active ? "btn btn-danger" : "btn btn-success"
                            }
                            onClick={() =>
                              handleActivateDeactivateUser(data.id)
                            }
                          >
                            {data.active ? "DEACTIVATE" : "ACTIVATE"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {chosenOption === "ORDER" && (
                  <>
                    {currentItems.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.consumer_id}</td>
                        <td>{data.order_date}</td>
                        <td>{data.delivery_date}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))}
                  </>
                )}
                {chosenOption === "PRODUCT" && (
                  <>
                    {currentItems.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>
                          {data.price
                            ? `${data.price
                                .toString()
                                .padStart(3, "0")
                                .slice(0, -2)},${data.price
                                .toString()
                                .slice(-2)}€`
                            : "999999,99€"}
                        </td>
                        <td>{data.production_date}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            <div className='container-pagination'>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant='outlined'
                shape='rounded'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
