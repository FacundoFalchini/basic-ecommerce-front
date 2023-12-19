import { useState, useEffect, Fragment } from "react";
import classes from "./CartItem.module.css";
import Image from "next/image";

//import cartIcon from "../../public/bin.ping";

const CartItem = (props) => {
  const [localremove, setLocalErrorRemove] = useState(""); // Estado de error local
  const [localadd, setLocalErrorAdd] = useState("");
  const [localdelete, setLocalErrorDelete] = useState("");
  const [showErrorAdd, setShowErrorAdd] = useState(false);
  const [showErrorRemove, setShowErrorRemove] = useState(false);
  const [showErrorDelete, setShowErrorDelete] = useState(false);

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

  const handleDelete = async () => {
    try {
      await props.onDelete();
      setLocalErrorDelete("");
    } catch (e) {
      setLocalErrorDelete(e.message);
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

  useEffect(() => {
    if (localdelete) {
      setShowErrorRemove(true);

      const timer = setTimeout(() => {
        setShowErrorDelete(false);
        setLocalErrorDelete("");
      }, 3000); // 3000 milisegundos = 3 segundos

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [localdelete]);

  const price = `$${props.price.toFixed(2)}`;
  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {props.amount}</span>
          </div>
        </div>
        <div className={classes.cartContainerAll}>
          <div className={classes.actions}>
            <button onClick={handleRemove}>−</button>
            <button onClick={handleAdd}>+</button>
            <button onClick={handleDelete}>
              <Image src="/bin.png" alt="profile" width={20} height={20} />
            </button>
          </div>
          <p className={classes.description}>available: {props.stock}</p>
        </div>
      </li>
      {showErrorRemove && (
        <div className={classes.cartItemError}>Remove error: {localremove}</div>
      )}
      {showErrorAdd && (
        <div className={classes.cartItemError}>Add error: {localadd}</div>
      )}
      {showErrorDelete && (
        <div className={classes.cartItemError}>Delete error: {localdelete}</div>
      )}
    </Fragment>
  );
};

export default CartItem;
