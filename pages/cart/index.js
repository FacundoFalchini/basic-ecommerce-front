import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import Cart from "@/components/Cart/Cart";
import Loader from "@/components/UI/Loader";
import Head from "next/head";

function CartPage() {
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
          <title>Amazon.com. Shopping Cart</title>
          <meta
            name="description"
            content="Review and manage items in your shopping cart effortlessly. Explore your selected products, adjust quantities, and proceed to checkout seamlessly. Ensure a smooth shopping experience by organizing and finalizing your purchases in your shopping cart on our platform."
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
          <title>Amazon.com. Shopping Cart</title>
          <meta
            name="description"
            content="Review and manage items in your shopping cart effortlessly. Explore your selected products, adjust quantities, and proceed to checkout seamlessly. Ensure a smooth shopping experience by organizing and finalizing your purchases in your shopping cart on our platform."
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
        <title>Amazon.com. Shopping Cart</title>
        <meta
          name="description"
          content="Review and manage items in your shopping cart effortlessly. Explore your selected products, adjust quantities, and proceed to checkout seamlessly. Ensure a smooth shopping experience by organizing and finalizing your purchases in your shopping cart on our platform."
        />
      </Head>
      <Cart></Cart>
    </Fragment>
  );
}

export default CartPage;
