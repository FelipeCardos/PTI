import React from "react";
import Footer from "../components/Footer/Footer";
import NavbarBase from "../components/Header/NavBarBase/NavBarBase";

export default function SimpleLayout({ children }) {
  return (
    <>
      <NavbarBase></NavbarBase>
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer></Footer>
    </>
  );
}
