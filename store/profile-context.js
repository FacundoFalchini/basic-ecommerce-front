import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./auth-context";

const ProfileContext = React.createContext({
  name: "",
  email: "",
});

const fetchData = async () => {
  try {
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
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  useEffect(() => {
    const loadProfile = async () => {
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
      }
    };

    if (token) {
      loadProfile();
    }
  }, [token]);

  const contextValue = {
    name: profileData.name,
    email: profileData.email,
    error: error, // Incluir error en el contexto
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
