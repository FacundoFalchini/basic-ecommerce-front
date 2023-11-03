import { useState, useRef, useContext } from "react";
//import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  //const history = useHistory();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;

    //Aca decidimos cual sera la request al firebase endpoint
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMD9KyTutbR5txPEdeRLiVp2wLAUT9bdc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMD9KyTutbR5txPEdeRLiVp2wLAUT9bdc";
      //Sign up with email/password
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        //const data = await response.json();
        let errorMessage = "Authentication failed!";
        // Uncomment if you have specific error messages
        //if (data && data.error && data.error.message) {
        //  errorMessage = data.error.message;
        //}
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      //Si sale todo bien. Llamamos a login que setea el token y el contador. Y redirigmos al usuario.
      authCtx.login(data.idToken, expirationTime.toISOString());
      setTimeout(() => {
        // Redirige al usuario a la página principal, le doy tiempo al getstaticprops.
        router.push("/");
      }, 2000);
      //router.push("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
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
          {isLoading && <p>Sending request...</p>}
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
