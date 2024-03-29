import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/UserContext";
import "./Signin.css";

export default function Signin(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
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

  function handleShowErrorMessage() {
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 5000);
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://yourlocalshop.pt:3000/api/v1/auth/local/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get("https://yourlocalshop.pt:3000/api/v1/auth/user", {
              withCredentials: true,
            })
            .then((res) => {
              setMyUserVariable(res.data);
            })
            .then(() => {
              return navigate("/");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        handleShowErrorMessage();
      });
  }

  function handleGoogleSignin(typeUser) {
    if (typeUser === "Consumer") {
      window.location.href =
        "https://yourlocalshop.pt:3000/api/v1/auth/google/login";
    } else if (typeUser === "Producer") {
      window.location.href =
        "https://yourlocalshop.pt:3000/api/v1/auth/google/login?isProducer=true";
    }
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
          {showErrorMessage && (
            <div className='containerSigninErrorMessage'>
              Invalid e-mail or password
            </div>
          )}
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
          <div className='signinGoogleButtons'>
            <div
              className='signinGoogleButton'
              onClick={() => {
                handleGoogleSignin("Consumer");
              }}
            >
              <svg
                style={{ color: "white" }}
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                fill='currentColor'
                className='bi bi-google'
                viewBox='0 0 16 16'
              >
                {" "}
                <path
                  d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
                  fill='white'
                />
              </svg>

              <span>CONSUMER</span>
            </div>
            <div
              className='signinGoogleButton'
              onClick={() => {
                handleGoogleSignin("Producer");
              }}
            >
              <svg
                style={{ color: "white" }}
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                fill='currentColor'
                className='bi bi-google'
                viewBox='0 0 16 16'
              >
                {" "}
                <path
                  d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
                  fill='white'
                />
              </svg>
              <span>PRODUCER</span>
            </div>
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
