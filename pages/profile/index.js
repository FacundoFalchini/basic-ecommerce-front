import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import Profile from "@/components/profile/profile";
import classes from "../../styles/Profile.module.css";
import Loader from "@/components/UI/loader";

function ProfilePage() {
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
      <div className={classes.container}>
        <Loader></Loader>
      </div>
    );
  }

  //Esto es para que en caso de que haya un tiempo de delay entre que se carga el componente y se corre el useEffect, no se renderize nada del componente, asi no se llega a ver nada.
  if (!authContext.isLoggedIn) {
    return null;
  }

  return <Profile></Profile>;
}

export default ProfilePage;
