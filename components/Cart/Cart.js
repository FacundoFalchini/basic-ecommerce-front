import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Card from "../UI/Card";
import Link from "next/link";
import classes from "./Cart.module.css";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
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
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          >
            {item.name}
          </CartItem>
        );
      })}
    </ul>
  );

  //Y el return exitoso.
  return (
    <React.Fragment>
      <Card>
        {cartItems}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.cartcontainer}>
          <div className={classes.buttonitem}>
            <Link href="/" className={classes.motionbutton}>
              Back
            </Link>
            {hasItems && (
              <button className={classes.motionbutton}>Order</button>
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Cart;

/*
Esto es para efectuar la compra. 

  const orderHandler = () => {
    setIsCheckout(true);
  };

  //Pasamos la data desde el checkout a Cart, desde este metodo. Es decir, subimos la data del hijo al padre.
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    //Y aca mandamos la request al backend. Donde queremos mandar tanto la userData con la info del carrito.
    //Aca podria igualarlo a response para agregar error handling. Si no lo hacemos asumimos que siempre sale bien
    await fetch(
      "https://react-http-37429-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      },
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    //Una vez que todo sale bien, limpiamos el carro
    cartCtx.clearCart();
  };


         Le pasamos el mismo comportamiento a este boton para cerrar el Modal, que al del Close 
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        ></Checkout>
      )}


      esto en el return final

                  {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent} 


              Tambien es para cuando se manda la orden. 

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfuly sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );


  */
