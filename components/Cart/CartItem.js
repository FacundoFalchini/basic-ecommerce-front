import { useState, useEffect } from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const [localremove, setLocalErrorRemove] = useState(""); // Estado de error local
  const [localadd, setLocalErrorAdd] = useState("");
  const [showErrorAdd, setShowErrorAdd] = useState(false);
  const [showErrorRemove, setShowErrorRemove] = useState(false);

  //Y asi, para que cada uno tenga su estado de error local.
  const handleRemove = async () => {
    try {
      await props.onRemove();
      setLocalErrorRemove("");
    } catch (e) {
      setLocalErrorRemove(e.message);
    }
  };

  const handleAdd = async () => {
    try {
      await props.onAdd();
      setLocalErrorAdd("");
    } catch (e) {
      setLocalErrorAdd(e.message);
    }
  };

  //Este useEffect es para hacer que el msg de error desaparezca a los 3 segundos.
  useEffect(() => {
    if (localadd) {
      setShowErrorAdd(true);

      const timer = setTimeout(() => {
        setShowErrorAdd(false);
        setLocalErrorAdd("");
      }, 3000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localadd]);

  //Este useEffect es para hacer que el msg de error desaparezca a los 3 segundos.
  useEffect(() => {
    if (localremove) {
      setShowErrorRemove(true);

      const timer = setTimeout(() => {
        setShowErrorRemove(false);
        setLocalErrorRemove("");
      }, 3000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localremove]);

  const price = `$${props.price.toFixed(2)}`;
  return (
    <div className={classes.cartContainerAll}>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {props.amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemove}>−</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </li>
      {showErrorRemove && (
        <div className={classes.cartItemError}>Remove error: {localremove}</div>
      )}
      {showErrorAdd && (
        <div className={classes.cartItemError}>Add error: {localadd}</div>
      )}
    </div>
  );
};

export default CartItem;
