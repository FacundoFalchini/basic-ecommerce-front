import Link from "next/link";
import { useContext } from "react";
import ProfileContext from "@/store/profile-context";

const ProfileNav = () => {
  const profileCtx = useContext(ProfileContext);
  return (
    <Link href="/profile" className="block">
      {/* Al ser flexible y tener w auto, se adapta al contenido entonces cuanto mas largo el nombre mas largo sera este elemento, pero para evitar que sea infinito le pongo un max w y un truncate para los nombres muy largos y que no entran en un tam considerable */}
      <div className="max-w-38 flex min-h-[45px] w-auto flex-col justify-center truncate text-nowrap rounded-sm border border-transparent px-3 hover:border-white">
        <p className="font-sans text-xs font-thin text-white">
          Hello {profileCtx.name}
        </p>
        <p className="font-sans text-sm font-semibold text-white ">
          {" "}
          Account & Lists
        </p>
      </div>
    </Link>
  );
};

export default ProfileNav;
