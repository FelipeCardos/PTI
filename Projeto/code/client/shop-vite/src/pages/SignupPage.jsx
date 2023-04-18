import React from "react";
import Signup from "../components/Signup/Signup";
import SimpleLayout from "../layouts/SimpleLayout";

export default function SignupPage(props) {
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
          <Signup />;
        </SimpleLayout>
      )}
    </>
  );
}
