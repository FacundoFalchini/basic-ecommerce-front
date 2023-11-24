import Card from "../UI/Card";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./profile.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileForm from "./profileForm";
import ProfileContext from "@/store/profile-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const profileCtx = useContext(ProfileContext);
  //const [error, setError] = useState(null);

  const router = useRouter();

  const logoutHandler = () => {
    authCtx.logout();
    //Se puede redigirigar aca o, tratarlo con lo de paginas protegidas.
    router.push("/");
  };

  if (profileCtx.error) {
    return (
      <Card>
        <div className={classes.profilecontainer}>
          <div className={classes.errortext}>Error: {profileCtx.error}</div>
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
          <div className={classes.profilevalue}>{profileCtx.name}</div>{" "}
        </div>
        <div className={classes.profileitem}>
          <label>Email:</label>
          <div className={classes.profilevalue}>{profileCtx.email}</div>
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
