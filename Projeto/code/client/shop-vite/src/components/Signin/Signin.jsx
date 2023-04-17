import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      .post("http://localhost:3000/api/v1/auth/local/signin", formData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data));
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGoogleSignin(event) {
    window.location.href =
      "http://localhost:3000/api/v1/auth/google/signin?typeUser=" +
      props.typeUser;
  }

  return (
    <div>
      <div className='containerSignin'>
        <h1 className='signinTitle'>Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className='signinForm'
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
              className='signinPassword'
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
            <input type='submit' className='signinButton' value='SIGN IN' />
          </div>
          <div className='google-btn' onClick={handleGoogleSignin}>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
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
