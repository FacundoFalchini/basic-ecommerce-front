import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoIosCheckbox } from "react-icons/io";

const isEmpty = (value) => value.trim() === "";
//const isFourChars = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const [showCheckBox, setShowCheckBox] = useState(false);
  //Para la validadcion de la data, vamos a usar la forma simple de chequear todo cuando se hace el submit. La version mas completa de en cada keystroke esta en la seccion form. Lo mismo con el estado, se podria usar useReducer.
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
    phone: true,
    height: true,
  }); //Al igual que en la unidad de form, en si no deberian ser true al principio, pero para simplificar aca si.

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

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    //const enteredBuilding = buildingInputRef.current.value;
    //const enteredProvince = provinceInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredPhoneIsValid;

    //Si alguna no es true, entra este if y no se llama a la funcion que manda la request.
    //Esta es una validacion que hace el front... si pasa luego cuando se llama al onConfirm y se manda la request al back, tambien hay otra validacion con el middlware.
    if (!formIsValid) {
      return;
    }

    //Una vez que validamos todo, llamamos al metodo que tiene el boton de submit (en realidad no lo tiene el especificamenet, sino todo el elemento). Nomas que esta funcion es todo lo que se hace al tocar el boton.
    props.onConfirm({
      city: enteredCity,
      postalCode: +enteredPostalCode,
      street: enteredStreet,
      streetHeight: +enteredPhoneIsValid,
    });
  };

  return (
    <div
      class=" fixed left-0 top-0 flex h-screen w-full justify-center overflow-y-auto bg-black bg-opacity-40  "
      onClick={props.onCancel}
    >
      <div
        class=" z-10 my-20 h-[1000px]  max-w-[42%] grow rounded-[10px] bg-white font-sans "
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
            <select className="h-[31px] w-full cursor-pointer  rounded-[8px] border border-[#D5D9D9] bg-[#f7fafa]  px-[10px] text-[13px] font-normal shadow-md hover:bg-[#e3e6e6] hover:bg-opacity-70">
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
                formInputsValidity.name === false
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:border-[#CC0C39] focus:bg-white "
                  : ""
              }`}
            />
            {!formInputsValidity.name && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">Please enter a valid name.</p>
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
              ring-opacity-100 placeholder:text-sm focus:border-borderLogin  focus:bg-bgRingCreate focus:bg-opacity-20 focus:outline-none focus:ring          ${
                formInputsValidity.name === false
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:border-[#CC0C39] focus:bg-white  "
                  : ""
              }`}
            />
            {!formInputsValidity.street && (
              <div className="mb-2 mt-1.5 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">
                  Please enter a valid street address.
                </p>
              </div>
            )}
            <input
              type="text"
              id="buildingType"
              ref={buildingInputRef}
              placeholder="Apartment, suite, unit, building, floor, etc."
              className="w-full rounded border border-[#888c8c] p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring"
            />
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
                formInputsValidity.name === false
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:border-[#CC0C39] focus:bg-white "
                  : ""
              }`}
            />

            {!formInputsValidity.city && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">Please enter a valid city name.</p>
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
              className="w-full rounded border border-[#888c8c] p-1 ring-borderRingLogin  ring-opacity-100 placeholder:text-sm 	
              focus:border-borderLogin focus:bg-bgRingCreate focus:bg-opacity-20  focus:outline-none focus:ring"
            />
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
                formInputsValidity.postalCode == false
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:border-[#CC0C39] focus:bg-white  "
                  : ""
              }`}
            />
            {!formInputsValidity.postalCode && (
              <div className="mt-2 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">
                  Please enter a valid Zip Code or postal code.
                </p>
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
                formInputsValidity.postalCode == false
                  ? " border-2 border-[#CC0C39] ring-red-100  focus:border-[#CC0C39] focus:bg-white  "
                  : ""
              }`}
            />
            <p className="text-[12px]">May be used to assit delivery</p>
            {!formInputsValidity.phone && (
              <div className="mt-1 flex  text-[#BA0933]">
                <FaCircleExclamation className="mr-1.5 text-[18px]"></FaCircleExclamation>
                <p className="text-[12px] ">
                  Please enter a valid phone so we can call if there are any
                  issues with delivery.
                </p>
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
            className="mt-[14px] h-[29px] rounded-[7px] bg-[#FFD814] px-[10px] py-[1px] text-[13px] text-[#0F1111] hover:bg-[#f7ca00]"
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
