import Link from "next/link";
import classes from "./cart.module.css";

const Cart = () => {
  return (
    <div>
      <Link href="/carrito" className={classes.cartbutton}>
        Carrito
      </Link>
    </div>
  );
};

export default Cart;
