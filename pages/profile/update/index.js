import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../store/auth-context";
import ProfileUpdate from "@/components/profile/ProfileUpdate/ProfileUpdate";
import Loader from "@/components/UI/Loader";

function ProfileUpdatePage() {
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
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //Esto es para que en caso de que haya un tiempo de delay entre que se carga el componente y se corre el useEffect, no se renderize nada del componente, asi no se llega a ver nada.
  if (!authContext.isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  return <ProfileUpdate></ProfileUpdate>;
}

export default ProfileUpdatePage;
