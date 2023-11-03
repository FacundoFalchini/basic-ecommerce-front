import Card from "../UI/Card";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./profile.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    authCtx.logout();
    //Se puede redigirigar aca o, tratarlo con lo de paginas protegidas.
    router.push("/");
  };

  return (
    <Card>
      <div className={classes.profilecontainer}>
        <div className={classes.profileitem}>
          <label>Nombre:</label>
          <div className={classes.profilevalue}>Juan Pérez</div>{" "}
        </div>
        <div className={classes.profileitem}>
          <label>Email:</label>
          <div className={classes.profilevalue}>juan.perez@email.com</div>
        </div>
        <div className={classes.profileitem}>
          <label>Contraseña:</label>
          <div className={classes.profilevalue}>••••••••</div>{" "}
        </div>
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
