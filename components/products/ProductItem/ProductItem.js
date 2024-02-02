import ProductItemForm from "./ProductItemForm";
import CartContext from "../../../store/cart-context";
import { useContext, useState, useEffect } from "react";
import prueba from "../../../public/address.png";
import Image from "next/image";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Loader from "@/components/UI/Loader";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `${props.price.toFixed(2)}`;
  const [localadd, setLocalErrorAdd] = useState("");
  const [showErrorAdd, setShowErrorAdd] = useState(false);

  const addToCartHandler = async (amount) => {
    try {
      const token = localStorage.getItem("token");
      //const token = localStorage.getItem("sadasdasd12312");
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

      setLocalErrorAdd("");
    } catch (error) {
      setLocalErrorAdd(error.message);
    }
  };

  useEffect(() => {
    if (localadd) {
      setShowErrorAdd(true);

      const timer = setTimeout(() => {
        setShowErrorAdd(false);
        setLocalErrorAdd("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [localadd]);

  if (cartCtx.isLoading) {
    return (
      <div className="h- flex items-center justify-center bg-white">
        <Loader></Loader>
      </div>
    );
  }

  //En caso de que el fetch que hace el context de error, renderizamos el error.
  if (cartCtx.error) {
    return (
      <div className=" flex    items-center bg-white">
        <div
          className="mt-20 flex h-20 w-full  max-w-96 rounded-xl border border-red-600 bg-white p-4 ring-4 ring-inset 	
          ring-red-300 ring-opacity-20"
        >
          <HiOutlineExclamationTriangle className="mr-4  align-top text-[30px] text-[#BA0933]"></HiOutlineExclamationTriangle>

          <div className="flex flex-col justify-center    ">
            <h1 className="font-sans  text-lg text-[#BA0933]">
              A problem occurred
            </h1>
            <h2 className="  font-sans text-xs text-blackText">
              {cartCtx.error}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col   rounded-sm border border-gridGray border-opacity-50">
      <div className="h-[275px]   bg-gridGray">
        <div className="mx-auto my-auto flex h-[100%] w-[80%] items-center justify-items-center">
          <Image
            src={prueba}
            alt="productImage"
            className="object-scale-down"
          />
        </div>
      </div>

      <div className="relative mb-2 flex  flex-col px-2 py-2 font-sans text-productsText">
        <p className="mb-1 line-clamp-4  h-auto text-[16px] font-semibold">
          {props.name}
        </p>

        <p className="text-[28px]">
          <small>$</small>
          {price}
        </p>

        <ProductItemForm
          id={props.id}
          stock={props.stock}
          onAddToCart={addToCartHandler}
        ></ProductItemForm>
        {showErrorAdd && (
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2   transform whitespace-nowrap text-center font-sans text-[13px] text-[#BA0933] ">
            {localadd}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
