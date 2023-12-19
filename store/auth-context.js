import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isLoading: true,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  //Se inicia en null porque no estamos sseguros si hay o no un token almacenado hasta despues que el componente se haya montado (recien ahi es seguro acceder a localStorage)
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //!! convierte cualquier valor en booleano. Si el token existe sera true, sino false.
  //Inicialmente es false, luego en el momento que corre el useEffect, el componente se revalua y si habia un token esto sera true, sino quedara como falso.
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    //Con esto nos aseguramos que el codigo corra en el navegador, porque en NextJs muchas partes corren del lado del server, donde window y localstorage no estan disponibles.
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    }

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //Cuando un usuario se logea, esta funcion provee el token al estado y lo almacena tambien en local storage.
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    if (typeof window !== "undefined") {
      // Ensure we're in the browser
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    }

    const remainingTime = calculateRemainingTime(expirationTime);

    //Con el tiempo calculado para que se expire, colocamos un timer que va a desencadenar el metodo para salir.
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //Este useEffect corre cuando el component ese monta. Usa la funcion para obtener si existe un token en localstorage.
  useEffect(() => {
    const retrieveStoredToken = () => {
      const storedToken = localStorage.getItem("token");
      const storedExpirationDate = localStorage.getItem("expirationTime");

      const remainingTime = calculateRemainingTime(storedExpirationDate);

      if (remainingTime <= 3600) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
      }

      //Si el token es encontrado y no expiro, retorna el token y tiempo restante.
      //Sino elimina ambas cosas y retorna null.
      return {
        token: storedToken,
        duration: remainingTime,
      };
    };

    const tokenData = retrieveStoredToken();

    //Si hay data, se usa el useState y se setea el token y tambien el logout.
    if (tokenData) {
      setToken(tokenData.token);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
    setIsLoading(false);
  }, [logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isLoading: isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
