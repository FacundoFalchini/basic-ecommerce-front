import classes from "./ProductItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState, useContext, useEffect } from "react";
import CartContext from "../../../store/cart-context";

const ProductItemForm = (props) => {
  //Es state es para ver si es valido o no el valor
  const [amountisValid, setAmountIsValid] = useState(true);
  const [amountisValidStock, setAmountIsValidStock] = useState("");
  const [showError, setShowError] = useState(false);
  const amountInputRef = useRef();

  const cartCtx = useContext(CartContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    const itemEncontrado = cartCtx.items.find((item) => item.id === props.id);
    console.log(cartCtx.items);
    console.log(props.id);
    console.log(itemEncontrado.amount);

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > props.stock
    ) {
      setAmountIsValid(false);
      return;
    }

    const sum = enteredAmountNumber + itemEncontrado.amount;
    console.log(sum);

    if (sum > props.stock) {
      console.log("entramos");
      setAmountIsValidStock(
        "The quantity in your cart of this product exceeds the available stock",
      );
      return;
    }
    setAmountIsValidStock("");

    //Aca solo tenemos la cantidad, nos falta mas data. Tonces pasamos la cantidad al elemento padre (productitem)
    props.onAddToCart(enteredAmountNumber);
  };

  //Este useEffect es para hacer que el msg de error desaparezca a los 3 segundos.
  useEffect(() => {
    if (amountisValidStock) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setAmountIsValidStock("");
      }, 3000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [amountisValidStock]);

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
      {!amountisValid && <p>Please enter a valid amount ({props.stock}).</p>}
      {showError && (
        <div className={classes.productItemError}>
          Add error: {amountisValidStock}
        </div>
      )}
    </form>
  );
};

export default ProductItemForm;
