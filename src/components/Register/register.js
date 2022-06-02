import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import RegisterCSS from "./register.module.css";

const Register = () => {
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

  const registerFormHandler = (event) => {
    console.log(event);
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (enteredEmail === "") {
      setIsEmailEntered(false);
      return;
    } else if (enteredPassword === "") {
      setIsPasswordEntered(false);
      return;
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3Rg3dKsHT1qz_VUmxaTNpopn1rgPReNY",
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
    <div className={RegisterCSS.maincontainer}>
      <form
        className={RegisterCSS.formcontainer}
        onSubmit={registerFormHandler}
      >
        <div className={RegisterCSS.inputContainer}>
          <label htmlFor="email" className={RegisterCSS.inputlabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`${RegisterCSS.inputbox} ${
              isEmailEmpty ? RegisterCSS.emptyInputField : ""
            }`}
            ref={emailRef}
            onBlur={emailValidationHandler}
          />
          {isEmailEmpty ? (
            <p className={RegisterCSS.errorMessage}>
              *Please enter a valid email address
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={RegisterCSS.inputContainer}>
          <label htmlFor="password" className={RegisterCSS.inputlabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${RegisterCSS.inputbox} ${
              isPasswordEmpty ? RegisterCSS.emptyInputField : ""
            }`}
            ref={passwordRef}
            onBlur={passwordValidationHandler}
          />
          {isPasswordEmpty ? (
            <p className={RegisterCSS.errorMessage}>
              *Please enter the correct password
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          //   disabled={!isEmailEntered || !isPasswordEntered}
          type="submit"
          className={`${RegisterCSS.button} ${
            !isEmailEntered || !isPasswordEntered
              ? RegisterCSS.disabledButton
              : ""
          } `}
        >
          Register
        </button>
        {errorMessage.errorExists && <p>{errorMessage.message}</p>}
        <Link to="/login" className={RegisterCSS.center}>
          Go to Login Page
        </Link>
      </form>
    </div>
  );
};

export default Register;
