import { AuthContextProvider } from "@/store/auth-context";

import "../styles/globals.css";
import CartProvider from "@/store/cartProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
