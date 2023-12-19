import Link from "next/link";
import classes from "./cart.module.css";
import Image from "next/image";
import cartIcon from "../../../public/shopping-cart.png";


const Cart = () => {
  return (
    <div className={classes.cart}>
      <Link href="/cart" className={classes.cartbutton}>
        <Image src={cartIcon} alt="cart" width={30} height={30} />
      </Link>
    </div>
  );
};

export default Cart;
