import Link from "next/link";
import classes from "./profile.module.css";
import Image from "next/image";
import cartIcon from "../../../public/user.png";

/*
const Profile = () => {
  return (
    <div>
      <Link href="/profile" className={classes.cartbutton}>
        Profile
      </Link>
    </div>
  );
};
*/

const Profile = () => {
  return (
    <div className={classes.cart}>
      <Link href="/profile" className={classes.cartbutton}>
        <Image src={cartIcon} alt="profile" width={30} height={30} />
      </Link>
    </div>
  );
};

export default Profile;
