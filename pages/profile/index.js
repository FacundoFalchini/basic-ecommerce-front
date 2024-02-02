import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import Profile from "@/components/profile/Profile";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

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
      <Fragment>
        <Head>
          <title>Your account</title>
          <meta
            name="description"
            content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease."
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
          <title>Your account</title>
          <meta
            name="description"
            content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease."
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
        <title>Your account</title>
        <meta
          name="description"
          content="Manage your account settings on our platform. Access and update your personal information, security settings, and preferences. Stay in control of your account details and customize your experience with ease."
        />
      </Head>
      <Profile></Profile>
    </Fragment>
  );
}

export default ProfilePage;
