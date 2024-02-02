import { AuthContextProvider } from "@/store/auth-context";
import { ProfileContextProvider } from "@/store/profile-context";
import CartProvider from "@/store/cartProvider";
import "../styles/globals.css";
import { PurchasesContextProvider } from "@/store/purchases-context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <CartProvider>
          <PurchasesContextProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              ></meta>
              <link rel="icon" href="/AmazonIcon.png "></link>
            </Head>
            <Component {...pageProps} />
          </PurchasesContextProvider>
        </CartProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
