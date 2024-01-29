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
      <div className=" relative mr-4  flex max-h-[50px] w-auto items-center   justify-center rounded-sm border border-transparent px-3 leading-none hover:border-white ">
        <div className="flex max-h-[45px] flex-col items-center">
          <p className=" relative left-[2px] top-[2px] rounded-full font-bold text-[#F08804]">
            {total}
          </p>
          <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart>
        </div>
        <div className=" relative bottom-1 flex  h-[45px] items-end font-sans text-[14px] text-white">
          <p>Cart</p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
