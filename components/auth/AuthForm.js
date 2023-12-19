import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import Loader from "../UI/loader";

const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  if (authCtx.isLoading) {
    console.log("cargando");
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function makeRequest(url, bodyObj) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        throw new Error(errorMsg);
      }

      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      //const expirationTime2 = new Date(new Date().getTime() + 5 * 1000); // 5 segundos en milisegundos

      authCtx.login(data.token, expirationTime.toISOString());
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      alert(error.message);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    if (isLogin) {
      makeRequest("http://localhost:3000/users/login", {
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      const enteredName = nameInputRef.current.value;
      makeRequest("http://localhost:3000/users", {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="name" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <Loader></Loader>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
