import React, { useContext, useState } from "react";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import Signin from "../components/Signin/Signin";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SigninPage(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    if (myUserVariable) window.location = "/";
    if (!myUserVariable) setLoading(false);
  }, 1500);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <SimpleLayout>
          <Signin />;
        </SimpleLayout>
      )}
    </>
  );
}
