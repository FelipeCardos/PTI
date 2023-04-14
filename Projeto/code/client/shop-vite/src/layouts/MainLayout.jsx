import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header></Header>
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer></Footer>
    </>
  );
}
