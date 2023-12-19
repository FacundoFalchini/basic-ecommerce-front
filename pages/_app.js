import { AuthContextProvider } from "@/store/auth-context";
import { ProfileContextProvider } from "@/store/profile-context";
import CartProvider from "@/store/cartProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
