import axios from "axios";
import React from "react";
import Home from "../components/Home/Home";
import MainLayout from "../layouts/MainLayout";

export default function HomePage(props) {
  axios
    .get("http://localhost:3000/api/v1/auth/user", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      }
    });
  return (
    <MainLayout uid={props.uid}>
      <Home />
    </MainLayout>
  );
}
