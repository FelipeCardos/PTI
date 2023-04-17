import axios from "axios";
import React from "react";
import udata from "../assets/udata";
import Home from "../components/Home/Home";
import MainLayout from "../layouts/MainLayout";

export default function HomePage(props) {
  if (udata.get() === null) {
    udata.apiGet();
  }
  return (
    <MainLayout udata={udata.get()}>
      <Home />
    </MainLayout>
  );
}
