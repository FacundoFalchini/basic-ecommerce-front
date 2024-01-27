import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoIosCheckbox } from "react-icons/io";

//Valido, letras min y mayus, espacios en blanco (/s) y permite q el patron se repita (+)
const isValidCaracters = (name) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

const isOnlyNumbers = (postalCode) => {
  const regex = /^[0-9]+$/;
  return regex.test(postalCode);
};

const isNumberAndLetters = (building) => {
  // Expresión regular que acepta letras (mayúsculas y minúsculas), espacios y números
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(building);
};

const noBlankSpace = (name) => {
  if (name.trim() === name) {
    return true;
  } else {
    return false;
  }
};

const Checkout = (props) => {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [enteredNameErrorFront, setEnteredNameErrorFront] = useState("");
  const [enteredStreetErrorFront, setEnteredStreetErrorFront] = useState("");
  const [enteredCityErrorFront, setEnteredCityErrorFront] = useState("");
  const [enteredPostalErrorFront, setEnteredPostalErrorFront] = useState("");
  const [enteredPhoneErrorFront, setEnteredPhoneErrorFront] = useState("");
  const [enteredBuildingErrorFront, setEnteredBuildingErrorFront] =
    useState("");
  const [enteredProvinceErrorFront, setEnteredProvinceErrorFront] =
    useState("");

  const [selectedCountry, setSelectedCountry] = useState("Argentina");

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneInputRef = useRef();
  const buildingInputRef = useRef();
  const provinceInputRef = useRef();

  const handleClickCheck = () => {
    setShowCheckBox((prevState) => !prevState);
  };

  const handleSelect = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredBuilding = buildingInputRef.current.value;
    const enteredProvince = provinceInputRef.current.value;

    /*
    console.log(
      enteredName,
      enteredStreet,
      enteredCity,
      enteredPostalCode,
      enteredPhone,
      enteredBuilding,
      enteredProvince,
      selectedCountry,
    );
    */

    let isNameValid = true;
    let isStreetValid = true;
    let isCityValid = true;
    let isValidCode = true;
    let isValidPhone = true;
    let isValidBuilding = true;
    let isValidProvince = true;
    setEnteredNameErrorFront("");
    setEnteredStreetErrorFront("");
    setEnteredCityErrorFront("");
    setEnteredPostalErrorFront("");
    setEnteredPhoneErrorFront("");
    setEnteredBuildingErrorFront("");
    setEnteredProvinceErrorFront("");

    //Validacion front del name

    if (enteredName.trim().length < 1) {
      setEnteredNameErrorFront("Please enter a valid name.");
      isNameValid = false;
    } else if (!enteredName.includes(" ")) {
      setEnteredNameErrorFront("First and Last name are required.");
      isNameValid = false;
    } else if (!isValidCaracters(enteredName)) {
      setEnteredNameErrorFront("Only alphabetic characters are allowed.");
      isNameValid = false;
    } else if (!noBlankSpace(enteredName)) {
      setEnteredNameErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isNameValid = false;
    }

    //Validacion de street address:

    if (enteredStreet.trim().length < 1) {
      setEnteredStreetErrorFront("Please enter a valid street.");
      isStreetValid = false;
    } else if (!isNumberAndLetters(enteredStreet)) {
      setEnteredStreetErrorFront("Only alphabetic characters are allowed.");
      isStreetValid = false;
    } else if (!noBlankSpace(enteredStreet)) {
      setEnteredStreetErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isStreetValid = false;
    }

    //Validacion del building:

    if (!isNumberAndLetters(enteredBuilding)) {
      setEnteredBuildingErrorFront(
        "Only alphabetic characters and numbers are allowed.",
      );
      isValidBuilding = false;
    } else if (!noBlankSpace(enteredBuilding)) {
      setEnteredBuildingErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isValidBuilding = false;
    }

    //Validacion de city:

    if (enteredCity.trim().length < 1) {
      setEnteredCityErrorFront("Please enter a valid city.");
      isCityValid = false;
    } else if (!isValidCaracters(enteredCity)) {
      setEnteredCityErrorFront("Only alphabetic characters are allowed.");
      isCityValid = false;
    } else if (!noBlankSpace(enteredCity)) {
      setEnteredCityErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isCityValid = false;
    }

    //Validacion del province:

    if (!isNumberAndLetters(enteredProvince)) {
      setEnteredProvinceErrorFront(
        "Only alphabetic characters and numbers are allowed.",
      );
      isValidProvince = false;
    } else if (!noBlankSpace(enteredProvince)) {
      setEnteredProvinceErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isValidProvince = false;
    }

    //Validacion del postal code:
    if (enteredPostalCode.trim().length < 1) {
      setEnteredPostalErrorFront("Please enter a valid Postal code or Zip.");
      isValidCode = false;
    } else if (!isOnlyNumbers(enteredPostalCode)) {
      setEnteredPostalErrorFront("Only numbers and no blank spaces.");
      isValidCode = false;
    } else if (!noBlankSpace(enteredPostalCode)) {
      setEnteredPostalErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isValidCode = false;
    }

    //Validacion del phone:
    if (enteredPhone.trim().length < 1) {
      setEnteredPhoneErrorFront(`Please enter a valid phone so we can call if there are any
      issues with delivery.`);
      isValidPhone = false;
    } else if (!isOnlyNumbers(enteredPhone)) {
      setEnteredPhoneErrorFront("Only numbers and no blank spaces.");
      isValidPhone = false;
    } else if (!noBlankSpace(enteredPhone)) {
      setEnteredPhoneErrorFront(
        "No blank spaces allowed at the beginning or end.",
      );
      isValidPhone = false;
    }

    if (
      !isStreetValid ||
      !isCityValid ||
      !isNameValid ||
      !isValidCode ||
      !isValidPhone ||
      !isValidBuilding ||
      !isValidProvince
    ) {
      return;
    }

    //Una vez que validamos todo, llamamos al metodo que tiene el boton de submit (en realidad no lo tiene el especificamenet, sino todo el elemento). Nomas que esta funcion es todo lo que se hace al tocar el boton.
    props.onConfirm({
      country: selectedCountry,
      name: enteredName,
      street: enteredStreet,
      building: enteredBuilding,
      city: enteredCity,
      province: enteredProvince,
      postalCode: +enteredPostalCode,
      phoneNumber: +enteredPhone,
    });
  };

  return (
    <div
      class="fixed left-0 top-0 h-full max-h-none w-full flex-1   overflow-y-auto bg-black  bg-opacity-40"
      onClick={props.onCancel}
    >
      <div
        class=" relative left-1/2 top-1/2 z-10 my-[80px]   h-auto  max-h-none   max-w-[42%] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-white font-sans "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center  justify-between rounded-t-[10px] border-b border-b-[#D5D9D9] bg-[#F0F2F2] pl-[24px]  font-sans">
          <h4 className="py-[16px] text-[16px] font-bold leading-6 text-[#0F1111] ">
            Enter a shipping address
          </h4>
          <div
            className="mr-2 flex cursor-pointer  items-center rounded-[10px] border-[3px]  border-transparent p-3.5 active:border-[3px] active:border-[#C8F3FA]  "
            onClick={props.onCancel}
          >
            <RxCross1 className=" items-center  text-[16px] font-bold text-[#0F1111] hover:text-opacity-80"></RxCross1>
          </div>
        </div>
        <form
          onSubmit={confirmHandler}
          className="  w-full max-w-[580px] px-[24px] py-[16px] font-sans"
        >
          <h2 className="font-sans text-[24px] font-bold text-[#0F1111]">
            Add address
          </h2>
          <div className="mb-[4px] mt-[8px] flex h-[61px] justify-between overflow-hidden rounded-lg border border-[#50C4D9] bg-gradient-to-br from-[#EDFDFF] to-[#C8F3FA] px-[18px] py-[14px] text-[14px] font-bold text-[#0F1111] ">
            <span className="mx-[10%] flex items-center">
              Save time. Autofill your current location.
            </span>
            <button
              className="cursor-pointer rounded-[8px]  border border-[#D5D9D9] bg-[#FFF] px-[10px] text-center text-[13px] font-normal hover:bg-[#f7fafa]"
              type="button"
            >
              Autofill
            </button>
          </div>
          <div className="mb-[20px]  mt-[20px] font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="country"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              Country/Region
            </label>
            <select
              className="h-[31px] w-full cursor-pointer  rounded-[8px] border border-[#D5D9D9] bg-[#f7fafa]  px-[10px] text-[13px] font-normal shadow-md hover:bg-[#e3e6e6] hover:bg-opacity-70"
              onChange={handleSelect}
            >
              <option>Argentina</option>
              <option>Bolivia</option>
              <option>Brasil</option>
              <option>Chile</option>
              <option>Colombia</option>
              <option>Ecuador</option>
              <option>Guyana</option>
              <option>Paraguay</option>
              <option>Peru</option>
              <option>Surinam</option>
              <option>Uruguay</option>
              <option>Venezuela</option>
            </select>
          </div>
          <div className="mb-[20px]  font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="name"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              Full name (First and Last name)
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className={`h-[31px] w-full rounded  border border-solid border-[#888c8c] px-[7px]   py-[3px]  ring-borderRingLogin ring-opacity-100 	
              placeholder:text-sm focus:border-borderLogin focus:bg-bgRingCreate  focus:bg-opacity-20 focus:outline-none focus:ring ${
                enteredNameErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100   focus:!border-[#CC0C39] focus:bg-white "
                  : ""
              }`}
            />
            {enteredNameErrorFront !== "" && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredNameErrorFront}</p>
              </div>
            )}
          </div>

          <div className="mb-[20px]   font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="street"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              Street address
            </label>
            <input
              type="text"
              id="street"
              ref={streetInputRef}
              placeholder="Street address, P.O. box, company name, c/o"
              className={`mb-1 h-[31px] w-full rounded border border-solid border-[#888c8c] px-[7px]  py-[3px] ring-borderRingLogin 	
              ring-opacity-100 placeholder:text-sm focus:border-borderLogin   focus:bg-bgRingCreate focus:bg-opacity-20 focus:outline-none focus:ring          ${
                enteredStreetErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39]  focus:bg-white  "
                  : ""
              }`}
            />
            {enteredStreetErrorFront !== "" && (
              <div className="mb-2 mt-1.5 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredStreetErrorFront}</p>
              </div>
            )}
            <input
              type="text"
              id="buildingType"
              ref={buildingInputRef}
              placeholder="Apartment, suite, unit, building, floor, etc."
              className={` h-[31px] w-full rounded border border-solid border-[#888c8c] px-[7px]  py-[3px] ring-borderRingLogin 	
              ring-opacity-100 placeholder:text-sm focus:border-borderLogin   focus:bg-bgRingCreate focus:bg-opacity-20 focus:outline-none focus:ring          ${
                enteredBuildingErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39]  focus:bg-white  "
                  : ""
              }`}
            />
            {enteredBuildingErrorFront !== "" && (
              <div className="mb-2 mt-1.5 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredBuildingErrorFront}</p>
              </div>
            )}
          </div>

          <div className="mb-[20px]   font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="city"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              ref={cityInputRef}
              className={`h-[31px] w-full rounded border border-solid border-[#888c8c] px-[7px] py-[3px]  ring-borderRingLogin ring-opacity-100 	
              placeholder:text-sm focus:border-borderLogin focus:bg-bgRingCreate  focus:bg-opacity-20 focus:outline-none focus:ring          ${
                enteredCityErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39] focus:bg-white "
                  : ""
              }`}
            />

            {enteredCityErrorFront !== "" && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredCityErrorFront}</p>
              </div>
            )}
          </div>

          <div className="mb-[20px]   font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="province"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              State / Province / Region
            </label>
            <input
              type="text"
              id="province"
              ref={provinceInputRef}
              className={`h-[31px] w-full rounded border border-solid border-[#888c8c] px-[7px] py-[3px]  ring-borderRingLogin ring-opacity-100 	
              placeholder:text-sm focus:border-borderLogin focus:bg-bgRingCreate  focus:bg-opacity-20 focus:outline-none focus:ring          ${
                enteredProvinceErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39] focus:bg-white "
                  : ""
              }`}
            />

            {enteredProvinceErrorFront !== "" && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredProvinceErrorFront}</p>
              </div>
            )}
          </div>
          <div className="mb-[20px]   font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="postal"
              className="whitespace-nowrap pb-[2px] font-bold"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="postal"
              ref={postalCodeInputRef}
              className={`h-[31px] w-full rounded border border-solid border-[#888c8c] px-[7px] py-[3px]  ring-borderRingLogin ring-opacity-100 	
              placeholder:text-sm focus:border-borderLogin focus:bg-bgRingCreate  focus:bg-opacity-20 focus:outline-none focus:ring          ${
                enteredPostalErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39] focus:bg-white  "
                  : ""
              }`}
            />
            {enteredPostalErrorFront !== "" && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredPostalErrorFront}</p>
              </div>
            )}
          </div>
          <div className="mb-[20px]   font-sans text-[14px] text-[#0F1111]">
            <label
              htmlFor="phone"
              className=" whitespace-nowrap pb-[2px] font-bold"
            >
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              ref={phoneInputRef}
              className={`w-full rounded border border-[#888c8c] p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring ${
                enteredPhoneErrorFront !== ""
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:!border-[#CC0C39] focus:bg-white  "
                  : ""
              }`}
            />
            <p className="text-[12px]">May be used to assit delivery</p>
            {enteredPhoneErrorFront !== "" && (
              <div className="mt-1 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">{enteredPhoneErrorFront}</p>
              </div>
            )}
          </div>

          <div className="relative mb-[12px] flex  items-center text-[#0F1111]">
            <div
              className=" absolute h-[13px] w-[13px] rounded-sm border border-[#CCCCCC] "
              onClick={handleClickCheck}
            ></div>
            {showCheckBox && (
              <IoIosCheckbox
                className=" absolute left-[-2px]  text-[17px] text-[#0075ff]"
                onClick={handleClickCheck}
              ></IoIosCheckbox>
            )}

            <p className="ml-3 pl-[5px] text-[14px]">
              Use as my default address.
            </p>
          </div>

          <button
            className="mt-[14px] h-[29px] rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] text-[13px] text-[#0F1111] ring-borderRingLogin ring-opacity-100 hover:bg-[#f7ca00] active:border active:border-borderLogin active:outline-none active:ring"
            onClick={confirmHandler}
          >
            Use this address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
