import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../store/auth-context";
import StartingPageContent from "@/components/starting-page/starting-page";
import classes from "../styles/Start.module.css";

function HomePage(props) {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.isLoading && !authContext.isLoggedIn) {
      router.push("/auth");
    }
  }, [authContext.isLoading, authContext.isLoggedIn, router]);

  // If the context is still loading, show the loading state
  if (authContext.isLoading) {
    return (
      <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>;
      </div>
    );
  }

  //Esto es para que en caso de que haya un tiempo de delay entre que se carga el componente y se corre el useEffect, no se renderize nada del componente, asi no se llega a ver nada.
  if (!authContext.isLoggedIn) {
    return null;
  }

  return (
    <StartingPageContent
      countries={props.countries}
      error={props.errorMsg}
    ></StartingPageContent>
  );
}

export default HomePage;

//Esto no es a tiempo real, una vez hecha la page ya quedan los paises que quedan por mas que se cambien en la BD. Se puede agregar revalidate, y cada X tiempo regenera la pagina. Esta opcion es buena en este caso, porque los paises no es algo que cambie cada mucho tiempo.
export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:3000/countries");
    if (!response.ok) {
      const responseData = await response.json(); // Obtiene la respuesta (incluso si hay un error)
      const errorMsg = responseData.message || "Something went wrong!";
      throw new Error(errorMsg);
    }
    const responseData = await response.json();

    return {
      props: {
        countries: responseData,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        countries: null,
        errorMsg: error.message, // Añade un mensaje de error a las props
      },
      revalidate: 3600,
    };
  }
}

//Funcionamiento:
//Primer render: isLoading es true ---> no se hace el redirect, y si se hace el primer if the loading.
//Segundo render: isLoaidng es false ---> 2 posibles casos, que haya token entonces isLoggedIn es true entonces el segund if es fake y pasa por el return del componente. Y si es el caso de q no esta logeado, ambos sos false y se hace el redirect.
