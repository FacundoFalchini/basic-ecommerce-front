import classes from "./Productitem.module.css";
import ProductItemForm from "./ProductItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const ProductItem = (props) => {
  //Una lista de item, es un wrapper alrededor de cada meal item, porque cada mealitem se renderizan de manera unorded.

  const price = `$${props.price.toFixed(2)}`;

  //Aca si esta toda la data. Asique se pasa al form por props y traemos la cantidad hacia aca (de hijo a padre). Y en este componente si accedemos al context.
  const cartCtx = useContext(CartContext);
  const addToCartHandler = async (amount) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/cartitems/add", {
        method: "POST",
        body: JSON.stringify({
          productId: props.id,
          productName: props.name,
          productPrice: props.price,
          productStock: props.stock,
          quantity: amount,
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
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
        stock: props.stock,
      });

      //const responseData = await response.json();

      // Manejar la respuesta aquí si es necesario
    } catch (error) {
      console.error(error);
      // Manejar el error aquí, como mostrar un mensaje al usuario
    }
  };

  return (
    <li className={classes.product}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <ProductItemForm
          id={props.id}
          stock={props.stock}
          onAddToCart={addToCartHandler}
        ></ProductItemForm>
      </div>
    </li>
  );
};

export default ProductItem;
