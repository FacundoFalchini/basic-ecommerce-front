import { AuthContextProvider } from "@/store/auth-context";
import { ProfileContextProvider } from "@/store/profile-context";
import CartProvider from "@/store/cartProvider";
import "../styles/globals.css";
import { PurchasesContextProvider } from "@/store/purchases-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <CartProvider>
          <PurchasesContextProvider>
            <Component {...pageProps} />
          </PurchasesContextProvider>
        </CartProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
