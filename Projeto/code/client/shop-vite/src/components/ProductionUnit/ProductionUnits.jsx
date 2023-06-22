import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, DialogActions } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductionUnits.css";

const initialProductionUnits = [
  {
    id: 1,
    name: "Unidade de Produção 1",
    location: "Morada da Unidade de Produção 1",
  },
  {
    id: 2,
    name: "Unidade de Produção 2",
    location: "Morada da Unidade de Produção 2",
  },
  {
    id: 3,
    name: "Unidade de Produção 3",
    location: "Morada da Unidade de Produção 3",
  },
  {
    id: 4,
    name: "Unidade de Produção 4",
    location: "Morada da Unidade de Produção 4",
  },
  {
    id: 5,
    name: "Unidade de Produção 5",
    location: "Morada da Unidade de Produção 5",
  },
];

export default function ProductionUnits() {
  let navigate = useNavigate();

  const [productionUnits, setProductionUnits] = useState(
    initialProductionUnits
  );
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nameToDelete, setNameToDelete] = useState(null);

  function deleteProductionUnit(id) {
    setOpen(false);
    const updatedUnits = productionUnits.filter((unit) => unit.id !== id);
    setProductionUnits(updatedUnits);
    console.log("deletou " + id);
  }

  function handleDelete(id, name) {
    setIdToDelete(id);
    setNameToDelete(name);
    setOpen(true);

    axios
      .delete("http://yourlocalshop.pt:5000/productionUnit/:" + id)
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className='grid-container'>
      <div className='add-productionUnit'>
        <div className='add-icon'>
          <AddIcon
            className='iconn'
            onClick={() => {
              navigate("/add-production-unit");
            }}
          ></AddIcon>
        </div>
      </div>
      {productionUnits.map((productionUnit) => (
        <div
          id={productionUnit.id}
          key={productionUnit.id}
          className='productionUnit'
        >
          <Dialog open={open} onClose={() => setOpen(false)}>
            <div>Are you sure you want to delete {nameToDelete}?</div>
            <DialogActions>
              <button onClick={() => deleteProductionUnit(idToDelete)}>
                Yes
              </button>
              <button onClick={() => setOpen(false)}>No</button>
            </DialogActions>
          </Dialog>
          <div className='productionUnitContent'>
            <p>{productionUnit.id}</p>
            <p>{productionUnit.name}</p>
            <p>{productionUnit.location}</p>
            <div className='delete-productionUnit'>
              <DeleteIcon
                className='delete-icon'
                onClick={() =>
                  handleDelete(productionUnit.id, productionUnit.name)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
