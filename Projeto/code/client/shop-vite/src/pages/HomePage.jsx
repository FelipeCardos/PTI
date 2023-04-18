import React, { useEffect } from "react";
import Home from "../components/Home/Home";
import MainLayout from "../layouts/MainLayout";

export default function HomePage(props) {
  let udata = props.udata;
  useEffect(() => {
    console.log("HomePage");
    console.log(udata.get());
    console.log("HomePage");
  }, []);
  return (
    <MainLayout udata={udata.value}>
      <Home />
    </MainLayout>
  );
}
