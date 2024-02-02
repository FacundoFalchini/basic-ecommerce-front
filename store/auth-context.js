import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false, //Si hay token lo esta, pero esto es para tener esta data apartada en un bool y listo en lugar de chequear el token.
  isLoading: true,
  login: (token) => {},
  logout: () => {},
});

//El tiempo esta en miliseconds para asi poder usarlo directamente en el timeOut.
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); //ms
  const adjExpirationTime = new Date(expirationTime).getTime(); //ms

  console.log("Fecha actual:", new Date(currentTime));
  console.log("Fecha de expiración:", new Date(adjExpirationTime));

  const remainingDuration = adjExpirationTime - currentTime; //ms

  console.log("Diferencia de tiempo en milisegundos:", remainingDuration);

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

  //Cuando un usuario se logea, esta funcion provee el token al estado y lo almacena tambien en local storage, meterlo en el localStorage es para EVITAR perder el estado de logeado en caso de reiniciar la pagina.
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    if (typeof window !== "undefined") {
      // Ensure we're in the browser
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    }

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log("Expiration time:", expirationTime);
    console.log("Remaining time:", remainingTime);

    //Con el tiempo calculado para que se expire, colocamos un timer que va a desencadenar el metodo para salir.
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //Este useEffect corre cuando el component ese monta. Usa la funcion para obtener si existe un token en localstorage y si es valido LO USAMOS y si no lo es LO BORRAMOS.
  useEffect(() => {
    const retrieveStoredToken = () => {
      const storedToken = localStorage.getItem("token");
      const storedExpirationDate = localStorage.getItem("expirationTime");

      const remainingTime = calculateRemainingTime(storedExpirationDate);

      console.log("Expiration time del refresh:", storedExpirationDate);
      console.log("Remaining time del refresh:", remainingTime);

      //Es valido si el token tiene un tiempo restante > 0
      //En este caso, agregamos un limite de 1 minuto, es decir si tiene menos de 1 minuto ya lo dejamos como invalido, este limite lo consideramos como que "no tiene sentido" logearlo por 1 min, mejor que se vuelva a logear.
      if (remainingTime <= 60000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        console.log("renova");
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
