import classes from "./ProductItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const ProductItemForm = (props) => {
  //Es state es para ver si es valido o no el valor
  const [amountisValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > props.stock
    ) {
      setAmountIsValid(false);
      return;
    }

    //Aca solo tenemos la cantidad, nos falta mas data. Tonces pasamos la cantidad al elemento padre (productitem)
    props.onAddToCart(enteredAmountNumber);
  };

  //Para extraer la cantidad ingresada en el form. Se puede usar con two way binding con state. O usando REFS, como es un componente custom (INPUT), no alcanza con solamente creart la Ref, y agregar la ref propiedad al elemento. Pero es necesario agregarle al INPUT component envolver la funcion con React.forwardRef y agregar el elemento ref ademas de props.

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: props.stock,
          step: "1",
          defaultValue: props.stock === 0 ? 0 : 1,
          disabled: props.stock === 0,
        }}
      ></Input>
      <h1 className={classes.stockDisplay}>
        <span className={classes.stockText}>Available amount:</span>
        <span className={classes.stockAmount}>{props.stock}</span>
      </h1>
      <div className={classes.buttonContainer}>
        <button disabled={props.stock === 0}>+ Add</button>
      </div>
      {!amountisValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ProductItemForm;
