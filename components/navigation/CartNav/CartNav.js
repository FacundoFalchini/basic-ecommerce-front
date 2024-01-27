import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const total = cartCtx.items.reduce(
    (total, product) => total + product.amount,
    0,
  );
  return (
    <Link href="/cart">
      <div className=" mr-4 flex  min-h-[58px] w-auto min-w-[66px]  items-center   justify-center rounded-sm border border-transparent leading-none hover:border-white ">
        <div className="flex flex-col items-center pb-2">
          <p className="rounded-full font-bold text-[#F08804]">{total}</p>
          <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart>
        </div>
        <div className="flex h-[58px] items-end pb-3 font-sans text-[14px] text-white">
          <p>Cart</p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
