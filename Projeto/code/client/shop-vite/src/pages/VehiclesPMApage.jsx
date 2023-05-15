import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import VehiclesPMA from "../components/ProducerManagementArea/VehiclesPMA/VehiclesPMA";
import MainLayout from "../layouts/MainLayout";

export default function VehiclesPMApage() {
  const [loading, setLoading] = useState(true);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!myUserVariable) return navigate("/signin");
    if (myUserVariable.typeUser !== "Producer") return navigate("/");
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MainLayout>
          <VehiclesPMA />
        </MainLayout>
      )}
    </>
  );
}
