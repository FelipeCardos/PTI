import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/UserContext";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Header/Navbar/NavBar";
import NavbarConsumer from "../components/Header/NavbarConsumer/NavbarConsumer";
import NavbarProducer from "../components/Header/NavbarProducer/NavbarProducer";

export default function MainLayout({ children }) {
  let navigate = useNavigate();
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [navbars, setNavbars] = useState({
    Navbar: true,
    NavbarConsumer: false,
    NavbarProducer: false,
  });
  useEffect(() => {
    if (!myUserVariable) return setNavbars({ ...navbars, Navbar: true });
    (async () => {
      await axios
        .get(
          "https://yourlocalshop.pt:3000/api/v1/users/" + myUserVariable.user_id,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const data = res.data;
          setUserName(data.name);
          setUserId(data.id);
          if (data.typeUser === "Consumer")
            return setNavbars({
              ...navbars,
              NavbarConsumer: true,
              Navbar: false,
            });
          if (data.typeUser === "Producer")
            return setNavbars({
              ...navbars,
              NavbarProducer: true,
              Navbar: false,
            });
          if (data.typeUser === "Admin") return navigate("/admin");
        });
    })();
  }, [myUserVariable]);

  return (
    <>
      {navbars.Navbar && (
        <Navbar user={{ userId: userId, userName: userName }} />
      )}
      {navbars.NavbarConsumer && (
        <NavbarConsumer user={{ userId: userId, userName: userName }} />
      )}
      {navbars.NavbarProducer && (
        <NavbarProducer user={{ userId: userId, userName: userName }} />
      )}
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
