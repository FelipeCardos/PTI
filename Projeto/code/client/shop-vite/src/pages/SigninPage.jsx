import React from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin/Signin";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SigninPage(props) {
  let navigate = useNavigate();
  let udata = props.udata;
  if (udata.get() !== null) {
    console.log("SigninPage");
    console.log(udata.get());
    () => {
      navigate("/");
    };
  }
  return (
    <SimpleLayout>
      <Signin />;
    </SimpleLayout>
  );
}
