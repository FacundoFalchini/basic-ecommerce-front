import Link from "next/link";
//import classes from "./cart.module.css";
import Image from "next/image";
import cartIcon from "../../../public/shopping-cart.png";

//min-w-[66px]
const Cart = () => {
  return (
    <div className=" flex items-center  justify-center mr-4 min-h-[58px] w-auto min-w-[66px]   border border-transparent hover:border-white rounded-sm ">
      <Link href="/cart">
        <Image src={cartIcon} alt="cart" width={40} height={40} />
      </Link>
    </div>
  );
};

export default Cart;
