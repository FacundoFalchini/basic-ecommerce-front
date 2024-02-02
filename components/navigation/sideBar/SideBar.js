import { useState, Fragment, useContext, useEffect } from "react";
import Image from "next/image";
import lineasIcon from "../../../public/lineas.png";
import { RxCross1 } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ProfileContext from "@/store/profile-context";
import Link from "next/link";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";

const Sidebar = () => {
  const profileCtx = useContext(ProfileContext);
  const authCtx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const logoutHandler = () => {
    authCtx.logout();
    router.push("/");
  };

  const generateClassName1 = () => `
  flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200
`;

  const generateClassName2 = () => `
py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200
`;

  const generateClassName3 = () => `
"w-[20px] h-[15px] text-grayText hover:text-black"
`;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Aplica overflow-hidden al body cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Elimina overflow-hidden cuando el modal se cierra
    }

    // Limpia el efecto al desmontar el componente
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="  ml-3 flex h-[35px] w-auto shrink-0  cursor-pointer items-center  justify-center rounded-sm border border-transparent pl-1 pr-1 font-sans text-sm font-semibold text-white hover:border-white"
      >
        <Image
          src={lineasIcon}
          alt="cart"
          width={18}
          height={18}
          className="mr-1 mt-[2px]"
        />{" "}
        All
      </button>
      <div
        className={`fixed left-0 top-0 z-40 flex h-full w-[365px] flex-col overflow-y-auto bg-white
      ${
        isOpen ? "translate-x-0 duration-500" : "-translate-x-full duration-500"
      }`}
      >
        <div className="flex h-[50px] w-full items-center bg-optionsBar px-[36px] py-3 font-sans text-[19px]  font-bold text-white">
          <HiUserCircle className="mr-2.5 h-[25px] w-[27px]"></HiUserCircle>
          <div className="truncate">Hello, {profileCtx.name}</div>
        </div>

        <ul>
          <li className="h-[44px] px-[36px] pb-[2px] pt-[13px] font-sans text-[18px] font-bold">
            Trending
          </li>
          <li className={generateClassName2()}>Best Sellers</li>
          <li className={generateClassName2()}>New Releases</li>
          <li className={generateClassName2()}>Movers & Shakers</li>
          <li className="h-[44px] pb-[2px] pl-[36px] pt-[13px] font-sans text-[18px] font-bold">
            Digital Content & Devices
          </li>
          <li className={generateClassName1()}>
            Prime Video
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Site Music
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Echo & Alexa
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Fire Tablets
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Fire TV
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Kindle E-readers & Books
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Audible Books & Originals
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Site Photos
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Site Appstore
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className="h-[44px] px-[36px] pb-[2px] pt-[13px] font-sans text-[18px] font-bold">
            Shop By Department
          </li>
          <li className={generateClassName1()}>
            Clothing, Shoes, Jewelry & Watches
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Site Fresh
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Books
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Movies, Music & Games
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className=" flex cursor-pointer items-center px-[36px] py-[13px] font-sans text-[14px] hover:bg-zinc-200">
            See All
            <IoIosArrowDown className="ml-1 h-[15px] w-[20px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] px-[36px] pb-[2px] pt-[13px] font-sans text-[18px] font-bold">
            Programs & Features
          </li>
          <li className={generateClassName1()}>
            Same-Day Delivery
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Whole Foods Market
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Medical Care & Pharmacy
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className={generateClassName1()}>
            Amazon Physical Stores
            <IoIosArrowForward
              className={generateClassName3()}
            ></IoIosArrowForward>
          </li>
          <li className=" flex cursor-pointer items-center px-[36px] py-[13px] font-sans text-[14px] hover:bg-zinc-200">
            See All
            <IoIosArrowDown className="ml-1 h-[15px] w-[20px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] px-[36px] pb-[2px] pt-[13px] font-sans text-[18px] font-bold">
            Help & Setting
          </li>
          <Link href="/profile">
            <li className={generateClassName2()}>Your Account</li>
          </Link>
          <li className={generateClassName2()}>English</li>
          <li className={generateClassName2()}>Argentina</li>
          <li className={generateClassName2()} onClick={logoutHandler}>
            Sign Out
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className=" fixed top-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {isOpen && (
        <RxCross1
          className="fixed left-[370px] top-5 z-40 h-[20px] w-[20px] cursor-pointer text-white"
          onClick={toggleSidebar}
        ></RxCross1>
      )}
    </>
  );
};

export default Sidebar;
