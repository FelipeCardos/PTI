import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBarBase from "../NavBarBase/NavBarBase";
import "./Signup.css";

export default function Signup() {
  let { state } = useLocation();
  const signupType = state.signupType;
  console.log("signupType: " + JSON.stringify(signupType));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // passwordConfirmation: "",
    type: signupType,
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Cliente: " + JSON.stringify(formData));
    axios
      .post("http://localhost:5000/user/", formData, {
        headers: {
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

  function handlePasswordVisibility() {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  }
  return (
    <div>
      <div>
        <NavBarBase />
      </div>
      <div>
        <form onSubmit={handleSubmit} className='SignUpForm'>
          <h1 className='SignUpTitle'>SignUp</h1>
          <div>
            <input
              type='text'
              placeholder='Email'
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
          </div>
          <div>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Password Confirmation'
              onChange={handleChange}
              name='passwordConfirmation'
              value={formData.passwordConfirmation}
              className='loginPassword'
            />
            <i
              className='fa fa-eye togglePassword'
              onClick={handlePasswordVisibility}
            ></i>
          </div>
          <div>
            <input type='submit' className='loginButton' value='SIGN UP' />
          </div>

          <hr className='hr' />
          <div>
            Already have an account? <a>Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}
