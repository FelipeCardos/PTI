import React from "react";
import udata from "../assets/udata";
import Signin from "../components/Signin/Signin";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SigninPage(props) {
  if (udata.get() !== null) {
    window.location.href = "/";
  }
  return (
    <SimpleLayout>
      <Signin />;
    </SimpleLayout>
  );
}
