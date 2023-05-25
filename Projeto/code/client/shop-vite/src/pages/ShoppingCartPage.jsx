import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/UserContext";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import MainLayout from "../layouts/MainLayout";

export default function ShoppingCartPage() {
  const [loading, setLoading] = useState(true);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!myUserVariable) return navigate("/signin");
    (async () => {
      await axios
        .get("http://localhost:3000/api/v1/users/" + myUserVariable.user_id, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.typeUser !== "Consumer") return navigate("/");
        });
    })();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MainLayout>
          <ShoppingCart />
        </MainLayout>
      )}
    </>
  );
}
