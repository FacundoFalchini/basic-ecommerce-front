import classes from "./Productitem.module.css";
import ProductItemForm from "./ProductItemForm";
//import CartContext from "../../../store/cart-context";
//import { useContext } from "react";

const ProductItem = (props) => {
  //Una lista de item, es un wrapper alrededor de cada meal item, porque cada mealitem se renderizan de manera unorded.

  const price = `$${props.price.toFixed(2)}`;

  //Aca si esta toda la data. Asique se pasa al form por props y traemos la cantidad hacia aca (de hijo a padre). Y en este componente si accedemos al context.
  //const cartCtx = useContext(CartContext);
  //const addToCartHandler = (amount) => {
  //Y aca llamamos a la funcion de addItem del context
  // cartCtx.addItem({
  //   id: props.id,
  //   name: props.name,
  //   amount: amount,
  //  price: props.price,
  //});
  //};

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
          //onAddToCart={addToCartHandler}
        ></ProductItemForm>
      </div>
    </li>
  );
};

export default ProductItem;
