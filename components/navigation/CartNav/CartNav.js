import Link from "next/link";
//import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import cartIcon from "../../../public/NewCart.png";
import Image from "next/image";

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
          <p className=" relative left-[3px] top-[4px] rounded-full text-[15px] font-bold text-[#F08804]">
            {total}
          </p>
          {/* <FaShoppingCart className="text-[25px] text-white"></FaShoppingCart> */}
          <Image
            src={cartIcon}
            width={35}
            height={35}
            alt="Shopping cart"
            className="relative bottom-[8px]"
          ></Image>
        </div>
        <div className=" relative bottom-[7px] left-1 flex  h-[45px] items-end font-sans text-[14px] text-white">
          <p>Cart</p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
