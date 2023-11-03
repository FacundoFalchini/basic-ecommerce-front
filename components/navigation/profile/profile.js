import Link from "next/link";
import classes from "./profile.module.css";

const Profile = () => {
  return (
    <div>
      <Link href="/profile" className={classes.cartbutton}>
        Profile
      </Link>
    </div>
  );
};

export default Profile;
