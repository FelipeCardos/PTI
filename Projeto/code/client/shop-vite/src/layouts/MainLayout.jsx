import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Header/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer></Footer>
    </>
  );
}
