import React, { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
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
    // submitToApi(formData)
    console.log(formData);
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
            placeholder='Palavra-passe'
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
          <button type='submit' className='loginButton'>
            SIGN IN
          </button>
          <GoogleLoginButton />
        </div>
        <hr className='hr' />
        <div>
          Already have an account? <a>Sign up</a>
        </div>
      </form>
    </div>
  );
}
