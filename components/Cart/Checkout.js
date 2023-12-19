import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFourChars = (value) => value.trim().length === 4;

const Checkout = (props) => {
  //Para la validadcion de la data, vamos a usar la forma simple de chequear todo cuando se hace el submit. La version mas completa de en cada keystroke esta en la seccion form. Lo mismo con el estado, se podria usar useReducer.
  const [formInputsValidity, setFormInputsValidity] = useState({
    height: true,
    street: true,
    city: true,
    postalCode: true,
  }); //Al igual que en la unidad de form, en si no deberian ser true al principio, pero para simplificar aca si.

  const heightInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredHeight = heightInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredHeightIsValid = !isEmpty(enteredHeight);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFourChars(enteredPostalCode);

    setFormInputsValidity({
      height: enteredHeightIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredHeightIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

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
      streetHeight: +enteredHeight,
    });
  };

  //En funcion de la validez o no de los datos, el className para cada div en cada input cambia.
  //Ej: Si formInputsValidity.height es verdadero, heightControlClasses = classes.control
  //                                 es falso, heightControlClasses = classes.control y classes.invalid, ambas separadas por un espacio.
  const heightControlClasses = `${classes.control} ${
    formInputsValidity.height ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (4 characters long)!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={heightControlClasses}>
        <label htmlFor="height">Street Height</label>
        <input type="text" id="height" ref={heightInputRef} />
        {!formInputsValidity.height && (
          <p>Please enter a valid street height!</p>
        )}
      </div>

      <div className={classes.actions}>
        {/* Es tipo boton para que este de cancelar no aplique como submit para el form */}
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
