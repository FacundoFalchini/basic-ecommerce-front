import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/router";
import AuthContext from "../store/auth-context";
import React, { useContext, useEffect } from "react";
import Loader from "@/components/UI/loader";

function AuthPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.isLoading && authContext.isLoggedIn) {
      router.push("/");
    }
  }, [authContext.isLoading, authContext.isLoggedIn, router]);

  if (authContext.isLoading) {
    return <Loader></Loader>;
  }

  if (authContext.isLoggedIn) {
    return null;
  }

  return <AuthForm />;
}

export default AuthPage;
