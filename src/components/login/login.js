import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import LoginCSS from "./login.module.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    errorExists: false,
    message: "",
  });

  const emailValidationHandler = () => {
    if (emailRef.current.value === "") {
      setIsEmailEntered(false);
    } else {
      setIsEmailEntered(true);
    }
    setIsEmailTouched(true);
  };

  const passwordValidationHandler = () => {
    if (passwordRef.current.value === "") {
      setIsPasswordEntered(false);
    } else {
      setIsPasswordEntered(true);
    }
    setIsPasswordTouched(true);
  };

  const loginFormHandler = (event) => {
    event.preventDefault();
    if (emailRef.current.value === "") {
      setIsEmailEntered(false);
      return;
    } else if (passwordRef.current.value === "") {
      setIsPasswordEntered(false);
      return;
    } else {
      try {
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3Rg3dKsHT1qz_VUmxaTNpopn1rgPReNY",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.status === 400) {
            setErrorMessage({
              errorExists: true,
              message: "email already exists",
            });
          } else {
            setErrorMessage({ errorExists: false, message: "" });
          }
        });
      } catch (error) {
        console.log(error.status);
      }
    }
  };

  const isEmailEmpty = !isEmailEntered & isEmailTouched;
  const isPasswordEmpty = !isPasswordEntered & isPasswordTouched;

  return (
    <div className={LoginCSS.maincontainer}>
      <form onSubmit={loginFormHandler} className={LoginCSS.formcontainer}>
        <div className={LoginCSS.inputContainer}>
          <label htmlFor="email" className={LoginCSS.inputlabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`${LoginCSS.inputbox} ${
              isEmailEmpty ? LoginCSS.emptyInputField : ""
            }`}
            ref={emailRef}
            onBlur={emailValidationHandler}
          />
          {isEmailEmpty ? (
            <p className={LoginCSS.errorMessage}>
              *Please enter a valid email address
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={LoginCSS.inputContainer}>
          <label htmlFor="password" className={LoginCSS.inputlabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${LoginCSS.inputbox} ${
              isPasswordEmpty ? LoginCSS.emptyInputField : ""
            }`}
            ref={passwordRef}
            onBlur={passwordValidationHandler}
          />
          {isPasswordEmpty ? (
            <p className={LoginCSS.errorMessage}>
              *Please enter the correct password
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={!isEmailEntered || !isPasswordEntered}
          type="submit"
          className={`${LoginCSS.button} ${
            !isEmailEntered || !isPasswordEntered ? LoginCSS.disabledButton : ""
          } `}
        >
          Login
        </button>
        <Link to="/register" className={LoginCSS.center}>
          Go to Register Page
        </Link>
      </form>
    </div>
  );
};

export default Login;
