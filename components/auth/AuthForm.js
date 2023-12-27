import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
//import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import Loader from "../UI/loader";
import Image from "next/image";
import logo from "../../public/logo.png";

const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmailErrorFront, setEnteredEmailErrorFront] = useState("");
  const [enteredPasswordErrorFront, setEnteredPasswordErrorFront] =
    useState("");
  const [enteredNameErrorFront, setEnteredNameErrorFront] = useState("");
  const [errorRequest, setErrorRequest] = useState("");
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  //Llevo todos los estados al inicial, asi al cambiar de modo no se siguen renderizando los errores.
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setEnteredEmailErrorFront("");
    setEnteredNameErrorFront("");
    setEnteredPasswordErrorFront("");
    setErrorRequest("");
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

      //Si la request pasa el if anterior, no hay mensaje de error y lo reseteamos por si quedo un error del submit anterior.
      setErrorRequest("");
      const data = await response.json();

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );

      authCtx.login(data.token, expirationTime.toISOString());
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      //En lugar de hacer el alert, mandamos el error al estado y se renderiza.
      setErrorRequest(error.message);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Aca tengo que hacer la validacion del front, ANTES de enviar la request, si sale todo bien pasamos a enviar la request, sino salimos de la funcion y actualizamos el front.
    let isEmailValid = true;
    let isPasswordValid = true;
    let isNameValid = true;

    //Cada vez que se apreta el continue, se ejecuta este Handler, se resetean estos valores para que en caso que esten todos bien en este caso, no quede arrastrado un error de un submit anterior.
    setEnteredEmailErrorFront("");
    setEnteredNameErrorFront("");
    setEnteredPasswordErrorFront("");
    setErrorRequest("");

    if (!enteredEmail.includes("@")) {
      setEnteredEmailErrorFront("Incorrect email format.");
      isEmailValid = false;
    }

    if (enteredPassword.trim().length < 7) {
      setEnteredPasswordErrorFront("A minimum of 7 characters is required.");
      isPasswordValid = false;
    }

    if (!isLogin) {
      const enteredName = nameInputRef.current.value;

      if (enteredName.trim().length < 1) {
        setEnteredNameErrorFront("Introduce your name.");
        isNameValid = false;
      }
    }

    //Si algunas de las 3 validaciones del front no se cumple, NO se envia la request al backend y se renderiza en funcion de estos valores.
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }

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
    <div className="relative flex flex-col items-center  h-screen bg-white">
      {/* Hago que el contenedor principal sea relativo en sentido que se agrega un CONTEXTO de posicion relativa para los elementos hijos. Es decir, que los elementos que sean absolutos se uhicaran respecto al elemento absolute mas cercano que tegngan y no con respecto al documento. 
       A la imagen hago que se ubique de manera absoluta en la parte superior del contenedor principal */}
      <Image
        src={logo}
        alt="logo"
        width={60}
        height={60}
        className="absolute top-3"
      />
      <section className="max-w-sm  min-w-80  mx-auto bg-white p-8  rounded-md border  border-gray-300 mt-20">
        <h1 className="text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        {/* El space-y-4 en cada elemento hijo del form agregar un espaciado vertical */}
        <form
          onSubmit={submitHandler}
          className="space-y-4"
          noValidate="noValidate"
        >
          {!isLogin && (
            <div className="space-y-1">
              {/* Hacemos display block en las etiquetas, para que ocupen todo el ancho disponible y empiecen una nueva linea, asi evitamos que la etiqueta pueda llegar a estar en la misma lineal del input */}
              <label
                htmlFor="name"
                className="text-sm text-black block font-semibold"
              >
                Your name
              </label>
              {/* Primero quito el focus por defecto del navegador y despues le agrego el que yo quiero, en este caso el blue */}
              <input
                type="name"
                id="name"
                placeholder="Names and surnames"
                required
                ref={nameInputRef}
                className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-40 	
                ring-blue-300 focus:border-blue-600 placeholder:text-sm 
                ${
                  enteredNameErrorFront !== ""
                    ? " ring-red-300 border-red-600  focus:border-red-600 "
                    : ""
                }`}
              />
              {enteredNameErrorFront !== "" && (
                <span className="mr-2 text-center text-red-600 text-xs">
                  {enteredNameErrorFront}
                </span>
              )}
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm text-black block font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-40 	
              ring-blue-300 focus:border-blue-600 placeholder:text-sm 
              ${
                enteredEmailErrorFront !== ""
                  ? " ring-red-300 border-red-600  focus:border-red-600 "
                  : ""
              }`}
            />
            {enteredEmailErrorFront !== "" && (
              <span className="mr-2 text-center text-red-600 text-xs">
                {enteredEmailErrorFront}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm text-black block font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Minimum 7 characters"
              required
              ref={passwordInputRef}
              className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-40 	
                ring-blue-300 focus:border-blue-600 placeholder:text-sm 
                ${
                  enteredPasswordErrorFront !== ""
                    ? " ring-red-300 border-red-600  focus:border-red-600 "
                    : ""
                }`}
            />
            {enteredPasswordErrorFront == "" && (
              <span className="mr-2 text-center  text-gray-500 text-xs">
                The password must contain at least 7 characters.
              </span>
            )}
            {enteredPasswordErrorFront !== "" && (
              <span className="mr-2 text-center text-red-600 text-xs">
                {enteredPasswordErrorFront}
              </span>
            )}
          </div>
          {/* Hay 2 formas de hacer que el span del error pueda centrarse:
              1) Que el padre sea flexible y flex-colum de manera que funcione el w-full en el span.
              2) Que el div sea por default y que el span sea block y w-full. El span por defecto es inline (izq a der) lo que ocupe el contenido y no ocupa todo el largo, por ende hay que cambiarlo a block para que pueda hacerlo. El div es block por defecto. 
          */}
          <div className="space-y-4">
            {!isLoading && (
              <button
                className="w-full bg-yellow-500 text-black text-sm p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:border focus:border-blue-600 focus:ring ring-opacity-40 	
              ring-blue-300 "
              >
                Continue
              </button>
            )}
            {isLoading && <Loader />}
            {errorRequest && (
              <span className="w-full block text-center text-red-600 text-xs ">
                {errorRequest}
              </span>
            )}
            {/* Items center me alinea vertifcalmente en el contenedor a los hijos en el centro del mismo. Mientras que el justify alinea en el eje horizontal a los hijos, al ser start es al principio */}
            <div className="flex items-center justify-start">
              <span className="mr-2 text-center  text-gray-500 text-xs">
                {isLogin
                  ? "You do not have an account?"
                  : "Already have an account?"}
              </span>
              <button
                type="button"
                className="text-blue-500 hover:underline focus:outline-none hover:text-red-900  "
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Log in"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
