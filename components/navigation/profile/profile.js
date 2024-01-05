import Link from "next/link";
//import classes from "./profile.module.css";
//import Image from "next/image";
import { useContext } from "react";
import ProfileContext from "@/store/profile-context";

const Profile = () => {
  const profileCtx = useContext(ProfileContext);
  return (
    <Link href="/profile" className="block">
      {/* Al ser flexible y tener w auto, se adapta al contenido entonces cuanto mas largo el nombre mas largo sera este elemento, pero para evitar que sea infinito le pongo un max w y un truncate para los nombres muy largos y que no entran en un tam considerable */}
      <div className="flex flex-col justify-center px-4 min-h-[58px] max-h-[58px] w-auto min-w-28 max-w-38 border border-transparent hover:border-white rounded-sm text-nowrap truncate">
        <p className="text-white text-xs font-thin">Hello {profileCtx.name}</p>
        <p className="text-white text-sm font-semibold "> Account</p>
      </div>
    </Link>
  );
};

export default Profile;

//Antes el link tenia esto:
{
  /* <Image src="/user.png" alt="profile" width={24} height={24} /> */
}
