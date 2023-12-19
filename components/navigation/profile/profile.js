import Link from "next/link";
import classes from "./profile.module.css";
import Image from "next/image";

const Profile = () => {
  return (
    <div className={classes.cart}>
      <Link href="/profile" className={classes.cartbutton}>
        <Image src="/user.png" alt="profile" width={30} height={30} />
      </Link>
    </div>
  );
};

export default Profile;
