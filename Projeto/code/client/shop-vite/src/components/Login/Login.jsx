import axios from "axios";
import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
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
      <form onSubmit={handleSubmit} className='loginForm'>
        <h1 className='loginTitle'>Login</h1>
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
        <div>
          Don't have an account? <a Link='#'>Sign up</a>
        </div>
      </form>
    </div>
  );
}
