import React from "react";
import Header from "../components/Header/header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div>{children}</div>
    </div>
  );
}
