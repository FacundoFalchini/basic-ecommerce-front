import { useState, Fragment, useContext } from "react";
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

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="text-white text-sm font-semibold border border-transparent hover:border-white rounded-sm h-10 flex justify-center items-center px-2 w-auto cursor-pointer min-w shrink-0 ml-3.5 grow font-sans"
      >
        <Image
          src={lineasIcon}
          alt="cart"
          width={20}
          height={20}
          className="mr-1"
        />{" "}
        All
      </button>

      <div
        className={`flex flex-col fixed left-0 top-0 overflow-y-auto h-full w-[365px] bg-white z-40
      ${
        isOpen ? "translate-x-0 duration-500" : "-translate-x-full duration-500"
      }`}
      >
        <p className=" flex items-center w-full bg-optionsBar text-white font-bold font-sans px-[36px] text-[19px] py-3  h-[50px]">
          <HiUserCircle className="w-[27px] h-[25px] mr-2.5"></HiUserCircle>
          Hello, {profileCtx.name}
        </p>

        <ul>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
            Trending
          </li>
          <li className={generateClassName2()}>Best Sellers</li>
          <li className={generateClassName2()}>New Releases</li>
          <li className={generateClassName2()}>Movers & Shakers</li>
          <li className="h-[44px] pb-[2px] pt-[13px] pl-[36px] text-[18px] font-bold font-sans">
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
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
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
          <li className=" flex items-center py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            See All
            <IoIosArrowDown className="ml-1 w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
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
          <li className=" flex items-center py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            See All
            <IoIosArrowDown className="ml-1 w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
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
          className="overlay fixed w-full  h-full  bg-black  transition-opacity duration-1000  opacity-80 z-30"
        ></div>
      )}

      {isOpen && (
        <RxCross1
          className="text-white fixed top-5 left-[370px] cursor-pointer w-[20px] h-[20px] z-40"
          onClick={toggleSidebar}
        ></RxCross1>
      )}
    </>
  );
};

export default Sidebar;

//Position te usa para controlar como se ubica un elemento en el DOM.

//FIXED: se usa para posicionar un elemento de manera RELATIVA al la pantalla del buscador.  Esto mantiene el elemento en una posicion fija, independiente de la posicion de desplazamiento de la pagina. Se quita del flujo normal del documento, es decir no afectara el disenio del resto de la pagina.
//La ubicaicon de los diferentes valores se calcula de manera relativa a la pantalla: left-0 y top-0 hace que este arriba a la izquierda.

//overflow-y-auto: si el contenido vertical es mas largo que la pantalla, el navegador automaticamente tiene que agregar barra de desplazamieto verticular.

/*
      <div
        className={`flex flex-col fixed left-0 top-0 overflow-y-auto h-full w-[365px]  bg-white ${
          isOpen ? "" : "hidden"
        } duration-500 `}
      >


      overlay original 

      
        <div
          onClick={toggleSidebar}
          className="overlay fixed w-full h-full left-[365px] bg-black opacity-80 "
        ></div>


        div nuevo:

              <div
        className={`flex flex-col fixed left-0 top-0 overflow-y-auto h-full w-[365px] bg-white 
        ${
          isOpen
            ? "transition-transform translate-x-0"
            : "transition-transform -translate-x-full"
        }`}
      >


En este caso, element-1 se mostrará encima de element-2 debido a su mayor valor de z-index.

Es importante tener en cuenta que el z-index solo tiene efecto en elementos que están posicionados (position: relative, position: absolute, position: fixed, o position: sticky). Si un elemento no tiene una posición especificada, el valor de z-index no tendrá ningún efecto.





*/
