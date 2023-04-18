import React, { useContext, useState } from "react";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import ProducerManagementArea from "../components/ProducerManagementArea/ProducerManagementArea";
import MainLayout from "../layouts/MainLayout";

export default function ProducerManagementAreaPage() {
  const [loading, setLoading] = useState(true);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  setTimeout(() => {
    if (!myUserVariable) window.location = "/signin";
    if (myUserVariable.typeUser !== "Producer") window.location = "/";
    if (myUserVariable.typeUser === "Producer") setLoading(false);
  }, 1500);
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
