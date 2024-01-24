import { useContext } from "react";
import Link from "next/link";
import ProfileContext from "@/store/profile-context";
import Loader from "../../UI/loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Image from "next/image";
import Profile from "../../navigation/profile/profile";

import StartingFooter from "../../footers/startingFooter";
import Language from "../../navigation/language/language";
import OptionsBar from "../../navigation/optionsBar/OptionsBar";
import SearchBar from "../../navigation/searchBar/SearchBar";
import Orders from "../../navigation/purchases/purchases";
import Cart from "../../navigation/cart/cart";
import logo from "../../../public/logo.png";
import { IoIosArrowForward } from "react-icons/io";

const NameUpdate = () => {
  const profileCtx = useContext(ProfileContext);

  /*
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    authCtx.logout();
    //Se puede redigirigar aca o, tratarlo con lo de paginas protegidas.
    router.push("/");
  };
  */

  if (profileCtx.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (profileCtx.error) {
    return (
      <div className=" flex h-screen min-w-[1200px]  flex-col  items-center bg-white">
        <div
          className="mt-20 flex h-20 w-full  max-w-96 rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20"
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>

          <div className="flex flex-col justify-center    ">
            <h1 className="font-sans  text-lg text-[#BA0933]">
              A problem occurred
            </h1>
            <h2 className="  font-sans text-xs text-blackText">
              {profileCtx.error}
            </h2>
          </div>
        </div>
        <Link href="/">
          <div className="mt-[14px] flex h-[29px] items-center rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] font-sans text-[13px] text-[#0F1111] hover:bg-[#f7ca00]">
            Back
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-w-[1200px]  bg-white">
      <div className="flex min-h-16 w-full items-center bg-navColor">
        <Link href="/">
          <div className=" ml-4 flex  min-h-[58px] w-auto min-w-[66px] items-center justify-center   rounded-sm border border-transparent hover:border-white">
            <Image src={logo} alt="cart" width={40} height={40} />
          </div>
        </Link>
        <SearchBar></SearchBar>
        <Language></Language>
        <Profile></Profile>
        <Orders></Orders>
        <Cart></Cart>
      </div>

      <OptionsBar></OptionsBar>
      <div className="flex justify-center px-[83px] pb-[130px]  pt-[14px]">
        <div className="mx-auto my-0 flex  max-w-[600px] grow flex-col">
          <div className="mb-[16px] mt-[8px] flex w-full  items-center text-[14px] ">
            <Link href="/profile">
              <p className="cursor-pointer font-sans text-[#007185] hover:text-[#C45500] hover:underline">
                Your Account
              </p>
            </Link>
            <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
            <Link href="/profile/update">
              <p className="cursor-pointer font-sans text-[#007185] hover:text-[#C45500] hover:underline">
                Login & Security
              </p>
            </Link>
            <IoIosArrowForward className=" mx-1 text-[12px] text-[#555555]"></IoIosArrowForward>
            <p className="font-sans text-[#C45500]">Change your name</p>
          </div>

          {true && (
            <div
              className="mb-[5px] mt-[8px] flex h-20 w-full   rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20 "
            >
              <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>
              <div className="flex flex-col justify-center font-sans    ">
                <h1 className="text-lg  text-[#BA0933] ">
                  There was a problem
                </h1>
                <h2 className="  text-xs text-blackText ">errorRequest</h2>
              </div>
            </div>
          )}
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-[#0F1111]">
            Change your name
          </h1>
          <div className="flex flex-col rounded-[8px] border border-solid border-[#D5D9D9] px-[18px] py-[14px] font-sans">
            <div className="w-full text-[13px]">
              If you want to change the name associated with your Site customer
              account, you may do so below. Be sure to click the{" "}
              <strong>Save Changes</strong> button when you are done.
            </div>
            <div className="mt-[22px] w-full">
              <form>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-[#111111]">
                  New name
                </div>
                <div className="mb-[22px]">
                  <input className="m-[1px] w-[154px] rounded-[3px] border border-solid border-[#a6a6a6] px-[7px] py-[3px] ring-borderRingLogin  focus:border focus:border-borderLogin focus:outline-none focus:ring"></input>
                </div>

                <button className="mt-[14px] flex h-[31px] w-[102px] cursor-pointer items-center rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] font-sans text-[13px] text-[#0F1111] ring-borderRingLogin  hover:bg-[#f7ca00] focus:border focus:border-borderLogin focus:outline-none focus:ring">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <StartingFooter></StartingFooter>
    </div>
  );
};

export default NameUpdate;
