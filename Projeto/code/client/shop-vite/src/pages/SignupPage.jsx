import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import Signup from "../components/Signup/Signup";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SignupPage(props) {
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
          <Signup />;
        </SimpleLayout>
      )}
    </>
  );
}
