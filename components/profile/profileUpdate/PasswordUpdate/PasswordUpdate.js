import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProfileContext from "@/store/profile-context";
import Loader from "../../../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Image from "next/image";
import Profile from "../../../navigation/ProfileNav/ProfileNav";
import StartingFooter from "../../../Footers/StartingFooter";
import Language from "../../../navigation/LanguageNav/LanguageNav";
import OptionsBar from "../../../navigation/OptionsBar/OptionsBar";
import SearchBar from "../../../navigation/SearchBar/SearchBar";
import Orders from "../../../navigation/PurchasesNav/PurchasesNav";
import Cart from "../../../navigation/CartNav/CartNav";
import logoSite from "../../../../public/logoSite.png";
import { IoIosArrowForward } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";

const noBlankSpacePass = (password) => {
  if (password.includes(" ")) {
    return false;
  } else {
    return true;
  }
};

const PasswordUpdate = () => {
  const router = useRouter();
  const [errorRequest, setErrorRequest] = useState("");
  const [correctRequest, setCorrectRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const newPasswordInputRef = useRef();
  const reenterPasswordInputRef = useRef();
  const passwordInputRef = useRef();
  const profileCtx = useContext(ProfileContext);

  //ESTO ES PARA ACTUALIZAR TODO ASI SE VE BIEN LOS NOMBRES EN LA BARRA, ETC.
  useEffect(() => {
    // Verificar si el reload se hizo a través del router
    const reloadViaRouter = sessionStorage.getItem("reloadViaRouter");

    if (reloadViaRouter) {
      // Limpia la marca de recarga del sessionStorage
      sessionStorage.removeItem("reloadViaRouter");
      setCorrectRequest(true);
    }
  }, [router.asPath]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredReenterPassword = reenterPasswordInputRef.current.value;

    if (enteredPassword.length === 0) {
      setErrorRequest("Enter your password");
      setCorrectRequest(false);
      newPasswordInputRef.current.value = "";
      passwordInputRef.current.value = "";
      reenterPasswordInputRef.current.value = "";
      return;
    }

    if (enteredNewPassword.trim().length < 7) {
      setErrorRequest("A minimum of 7 characters is required.");
      setCorrectRequest(false);
      return;
    } else if (!noBlankSpacePass(enteredNewPassword)) {
      setErrorRequest("Incorrect password format (no spaces allowed)");
      setCorrectRequest(false);
      return;
    }

    if (
      enteredNewPassword.length === 0 ||
      enteredReenterPassword.length === 0
    ) {
      setErrorRequest("Enter both new passwords");
      setCorrectRequest(false);
      newPasswordInputRef.current.value = "";
      passwordInputRef.current.value = "";
      reenterPasswordInputRef.current.value = "";
      return;
    }

    if (enteredNewPassword != enteredReenterPassword) {
      setErrorRequest("New passwords do not match");
      setCorrectRequest(false);
      newPasswordInputRef.current.value = "";
      passwordInputRef.current.value = "";
      reenterPasswordInputRef.current.value = "";
      return;
    }

    //Backend hace el error de que es la misma contrasenia y debo agregar el error de que la contrasenia actual q mandamos tambien (la tengo q agregar) es erronea

    //Si pasa las dos anteriores, mandamos request.
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/me", {
        method: "PUT",
        body: JSON.stringify({
          password: enteredNewPassword,
          currentPassword: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        setCorrectRequest(false);
        newPasswordInputRef.current.value = "";
        passwordInputRef.current.value = "";
        reenterPasswordInputRef.current.value = "";
        throw new Error(errorMsg);
      }

      newPasswordInputRef.current.value = "";
      passwordInputRef.current.value = "";
      reenterPasswordInputRef.current.value = "";

      //Si la request pasa el if anterior, no hay mensaje de error y lo reseteamos por si quedo un error del submit anterior.
      setErrorRequest("");

      // Si la solicitud es exitosa, establecer la marca de recarga
      sessionStorage.setItem("reloadViaRouter", "true");
      // Luego recargar el componente
      router.reload();
    } catch (error) {
      setErrorRequest(error.message);
    }
  };

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
      <div className="flex h-[55px] w-full items-center space-x-2 bg-navColor">
        <Link href="/">
          <div className=" ml-4 flex h-[45px] w-auto cursor-pointer items-center justify-center   rounded-sm border border-transparent  hover:border-white">
            <Image
              src={logoSite}
              alt="cart"
              width={90}
              height={90}
              className="mt-[13px]"
            />
          </div>
        </Link>
        <SearchBar></SearchBar>
        <Language></Language>
        <Profile></Profile>
        <Orders></Orders>
        <Cart></Cart>
      </div>

      <OptionsBar></OptionsBar>
      <div className="flex justify-center px-[83px] pb-[50px]  pt-[14px]">
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
            <p className="font-sans text-[#C45500]">Change your password</p>
          </div>

          {correctRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-[56px] w-full   items-center rounded-xl border-[2px] border-l-[12px] border-solid border-[#067D62] bg-white px-[18px] pb-[18px] pt-[14px] font-sans text-[14px] text-[#0f1111]
           "
            >
              <FaCheckCircle className="mr-1.5  align-top text-[18px] text-[#067D62]"></FaCheckCircle>
              Password updated.
            </div>
          )}

          {errorRequest && (
            <div
              className="mb-[5px] mt-[8px] flex h-20 w-full   rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20 "
            >
              <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>
              <div className="flex flex-col justify-center font-sans    ">
                <h1 className="text-lg  text-[#BA0933] ">
                  There was a problem
                </h1>
                <h2 className="  text-xs text-blackText ">{errorRequest}</h2>
              </div>
            </div>
          )}
          <h1 className="mb-[8px] font-sans text-[28px] font-normal text-[#0F1111]">
            Change your password
          </h1>
          <div className="flex flex-col rounded-[8px] border border-solid border-[#D5D9D9] px-[18px] py-[14px] font-sans">
            <div className="w-full text-[13px]">
              To change the password for your Amazon account, use this form.
            </div>
            <div className="mt-[22px] w-full">
              <form onSubmit={submitHandler}>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-[#111111]">
                  Current password:
                </div>
                <div className="mb-[22px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-[#a6a6a6] px-[7px] py-[3px] ring-borderRingLogin  focus:border focus:border-borderLogin focus:outline-none focus:ring"
                    type="password"
                    ref={passwordInputRef}
                  ></input>
                </div>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-[#111111]">
                  New password:
                </div>
                <div className="mb-[22px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-[#a6a6a6] px-[7px] py-[3px] ring-borderRingLogin  focus:border focus:border-borderLogin focus:outline-none focus:ring"
                    type="password"
                    ref={newPasswordInputRef}
                  ></input>
                </div>
                <div className="pb-[2px] pl-[2px]  text-[13px] font-bold text-[#111111]">
                  Reenter new password:
                </div>
                <div className="mb-[22px]">
                  <input
                    className="m-[1px] w-[154px] rounded-[3px] border border-solid border-[#a6a6a6] px-[7px] py-[3px] ring-borderRingLogin  focus:border focus:border-borderLogin focus:outline-none focus:ring"
                    ref={reenterPasswordInputRef}
                    type="password"
                  ></input>
                </div>

                {!isLoading && (
                  <button
                    className="mb-[22px] mt-[14px] flex h-[31px] w-[102px] cursor-pointer items-center rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] font-sans text-[13px] text-[#0F1111] ring-borderRingLogin  hover:bg-[#f7ca00] active:border active:border-borderLogin active:outline-none active:ring"
                    onClick={submitHandler}
                  >
                    Save Changes
                  </button>
                )}
                {isLoading && <Loader />}

                <div>
                  <span className="font-sans text-[13px] font-bold  text-[#111111]">
                    Lost or stolen device? Unusual activity?
                  </span>
                </div>
                <div className="mb-[14px] font-sans text-[13px] text-[#111111]">
                  <a className="cursor-pointer font-sans text-[13px] text-[#0066C0] hover:text-[#C45500] hover:underline">
                    Secure your account
                  </a>{" "}
                  instead
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <StartingFooter></StartingFooter>
    </div>
  );
};

export default PasswordUpdate;
