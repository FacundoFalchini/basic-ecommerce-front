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
    <div className="relative flex flex-col items-center w-screen  min-h-screen min-w-96 bg-white ">
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
          className="inline-block w-full max-w-96 h-20  bg-white p-4 rounded-xl border border-red-600 mt-20 ring-4 ring-opacity-20 	
        ring-red-300 ring-inset "
        >
          <Image
            src={logoAmazon}
            alt="danger"
            width={30}
            height={30}
            className="inline-block align-top mr-5 "
          />
          <div className="inline-block   ">
            <h1 className="text-lg  text-red-600 ">A problem occurred</h1>
            <h2 className="inline-block  text-blackText text-xs ">
              {errorRequest}
            </h2>
          </div>
        </div>
      )}

      {/* Y como el margen si hay error es mt-1, y es siempre al ser flex column es en funcion del div del error, entonces por mas q cambie el alto del div del error, el section del login queda bien ubicado siempre */}
      <section
        className={`w-full max-w-96 bg-white p-8  rounded-xl border  border-gray-300  ${
          errorRequest ? "mt-4" : "mt-20"
        }`}
      >
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
                className="text-sm text-blackText block font-semibold"
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
                className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-100 	
                ring-borderRingLogin focus:border-borderLogin placeholder:text-sm  focus:bg-bgRingCreate focus:bg-opacity-20
                ${
                  enteredNameErrorFront !== ""
                    ? " ring-red-300 border-red-600  focus:border-red-600 "
                    : ""
                }`}
              />
              {enteredNameErrorFront !== "" && (
                <p className="mr-2  text-red-600 text-xs">
                  {enteredNameErrorFront}
                </p>
              )}
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm text-blackText block font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-100 	
              ring-borderRingLogin focus:border-borderLogin placeholder:text-sm  focus:bg-bgRingCreate focus:bg-opacity-20
              ${
                enteredEmailErrorFront !== ""
                  ? " ring-red-300 border-red-600  focus:border-red-600 "
                  : ""
              }`}
            />
            {enteredEmailErrorFront !== "" && (
              <p className="mr-2  text-red-600 text-xs">
                {enteredEmailErrorFront}
              </p>
            )}
          </div>
          <div className="space-y-1 ">
            <label
              htmlFor="password"
              className="text-sm text-blackText block font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onInput={updatePlaceholder()}
              required
              ref={passwordInputRef}
              className={`w-full border border-gray-500 p-1 rounded-md focus:outline-none  focus:ring ring-opacity-100 	
              ring-borderRingLogin focus:border-borderLogin placeholder:text-sm focus:bg-bgRingCreate focus:bg-opacity-20
                ${
                  enteredPasswordErrorFront !== ""
                    ? " ring-red-300 border-red-600  focus:border-red-600 "
                    : ""
                }`}
            />
            {enteredPasswordErrorFront == "" && !isLogin && (
              <p className="mr-2    text-blackText text-xs">
                The password must contain at least 7 characters.
              </p>
            )}
            {enteredPasswordErrorFront !== "" && (
              <p className="mr-2  text-red-600 text-xs">
                {enteredPasswordErrorFront}
              </p>
            )}
          </div>
          <div className="space-y-4">
            {!isLoading && (
              <button
                className="w-full bg-yellowButton text-blackText text-sm p-2 rounded-lg hover:bg-yellowButtonHover focus:outline-none focus:border focus:ring  ring-opacity-100 	
                ring-borderRingLogin focus:border-borderLogin  "
              >
                Continue
              </button>
            )}
            {isLoading && <Loader />}
            {/* Items center me alinea vertifcalmente en el contenedor a los hijos en el centro del mismo. Mientras que el justify alinea en el eje horizontal a los hijos, al ser start es al principio */}
            <div className="flex items-center justify-start">
              <p className="mr-2  text-blackText text-xs">
                {!isLogin && "Already have an account?"}
              </p>
              <button
                type="button"
                className="text-xs  text-blueText hover:underline focus:outline-none hover:text-red-900  "
                onClick={switchAuthModeHandler}
              >
                {!isLogin && "Log in"}
              </button>
            </div>
          </div>
        </form>
      </section>
      {isLogin && (
        <div className="flex justify-center items-center w-full max-w-96 mt-4 mb-2 ">
          <div className="h-px flex-grow bg-gray-200 inline"></div>
          <p className="inline mx-3  text-gray-500 text-xs">
            Are you new here?
          </p>
          <div className="h-px flex-grow bg-gray-200 inline"></div>
        </div>
      )}

      {isLogin && (
        <button
          className="w-full max-w-96  min-h-8 p-0   bg-white    border  border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:border focus:ring ring-opacity-100 	
          ring-borderRingLogin focus:border-borderLogin text-xs focus:text-opacity-100  focus:bg-bgRingCreate focus:bg-opacity-20 "
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
