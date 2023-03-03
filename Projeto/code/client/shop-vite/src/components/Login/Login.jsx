import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    // submitToApi(formData)
    console.log(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='loginForm'>
        <input
          type='text'
          placeholder='E-mail'
          onChange={handleChange}
          name='email'
          value={formData.email}
        />
        <input
          type='password'
          placeholder='Palavra-passe'
          onChange={handleChange}
          name='password'
          value={formData.password}
        />
        <span class='psw'>
          <a href='#'>Forgot password?</a>
        </span>
        <button type='submit' className='loginButton'>
          ENTRAR
        </button>
        <div id='gSignIn'></div>
      </form>
    </div>
  );
}
