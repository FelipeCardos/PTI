import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import ProducerManagementArea from "../components/ProducerManagementArea/ProducerManagementArea";
import MainLayout from "../layouts/MainLayout";

export default function ProducerManagementAreaPage() {
  const [loading, setLoading] = useState(true);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!myUserVariable) navigate("/signin");
    if (myUserVariable.typeUser !== "Producer") navigate("/");
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MainLayout>
          <ProducerManagementArea />
        </MainLayout>
      )}
    </>
  );
}
