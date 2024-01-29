import Input from "../../UI/Input";
import { useRef, useState, useContext, useEffect } from "react";
import CartContext from "../../../store/cart-context";
import Loader from "@/components/UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const ProductItemForm = (props) => {
  //Es state es para ver si es valido o no el valor
  const [amountisValid, setAmountIsValid] = useState(true);
  const [amountisValidStock, setAmountIsValidStock] = useState("");
  const [showError, setShowError] = useState(false);
  const [showErrorAmount, setShowErrorAmount] = useState(false);
  const amountInputRef = useRef();

  const cartCtx = useContext(CartContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > props.stock
    ) {
      setAmountIsValid(false);
      return;
    }

    const itemFound = cartCtx.items.find((item) => item.id === props.id);

    if (itemFound) {
      const sum = enteredAmountNumber + itemFound.amount;

      if (sum > props.stock) {
        setAmountIsValidStock(
          "The quantity in your cart of this product exceeds the available stock",
        );
        return;
      }
    }
    setAmountIsValidStock("");

    //Aca solo tenemos la cantidad, nos falta mas data. Tonces pasamos la cantidad al elemento padre (productitem)
    props.onAddToCart(enteredAmountNumber);
  };

  //Stock error
  useEffect(() => {
    if (amountisValidStock) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setAmountIsValidStock("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [amountisValidStock]);

  //Amount input error
  useEffect(() => {
    if (!amountisValid) {
      setShowErrorAmount(true);

      const timer = setTimeout(() => {
        setShowErrorAmount(false);
        setAmountIsValid(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [amountisValid]);

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

  //Para extraer la cantidad ingresada en el form. Se puede usar con two way binding con state. O usando REFS, como es un componente custom (INPUT), no alcanza con solamente creart la Ref, y agregar la ref propiedad al elemento. Pero es necesario agregarle al INPUT component envolver la funcion con React.forwardRef y agregar el elemento ref ademas de props.
  return (
    <form className="grow font-sans" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: props.stock,
          step: "1",
          defaultValue: props.stock === 0 ? 0 : 1,
          disabled: props.stock === 0,
        }}
      ></Input>
      <p className="font-sans">Available amount: {props.stock} </p>
      <div className="font-sans ">
        <button
          className={`hover:bg rounded-md border border-transparent px-[8px] py-[5px] text-[13px]   ${
            props.stock === 0
              ? "bg-[#e3e6e6]"
              : "bg-yellowButton ring-borderRingLogin ring-opacity-100 hover:bg-yellowButtonHover hover:bg-opacity-100  active:border active:border-borderLogin active:outline-none  active:ring "
          }`}
          disabled={props.stock === 0}
        >
          Add to Cart
        </button>
      </div>
      {showErrorAmount && (
        <div className="absolute left-1/2 top-full  -translate-x-1/2   -translate-y-1/2 transform whitespace-nowrap text-center font-sans text-[9px] text-[#BA0933] ">
          The amount must not exceed the stock: {props.stock}.
        </div>
      )}
      {showError && (
        <div className="absolute left-1/2 top-full  -translate-x-1/2  -translate-y-1/2   transform    whitespace-nowrap font-sans text-[9px] text-[#BA0933]">
          {amountisValidStock}
        </div>
      )}
    </form>
  );
};

export default ProductItemForm;
