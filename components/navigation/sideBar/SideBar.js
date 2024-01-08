import { useState, Fragment } from "react";
import Image from "next/image";
import lineasIcon from "../../../public/lineas.png";
import { RxCross1 } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`flex flex-col fixed left-0 top-0 overflow-y-auto h-full w-[365px]  bg-white ${
          isOpen ? "" : "hidden"
        } duration-500 `}
      >
        <p className=" flex items-center w-full bg-optionsBar text-white font-bold font-sans px-[36px] text-[19px] py-3  h-[50px]">
          <HiUserCircle className="w-[27px] h-[25px] mr-2.5"></HiUserCircle>
          Hola, Facundo
        </p>

        <div
          onClick={toggleSidebar}
          className="overlay fixed w-full h-full left-[365px] bg-black opacity-80 "
        ></div>

        <RxCross1
          className="text-white fixed  top-5 left-[370px] cursor-pointer w-[20px] h-[20px] "
          onClick={toggleSidebar}
        ></RxCross1>

        <ul>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
            Tendencias
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200 ">
            Mas Vendidos
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Nuevos Lanzamientos
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Productos del momento
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] pl-[36px] text-[18px] font-bold font-sans">
            Contenido Y Dispositivos Digitales
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200 ">
            Prime Video
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black "></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Site Music
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Echo y Alexa
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Fire Tablets
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Fire TV
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            E-readres Kindle y Libros
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Libros y Audible Originals
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Site Photos e Impresiones
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Site Appstore
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
            Buscar Por Departamento
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Ropa, zapatos y joyeria
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Site Fresh
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Libros
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Peliculas, musica y juegos
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Ver Todo
            <IoIosArrowDown className="ml-1 w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
            Programas y Funcionalidades
          </li>
          <li className=" flex items-center justify-between  py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Entrega el mismo dia
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between  py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Whole Foods Market
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between  py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Atencion medica y farmacia
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center justify-between  py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Tiendas fisicas del Site
            <IoIosArrowForward className="w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowForward>
          </li>
          <li className=" flex items-center py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Ver Todo
            <IoIosArrowDown className="ml-1 w-[20px] h-[15px] text-grayText hover:text-black"></IoIosArrowDown>
          </li>
          <li className="h-[44px] pb-[2px] pt-[13px] px-[36px] text-[18px] font-bold font-sans">
            Ayuda y Configuracion
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Tu Cuenta
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Espaniol
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Estados Unidos
          </li>
          <li className=" py-[13px] px-[36px] text-[14px] font-sans cursor-pointer hover:bg-zinc-200">
            Salir
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

//Position te usa para controlar como se ubica un elemento en el DOM.

//FIXED: se usa para posicionar un elemento de manera RELATIVA al la pantalla del buscador.  Esto mantiene el elemento en una posicion fija, independiente de la posicion de desplazamiento de la pagina. Se quita del flujo normal del documento, es decir no afectara el disenio del resto de la pagina.
//La ubicaicon de los diferentes valores se calcula de manera relativa a la pantalla: left-0 y top-0 hace que este arriba a la izquierda.

//overflow-y-auto: si el contenido vertical es mas largo que la pantalla, el navegador automaticamente tiene que agregar barra de desplazamieto verticular.

/*

w-[365px]


          <div
            onClick={toggleSidebar}
            className="overlay fixed inset-0 bg-black opacity-50 "
          ></div>

      {isOpen && (
        <>
          <div
            className={`fixed left-0 top-0 h-screen bg-white  overflow-y-auto shadow-lg  ${
              isOpen ? "w-[365px]" : "w-10"
            } duration-300 `}
          >

            <p className="p-4">Opción 1</p>
            <p className="p-4">Opción 2</p>
            <p className="p-4">Opción 3</p>
          </div>

          <div
            onClick={toggleSidebar}
            className="overlay fixed inset-0 bg-black opacity-50 "
          ></div>
        </>
      )}

*/
