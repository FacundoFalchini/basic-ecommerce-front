import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./auth-context";

const PurchasesContext = React.createContext({
  items: [],
  isLoading: false,
  error: "",
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:3000/purchases/getPurchaseElements",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const responseData = await response.json();
      const errorMsg =
        responseData.message ||
        (responseData.errors &&
        responseData.errors[0] &&
        responseData.errors[0].message
          ? responseData.errors[0].message
          : "Something went wrong!");
      throw new Error(errorMsg);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; //Para capturarlo con el catch luego en el loadPurchases
  }
};

export const PurchasesContextProvider = (props) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [purchasesData, setPurchasesData] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadPurchases = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        if (data) {
          setPurchasesData({
            items: data,
          });
          setError(null); // Resetea el error cuando la carga es exitosa
        }
      } catch (error) {
        setError(error.message); // Establece el mensaje de error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      console.log("cargando compras");
      loadPurchases();
    }
  }, [token]);

  const contextValue = {
    items: purchasesData.items,
    isLoading: loading,
    error: error, // Incluir error en el contexto
  };

  return (
    <PurchasesContext.Provider value={contextValue}>
      {props.children}
    </PurchasesContext.Provider>
  );
};

export default PurchasesContext;
