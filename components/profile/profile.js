import Card from "../UI/Card";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./profile.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileForm from "./profileForm";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const logoutHandler = () => {
    authCtx.logout();
    //Se puede redigirigar aca o, tratarlo con lo de paginas protegidas.
    router.push("/");
  };

  useEffect(() => {
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
        } else {
          const data = await response.json();
          setProfileData(data); //Actualizo los datos.
          setIsLoading(false); //Luego doy por terminada la carga
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  //El [] hace que solo se ejecute una vez,d espues del montado, si no tuviera se haria despues de cada actualizacion tambien.

  if (isLoading) {
    return (
      <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>;
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className={classes.profilecontainer}>
          <p>Se produjo un error al cargar el perfil.</p>
          <div className={classes.buttonitem}>
            <Link href="/" className={classes.backbutton}>
              Back
            </Link>
            <button onClick={logoutHandler} className={classes.backbutton}>
              Logout
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className={classes.profilecontainer}>
        <div className={classes.profileitem}>
          <label>Nombre:</label>
          <div className={classes.profilevalue}>{profileData.name}</div>{" "}
        </div>
        <div className={classes.profileitem}>
          <label>Email:</label>
          <div className={classes.profilevalue}>{profileData.email}</div>
        </div>
        <div className={classes.profileitem}>
          <label>Contraseña:</label>
          <div className={classes.profilevalue}>••••••••</div>{" "}
        </div>

        <ProfileForm></ProfileForm>
        <div className={classes.buttonitem}>
          <Link href="/" className={classes.backbutton}>
            Back
          </Link>
          <button onClick={logoutHandler} className={classes.backbutton}>
            Logout
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
