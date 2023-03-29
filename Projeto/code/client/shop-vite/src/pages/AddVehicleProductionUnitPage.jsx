import React from "react";
import { useParams } from "react-router-dom";
import AddVehicleProductionUnit from "../components/AddVehicleProductionUnit";
import MainLayout from "../layouts/MainLayout";
export default function AddVehicleProductionUnitPage() {
  let { production_unit_id } = useParams();

  return (
    <MainLayout>
      <AddVehicleProductionUnit productionUnitId={production_unit_id} />
    </MainLayout>
  );
}
