import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./auth-context";

const ProfileContext = React.createContext({
  name: "",
  email: "",
  isLoading: false,
  error: "",
});

const fetchData = async () => {
  try {
    //const token = localStorage.getItem("sadasdasd12312");
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    throw error; //Para capturarlo con el catch luego en el loadProfile
  }
};

export const ProfileContextProvider = (props) => {
  const { token } = useContext(AuthContext);
  //const token = "sadasdasd12312";
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        if (data) {
          setProfileData({
            name: data.name,
            email: data.email,
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
      console.log("cargando perfil");
      loadProfile();
    }
  }, [token]);

  const contextValue = {
    name: profileData.name,
    email: profileData.email,
    isLoading: loading,
    error: error, // Incluir error en el contexto
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
