import React from "react";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
}
