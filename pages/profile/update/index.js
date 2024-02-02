import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../store/auth-context";
import ProfileUpdate from "@/components/profile/ProfileUpdate/ProfileUpdate";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

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
      <Fragment>
        <Head>
          <title>Login & Security</title>
          <meta
            name="description"
            content="Enhance the security of your account with our Login & Security features. Explore options to strengthen your password, enable two-factor authentication, and manage login preferences. Keep your account safe and secure with our advanced security settings."
          />
        </Head>
        <div className="flex h-screen items-center justify-center bg-white">
          <Loader></Loader>
        </div>
      </Fragment>
    );
  }

  //Esto es para que en caso de que haya un tiempo de delay entre que se carga el componente y se corre el useEffect, no se renderize nada del componente, asi no se llega a ver nada.
  if (!authContext.isLoggedIn) {
    return (
      <Fragment>
        <Head>
          <title>Login & Security</title>
          <meta
            name="description"
            content="Enhance the security of your account with our Login & Security features. Explore options to strengthen your password, enable two-factor authentication, and manage login preferences. Keep your account safe and secure with our advanced security settings."
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
        <title>Login & Security</title>
        <meta
          name="description"
          content="Enhance the security of your account with our Login & Security features. Explore options to strengthen your password, enable two-factor authentication, and manage login preferences. Keep your account safe and secure with our advanced security settings."
        />
      </Head>
      <ProfileUpdate></ProfileUpdate>
    </Fragment>
  );
}

export default ProfileUpdatePage;
