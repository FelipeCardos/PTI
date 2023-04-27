import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import Signin from "../components/Signin/Signin";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SigninPage(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (myUserVariable) window.location = "/";
    else if (!myUserVariable) setLoading(false);
  }, []);

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
