import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Card from "../UI/Card";
import Link from "next/link";
import classes from "./Cart.module.css";
import Loader from "../UI/loader";
import Checkout from "./Checkout";

const Cart = () => {
  console.log("CARGANDO MODULO CART");
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorPurchase, setErrorPurchase] = useState("");
  //Este enfoque no sirvio porque necesito manejar un estado de error para C/U de los CartItem, entonces en lugar de pasarle el error, le pasamos la funcion y la ejecutamos en el hijo (CartItem)
  //const [errorAdd, setErrorAdd] = useState(null);
  //const [errorRemove, setErrorRemove] = useState(null);

  //Funcion para el boton (-)

  const cartItemRemoveHandler = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/delOne", {
        method: "DELETE",
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");

        throw new Error(errorMsg);
      }

      cartCtx.removeItem(id);

      //const responseData = await response.json();
    } catch (error) {
      //Es necesario volverlo a lanzar, asi lo agarramos en el catch del CartItem.
      throw error;
    }
  };

  //Funcion para el boton (+)

  const cartItemAddHandler = async (item) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/add", {
        method: "POST",
        body: JSON.stringify({
          productId: item.id,
          productName: item.name,
          productPrice: item.price,
          productStock: item.stock,
          quantity: 1,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        throw new Error(errorMsg);
      }

      cartCtx.addItem({ ...item, amount: 1 });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      throw error;
    }
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const orderCancelHandler = () => {
    setIsCheckout(false);
  };

  //Pasamos la data desde el checkout a Cart, desde este metodo. Es decir, subimos la data del hijo al padre.
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    //Y aca mandamos la request al backend. Donde queremos mandar tanto la userData con la info del carrito.
    //Aca podria igualarlo a response para agregar error handling. Si no lo hacemos asumimos que siempre sale bien
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/carts/purchase", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        setIsSubmitting(false);
        throw new Error(errorMsg);
      }

      const responseData = await response.json();

      setIsSubmitting(false);
      setDidSubmit(true);
      //Una vez que todo sale bien, limpiamos el carro (y el cart en la base de datos lo limpia la request)
      cartCtx.clearCart();
      console.log(responseData.message);
    } catch (error) {
      setErrorPurchase(error);
      //alert(error.message);
    }
  };

  //Funcion para el boton de eliminar

  const cartItemDeleteHandler = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
      const response = await fetch("http://localhost:3000/cartitems/del", {
        method: "DELETE",
        body: JSON.stringify({
          productId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");

        throw new Error(errorMsg);
      }

      cartCtx.deleteItem(id);

      //const responseData = await response.json();
    } catch (error) {
      //Es necesario volverlo a lanzar, asi lo agarramos en el catch del CartItem.
      throw error;
    }
  };

  if (cartCtx.isLoading) {
    return (
      <div className={classes.loadercontainer}>
        <Loader></Loader>
      </div>
    );
  }

  if (!hasItems && !didSubmit) {
    return (
      <Card>
        <div className={classes.cartcontainer}>
          <div className={classes.noitemstext}>
            You have no items in your cart!
          </div>
          <div className={classes.buttonitem}>
            <Link href="/" className={classes.motionbutton}>
              Back
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (cartCtx.error) {
    return (
      <Card>
        <div className={classes.cartcontainer}>
          <div className={classes.errortext}>Error: {cartCtx.error}</div>
          <div className={classes.buttonitem}>
            <Link href="/" className={classes.motionbutton}>
              Back
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  //Si no hay error, recien ahi mandamos a mapear los items del contexto en cartItem.
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            stock={item.stock}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onDelete={cartItemDeleteHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          >
            {item.name}
          </CartItem>
        );
      })}
    </ul>
  );

  //Boton de back y ordenar. Se renderizan solo si no se tooc el boton de ordenar.
  const cartActions = (
    <div className={classes.cartcontainer}>
      <div className={classes.buttonitem}>
        <Link href="/" className={classes.motionbutton}>
          Back
        </Link>
        {hasItems && (
          <button className={classes.motionbutton} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </div>
  );

  const isSubmittingContent = (
    <div className={classes.loadercontainer}>
      <Loader></Loader>
    </div>
  );

  const didSubmitContent = (
    <Card>
      <div className={classes.noitemstext}>Successfuly sent the order!</div>
      {cartActions}
    </Card>
  );

  const didFailSubmitContent = (
    <Card>
      <div className={classes.noitemstext}>Purchase order shipment failed!</div>
      {errorPurchase.message && (
        <div className={classes.noitemstext}>{errorPurchase.message}</div>
      )}
      <div className={classes.cartcontainer}>
        <div className={classes.buttonitem}>
          <Link href="/" className={classes.motionbutton}>
            Back
          </Link>
        </div>
      </div>
    </Card>
  );

  const cartContent = (
    <React.Fragment>
      <Card>
        {cartItems}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        {isCheckout && (
          <Checkout
            onConfirm={submitOrderHandler}
            onCancel={orderCancelHandler}
          ></Checkout>
        )}
        {!isCheckout && cartActions}
      </Card>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {!isSubmitting && !didSubmit && !errorPurchase && cartContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
      {!isSubmitting && !didSubmit && errorPurchase && didFailSubmitContent}
    </React.Fragment>
  );
};

export default Cart;
