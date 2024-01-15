import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import Loader from "../UI/loader";
import Image from "next/image";
import logo from "../../public/logo.png";
import logoAmazon from "../../public/logoAmazon.png";
import Footer from "../UI/Footer";

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

  function updatePlaceholder() {
    const inputElement = document.getElementById("password");
    const placeholderText = !isLogin ? "Minimum 7 characters" : "";
    if (inputElement) {
      inputElement.setAttribute("placeholder", placeholderText);
    }
  }

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
        console.log(responseData.message);
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
      //Los 2 casos diferenciados son mal contrasenia y mal email, el resto es el msg que salga del validate o el que salga del 500... que en teoria no deberian salir porque los tengo que forzar desde el backend.
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

  //Colocando min-h-screen en lugar de h-screen aseguro que al hacer mucho zoom se siga viendo fondo blanco y tambien que el footer no se pise con el login, porque el div del login tiene justamente esa altura minima que no se puede topear.
  return (
    <div className="relative flex min-h-screen w-screen min-w-96  flex-col items-center bg-white ">
      {/* Hago que el contenedor principal sea relativo en sentido que se agrega un CONTEXTO de posicion relativa para los elementos hijos. Es decir, que los elementos que sean absolutos se uhicaran respecto al elemento absolute mas cercano que tegngan y no con respecto al documento. 
       A la imagen hago que se ubique de manera absoluta en la parte superior del contenedor principal */}
      <Image
        src={logo}
        alt="logo"
        width={60}
        height={60}
        className="absolute top-3"
      />
      {errorRequest && (
        <div
          className="mt-20 inline-block h-20 w-full  max-w-96 rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
        ring-red-300 ring-opacity-20 "
        >
          <Image
            src={logoAmazon}
            alt="danger"
            width={30}
            height={30}
            className="mr-5 inline-block align-top "
          />
          <div className="inline-block   ">
            <h1 className="text-lg  text-red-600 ">A problem occurred</h1>
            <h2 className="inline-block  text-xs text-blackText ">
              {errorRequest}
            </h2>
          </div>
        </div>
      )}

      {/* Y como el margen si hay error es mt-1, y es siempre al ser flex column es en funcion del div del error, entonces por mas q cambie el alto del div del error, el section del login queda bien ubicado siempre */}
      <section
        className={`w-full max-w-96 rounded-xl border  border-gray-300 bg-white  p-8  ${
          errorRequest ? "mt-4" : "mt-20"
        }`}
      >
        <h1 className="mb-6 text-2xl font-semibold">
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
                className="block text-sm font-semibold text-blackText"
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
                className={`w-full rounded-md border border-gray-500 p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
                focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring
                ${
                  enteredNameErrorFront !== ""
                    ? " border-red-600 ring-red-300  focus:border-red-600 "
                    : ""
                }`}
              />
              {enteredNameErrorFront !== "" && (
                <p className="mr-2  text-xs text-red-600">
                  {enteredNameErrorFront}
                </p>
              )}
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blackText"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              className={`w-full rounded-md border border-gray-500 p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring
              ${
                enteredEmailErrorFront !== ""
                  ? " border-red-600 ring-red-300  focus:border-red-600 "
                  : ""
              }`}
            />
            {enteredEmailErrorFront !== "" && (
              <p className="mr-2  text-xs text-red-600">
                {enteredEmailErrorFront}
              </p>
            )}
          </div>
          <div className="space-y-1 ">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-blackText"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onInput={updatePlaceholder()}
              required
              ref={passwordInputRef}
              className={`w-full rounded-md border border-gray-500 p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20 focus:outline-none focus:ring
                ${
                  enteredPasswordErrorFront !== ""
                    ? " border-red-600 ring-red-300  focus:border-red-600 "
                    : ""
                }`}
            />
            {enteredPasswordErrorFront == "" && !isLogin && (
              <p className="mr-2    text-xs text-blackText">
                The password must contain at least 7 characters.
              </p>
            )}
            {enteredPasswordErrorFront !== "" && (
              <p className="mr-2  text-xs text-red-600">
                {enteredPasswordErrorFront}
              </p>
            )}
          </div>
          <div className="space-y-4">
            {!isLoading && (
              <button
                className="w-full rounded-lg bg-yellowButton p-2 text-sm text-blackText ring-borderRingLogin ring-opacity-100 hover:bg-yellowButtonHover focus:border  focus:border-borderLogin 	
                focus:outline-none focus:ring  "
              >
                Continue
              </button>
            )}
            {isLoading && <Loader />}
            {/* Items center me alinea vertifcalmente en el contenedor a los hijos en el centro del mismo. Mientras que el justify alinea en el eje horizontal a los hijos, al ser start es al principio */}
            <div className="flex items-center justify-start">
              <p className="mr-2  text-xs text-blackText">
                {!isLogin && "Already have an account?"}
              </p>
              <button
                type="button"
                className="text-xs  text-blueText hover:text-red-900 hover:underline focus:outline-none  "
                onClick={switchAuthModeHandler}
              >
                {!isLogin && "Log in"}
              </button>
            </div>
          </div>
        </form>
      </section>
      {isLogin && (
        <div className="mb-2 mt-4 flex w-full max-w-96 items-center justify-center ">
          <div className="inline h-px flex-grow bg-gray-200"></div>
          <p className="mx-3 inline  text-xs text-gray-500">
            Are you new here?
          </p>
          <div className="inline h-px flex-grow bg-gray-200"></div>
        </div>
      )}

      {isLogin && (
        <button
          className="min-h-8 w-full  max-w-96 rounded-lg   border    border-gray-300  bg-white p-0 text-xs ring-borderRingLogin ring-opacity-100 hover:bg-gray-50 focus:border 	
          focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20 focus:text-opacity-100  focus:outline-none focus:ring "
          onClick={switchAuthModeHandler}
        >
          Create your account
        </button>
      )}

      <Footer></Footer>
    </div>
  );
};

export default AuthForm;
