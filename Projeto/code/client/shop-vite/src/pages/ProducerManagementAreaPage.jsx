import React from "react";
import ProducerManagementArea from "../components/ProducerManagementArea/ProducerManagementArea";
import MainLayout from "../layouts/MainLayout";

export default function ProducerManagementAreaPage(props) {
  return (
    <MainLayout>
      <ProducerManagementArea uid={props.uid} />
    </MainLayout>
  );
}
