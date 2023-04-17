import React from "react";
import udata from "../assets/udata";
import ProducerManagementArea from "../components/ProducerManagementArea/ProducerManagementArea";
import MainLayout from "../layouts/MainLayout";

export default function ProducerManagementAreaPage(props) {
  if (udata.get() === null || udata.get().typeUser === "Consumer") {
    window.location.href = "/";
  }
  return (
    <MainLayout>
      <ProducerManagementArea udata={udata.get()} />
    </MainLayout>
  );
}
