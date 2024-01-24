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
import { FaExclamationTriangle } from "react-icons/fa";

const ProfileUpdate = () => {
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
            <p className="font-sans text-[#C45500]">Login & Security</p>
          </div>
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-[#0F1111]">
            Login & Security
          </h1>
          <div className="rounded-[8px] border border-solid border-[#D5D9D9]">
            <ul>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Name
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-[#0F1111] ">
                      {profileCtx.name}
                    </h1>
                  </div>
                  <Link href="/profile/update/name" className="grow">
                    <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                      Edit
                    </button>
                  </Link>
                </div>
              </li>

              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Email
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-[#0F1111] ">
                      {profileCtx.email}
                    </h1>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Edit
                  </button>
                </div>
              </li>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Primary mobile number
                    </h1>
                    <div className="flex">
                      <div className="relative ml-[6px] mt-2 flex h-[9px] w-2 items-center justify-center bg-black">
                        <FaExclamationTriangle className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 transform text-[18px] text-[#ffaf38]" />
                      </div>

                      <h1 className="ml-3 w-full font-sans  text-[12px] leading-[15px] text-[#0F1111] ">
                        For stronger account security, add your mobile number.
                        If there is an unusual sign-in, we will text you and
                        veify that it is really you.
                      </h1>
                    </div>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Add
                  </button>
                </div>
              </li>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Passkey
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-[#0F1111] ">
                      Sign in the same way you unlock your device, by using
                      face, fingerprint or PIN.
                    </h1>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Edit
                  </button>
                </div>
              </li>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Password
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-[#0F1111] ">
                      *********
                    </h1>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Edit
                  </button>
                </div>
              </li>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      2-step verification
                    </h1>
                    <div className="flex">
                      <div className="relative ml-[6px] mt-2 flex h-[9px] w-2 items-center justify-center bg-black">
                        <FaExclamationTriangle className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 transform text-[18px] text-[#ffaf38]" />
                      </div>

                      <h1 className="ml-3 w-full font-sans  text-[12px] leading-[15px] text-[#0F1111] ">
                        Add a layer of security. Require a code in addition to
                        your password.
                      </h1>
                    </div>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Turn on
                  </button>
                </div>
              </li>
              <li className="border-b border-b-[#D5D9D9] px-[18px] py-[14px]">
                <div className="flex ">
                  <div className=" mb-[12px] mr-[25px] flex w-[64%] shrink-0 flex-col xl-[1240px]:w-[75%]">
                    <h1 className="mb-[4px] w-full truncate font-sans text-[14px] font-bold text-[#0F1111]">
                      Compromised account?
                    </h1>
                    <h1 className="w-full font-sans text-[14px]  text-[#0F1111] ">
                      Take steps like changing your password and signing out
                      everywhere.
                    </h1>
                  </div>
                  <button className="mb-[12px] h-[29px] w-full cursor-pointer truncate rounded-[8px] border border-solid border-[#d5d9d9] bg-[#FFF] font-sans text-[13px] text-[#0F1111] shadow-md ring-borderRingLogin hover:bg-[#d5d9d9] hover:bg-opacity-15 focus:border focus:border-borderLogin focus:outline-none focus:ring">
                    Start
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <StartingFooter></StartingFooter>
    </div>
  );
};

export default ProfileUpdate;
