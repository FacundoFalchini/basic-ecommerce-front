import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import Purchases from "@/components/Purchases/Purchases";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

function PurchasePage() {
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
          <title>Your Orders</title>
          <meta
            name="description"
            content="Track and manage your orders seamlessly. Access details about your past and current orders, including shipping status, delivery dates, and order history. Stay informed about your purchases and enjoy a hassle-free order management experience on our platform."
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
          <title>Your Orders</title>
          <meta
            name="description"
            content="Track and manage your orders seamlessly. Access details about your past and current orders, including shipping status, delivery dates, and order history. Stay informed about your purchases and enjoy a hassle-free order management experience on our platform."
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
        <title>Your Orders</title>
        <meta
          name="description"
          content="Track and manage your orders seamlessly. Access details about your past and current orders, including shipping status, delivery dates, and order history. Stay informed about your purchases and enjoy a hassle-free order management experience on our platform."
        />
      </Head>
      <Purchases></Purchases>
    </Fragment>
  );
}

export default PurchasePage;
