import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/UserContext";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Header/Navbar/NavBar";
import NavbarConsumer from "../components/Header/NavbarConsumer/NavbarConsumer";
import NavbarProducer from "../components/Header/NavbarProducer/NavbarProducer";

export default function MainLayout({ children }) {
  const [navbars, setNavbars] = useState({
    Navbar: true,
    NavbarConsumer: false,
    NavbarProducer: false,
  });
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  useEffect(() => {
    if (!myUserVariable) return setNavbars({ ...navbars, Navbar: true });
    (async () => {
      await axios
        .get("http://localhost:3000/api/v1/users/" + myUserVariable.user_id, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;
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
        });
    })();
  }, [myUserVariable]);

  return (
    <>
      {navbars.Navbar && <Navbar />}
      {navbars.NavbarConsumer && <NavbarConsumer />}
      {navbars.NavbarProducer && <NavbarProducer />}
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
