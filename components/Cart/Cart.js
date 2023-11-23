//import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
//import Checkout from "./Checkout";
import Card from "../UI/Card";
import Link from "next/link";

const Cart = (props) => {
  //Y aca es donde hacemos que cuando tocamos el cart se vea el carrito actual
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  //const [isCheckout, setIsCheckout] = useState(false);
  //const [isSubmitting, setIsSubmitting] = useState(false);
  //const [didSubmit, setDidSubmit] = useState(false);

  //Estas 2 funciones son para que el click en + y - en el cart aumente o disminuye la cantidad.
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = async (item) => {
    try {
      const token = localStorage.getItem("token");
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

      //Solo si esta bien la request, tambien actualizamos el context

      //Y aca llamamos a la funcion de addItem del context
      cartCtx.addItem({ ...item, amount: 1 });

      const responseData = await response.json();
      console.log(responseData);

      // Manejar la respuesta aquí si es necesario
    } catch (error) {
      console.error(error);
      // Manejar el error aquí, como mostrar un mensaje al usuario
    }
  };

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

  */

  //Mapeamos todos los elementos del cart a elementos JSX cart items
  //Es decir, obtenemos los productos del CONTEXTO y los mapeamos para renderizar. La idea seria de alguna forma, cuando por primera vez entramos a la pagina o algo, mandar una request al backend para q nos mande todos los elementos q quedaron en el carrito
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
  /*
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  */

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* Le pasamos el mismo comportamiento a este boton para cerrar el Modal, que al del Close 
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        ></Checkout>
      )}
      */}
      <div className={classes.buttonContainer}>
        <Link href="/" className={classes.cartbutton}>
          Back
        </Link>
        {hasItems && <button className={classes.cartbutton}>Order</button>}
      </div>

      {/*<button className={classes.cartbutton} onClick={orderHandler}></button>*/}
    </React.Fragment>
  );

  /*
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

  //En lugar del wrapper ser un div, es un MODAL que renderiza el Cart como un OVERLAY cuando se clickea el boton.
  return (
    <Card onClose={props.onClose}>
      {/*       {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent} */}
      {cartModalContent}
    </Card>
  );
};

export default Cart;
