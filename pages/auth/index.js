import AuthForm from "@/components/Auth/AuthForm";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import React, { Fragment, useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

function AuthPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  //Si esta logeado (se mando la request desde el auth component, obtuvimos el token y lo mandamos al contexto, que si hay token hacer el isLoggedIn true), mandamos el user a la pagina principal. Sino, siempre nos quedamos en esta pagina de auth.
  useEffect(() => {
    if (!authContext.isLoading && authContext.isLoggedIn) {
      router.push("/");
    }
  }, [authContext.isLoading, authContext.isLoggedIn, router]);

  if (authContext.isLoading) {
    return (
      <Fragment>
        <Head>
          <title>Amazon Sign-In</title>
          <meta
            name="description"
            content="Access your account securely. Sign in to explore personalized features, manage your orders, and enjoy a seamless shopping experience. Enter your credentials and stay connected with the latest updates and promotions on our platform."
          />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

  //Esto es el momento donde ponemos bien la credencial y esta cargando la pagina principal.
  if (authContext.isLoggedIn) {
    return (
      <Fragment>
        <Head>
          <title>Amazon Sign-In</title>
          <meta
            name="description"
            content="Access your account securely. Sign in to explore personalized features, manage your orders, and enjoy a seamless shopping experience. Enter your credentials and stay connected with the latest updates and promotions on our platform."
          />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Amazon Sign-In</title>
        <meta
          name="description"
          content="Access your account securely. Sign in to explore personalized features, manage your orders, and enjoy a seamless shopping experience. Enter your credentials and stay connected with the latest updates and promotions on our platform."
        />
      </Head>
      <AuthForm />
    </Fragment>
  );
}

export default AuthPage;
