import React from "react";
import Signup from "../components/Signup/Signup";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SignupPage(props) {
  if (udata.get() !== null) {
    window.location.href = "/";
  }
  return (
    <SimpleLayout>
      <Signup />;
    </SimpleLayout>
  );
}
