import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../../store/auth-context";
import EmailUpdate from "@/components/profile/ProfileUpdate/EmailUpdate/EmailUpdate";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

function ProfileUpdateEmailPage() {
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
          <title>Amazon Change Name, E-mail, Password</title>
          <meta
            name="description"
            content="Update your account information effortlessly. Change your name, email, or password securely with our easy-to-use tools. Keep your profile up-to-date and ensure seamless access to your account. Manage your personal details with confidence."
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
          <title>Amazon Change Name, E-mail, Password</title>
          <meta
            name="description"
            content="Update your account information effortlessly. Change your name, email, or password securely with our easy-to-use tools. Keep your profile up-to-date and ensure seamless access to your account. Manage your personal details with confidence."
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
        <title>Amazon Change Name, E-mail, Password</title>
        <meta
          name="description"
          content="Update your account information effortlessly. Change your name, email, or password securely with our easy-to-use tools. Keep your profile up-to-date and ensure seamless access to your account. Manage your personal details with confidence."
        />
      </Head>
      <EmailUpdate></EmailUpdate>
    </Fragment>
  );
}

export default ProfileUpdateEmailPage;
