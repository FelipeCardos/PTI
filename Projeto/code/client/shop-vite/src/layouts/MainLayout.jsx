import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/UserContext";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Header/Navbar/Navbar";
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
    // if (!myUserVariable) setNavbars({ ...navbars, Navbar: true });
    // if (myUserVariable.typeUser !== "Producer")
    //   setNavbars({
    //     Navbar: false,
    //     NavbarConsumer: true,
    //     NavbarProducer: false,
    //   });
    // if (myUserVariable.typeUser === "Producer")
    //   setNavbars({
    //     Navbar: false,
    //     NavbarConsumer: false,
    //     NavbarProducer: true,
    //   });
  }, []);

  return (
    <>
      {/* {navbars.Navbar && <Navbar />} */}
      {/* {navbars.NavbarConsumer && <NavbarConsumer />} */}
      {/* {navbars.NavbarProducer && <NavbarProducer />} */}
      <NavbarProducer />
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
