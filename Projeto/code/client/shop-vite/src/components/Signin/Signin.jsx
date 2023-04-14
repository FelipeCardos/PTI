import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarBase from "../NavBarBase/NavBarBase";
import "./Signin.css";

export default function Signin(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Cliente: " + JSON.stringify(formData));
    axios
      .post("http://localhost:5000/login/", formData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <NavBarBase />
      </div>
      <div className='container'>
        <h1 className='loginTitle'>Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className='loginForm'
          style={{ paddingTop: "clamp(30px, 3em, 10%)" }}
        >
          <div>
            <input
              type='text'
              placeholder='E-mail'
              onChange={handleChange}
              name='email'
              value={formData.email}
            />
          </div>
          <div>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={formData.password}
              className='loginPassword'
            />
            <i
              className='fa fa-eye togglePassword'
              onClick={handlePasswordVisibility}
            ></i>
            <br />
            <span className='forgotPassword'>
              <a>Forgot password?</a>
            </span>
          </div>
          <div>
            <input type='submit' className='loginButton' value='SIGN IN' />
          </div>
          <hr className='hr' />
          <div style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <a
              onClick={() => {
                navigate("/signup", { state: { signupType: "Consumer" } });
              }}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
