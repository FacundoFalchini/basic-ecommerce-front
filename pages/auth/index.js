import AuthForm from "@/components/Auth/AuthForm";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import React, { useContext, useEffect } from "react";
import Loader from "@/components/UI/Loader";

function AuthPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.isLoading && authContext.isLoggedIn) {
      router.push("/");
    }
  }, [authContext.isLoading, authContext.isLoggedIn, router]);

  if (authContext.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //Esto es el momento donde ponemos bien la credencial y esta cargando la pagina principal.
  if (authContext.isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  return <AuthForm />;
}

export default AuthPage;
