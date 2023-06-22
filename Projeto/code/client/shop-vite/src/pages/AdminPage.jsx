import {React,useContext, useState, useEffect} from "react";
import Admin from "../components/Admin/Admin";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";


export default function AddVehicleProductionUnitPage() {
  const [loading, setLoading] = useState(true);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!myUserVariable) return navigate("/");
    setLoading(false);
  }, []);
  return (
    <>
    {loading? (
      <LoadingSpinner/>
    ) : (
      <Admin/>
    )
  }
    </>
  );
}